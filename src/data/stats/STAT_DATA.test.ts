import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { STAT_DATA, STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";

describe("STAT_DATA", () => {
	it("provides every tier value for each stat", () => {
		const tierIds = Object.values(TIER_ID_BY_TIER);
		expect(new Set(Object.values(STAT_DATA).map(({ id }) => id))).toEqual(
			new Set(Object.values(STAT_ID_BY_STAT)),
		);
		for (const stat of Object.values(STAT_DATA)) {
			expect(stat.image).toMatch(/^\/images\/.+\.webp$/);
			expect(stat.label.length).toBeGreaterThan(0);
			expect(existsSync(resolve("public", stat.image.slice(1)))).toBe(true);
			expect(Object.keys(stat.values).map(Number).sort()).toEqual(
				[...tierIds].sort(),
			);
		}
	});
});
