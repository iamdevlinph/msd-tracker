import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	EQUIPMENT_DATA,
	EQUIPMENT_PART_TYPES,
} from "@/data/equipment/EQUIPMENT_DATA";

describe("equipment data", () => {
	it("contains the 62 catalog pieces across the 20 reference sets", () => {
		const pieces = Object.values(EQUIPMENT_DATA);
		expect(pieces).toHaveLength(62);
		expect(new Set(pieces.map((piece) => piece.id)).size).toBe(62);
		expect(new Set(pieces.map((piece) => piece.set_name)).size).toBe(20);
		expect(pieces.filter((piece) => piece.tier_id === 4).length).toBe(38);
		expect(pieces.filter((piece) => piece.tier_id === 5).length).toBe(24);
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
	});
});
