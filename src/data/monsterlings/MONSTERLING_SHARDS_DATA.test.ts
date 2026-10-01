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
		const confirmedEntries = [
			[167, "EightB", "MonsterlingEightB", ELEMENT_ID_BY_ELEMENT.LIGHTNING],
			[168, "RedB", "MonsterlingEightBRed", ELEMENT_ID_BY_ELEMENT.LIGHTNING],
			[169, "Hak-yu", "MonsterlingHaCube", ELEMENT_ID_BY_ELEMENT.LIGHTNING],
			[
				170,
				"CapQ",
				"MonsterlingHaCubeCaptain",
				ELEMENT_ID_BY_ELEMENT.LIGHTNING,
			],
			[171, "Promo", "MonsterlingProMo", ELEMENT_ID_BY_ELEMENT.PHYSICAL],
			[172, "Bizpomo", "MonsterlingBispoMo", ELEMENT_ID_BY_ELEMENT.PHYSICAL],
			[173, "Beepmo", "MonsterlingBipMo", ELEMENT_ID_BY_ELEMENT.ICE],
			[180, "Grippy", "MonsterlingOrtusGrip", ELEMENT_ID_BY_ELEMENT.PHYSICAL],
			[
				181,
				"Hunppy",
				"MonsterlingOrtusGripHunt",
				ELEMENT_ID_BY_ELEMENT.PHYSICAL,
			],
			[182, "Crusher", "MonsterlingOrtusDog", ELEMENT_ID_BY_ELEMENT.FIRE],
			[183, "Titus", "MonsterlingOrtusShark", ELEMENT_ID_BY_ELEMENT.LIGHTNING],
			[186, "Fearless", "MonsterlingFearless", ELEMENT_ID_BY_ELEMENT.PHYSICAL],
			[
				187,
				"Feargiver",
				"MonsterlingFearlessBlack",
				ELEMENT_ID_BY_ELEMENT.PHYSICAL,
			],
			[188, "Sludge", "MonsterlingSludge", ELEMENT_ID_BY_ELEMENT.EARTH],
			[
				190,
				"Fidelis Raptor",
				"MonsterlingFidelisRaptor",
				ELEMENT_ID_BY_ELEMENT.LIGHTNING,
			],
		] as const;
		const captureAndMutationIds = new Set([168, 170, 172, 181, 187]);
		const partiallyConfirmedEntries = [
			[174, "Colossus", "MonsterlingCollossus", ["Element", "Source"]],
			[
				175,
				"Colossus Alter",
				"MonsterlingCollossusBlack",
				["Element", "Source"],
			],
			[176, "Scrap Hoarder", "MonsterlingScrapHoarder", ["Element", "Source"]],
			[
				177,
				"Clean Horde",
				"MonsterlingScrapHoarderClean",
				["Element", "Source"],
			],
			[178, "Garbinator", "MonsterlingGarbage", ["Element", "Source"]],
			[179, "Silbinator", "MonsterlingGarbageSilver", ["Element", "Source"]],
			[184, "Macrodon", "MonsterlingOrtusSharkBoss", ["Element", "Source"]],
			[
				185,
				"Whitelon",
				"MonsterlingOrtusSharkBossWhite",
				["Element", "Source"],
			],
			[189, "Ragnadon", "MonsterlingRagnadon", ["Element", "Source"]],
			[
				191,
				"Altus Raptor",
				"MonsterlingFidelisRaptorGold",
				["Element", "Source"],
			],
			[192, "The Great Unknown", "MonsterlingUnknown", ["Element"]],
			[193, "Oblivion", "MonsterlingUnknownEternity", ["Element"]],
		] as const;

		expect(MONSTERLING_DATA_MUWON[166]).toMatchObject({
			id: 166,
			name: "Nagi",
			image: "/images/Monsterling_Icons/MonsterlingMob_Nagi.webp",
			region_id: REGION_ID_BY_REGION.MUWON,
			placeholder_fields: ["Element", "Source"],
		});
		for (const [id, name, imageName, elementId] of confirmedEntries) {
			expect(MONSTERLING_DATA_SECTOR_3[id]).toMatchObject({
				id,
				name,
				image: `/images/Monsterling_Icons/${imageName}.webp`,
				element_id: elementId,
				source_id: captureAndMutationIds.has(id)
					? [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.MUTATION]
					: [SOURCE_ID_BY_SOURCE.CAPTURE],
			});
			expect(MONSTERLING_DATA_SECTOR_3[id].placeholder_fields).toBeUndefined();
		}
		for (const [
			id,
			name,
			imageName,
			placeholderFields,
		] of partiallyConfirmedEntries) {
			expect(MONSTERLING_DATA_SECTOR_3[id]).toMatchObject({
				id,
				name,
				image: `/images/Monsterling_Icons/${imageName}.webp`,
				placeholder_fields: placeholderFields,
			});
		}
		expect(MONSTERLING_DATA_SECTOR_3[192].source_id).toEqual([
			SOURCE_ID_BY_SOURCE.CONQUEST,
		]);
		expect(MONSTERLING_DATA_SECTOR_3[193].source_id).toEqual([
			SOURCE_ID_BY_SOURCE.MUTATION,
		]);
		expect(images).toHaveLength(27);
		expect(new Set(images).size).toBe(27);
		expect(
			Math.max(...Object.keys(MONSTERLING_DATA_SECTOR_3).map(Number)),
		).toBe(193);
		expect(
			Object.values(MONSTERLING_DATA_SECTOR_3)
				.filter(
					({ id }) =>
						![
							167, 168, 169, 170, 171, 172, 173, 180, 181, 182, 183, 186, 187,
							188, 190,
						].includes(id),
				)
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
