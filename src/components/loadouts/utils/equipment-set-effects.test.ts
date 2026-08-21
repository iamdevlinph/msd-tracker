import { describe, expect, it } from "vitest";
import {
	deriveActiveEquipmentSets,
	getActiveEquipmentSetEffects,
} from "./equipment-set-effects";

describe("deriveActiveEquipmentSets", () => {
	it("activates thresholds in first-slot order and ignores unknown IDs", () => {
		expect(deriveActiveEquipmentSets([1, 2, 3, 4])).toMatchObject([
			{
				name: "Glutton's Visage",
				pieces: 2,
				equipmentIds: [1, 2],
				colorClass: "outline-sky-400",
			},
			{
				name: "Sticky Gorger",
				pieces: 2,
				equipmentIds: [3, 4],
				colorClass: "outline-amber-400",
			},
		]);
	});

	it("activates four matching pieces and leaves no-bonus sets out", () => {
		const [activeSet] = deriveActiveEquipmentSets([5, 6, 7, 8]);
		expect(activeSet).toMatchObject({
			name: "Green Nightmare",
			pieces: 4,
			equipmentIds: [5, 6, 7, 8],
			colorClass: "outline-sky-400",
		});
		expect(
			getActiveEquipmentSetEffects(activeSet).map(({ pieces }) => pieces),
		).toEqual([2, 4]);
		expect(deriveActiveEquipmentSets([1, null, 999, 3])).toEqual([]);
	});

	it("requires at least two matching pieces", () => {
		expect(deriveActiveEquipmentSets([1, 3, 5, null])).toEqual([]);
		expect(deriveActiveEquipmentSets([5, 6, 7, 1])[0].pieces).toBe(3);
	});
});
