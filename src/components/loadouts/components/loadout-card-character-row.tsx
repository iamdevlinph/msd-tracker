import { ARTIFACTS_DATA } from "@/data/ARTIFACTS_DATA";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { cn } from "@/lib/utils";
import type { StoreState } from "@/stores/app-store";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";
import { LoadoutCardArtifactTile } from "./loadout-card-artifact-tile";
import { LoadoutCardCharacterTile } from "./loadout-card-character-tile";
import { LoadoutCardMonsterlingTile } from "./loadout-card-monsterling-tile";
import {
	EQUIPMENT_SLOT_INDEXES,
	MONSTERLING_SLOT_INDEXES,
} from "./loadout-slot-constants";
import { showFutureLoadoutSlots } from "./loadout-utils";

type LoadoutCardCharacterRowProps = {
	loadoutId: string;
	index: number;
	slot: LoadoutCharacterSlot;
	charactersOwned: StoreState["charactersOwned"];
	monsterlingsOwned: StoreState["monsterlingsOwned"];
	artifactsOwned: StoreState["artifactsOwned"];
	onEditCharacter: (id: number) => void;
	onEditMonsterling: (id: string) => void;
	onEditArtifact: (id: string) => void;
};

const SHOW_FUTURE_SLOTS = showFutureLoadoutSlots(import.meta.env.VITE_NODE_ENV);

export const LoadoutCardCharacterRow = ({
	loadoutId,
	index,
	slot,
	charactersOwned,
	monsterlingsOwned,
	artifactsOwned,
	onEditCharacter,
	onEditMonsterling,
	onEditArtifact,
}: LoadoutCardCharacterRowProps) => {
	const character =
		slot.characterId !== null ? CHARACTERS_DATA[slot.characterId] : null;
	const characterOwned =
		slot.characterId !== null ? charactersOwned[slot.characterId] : null;
	const element = character ? ELEMENTS_DATA[character.element_id] : null;
	const artifactId = slot.artifactInstanceId;
	const artifactOwned = artifactId ? artifactsOwned[artifactId] : null;
	const artifact = artifactOwned
		? ARTIFACTS_DATA[artifactOwned.artifact_id]
		: null;
	return (
		<div className="grid grid-cols-5 gap-1 rounded-md border bg-muted/20 p-2">
			<LoadoutCardCharacterTile
				character={character}
				owned={characterOwned}
				element={element}
				onEdit={onEditCharacter}
			/>
			{[...MONSTERLING_SLOT_INDEXES, "legendary" as const].map(
				(monsterIndex) => {
					const id =
						monsterIndex === "legendary"
							? (slot.legendaryMonsterlingId ?? null)
							: slot.monsterlingIds[monsterIndex];
					const owned = id ? monsterlingsOwned[id] : null;
					const info = owned ? MONSTERLINGS_DATA[owned.monsterling_id] : null;
					return (
						<LoadoutCardMonsterlingTile
							key={`${loadoutId}-character-${index + 1}-monsterling-${monsterIndex}`}
							id={id}
							info={info}
							owned={owned}
							legendary={monsterIndex === "legendary"}
							label={
								monsterIndex === "legendary"
									? "Legendary"
									: `Monsterling ${monsterIndex + 1}`
							}
							onEdit={onEditMonsterling}
						/>
					);
				},
			)}
			<LoadoutCardArtifactTile
				id={artifactId}
				artifact={artifact}
				owned={artifactOwned}
				onEdit={onEditArtifact}
			/>
			{SHOW_FUTURE_SLOTS &&
				EQUIPMENT_SLOT_INDEXES.map((equipmentIndex) => (
					<div
						key={`${loadoutId}-${index}-equipment-${equipmentIndex}`}
						className={cn(
							"grid aspect-square place-items-center rounded-md border border-dashed bg-background/60 text-[10px] text-muted-foreground",
							equipmentIndex === 1 && "border-l-2 border-l-primary pl-2",
						)}
					>
						Equipment {equipmentIndex}
					</div>
				))}
		</div>
	);
};
