import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CHARACTER_CLASS_DATA } from "@/data/character-classes/CHARACTER_CLASS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";

describe("CHARACTERS_DATA", () => {
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
			expect(
				existsSync(resolve("public", character.portraitImage.slice(1))),
			).toBe(true);
			expect(existsSync(resolve("public", character.fullImage.slice(1)))).toBe(
				true,
			);
		}
	});
});
