import { LoadoutActions } from "@/components/loadouts/components/loadout-actions";
import { LoadoutCardCharacterRow } from "@/components/loadouts/components/loadout-card-character-row";
import type { LoadoutImageAction } from "@/components/loadouts/components/loadout-image-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";
import type { LoadoutRenderData } from "./loadout-render-data";
import { CHARACTER_SLOT_INDEXES } from "./loadout-slot-constants";

type LoadoutCardProps = {
	loadout: LoadoutOwned;
	onPreview: (source: "card" | "icon") => void;
	onEdit?: () => void;
	onDuplicate?: () => void;
	onCopy?: () => void;
	onDownload?: () => void;
	onDelete: () => void;
	onNotes?: () => void;
	onCreateSnapshot?: () => void;
	onEditCharacter?: (id: number) => void;
	onEditMonsterling?: (id: string) => void;
	onEditArtifact?: (id: string) => void;
	activeImageAction?: LoadoutImageAction | null;
	disabled?: boolean;
	renderData?: LoadoutRenderData;
	metadata?: ReactNode;
	itemType?: "team loadout" | "loadout snapshot";
};

export const LoadoutCard = ({
	loadout,
	onPreview,
	onEdit,
	onDuplicate,
	onCopy,
	onDownload,
	onDelete,
	onNotes,
	onCreateSnapshot,
	onEditCharacter,
	onEditMonsterling,
	onEditArtifact,
	activeImageAction,
	disabled,
	renderData,
	metadata,
	itemType,
}: LoadoutCardProps) => {
	const liveCharactersOwned = useAppStore((state) => state.charactersOwned);
	const liveMonsterlingsOwned = useAppStore((state) => state.monsterlingsOwned);
	const liveArtifactsOwned = useAppStore((state) => state.artifactsOwned);
	const showArtifactsAndEquipment = useAppStore(
		(state) => state.loadoutCardPreferences.showArtifactsAndEquipment,
	);
	const charactersOwned = renderData?.charactersOwned ?? liveCharactersOwned;
	const monsterlingsOwned =
		renderData?.monsterlingsOwned ?? liveMonsterlingsOwned;
	const artifactsOwned = renderData?.artifactsOwned ?? liveArtifactsOwned;

	return (
		<Card className="group relative min-w-0 cursor-pointer gap-3 rounded-lg py-3 transition-all hover:border-primary hover:shadow-md focus-within:border-primary focus-within:shadow-md">
			<button
				type="button"
				onClick={() => onPreview("card")}
				disabled={disabled}
				aria-label={`Preview ${loadout.name} loadout card`}
				className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			/>
			<CardHeader className="pointer-events-none relative z-10 gap-2 px-3">
				<div>
					<CardTitle className="text-base leading-tight">
						{loadout.name}
					</CardTitle>
					{metadata}
				</div>
				<LoadoutActions
					className="pointer-events-auto w-full justify-end"
					loadoutName={loadout.name}
					onPreview={() => onPreview("icon")}
					onEdit={onEdit}
					onDuplicate={onDuplicate}
					onCopy={onCopy}
					onDownload={onDownload}
					onDelete={onDelete}
					onNotes={onNotes}
					hasNotes={Boolean(loadout.notes?.trim())}
					onCreateSnapshot={onCreateSnapshot}
					activeImageAction={activeImageAction}
					disabled={disabled}
					itemType={itemType}
				/>
			</CardHeader>
			<CardContent className="pointer-events-none relative z-10 grid gap-2 px-3">
				{CHARACTER_SLOT_INDEXES.map((index) => (
					<LoadoutCardCharacterRow
						key={`${loadout.id}-character-${index + 1}`}
						loadoutId={loadout.id}
						index={index}
						slot={loadout.characters[index]}
						charactersOwned={charactersOwned}
						monsterlingsOwned={monsterlingsOwned}
						artifactsOwned={artifactsOwned}
						showArtifactsAndEquipment={
							renderData ? true : showArtifactsAndEquipment
						}
						onEditCharacter={onEditCharacter}
						onEditMonsterling={onEditMonsterling}
						onEditArtifact={onEditArtifact}
						onPreview={() => onPreview("card")}
					/>
				))}
			</CardContent>
		</Card>
	);
};

import type { ReactNode } from "react";
