import type { CharacterFilters } from "@/components/characters/store/characters-filter-store";
import type { Character } from "@/data/characters/CHARACTERS_DATA";

export const isCharacterVisible = ({
	is_hidden,
}: Pick<Character, "is_hidden">) =>
	import.meta.env.VITE_NODE_ENV === "development" || !is_hidden;

export function getAwakeningBonus(awakeningBoost: number) {
	if (awakeningBoost >= 5) return 4;
	if (awakeningBoost >= 3) return 2;
	return 0;
}

export const isMaxSkill = (level: number) => {
	return level === 12;
};

export const matchesCharacterFilters = (
	character: Pick<
		Character,
		"class_id" | "element_id" | "is_hidden" | "name" | "tier_id"
	>,
	filters: CharacterFilters,
) =>
	isCharacterVisible(character) &&
	(!filters.search ||
		character.name.toLowerCase().includes(filters.search.toLowerCase())) &&
	(!filters.selectedCharacterClass.length ||
		filters.selectedCharacterClass.includes(character.class_id)) &&
	(!filters.selectedElements.length ||
		filters.selectedElements.includes(character.element_id)) &&
	(!filters.selectedTiers.length ||
		filters.selectedTiers.includes(character.tier_id));
