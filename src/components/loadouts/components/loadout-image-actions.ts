import { useState } from "react";
import toast from "react-hot-toast";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
	LOADOUT_IMAGE_ACTIONS,
	type LoadoutActionSource,
	type LoadoutImageAction,
} from "@/components/loadouts/loadout-constants";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

export type {
	LoadoutActionSource,
	LoadoutImageAction,
} from "@/components/loadouts/loadout-constants";

const waitForAssets = async (node: HTMLElement) => {
	await document.fonts?.ready;
	await Promise.all(
		Array.from(node.querySelectorAll("img")).map(async (image) => {
			if (!image.complete) {
				await new Promise<void>((resolve) => {
					image.addEventListener("load", () => resolve(), { once: true });
					image.addEventListener("error", () => resolve(), { once: true });
				});
			}
			await image.decode?.().catch(() => undefined);
		}),
	);
};

const imageBlob = async (node: HTMLElement | null) => {
	if (!node) throw new Error("Preview is not ready.");
	await waitForAssets(node);
	const { toBlob } = await import("html-to-image");
	const exportProperties = [
		["--loadout-export-variant-background", "#18181b"],
		["--loadout-export-skill-columns", "repeat(2, minmax(0, 1fr))"],
	] as const;
	const previousProperties = exportProperties.map(([property]) => ({
		property,
		value: node.style.getPropertyValue(property),
		priority: node.style.getPropertyPriority(property),
	}));
	let blob: Blob | null;
	for (const [property, value] of exportProperties) {
		node.style.setProperty(property, value);
	}
	try {
		blob = await toBlob(node, {
			pixelRatio: 2,
			cacheBust: true,
			backgroundColor: getComputedStyle(node).backgroundColor,
		});
	} finally {
		for (const { property, value, priority } of previousProperties) {
			if (value) {
				node.style.setProperty(property, value, priority);
			} else {
				node.style.removeProperty(property);
			}
		}
	}
	if (!blob) throw new Error("Could not render the preview.");
	return blob;
};

const safeFilename = (name: string) =>
	`${
		name
			.normalize("NFKD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-zA-Z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
			.toLowerCase() || "loadout"
	}.png`;

export const useLoadoutImageActions = (source: LoadoutActionSource) => {
	const ga = useGoogleAnalytics();
	const [activeAction, setActiveAction] = useState<LoadoutImageAction | null>(
		null,
	);

	const run = async (
		action: LoadoutImageAction,
		name: string,
		node: HTMLElement | null,
		compactMonsterlings: boolean,
	) => {
		const params = {
			compact_monsterlings: compactMonsterlings,
			source,
		};
		const copy = action === LOADOUT_IMAGE_ACTIONS.COPY;
		ga.event(
			copy
				? ANALYTICS_EVENTS.LOADOUT_COPY_ATTEMPT
				: ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_ATTEMPT,
			params,
		);
		setActiveAction(action);
		try {
			const blob = imageBlob(node);
			if (copy) {
				await Promise.all([
					navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]),
					blob,
				]);
			} else {
				const url = URL.createObjectURL(await blob);
				try {
					const anchor = document.createElement("a");
					anchor.href = url;
					anchor.download = safeFilename(name);
					anchor.click();
				} finally {
					URL.revokeObjectURL(url);
				}
			}
			toast.success(copy ? "Loadout image copied" : "Loadout image downloaded");
			ga.event(
				copy
					? ANALYTICS_EVENTS.LOADOUT_COPY_SUCCESS
					: ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_SUCCESS,
				params,
			);
		} catch (error) {
			ga.event(
				copy
					? ANALYTICS_EVENTS.LOADOUT_COPY_FAILURE
					: ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_FAILURE,
				params,
			);
			toast.error(
				error instanceof Error ? error.message : `Could not ${action} image`,
			);
		} finally {
			setActiveAction(null);
		}
	};

	return {
		activeAction,
		copy: (
			name: string,
			node: HTMLElement | null,
			compactMonsterlings: boolean,
		) => run(LOADOUT_IMAGE_ACTIONS.COPY, name, node, compactMonsterlings),
		download: (
			name: string,
			node: HTMLElement | null,
			compactMonsterlings: boolean,
		) => run(LOADOUT_IMAGE_ACTIONS.DOWNLOAD, name, node, compactMonsterlings),
	};
};
