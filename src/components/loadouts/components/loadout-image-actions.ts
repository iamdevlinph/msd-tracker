import { useState } from "react";
import toast from "react-hot-toast";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
	LOADOUT_IMAGE_ACTIONS,
	type LoadoutActionSource,
	type LoadoutImageAction,
} from "@/components/loadouts/loadout-constants";
import { renderElementToPngBlob } from "@/components/shared/image-export";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

export type {
	LoadoutActionSource,
	LoadoutImageAction,
} from "@/components/loadouts/loadout-constants";

const imageBlob = async (node: HTMLElement | null) => {
	if (!node) throw new Error("Preview is not ready.");
	return renderElementToPngBlob(node, {
		backgroundColor: getComputedStyle(node).backgroundColor,
		exportProperties: [["--loadout-export-variant-background", "#18181b"]],
	});
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

export const useLoadoutImageActions = (
	source: LoadoutActionSource,
	target: "loadout" | "snapshot" = "loadout",
) => {
	const ga = useGoogleAnalytics();
	const [activeAction, setActiveAction] = useState<LoadoutImageAction | null>(
		null,
	);

	const run = async (
		action: LoadoutImageAction,
		name: string,
		node: HTMLElement | null,
		compactMonsterlings: boolean,
		hideEquipment: boolean,
	) => {
		const params = {
			compact_monsterlings: compactMonsterlings,
			hide_equipment: hideEquipment,
			source,
		};
		const copy = action === LOADOUT_IMAGE_ACTIONS.COPY;
		ga.event(
			target === "snapshot"
				? ANALYTICS_EVENTS.LOADOUT_SNAPSHOT_COPY_ATTEMPT
				: copy
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
				target === "snapshot"
					? ANALYTICS_EVENTS.LOADOUT_SNAPSHOT_COPY_SUCCESS
					: copy
						? ANALYTICS_EVENTS.LOADOUT_COPY_SUCCESS
						: ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_SUCCESS,
				params,
			);
		} catch (error) {
			ga.event(
				target === "snapshot"
					? ANALYTICS_EVENTS.LOADOUT_SNAPSHOT_COPY_FAILURE
					: copy
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
			hideEquipment: boolean,
		) =>
			run(
				LOADOUT_IMAGE_ACTIONS.COPY,
				name,
				node,
				compactMonsterlings,
				hideEquipment,
			),
		download: (
			name: string,
			node: HTMLElement | null,
			compactMonsterlings: boolean,
			hideEquipment: boolean,
		) =>
			run(
				LOADOUT_IMAGE_ACTIONS.DOWNLOAD,
				name,
				node,
				compactMonsterlings,
				hideEquipment,
			),
	};
};
