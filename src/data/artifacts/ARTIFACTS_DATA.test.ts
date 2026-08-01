import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { CHARACTER_CLASS_DATA } from "@/data/character-classes/CHARACTER_CLASS_DATA";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";

describe("artifacts data", () => {
	it("contains all local artifact images with stable unique ids", () => {
		const artifacts = Object.values(ARTIFACTS_DATA);
		expect(artifacts).toHaveLength(37);
		expect(new Set(artifacts.map((a) => a.id)).size).toBe(37);
		expect(new Set(artifacts.map((a) => a.image)).size).toBe(37);
		for (const artifact of artifacts) {
			expect(TIERS_DATA[artifact.tier_id]).toBeDefined();
			expect(CHARACTER_CLASS_DATA[artifact.class_id]).toBeDefined();
			if (artifact.element_effect_id) {
				expect(ELEMENTS_DATA[artifact.element_effect_id]).toBeDefined();
			}
			expect(artifact.image).toMatch(/^\/images\/.+\.webp$/);
			expect(existsSync(resolve("public", artifact.image.slice(1)))).toBe(true);
		}
	});
});
