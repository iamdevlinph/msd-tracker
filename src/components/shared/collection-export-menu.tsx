import { Copy, Download } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { renderElementToPngBlob } from "@/components/shared/image-export";
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
import { ANALYTICS_EVENTS } from "@/lib/analytics";

const COLLECTION_LABELS = {
	characters: "Character",
	monsterlings: "Monsterling",
	artifacts: "Artifact",
} as const;

type CollectionExportPreviewVariant = {
	children: ReactNode;
	itemWidth: number;
	maxColumns: number;
	filenameSuffix: string;
};

type CollectionExportMenuProps = {
	collection: "characters" | "monsterlings" | "artifacts";
	title: string;
	count: number;
	itemWidth: number;
	maxColumns: number;
	children: ReactNode;
	previewVariant?: CollectionExportPreviewVariant;
};

export const CollectionExportMenu = ({
	collection,
	title,
	count,
	itemWidth,
	maxColumns,
	children,
	previewVariant,
}: CollectionExportMenuProps) => {
	const ga = useGoogleAnalytics();
	const surfaceRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [showStats, setShowStats] = useState(false);
	const [busy, setBusy] = useState(false);
	const exportLabel = `Export ${COLLECTION_LABELS[collection]} Data`;
	const isCompact = Boolean(previewVariant && !showStats);
	const activeLayout =
		isCompact && previewVariant ? previewVariant : { itemWidth, maxColumns };
	const activeChildren = isCompact ? previewVariant?.children : children;
	const activeItemWidth = activeLayout.itemWidth;
	const activeMaxColumns = activeLayout.maxColumns;
	const activeColumns = Math.max(1, Math.min(count, activeMaxColumns));
	const surfaceWidth =
		96 + activeColumns * activeItemWidth + (activeColumns - 1) * 16;

	const run = async (action: "copy" | "download") => {
		const copy = action === "copy";
		const eventParams = { collection_type: collection, compact: isCompact };
		ga.event(
			copy
				? ANALYTICS_EVENTS.COLLECTION_COPY_ATTEMPT
				: ANALYTICS_EVENTS.COLLECTION_DOWNLOAD_ATTEMPT,
			eventParams,
		);
		setBusy(true);
		try {
			const surface = surfaceRef.current;
			const blob = await renderElementToPngBlob(surface, {
				backgroundColor: surface
					? getComputedStyle(surface).backgroundColor
					: "transparent",
				width: surfaceWidth,
			});
			if (copy) {
				if (!navigator.clipboard?.write)
					throw new Error("Clipboard is unavailable.");
				await navigator.clipboard.write([
					new ClipboardItem({ "image/png": blob }),
				]);
			} else {
				const url = URL.createObjectURL(blob);
				try {
					const anchor = document.createElement("a");
					anchor.href = url;
					anchor.download = `msd-tracker-${collection}${isCompact ? `-${previewVariant?.filenameSuffix}` : ""}.png`;
					anchor.click();
				} finally {
					URL.revokeObjectURL(url);
				}
			}
			toast.success(
				copy ? `${title} image copied` : `${title} image downloaded`,
			);
			ga.event(
				copy
					? ANALYTICS_EVENTS.COLLECTION_COPY_SUCCESS
					: ANALYTICS_EVENTS.COLLECTION_DOWNLOAD_SUCCESS,
				eventParams,
			);
		} catch (error) {
			ga.event(
				copy
					? ANALYTICS_EVENTS.COLLECTION_COPY_FAILURE
					: ANALYTICS_EVENTS.COLLECTION_DOWNLOAD_FAILURE,
				eventParams,
			);
			toast.error(
				error instanceof Error
					? error.message
					: "Could not export collection image",
			);
		} finally {
			setBusy(false);
		}
	};

	return (
		<>
			<Button
				variant="outline"
				disabled={busy || count === 0}
				aria-label={exportLabel}
				onClick={() => setOpen(true)}
			>
				<Download className="mr-2 size-4" />
				{exportLabel}
			</Button>
			<Dialog
				open={open}
				onOpenChange={(nextOpen) => {
					if (!nextOpen) setShowStats(false);
					setOpen(nextOpen);
				}}
			>
				<DialogContent
					className="grid max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] grid-rows-[auto_auto_minmax(0,1fr)] gap-0 overflow-hidden p-0 sm:max-w-[calc(100%-2rem)]"
					style={{ width: surfaceWidth + 32 }}
				>
					<DialogHeader className="border-b p-4 pr-14">
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>
							Preview the filtered {COLLECTION_LABELS[collection].toLowerCase()}{" "}
							data before exporting.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
						{previewVariant ? (
							<Label htmlFor="collection-show-stats" className="cursor-pointer">
								<Checkbox
									id="collection-show-stats"
									aria-label="Show stats"
									checked={showStats}
									onCheckedChange={(checked) => setShowStats(checked === true)}
								/>
								Show stats
							</Label>
						) : (
							<span />
						)}
						<div className="flex gap-2">
							<Button
								variant="outline"
								disabled={busy}
								onClick={() => void run("copy")}
							>
								<Copy className="mr-2 size-4" />
								Copy Image
							</Button>
							<Button disabled={busy} onClick={() => void run("download")}>
								<Download className="mr-2 size-4" />
								Download PNG
							</Button>
						</div>
					</div>
					<div className="min-h-0 overflow-auto bg-muted/30 p-4">
						<div
							ref={surfaceRef}
							data-testid="collection-export-surface"
							className="max-w-full bg-background p-12 text-foreground"
							style={{ width: surfaceWidth }}
						>
							<h1 className="text-4xl font-bold">{title}</h1>
							<div
								className="mt-8 grid justify-items-center gap-4"
								style={{
									gridTemplateColumns: `repeat(auto-fit, minmax(${activeItemWidth}px, 1fr))`,
								}}
							>
								{activeChildren}
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
