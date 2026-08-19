import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	CHARACTER_CLASS_DATA,
	CLASS_ID_BY_CLASS,
} from "@/data/character-classes/CHARACTER_CLASS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import {
	ELEMENT_ID_BY_ELEMENT,
	ELEMENTS_DATA,
} from "@/data/elements/ELEMENTS_DATA";
import { TIER_ID_BY_TIER, TIERS_DATA } from "@/data/tiers/TIERS_DATA";

describe("CHARACTERS_DATA", () => {
	it("includes Brisshell with her catalog classifications and images", () => {
		expect(CHARACTERS_DATA[24]).toEqual({
			id: 24,
			name: "Brisshell",
			class_id: CLASS_ID_BY_CLASS.ASSASSIN,
			element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
			portraitImage: "/images/Character_Portrait/portrait_Brisshell_01.webp",
			fullImage: "/images/Character_Full/Img_CharacterIllust_Brisshell.webp",
			tier_id: TIER_ID_BY_TIER.PRIME_5,
		});
	});

	it("includes hidden Vivian with her staged classifications and images", () => {
		expect(CHARACTERS_DATA[25]).toEqual({
			id: 25,
			name: "Vivian",
			class_id: CLASS_ID_BY_CLASS.FIGHTER,
			element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
			portraitImage: "/images/Character_Portrait/portrait_Vivian_01.webp",
			fullImage: "/images/Character_Full/Img_CharacterIllust_Vivian.webp",
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			is_hidden: true,
		});
	});

	it("has unique identities and valid references", () => {
		const characters = Object.values(CHARACTERS_DATA);
		expect(new Set(characters.map(({ id }) => id)).size).toBe(
			characters.length,
		);
		expect(
			new Set(
				characters.map(({ internal_name, name }) => internal_name ?? name),
			).size,
		).toBe(characters.length);
		for (const character of characters) {
			expect(CHARACTER_CLASS_DATA[character.class_id]).toBeDefined();
			expect(ELEMENTS_DATA[character.element_id]).toBeDefined();
			expect(TIERS_DATA[character.tier_id]).toBeDefined();
			expect(character.portraitImage).toMatch(/^\/images\/.+\.webp$/);
			expect(character.fullImage).toMatch(/^\/images\/.+\.webp$/);
			expect(
				existsSync(resolve("public", character.portraitImage.slice(1))),
			).toBe(true);
			expect(existsSync(resolve("public", character.fullImage.slice(1)))).toBe(
				true,
			);
			for (const costume of character.costumes ?? []) {
				expect(costume.name).toMatch(/^Costume \d+$/);
				expect(costume.portraitImage).toMatch(/^\/images\/.+\.webp$/);
				expect(
					existsSync(resolve("public", costume.portraitImage.slice(1))),
				).toBe(true);
			}
		}
		const costumes = characters.flatMap(({ costumes = [] }) => costumes);
		expect(
			new Set(costumes.map(({ portraitImage }) => portraitImage)).size,
		).toBe(costumes.length);
		expect(CHARACTERS_DATA[3].costumes?.[0]?.is_hidden).toBe(true);
		expect(CHARACTERS_DATA[7].costumes?.[0]?.is_hidden).toBeUndefined();
		expect(CHARACTERS_DATA[9].costumes?.[0]?.is_hidden).toBeUndefined();
	});
});
