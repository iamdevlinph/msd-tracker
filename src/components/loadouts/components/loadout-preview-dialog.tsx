import { type ReactNode, useRef, useState } from "react";
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
import type { LoadoutRenderData } from "./loadout-render-data";

type LoadoutPreviewDialogProps = {
	loadout: LoadoutOwned | null;
	onOpenChange: (open: boolean) => void;
	onEdit?: () => void;
	onEditCharacter?: (id: number) => void;
	onEditMonsterling?: (id: string) => void;
	onEditArtifact?: (id: string) => void;
	onDuplicate?: () => void;
	onDelete?: () => void;
	onNotes?: () => void;
	onCreateSnapshot?: () => void;
	renderData?: LoadoutRenderData;
	metadata?: ReactNode;
	metadataWithNotes?: ReactNode;
	showMetadataInHeader?: boolean;
	typeLabel?: string;
	target?: "loadout" | "snapshot";
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
	onNotes,
	onCreateSnapshot,
	renderData,
	metadata,
	metadataWithNotes,
	showMetadataInHeader = true,
	typeLabel = "Team Loadout",
	target = "loadout",
}: LoadoutPreviewDialogProps) => {
	const surfaceRef = useRef<HTMLDivElement>(null);
	const [compactMonsterlings, setCompactMonsterlings] = useState(true);
	const [hideEquipment, setHideEquipment] = useState(true);
	const [showNotes, setShowNotes] = useState(false);
	const ga = useGoogleAnalytics();
	const imageActions = useLoadoutImageActions(
		LOADOUT_ACTION_SOURCES.PREVIEW,
		target,
	);

	return (
		<Dialog
			open={!!loadout}
			onOpenChange={(open) => {
				if (!open) {
					if (target === "loadout")
						ga.event(ANALYTICS_EVENTS.LOADOUT_PREVIEW_CLOSE);
					setCompactMonsterlings(true);
					setHideEquipment(true);
					setShowNotes(false);
				}
				onOpenChange(open);
			}}
		>
			<DialogContent
				className={cn(
					"grid max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-none grid-rows-[auto_auto_minmax(0,1fr)] gap-0 overflow-hidden p-0",
					compactMonsterlings
						? "sm:max-w-max"
						: hideEquipment
							? "sm:max-w-[calc(100%-2rem)] 2xl:max-w-[1772px]"
							: "sm:max-w-[calc(100%-2rem)] 2xl:max-w-[1640px]",
				)}
			>
				<DialogHeader className="border-b p-4 pr-14">
					<div>
						<DialogTitle>{loadout?.name ?? "Loadout preview"}</DialogTitle>
						{showMetadataInHeader && metadata}
					</div>
					<DialogDescription>
						Share-ready character, Monsterling, artifact, and equipment
						overview.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
					<div className="flex flex-wrap items-center gap-3">
						<Label htmlFor="hide-equipment" className="cursor-pointer">
							<Checkbox
								id="hide-equipment"
								aria-label="Hide equipment"
								checked={hideEquipment}
								onCheckedChange={(checked) => {
									const shouldHideEquipment = checked === true;
									ga.event(ANALYTICS_EVENTS.LOADOUT_PREVIEW_EQUIPMENT_TOGGLE, {
										hide_equipment: shouldHideEquipment,
									});
									setHideEquipment(shouldHideEquipment);
								}}
							/>
							Hide equipment
						</Label>
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
						{metadataWithNotes && (
							<Label htmlFor="show-notes" className="cursor-pointer">
								<Checkbox
									id="show-notes"
									aria-label="Show notes"
									checked={showNotes}
									onCheckedChange={(checked) => setShowNotes(checked === true)}
								/>
								Show notes
							</Label>
						)}
					</div>
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
									hideEquipment,
								)
							}
							onDelete={onDelete}
							onNotes={onNotes}
							onCreateSnapshot={onCreateSnapshot}
							activeImageAction={imageActions.activeAction}
							itemType={target === "snapshot" ? "loadout snapshot" : undefined}
						/>
					)}
				</div>
				<div className="min-h-0 overflow-auto bg-muted/30 p-4">
					{loadout && (
						<LoadoutPreviewSurface
							ref={surfaceRef}
							loadout={loadout}
							monsterlingStatsDisplay={compactMonsterlings ? "icons" : "full"}
							hideEquipment={hideEquipment}
							onEditCharacter={onEditCharacter}
							onEditMonsterling={onEditMonsterling}
							onEditArtifact={onEditArtifact}
							renderData={renderData}
							metadata={showNotes ? metadataWithNotes : metadata}
							typeLabel={typeLabel}
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
