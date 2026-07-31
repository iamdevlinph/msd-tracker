import {
	MONSTERLING_CARD_WIDTH,
	MONSTERLING_COMPACT_CARD_WIDTH,
} from "@/components/monsterlings/components/monsterling-constants";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import type { StoreState } from "@/stores/app-store";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";
import { LoadoutPreviewArtifact } from "./loadout-preview-artifact-slot";
import { LoadoutPreviewCharacter } from "./loadout-preview-character-slot";
import {
	LOADOUT_PREVIEW_CHARACTER_SLOT_WIDTH,
	LOADOUT_PREVIEW_LEGENDARY_SLOT_OVERHEAD,
	LOADOUT_PREVIEW_PORTRAIT_SIZE,
} from "./loadout-preview-constants";
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
	return (
		<section
			className="grid items-center gap-3 border-b border-border/70 pb-4 last:border-0 last:pb-0"
			style={{
				gridTemplateColumns: `${LOADOUT_PREVIEW_CHARACTER_SLOT_WIDTH}px ${LOADOUT_PREVIEW_PORTRAIT_SIZE}px repeat(3, ${monsterlingCardWidth}px) ${monsterlingCardWidth + LOADOUT_PREVIEW_LEGENDARY_SLOT_OVERHEAD}px`,
			}}
		>
			{character && characterOwned ? (
				<LoadoutPreviewCharacter
					character={character}
					owned={characterOwned}
					onEdit={onEditCharacter}
				/>
			) : (
				<LoadoutPreviewPlaceholder label="Character unavailable" />
			)}
			<LoadoutPreviewArtifact
				id={slot.artifactInstanceId}
				owned={artifactsOwned}
				onEdit={onEditArtifact}
			/>
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
			<div className="border-l-2 border-primary pl-3">
				<LoadoutPreviewMonsterling
					id={slot.legendaryMonsterlingId ?? null}
					owned={monsterlingsOwned}
					levels={monsterlingLinkChainLevels}
					label="Legendary unavailable"
					compactStats={compactMonsterlings}
					onEdit={onEditMonsterling}
				/>
			</div>
		</section>
	);
};
