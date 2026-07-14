import { CopyIcon, DownloadIcon } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { LoadoutPreviewRow } from "@/components/loadouts/components/loadout-preview-row";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const SLOTS = [0, 1, 2] as const;

type LoadoutPreviewDialogProps = {
	loadout: LoadoutOwned | null;
	onOpenChange: (open: boolean) => void;
};

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

const safeFilename = (name: string) =>
	`${
		name
			.normalize("NFKD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-zA-Z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
			.toLowerCase() || "loadout"
	}.png`;

export const LoadoutPreviewDialog = ({
	loadout,
	onOpenChange,
}: LoadoutPreviewDialogProps) => {
	const ga = useGoogleAnalytics();
	const surfaceRef = useRef<HTMLDivElement>(null);
	const [rendering, setRendering] = useState(false);
	const [compactMonsterlings, setCompactMonsterlings] = useState(false);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);

	const imageBlob = async () => {
		const node = surfaceRef.current;
		if (!node) throw new Error("Preview is not ready.");
		await waitForAssets(node);
		const { toBlob } = await import("html-to-image");
		const blob = await toBlob(node, {
			pixelRatio: 2,
			cacheBust: true,
			backgroundColor: getComputedStyle(node).backgroundColor,
		});
		if (!blob) throw new Error("Could not render the preview.");
		return blob;
	};

	const copy = async () => {
		const params = { compact_monsterlings: compactMonsterlings };
		ga.event(ANALYTICS_EVENTS.LOADOUT_COPY_ATTEMPT, params);
		setRendering(true);
		try {
			const blob = imageBlob();
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": blob }),
			]);
			toast.success("Loadout image copied");
			ga.event(ANALYTICS_EVENTS.LOADOUT_COPY_SUCCESS, params);
		} catch (error) {
			ga.event(ANALYTICS_EVENTS.LOADOUT_COPY_FAILURE, params);
			toast.error(
				error instanceof Error ? error.message : "Could not copy image",
			);
		} finally {
			setRendering(false);
		}
	};

	const download = async () => {
		const params = { compact_monsterlings: compactMonsterlings };
		ga.event(ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_ATTEMPT, params);
		setRendering(true);
		try {
			const blob = await imageBlob();
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = safeFilename(loadout?.name ?? "loadout");
			anchor.click();
			URL.revokeObjectURL(url);
			toast.success("Loadout image downloaded");
			ga.event(ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_SUCCESS, params);
		} catch (error) {
			ga.event(ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_FAILURE, params);
			toast.error(
				error instanceof Error ? error.message : "Could not download image",
			);
		} finally {
			setRendering(false);
		}
	};

	return (
		<Dialog
			open={!!loadout}
			onOpenChange={(open) => {
				if (!open) setCompactMonsterlings(false);
				onOpenChange(open);
			}}
		>
			<DialogContent
				className={cn(
					"grid max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-none grid-rows-[auto_auto_minmax(0,1fr)] gap-0 overflow-hidden p-0",
					compactMonsterlings
						? "sm:max-w-max"
						: "sm:max-w-[calc(100%-2rem)] 2xl:max-w-[1640px]",
				)}
			>
				<DialogHeader className="border-b p-4 pr-14">
					<DialogTitle>{loadout?.name ?? "Loadout preview"}</DialogTitle>
					<DialogDescription>
						Share-ready character and monsterling overview.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
					<Label htmlFor="compact-monsterlings" className="cursor-pointer">
						<Checkbox
							id="compact-monsterlings"
							aria-label="Compact monsterlings"
							checked={compactMonsterlings}
							onCheckedChange={(checked) =>
								setCompactMonsterlings(checked === true)
							}
						/>
						Compact monsterlings
					</Label>
					<div className="flex gap-2">
						<Button onClick={copy} disabled={rendering} variant="outline">
							{rendering ? <Spinner /> : <CopyIcon />}
							Copy image
						</Button>
						<Button onClick={download} disabled={rendering} variant="outline">
							{rendering ? <Spinner /> : <DownloadIcon />}
							Download image
						</Button>
					</div>
				</div>
				<div className="min-h-0 overflow-auto bg-muted/30 p-4">
					<div
						ref={surfaceRef}
						data-testid="loadout-share-surface"
						className={cn(
							"grid gap-4 bg-background p-3 text-foreground",
							compactMonsterlings ? "w-[984px]" : "w-[1600px]",
						)}
					>
						<header className="flex items-baseline justify-between border-b border-primary/60 px-1 pb-3">
							<h2 className="text-2xl font-bold">{loadout?.name}</h2>
							<span className="text-sm text-muted-foreground">
								Team Loadout
							</span>
						</header>
						{loadout &&
							SLOTS.map((index) => (
								<LoadoutPreviewRow
									key={`${loadout.id}-character-${index + 1}`}
									slot={loadout.characters[index]}
									characterOwned={
										loadout.characters[index].characterId === null
											? undefined
											: charactersOwned[loadout.characters[index].characterId]
									}
									monsterlingsOwned={monsterlingsOwned}
									compactMonsterlings={compactMonsterlings}
								/>
							))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
