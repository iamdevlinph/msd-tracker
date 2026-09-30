import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	ELEMENT_ID_BY_ELEMENT,
	ELEMENTS_DATA,
} from "@/data/elements/ELEMENTS_DATA";
import {
	MONSTERLINGS_SOURCE_DATA,
	SOURCE_ID_BY_SOURCE,
} from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import { MONSTERLING_DATA_ELENDOR } from "@/data/monsterlings/MONSTERLING_DATA_ELENDOR";
import { MONSTERLING_DATA_EVENTS } from "@/data/monsterlings/MONSTERLING_DATA_EVENTS";
import { MONSTERLING_DATA_LEGENDARY_MONSTERS } from "@/data/monsterlings/MONSTERLING_DATA_LEGENDARY_MONSTERS";
import { MONSTERLING_DATA_MUWON } from "@/data/monsterlings/MONSTERLING_DATA_MUWON";
import { MONSTERLING_DATA_NAMRYUNG } from "@/data/monsterlings/MONSTERLING_DATA_NAMRYUNG";
import { MONSTERLING_DATA_SECTOR_3 } from "@/data/monsterlings/MONSTERLING_DATA_SECTOR_3";
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
	[MONSTERLING_DATA_SECTOR_3, REGION_ID_BY_REGION.SECTOR_3],
	[MONSTERLING_DATA_LEGENDARY_MONSTERS, REGION_ID_BY_REGION.LEGENDARY],
	[MONSTERLING_DATA_EVENTS, REGION_ID_BY_REGION.EVENTS],
] as const;

describe("monsterling data shards", () => {
	it("defines the new Muwon and Sector 3 catalog positions", () => {
		const images = Object.values(MONSTERLING_DATA_SECTOR_3).map(
			({ image }) => image,
		);

		expect(MONSTERLING_DATA_MUWON[166]).toMatchObject({
			id: 166,
			name: "Muwon No. 166",
			region_id: REGION_ID_BY_REGION.MUWON,
			placeholder_fields: ["Name", "Element", "Source"],
		});
		expect(MONSTERLING_DATA_SECTOR_3[167]).toMatchObject({
			id: 167,
			name: "EightB",
			element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
			source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		});
		expect(MONSTERLING_DATA_SECTOR_3[167].placeholder_fields).toBeUndefined();
		expect(MONSTERLING_DATA_SECTOR_3[169]).toMatchObject({
			id: 169,
			name: "Hak-yu",
			image: "/images/Monsterling_Icons/MonsterlingHaCube.webp",
			placeholder_fields: ["Element", "Source"],
		});
		expect(MONSTERLING_DATA_SECTOR_3[171]).toMatchObject({
			id: 171,
			name: "Promo",
			element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
			source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		});
		expect(MONSTERLING_DATA_SECTOR_3[171].placeholder_fields).toBeUndefined();
		expect(MONSTERLING_DATA_SECTOR_3[173]).toMatchObject({
			id: 173,
			name: "Beepmo",
			image: "/images/Monsterling_Icons/MonsterlingBipMo.webp",
			placeholder_fields: ["Element", "Source"],
		});
		expect(MONSTERLING_DATA_SECTOR_3[188]).toMatchObject({
			id: 188,
			name: "Sludge",
			element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
			source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		});
		expect(MONSTERLING_DATA_SECTOR_3[188].placeholder_fields).toBeUndefined();
		expect(MONSTERLING_DATA_SECTOR_3[192]).toMatchObject({
			id: 192,
			name: "The Great Unknown",
			image: "/images/Monsterling_Icons/MonsterlingUnknown.webp",
			source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
			placeholder_fields: ["Element"],
		});
		expect(images).toHaveLength(29);
		expect(new Set(images).size).toBe(29);
		expect(
			Object.values(MONSTERLING_DATA_SECTOR_3)
				.filter(({ id }) => ![167, 171, 188].includes(id))
				.every(({ placeholder_fields }) => placeholder_fields?.length),
		).toBe(true);
		expect(
			Object.values(MONSTERLING_DATA_SECTOR_3)
				.filter(({ image, name }) => image.endsWith(`/${name}.webp`))
				.every(({ placeholder_fields }) =>
					placeholder_fields?.includes("Name"),
				),
		).toBe(true);
	});

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
