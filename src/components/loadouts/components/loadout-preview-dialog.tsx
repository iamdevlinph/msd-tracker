import { useRef, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { LoadoutActions } from "@/components/loadouts/components/loadout-actions";
import { useLoadoutImageActions } from "@/components/loadouts/components/loadout-image-actions";
import { LoadoutPreviewSurface } from "@/components/loadouts/components/loadout-preview-surface";
import { LOADOUT_ACTION_SOURCES } from "@/components/loadouts/loadout-constants";
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
import { cn } from "@/lib/utils";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

type LoadoutPreviewDialogProps = {
	loadout: LoadoutOwned | null;
	onOpenChange: (open: boolean) => void;
	onEdit: () => void;
	onEditCharacter?: (id: number) => void;
	onEditMonsterling?: (id: string) => void;
	onEditArtifact?: (id: string) => void;
	onDuplicate: () => void;
	onDelete: () => void;
};

export const LoadoutPreviewDialog = ({
	loadout,
	onOpenChange,
	onEdit,
	onEditCharacter,
	onEditMonsterling,
	onEditArtifact,
	onDuplicate,
	onDelete,
}: LoadoutPreviewDialogProps) => {
	const surfaceRef = useRef<HTMLDivElement>(null);
	const [compactMonsterlings, setCompactMonsterlings] = useState(true);
	const ga = useGoogleAnalytics();
	const imageActions = useLoadoutImageActions(LOADOUT_ACTION_SOURCES.PREVIEW);

	return (
		<Dialog
			open={!!loadout}
			onOpenChange={(open) => {
				if (!open) {
					ga.event(ANALYTICS_EVENTS.LOADOUT_PREVIEW_CLOSE);
					setCompactMonsterlings(true);
				}
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
						Share-ready character, Monsterling, and artifact overview.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
					<Label htmlFor="compact-monsterlings" className="cursor-pointer">
						<Checkbox
							id="compact-monsterlings"
							aria-label="Compact monsterlings"
							checked={compactMonsterlings}
							onCheckedChange={(checked) => {
								const isCompact = checked === true;
								ga.event(ANALYTICS_EVENTS.LOADOUT_PREVIEW_COMPACT_TOGGLE, {
									compact_monsterlings: isCompact,
								});
								setCompactMonsterlings(isCompact);
							}}
						/>
						Compact monsterlings
					</Label>
					{loadout && (
						<LoadoutActions
							loadoutName={loadout.name}
							onEdit={onEdit}
							onDuplicate={onDuplicate}
							onCopy={() =>
								void imageActions.copy(
									loadout.name,
									surfaceRef.current,
									compactMonsterlings,
								)
							}
							onDownload={() =>
								void imageActions.download(
									loadout.name,
									surfaceRef.current,
									compactMonsterlings,
								)
							}
							onDelete={onDelete}
							activeImageAction={imageActions.activeAction}
						/>
					)}
				</div>
				<div className="min-h-0 overflow-auto bg-muted/30 p-4">
					{loadout && (
						<LoadoutPreviewSurface
							ref={surfaceRef}
							loadout={loadout}
							compactMonsterlings={compactMonsterlings}
							onEditCharacter={onEditCharacter}
							onEditMonsterling={onEditMonsterling}
							onEditArtifact={onEditArtifact}
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
