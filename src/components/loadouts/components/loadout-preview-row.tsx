import {
	MONSTERLING_CARD_WIDTH,
	MONSTERLING_COMPACT_CARD_WIDTH,
} from "@/components/monsterlings/components/monsterling-constants";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { EQUIPMENT_PART_TYPES } from "@/data/equipment/EQUIPMENT_DATA";
import type { StoreState } from "@/stores/app-store";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";
import { LoadoutPreviewArtifact } from "./loadout-preview-artifact-slot";
import { LoadoutPreviewCharacter } from "./loadout-preview-character-slot";
import { LOADOUT_PREVIEW_CHARACTER_SLOT_WIDTH } from "./loadout-preview-constants";
import { LoadoutPreviewEquipment } from "./loadout-preview-equipment-slot";
import { LoadoutPreviewMonsterling } from "./loadout-preview-monsterling-slot";
import { LoadoutPreviewPlaceholder } from "./loadout-preview-placeholder-slot";
import { MONSTERLING_SLOT_INDEXES } from "./loadout-slot-constants";

type LoadoutPreviewRowProps = {
	slot: LoadoutCharacterSlot;
	characterOwned?: StoreState["charactersOwned"][number];
	monsterlingsOwned: StoreState["monsterlingsOwned"];
	artifactsOwned: StoreState["artifactsOwned"];
	monsterlingLinkChainLevels: StoreState["monsterlingLinkChainLevels"];
	compactMonsterlings: boolean;
	onEditCharacter?: (id: number) => void;
	onEditMonsterling?: (id: string) => void;
	onEditArtifact?: (id: string) => void;
};

export const LoadoutPreviewRow = ({
	slot,
	characterOwned,
	monsterlingsOwned,
	artifactsOwned,
	monsterlingLinkChainLevels,
	compactMonsterlings,
	onEditCharacter,
	onEditMonsterling,
	onEditArtifact,
}: LoadoutPreviewRowProps) => {
	const character =
		slot.characterId === null ? null : CHARACTERS_DATA[slot.characterId];
	const monsterlingCardWidth = compactMonsterlings
		? MONSTERLING_COMPACT_CARD_WIDTH
		: MONSTERLING_CARD_WIDTH;
	const gridTemplateColumns = `${LOADOUT_PREVIEW_CHARACTER_SLOT_WIDTH}px repeat(4, ${monsterlingCardWidth}px)`;
	return (
		<section className="grid gap-3 border-b border-border/70 pb-4 last:border-0 last:pb-0">
			<div className="grid items-center gap-3" style={{ gridTemplateColumns }}>
				{character && characterOwned ? (
					<LoadoutPreviewCharacter
						character={character}
						owned={characterOwned}
						onEdit={onEditCharacter}
					/>
				) : (
					<LoadoutPreviewPlaceholder label="Character unavailable" />
				)}
				{MONSTERLING_SLOT_INDEXES.map((index) => (
					<LoadoutPreviewMonsterling
						key={index}
						id={slot.monsterlingIds[index]}
						owned={monsterlingsOwned}
						levels={monsterlingLinkChainLevels}
						label={`Monsterling ${index + 1} unavailable`}
						compactStats={compactMonsterlings}
						onEdit={onEditMonsterling}
					/>
				))}
				<div>
					<LoadoutPreviewMonsterling
						id={slot.legendaryMonsterlingId ?? null}
						owned={monsterlingsOwned}
						levels={monsterlingLinkChainLevels}
						label="Legendary unavailable"
						compactStats={compactMonsterlings}
						onEdit={onEditMonsterling}
					/>
				</div>
			</div>
			<div className="grid items-center gap-3" style={{ gridTemplateColumns }}>
				<div className="flex justify-end">
					<LoadoutPreviewArtifact
						id={slot.artifactInstanceId}
						owned={artifactsOwned}
						onEdit={onEditArtifact}
					/>
				</div>
				{(slot.equipment_ids ?? [null, null, null, null]).map(
					(equipmentId, index) => (
						<div key={EQUIPMENT_PART_TYPES[index]}>
							<LoadoutPreviewEquipment id={equipmentId} />
						</div>
					),
				)}
			</div>
		</section>
	);
};
