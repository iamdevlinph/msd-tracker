import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	EQUIPMENT_DATA,
	EQUIPMENT_PART_TYPES,
} from "@/data/equipment/EQUIPMENT_DATA";
import {
	EQUIPMENT_SET_EFFECTS_DATA,
	type EquipmentSetName,
} from "@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA";

describe("equipment data", () => {
	it("contains the 100 catalog pieces across the 34 reference sets", () => {
		const pieces = Object.values(EQUIPMENT_DATA);
		expect(pieces).toHaveLength(100);
		expect(new Set(pieces.map((piece) => piece.id)).size).toBe(100);
		expect(pieces.map((piece) => piece.id).sort((a, b) => a - b)).toEqual(
			Array.from({ length: 100 }, (_, index) => index + 1),
		);
		expect(new Set(pieces.map((piece) => piece.set_name)).size).toBe(34);
		expect(pieces.filter((piece) => piece.tier_id === 4).length).toBe(38);
		expect(pieces.filter((piece) => piece.tier_id === 5).length).toBe(62);
		for (const piece of pieces) {
			expect(EQUIPMENT_PART_TYPES).toContain(piece.part_type);
			expect(existsSync(resolve("public", piece.image.slice(1)))).toBe(true);
			expect(EQUIPMENT_SET_EFFECTS_DATA[piece.set_name]).toBeDefined();
		}
		const setNames = new Set(pieces.map((piece) => piece.set_name));
		expect(
			Object.keys(EQUIPMENT_SET_EFFECTS_DATA).filter(
				(setName) => !setNames.has(setName as EquipmentSetName),
			),
		).toEqual([]);
		for (const setName of setNames) {
			const setPieces = pieces.filter((piece) => piece.set_name === setName);
			const requiredPieces = EQUIPMENT_SET_EFFECTS_DATA[setName].at(-1)?.pieces;
			expect(requiredPieces).toBeDefined();
			expect(setPieces).toHaveLength(requiredPieces ?? 0);
			if (requiredPieces === 4)
				expect(new Set(setPieces.map((piece) => piece.part_type))).toEqual(
					new Set(EQUIPMENT_PART_TYPES),
				);
		}
		const tier4Images = new Set(
			pieces.filter((piece) => piece.tier_id === 4).map((piece) => piece.image),
		);
		const primeVariants = pieces.filter((piece) => piece.id >= 63);
		const primeVariantSourceIds = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
			22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
		];
		expect(primeVariants.map((piece) => piece.image)).toEqual(
			primeVariantSourceIds.map((id) => EQUIPMENT_DATA[id].image),
		);
		for (const piece of primeVariants) {
			expect(piece.tier_id).toBe(5);
			expect(tier4Images).toContain(piece.image);
			expect(
				EQUIPMENT_SET_EFFECTS_DATA[piece.set_name].every(
					({ effect }) => effect === "Effect details pending.",
				),
			).toBe(true);
		}
	});

	it("preserves representative equipment records", () => {
		expect(EQUIPMENT_DATA[1]).toEqual({
			id: 1,
			name: "Glutton's Hat",
			image: "/images/Equipment/EQUIP_HAT_005.webp",
			tier_id: 4,
			part_type: "headgear",
			set_name: "Glutton's Visage",
		});
		expect(EQUIPMENT_DATA[39]).toEqual({
			id: 39,
			name: "Warden Helmet",
			image: "/images/Equipment/EQUIP_SET_102_H.webp",
			tier_id: 5,
			part_type: "headgear",
			set_name: "Arbiter",
		});
		expect(
			Object.values(EQUIPMENT_DATA)
				.filter((piece) => piece.id >= 63)
				.map((piece) => piece.name),
		).toEqual([
			"Grand Banquet Chapeau",
			"Gourmand's Apron",
			"Devourer's Sticky Gloves",
			"Devourer's Sticky Footwear",
			"Tyrant's Helmet",
			"Tyrant's Armor",
			"Tyrant's Gauntlets",
			"Tyrant's Boots",
			"Ascendant White Wolf's Mask",
			"Ascendant White Wolf's Restraints",
			"Ascendant White Wolf's Grasp",
			"Ascendant White Wolf's Claw",
			"Ancient Stone Mark",
			"Ancient Stone Sandals",
			"Towering Mount Tai's Helmet",
			"Towering Mount Tai's Iron Armor",
			"Towering Mount Tai's Gloves",
			"Towering Mount Tai's Boots",
			"Crown of Eternal Frost",
			"Touch of Eternal Frost",
			"Vanguard Buff Coat",
			"Vanguard Leather Boots",
			"Gourmand's Hat",
			"Gourmand's Apron",
			"Gourmand's Gloves",
			"Gourmand's Slippers",
			"Victorious General's Gilded Armguards",
			"Victorious General's Gilded Greaves",
			"Almighty Jade Odong Hat",
			"Almighty Jade Odong Armor",
			"Manwol's Antlers",
			"Radiant Garb",
			"Great Sage's Touch",
			"Moonlight Hooves",
			"Fox Youkai's Fur Gloves",
			"Fox Youkai's Paws",
			"Undefeated Gisaeng's Headband",
			"Undefeated Gisaeng's Flower Slippers",
		]);
	});
});
