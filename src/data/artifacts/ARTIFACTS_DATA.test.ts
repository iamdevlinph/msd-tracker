import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import {
	CHARACTER_CLASS_DATA,
	CLASS_ID_BY_CLASS,
} from "@/data/character-classes/CHARACTER_CLASS_DATA";
import {
	ELEMENT_ID_BY_ELEMENT,
	ELEMENTS_DATA,
} from "@/data/elements/ELEMENTS_DATA";
import { TIER_ID_BY_TIER, TIERS_DATA } from "@/data/tiers/TIERS_DATA";

describe("artifacts data", () => {
	it("includes Brisshell's signature artifact", () => {
		expect(ARTIFACTS_DATA[38]).toEqual({
			id: 38,
			name: "Monstrous Longing",
			image: "/images/Icon_Artifact/ArtifactBrisshell.webp",
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			class_id: CLASS_ID_BY_CLASS.ASSASSIN,
			element_effect_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		});
	});

	it("includes Vivian's hidden signature artifact", () => {
		expect(ARTIFACTS_DATA[39]).toEqual({
			id: 39,
			name: "Vivian's Artifact",
			image: "/images/Icon_Artifact/ArtifactVivian.webp",
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			class_id: CLASS_ID_BY_CLASS.FIGHTER,
			element_effect_id: ELEMENT_ID_BY_ELEMENT.EARTH,
			is_hidden: true,
		});
	});

	it("contains all local artifact images with stable unique ids", () => {
		const artifacts = Object.values(ARTIFACTS_DATA);
		expect(artifacts).toHaveLength(39);
		expect(new Set(artifacts.map((a) => a.id)).size).toBe(39);
		expect(new Set(artifacts.map((a) => a.image)).size).toBe(39);
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
