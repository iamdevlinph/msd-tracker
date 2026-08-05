import { TierPortrait } from "@/components/shared/tier-portrait";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { EQUIPMENT_DATA } from "@/data/equipment/EQUIPMENT_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
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

const COMPACT_EQUIPMENT_LABELS = ["Head", "Chest", "Gloves", "Foot"] as const;

type LoadoutCardCharacterRowProps = {
	loadoutId: string;
	index: number;
	slot: LoadoutCharacterSlot;
	charactersOwned: StoreState["charactersOwned"];
	monsterlingsOwned: StoreState["monsterlingsOwned"];
	artifactsOwned: StoreState["artifactsOwned"];
	onEditCharacter?: (id: number) => void;
	onEditMonsterling?: (id: string) => void;
	onEditArtifact?: (id: string) => void;
};
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
			<LoadoutCardArtifactTile
				id={artifactId}
				artifact={artifact}
				owned={artifactOwned}
				onEdit={onEditArtifact}
			/>
			{EQUIPMENT_SLOT_INDEXES.map((equipmentIndex) => {
				const equipmentId = slot.equipment_ids?.[equipmentIndex - 1] ?? null;
				const equipment = equipmentId ? EQUIPMENT_DATA[equipmentId] : null;
				return (
					<div
						key={`${loadoutId}-${index}-equipment-${equipmentIndex}`}
						className={cn(
							"relative grid aspect-square min-w-0 place-items-center overflow-hidden rounded-md border bg-background/60 text-center text-[10px] text-muted-foreground",
							!equipment && "border-dashed",
						)}
					>
						{equipment ? (
							<TierPortrait
								tier={equipment.tier_id}
								portraitImg={equipment.image}
								portraitSize={112}
								name={equipment.name}
								portraitClassName="size-full object-contain p-1"
							/>
						) : (
							<span className="capitalize">
								{COMPACT_EQUIPMENT_LABELS[equipmentIndex - 1]}
							</span>
						)}
					</div>
				);
			})}
		</div>
	);
};
