import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	getVisibleRegions,
	REGION_ID_BY_REGION,
	REGIONS_DATA,
} from "@/data/regions/REGIONS_DATA";

describe("REGIONS_DATA", () => {
	afterEach(() => vi.unstubAllEnvs());

	it("places Sector 3 between Muwon and Legendary Monsters", () => {
		const regions = Object.values(REGIONS_DATA).map(({ region }) => region);
		const sector3Index = regions.indexOf("sector 3");
		const unassignedIndex = regions.indexOf("unassigned");

		expect(sector3Index).toBe(regions.indexOf("muwon") + 1);
		expect(unassignedIndex).toBe(sector3Index + 1);
		expect(regions.indexOf("legendary monsters")).toBe(unassignedIndex + 1);
	});

	it("preserves existing region ids while assigning Sector 3 id 9", () => {
		expect(REGION_ID_BY_REGION.LEGENDARY).toBe(7);
		expect(REGION_ID_BY_REGION.EVENTS).toBe(8);
		expect(REGION_ID_BY_REGION.SECTOR_3).toBe(9);
		expect(REGION_ID_BY_REGION.UNASSIGNED).toBe(10);
	});

	it("shows the unassigned icon only in development", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		expect(
			getVisibleRegions().some(({ region }) => region === "unassigned"),
		).toBe(false);

		vi.stubEnv("VITE_NODE_ENV", "development");
		expect(
			getVisibleRegions().some(({ region }) => region === "unassigned"),
		).toBe(true);
	});

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
