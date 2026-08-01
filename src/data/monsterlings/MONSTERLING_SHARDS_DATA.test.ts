import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import {
	MONSTERLINGS_SOURCE_DATA,
	SOURCE_ID_BY_SOURCE,
} from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import { MONSTERLING_DATA_ELENDOR } from "@/data/monsterlings/MONSTERLING_DATA_ELENDOR";
import { MONSTERLING_DATA_EVENTS } from "@/data/monsterlings/MONSTERLING_DATA_EVENTS";
import { MONSTERLING_DATA_LEGENDARY_MONSTERS } from "@/data/monsterlings/MONSTERLING_DATA_LEGENDARY_MONSTERS";
import { MONSTERLING_DATA_MUWON } from "@/data/monsterlings/MONSTERLING_DATA_MUWON";
import { MONSTERLING_DATA_NAMRYUNG } from "@/data/monsterlings/MONSTERLING_DATA_NAMRYUNG";
import { MONSTERLING_DATA_SERENIA } from "@/data/monsterlings/MONSTERLING_DATA_SERENIA";
import { MONSTERLING_DATA_SURAH } from "@/data/monsterlings/MONSTERLING_DATA_SURAH";
import { MONSTERLING_DATA_VARHINE } from "@/data/monsterlings/MONSTERLING_DATA_VARHINE";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";

const SHARDS = [
	[MONSTERLING_DATA_ELENDOR, REGION_ID_BY_REGION.ELENDOR],
	[MONSTERLING_DATA_VARHINE, REGION_ID_BY_REGION.VARHINE],
	[MONSTERLING_DATA_SERENIA, REGION_ID_BY_REGION.SERENIA],
	[MONSTERLING_DATA_SURAH, REGION_ID_BY_REGION.SURAH],
	[MONSTERLING_DATA_NAMRYUNG, REGION_ID_BY_REGION.NAMRYUNG],
	[MONSTERLING_DATA_MUWON, REGION_ID_BY_REGION.MUWON],
	[MONSTERLING_DATA_LEGENDARY_MONSTERS, REGION_ID_BY_REGION.LEGENDARY],
	[MONSTERLING_DATA_EVENTS, REGION_ID_BY_REGION.EVENTS],
] as const;

describe("monsterling data shards", () => {
	it("are nonempty, disjoint, and internally referential", () => {
		const ids = new Set<number>();
		for (const [shard, regionId] of SHARDS) {
			expect(Object.keys(shard).length).toBeGreaterThan(0);
			for (const monsterling of Object.values(shard)) {
				expect(monsterling.image).toMatch(/^\/images\/.+\.webp$/);
				expect(existsSync(resolve("public", monsterling.image.slice(1)))).toBe(
					true,
				);
				expect(ids.has(monsterling.id)).toBe(false);
				ids.add(monsterling.id);
				expect(monsterling.region_id).toBe(regionId);
				expect(ELEMENTS_DATA[monsterling.element_id]).toBeDefined();
				for (const sourceId of monsterling.source_id)
					expect(MONSTERLINGS_SOURCE_DATA[sourceId]).toBeDefined();
			}
		}
		expect(MONSTERLINGS_SOURCE_DATA[SOURCE_ID_BY_SOURCE.ALL]).toBeDefined();
	});
});
