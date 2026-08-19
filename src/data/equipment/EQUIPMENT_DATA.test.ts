import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	EQUIPMENT_DATA,
	EQUIPMENT_PART_TYPES,
} from "@/data/equipment/EQUIPMENT_DATA";

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
			expect(piece.set_effects.length).toBeGreaterThan(0);
		}
		const sets = pieces.reduce((grouped, piece) => {
			const set = grouped.get(piece.set_name) ?? [];
			set.push(piece);
			grouped.set(piece.set_name, set);
			return grouped;
		}, new Map<string, typeof pieces>());
		for (const set of sets.values()) {
			const requiredPieces = set[0].set_effects.at(-1)?.pieces;
			expect(requiredPieces).toBeDefined();
			if (!requiredPieces) continue;
			expect(set).toHaveLength(requiredPieces);
			if (requiredPieces === 4)
				expect(new Set(set.map((piece) => piece.part_type))).toEqual(
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
		expect(new Set(primeVariants.map((piece) => piece.name)).size).toBe(38);
		for (const piece of primeVariants) {
			expect(piece.tier_id).toBe(5);
			expect(tier4Images).toContain(piece.image);
			expect(
				piece.set_effects.every(
					({ effect }) => effect === "Effect details pending.",
				),
			).toBe(true);
		}
	});
});
