import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveCharacterPortrait } from "@/components/characters/utils/character-costume";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";

describe("resolveCharacterPortrait", () => {
	afterEach(() => vi.unstubAllEnvs());

	it("shows released costumes and safely falls back for unknown IDs", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		expect(
			resolveCharacterPortrait(CHARACTERS_DATA[9], { costume_id: 1 }),
		).toBe(CHARACTERS_DATA[9].costumes?.[0]?.portraitImage);
		expect(
			resolveCharacterPortrait(CHARACTERS_DATA[9], { costume_id: 99 }),
		).toBe(CHARACTERS_DATA[9].portraitImage);
	});

	it("preserves hidden selections while rendering them only in development", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		expect(
			resolveCharacterPortrait(CHARACTERS_DATA[3], { costume_id: 1 }),
		).toBe(CHARACTERS_DATA[3].portraitImage);
		vi.stubEnv("VITE_NODE_ENV", "development");
		expect(
			resolveCharacterPortrait(CHARACTERS_DATA[3], { costume_id: 1 }),
		).toBe(CHARACTERS_DATA[3].costumes?.[0]?.portraitImage);
	});
});
