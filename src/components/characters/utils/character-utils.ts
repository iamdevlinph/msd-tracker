import type { CharacterFilters } from "@/components/characters/store/characters-filter-store";
import type { Character } from "@/data/CHARACTERS_DATA";

export function getAwakeningBonus(awakeningBoost: number) {
	if (awakeningBoost >= 5) return 4;
	if (awakeningBoost >= 3) return 2;
	return 0;
}

export const isMaxSkill = (level: number) => {
	return level === 12;
};

export const matchesCharacterFilters = (
	character: Pick<Character, "class_id" | "element_id" | "name">,
	filters: CharacterFilters,
) =>
	(!filters.search ||
		character.name.toLowerCase().includes(filters.search.toLowerCase())) &&
	(!filters.selectedCharacterClass.length ||
		filters.selectedCharacterClass.includes(character.class_id)) &&
	(!filters.selectedElements.length ||
		filters.selectedElements.includes(character.element_id));
