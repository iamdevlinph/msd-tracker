import { describe, expect, it } from "vitest";
import { emptyCharacterFilters } from "@/components/characters/store/characters-filter-store";
import { matchesCharacterFilters } from "@/components/characters/utils/character-utils";
import { CLASS_ID_BY_CLASS } from "@/data/character-classes/CHARACTER_CLASS_DATA";
import { ELEMENT_ID_BY_ELEMENT } from "@/data/elements/ELEMENTS_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";

const mad = {
	name: "M.A.D",
	class_id: CLASS_ID_BY_CLASS.ASSASSIN,
	element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
	tier_id: TIER_ID_BY_TIER.PRIME_5,
};

describe("matchesCharacterFilters", () => {
	it.each([
		"MAD",
		"MA",
		"M.A.D",
	])("ignores punctuation when searching for %s", (search) => {
		expect(
			matchesCharacterFilters(mad, {
				...emptyCharacterFilters(),
				search,
			}),
		).toBe(true);
	});
});
