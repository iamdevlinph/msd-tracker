import {
	type CharacterOwnedCostume,
	resolveCharacterPortrait,
} from "@/components/characters/utils/character-costume";
import type { Character, CharId } from "@/data/characters/CHARACTERS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";

export type EquippedCharacter = Pick<
	Character,
	"id" | "name" | "portraitImage" | "variant"
>;

export type EquippedCharacterUsage = {
	monsterlings: Record<string, EquippedCharacter[]>;
	artifacts: Record<string, EquippedCharacter[]>;
};

export type EquippedCharacterInventory = {
	monsterlingInstanceIds?: Iterable<string>;
	artifactInstanceIds?: Iterable<string>;
	charactersOwned?: Record<number, CharacterOwnedCostume>;
};

type EquippedCharacterSlot = Pick<
	LoadoutCharacterSlot,
	| "characterId"
	| "monsterlingIds"
	| "legendaryMonsterlingId"
	| "artifactInstanceId"
>;

type EditableLoadoutEquipment = {
	characters: readonly EquippedCharacterSlot[];
};

const characterDisplayName = (character: EquippedCharacter) =>
	character.variant
		? `${character.name} (${character.variant})`
		: character.name;

const compareCharacters = (a: EquippedCharacter, b: EquippedCharacter) =>
	characterDisplayName(a).localeCompare(characterDisplayName(b)) || a.id - b.id;

/**
 * Resolve loadout equipment by its owned inventory instance ID.
 *
 * This intentionally accepts only editable LoadoutOwned records. Snapshots,
 * catalog IDs, and legacy `usedBy` fields are not part of this calculation.
 */
export const getEquippedCharacterUsage = (
	loadouts: Record<string, EditableLoadoutEquipment>,
	characters: Record<number, Character> = CHARACTERS_DATA,
	inventory: EquippedCharacterInventory = {},
): EquippedCharacterUsage => {
	const monsterlings = new Map<string, Map<CharId, EquippedCharacter>>();
	const artifacts = new Map<string, Map<CharId, EquippedCharacter>>();
	const monsterlingInstanceIds = inventory.monsterlingInstanceIds
		? new Set(inventory.monsterlingInstanceIds)
		: null;
	const artifactInstanceIds = inventory.artifactInstanceIds
		? new Set(inventory.artifactInstanceIds)
		: null;

	for (const loadout of Object.values(loadouts)) {
		for (const slot of loadout.characters ?? []) {
			const characterId = slot?.characterId;
			if (characterId == null) continue;
			const character = characters[characterId];
			if (!character) continue;

			const resolved = {
				id: character.id,
				name: character.name,
				portraitImage: resolveCharacterPortrait(
					character,
					inventory.charactersOwned?.[characterId],
				),
				...(character.variant ? { variant: character.variant } : {}),
			} satisfies EquippedCharacter;
			const monsterlingIds = [
				...(slot.monsterlingIds ?? []),
				slot.legendaryMonsterlingId ?? null,
			];
			for (const instanceId of monsterlingIds) {
				if (typeof instanceId !== "string" || instanceId.length === 0) continue;
				if (monsterlingInstanceIds && !monsterlingInstanceIds.has(instanceId))
					continue;
				const charactersForInstance =
					monsterlings.get(instanceId) ?? new Map<CharId, EquippedCharacter>();
				charactersForInstance.set(character.id, resolved);
				monsterlings.set(instanceId, charactersForInstance);
			}

			const artifactInstanceId = slot.artifactInstanceId;
			if (
				typeof artifactInstanceId === "string" &&
				artifactInstanceId.length > 0
			) {
				if (artifactInstanceIds && !artifactInstanceIds.has(artifactInstanceId))
					continue;
				const charactersForInstance =
					artifacts.get(artifactInstanceId) ??
					new Map<CharId, EquippedCharacter>();
				charactersForInstance.set(character.id, resolved);
				artifacts.set(artifactInstanceId, charactersForInstance);
			}
		}
	}

	const sortUsage = (usage: Map<string, Map<CharId, EquippedCharacter>>) =>
		Object.fromEntries(
			[...usage.entries()].map(([instanceId, charactersForInstance]) => [
				instanceId,
				[...charactersForInstance.values()].sort(compareCharacters),
			]),
		) as Record<string, EquippedCharacter[]>;

	return {
		monsterlings: sortUsage(monsterlings),
		artifacts: sortUsage(artifacts),
	};
};

export const getCharacterDisplayName = characterDisplayName;
