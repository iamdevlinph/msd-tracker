import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { REGION_ID_BY_REGION, REGIONS_DATA } from "@/data/regions/REGIONS_DATA";

describe("REGIONS_DATA", () => {
	it("defines each region id and local map icon", () => {
		const ids = Object.values(REGIONS_DATA).map(({ id }) => id);
		expect(new Set(ids).size).toBe(ids.length);
		expect(new Set(ids)).toEqual(new Set(Object.values(REGION_ID_BY_REGION)));
		for (const region of Object.values(REGIONS_DATA)) {
			expect(region.image).toMatch(/^\/images\/.+\.webp$/);
			expect(existsSync(resolve("public", region.image.slice(1)))).toBe(true);
		}
	});
});
