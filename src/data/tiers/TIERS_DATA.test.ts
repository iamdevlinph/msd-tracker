import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";

describe("TIERS_DATA", () => {
	it("defines the extracted color for every tier", () => {
		expect(Object.values(TIERS_DATA).map(({ hex }) => hex)).toEqual([
			"#9D9DA5",
			"#69A99D",
			"#6789BE",
			"#AA81D5",
			"#CDAD87",
		]);
	});

	it("uses existing WebP images", () => {
		for (const tier of Object.values(TIERS_DATA)) {
			for (const image of [tier.full, tier.base, tier.trait_image]) {
				expect(image).toMatch(/^\/images\/.+\.webp$/);
				expect(existsSync(resolve("public", image.slice(1)))).toBe(true);
			}
		}
	});
});
