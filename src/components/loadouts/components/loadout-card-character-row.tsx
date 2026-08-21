import { isArtifactVisible } from "@/components/artifacts/utils/artifact-utils";
import { resolveCharacterPortrait } from "@/components/characters/utils/character-costume";
import { isCharacterVisible } from "@/components/characters/utils/character-utils";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { EQUIPMENT_DATA } from "@/data/equipment/EQUIPMENT_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import type { StoreState } from "@/stores/app-store";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";
import { LoadoutCardArtifactTile } from "./loadout-card-artifact-tile";
import { LoadoutCardCharacterTile } from "./loadout-card-character-tile";
import { LoadoutCardEquipmentTile } from "./loadout-card-equipment-tile";
import { LoadoutCardMonsterlingTile } from "./loadout-card-monsterling-tile";
import {
	EQUIPMENT_SLOT_INDEXES,
	MONSTERLING_SLOT_INDEXES,
} from "./loadout-slot-constants";

const COMPACT_EQUIPMENT_LABELS = ["Head", "Chest", "Gloves", "Foot"] as const;

type LoadoutCardCharacterRowProps = {
	loadoutId: string;
	index: number;
	slot: LoadoutCharacterSlot;
	charactersOwned: StoreState["charactersOwned"];
	monsterlingsOwned: StoreState["monsterlingsOwned"];
	artifactsOwned: StoreState["artifactsOwned"];
	showArtifactsAndEquipment: boolean;
	onEditCharacter?: (id: number) => void;
	onEditMonsterling?: (id: string) => void;
	onEditArtifact?: (id: string) => void;
	onPreview?: () => void;
};
export const LoadoutCardCharacterRow = ({
	loadoutId,
	index,
	slot,
	charactersOwned,
	monsterlingsOwned,
	artifactsOwned,
	showArtifactsAndEquipment,
	onEditCharacter,
	onEditMonsterling,
	onEditArtifact,
	onPreview,
}: LoadoutCardCharacterRowProps) => {
	const catalogCharacter =
		slot.characterId !== null ? CHARACTERS_DATA[slot.characterId] : null;
	const character =
		catalogCharacter && isCharacterVisible(catalogCharacter)
			? catalogCharacter
			: null;
	const characterOwned =
		slot.characterId !== null ? charactersOwned[slot.characterId] : null;
	const resolvedCharacter =
		character && characterOwned
			? {
					...character,
					portraitImage: resolveCharacterPortrait(character, characterOwned),
				}
			: character;
	const artifactId = slot.artifactInstanceId;
	const artifactOwned = artifactId ? artifactsOwned[artifactId] : null;
	const catalogArtifact = artifactOwned
		? ARTIFACTS_DATA[artifactOwned.artifact_id]
		: null;
	const artifact =
		catalogArtifact && isArtifactVisible(catalogArtifact)
			? catalogArtifact
			: null;
	return (
		<div className="grid grid-cols-5 gap-1 rounded-md border bg-muted/20 p-2">
			<LoadoutCardCharacterTile
				character={resolvedCharacter}
				owned={characterOwned}
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
							label={
								monsterIndex === "legendary"
									? "Legend"
									: monsterIndex === 0
										? "Link Chain"
										: `Mon ${monsterIndex + 1}`
							}
							onEdit={onEditMonsterling}
						/>
					);
				},
			)}
			{showArtifactsAndEquipment && (
				<LoadoutCardArtifactTile
					id={artifactId}
					artifact={artifact}
					owned={artifactOwned}
					onEdit={onEditArtifact}
				/>
			)}
			{showArtifactsAndEquipment &&
				EQUIPMENT_SLOT_INDEXES.map((equipmentIndex) => {
					const equipmentId = slot.equipment_ids?.[equipmentIndex - 1] ?? null;
					const equipment = equipmentId ? EQUIPMENT_DATA[equipmentId] : null;
					return (
						<LoadoutCardEquipmentTile
							key={`${loadoutId}-${index}-equipment-${equipmentIndex}`}
							equipment={equipment}
							label={COMPACT_EQUIPMENT_LABELS[equipmentIndex - 1]}
							onPreview={onPreview}
						/>
					);
				})}
		</div>
	);
};
