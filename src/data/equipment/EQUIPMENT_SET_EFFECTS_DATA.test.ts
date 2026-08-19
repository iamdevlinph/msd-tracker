import { describe, expect, it } from "vitest";
import { EQUIPMENT_SET_EFFECTS_DATA } from "@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA";

describe("equipment set effects data", () => {
	it("contains one nonempty effect list for each of the 34 sets", () => {
		expect(Object.keys(EQUIPMENT_SET_EFFECTS_DATA)).toHaveLength(34);
		for (const effects of Object.values(EQUIPMENT_SET_EFFECTS_DATA)) {
			expect(effects.length).toBeGreaterThan(0);
		}
	});

	it("preserves representative Choice and Prime effects", () => {
		expect(EQUIPMENT_SET_EFFECTS_DATA["Glutton's Visage"]).toEqual([
			{ pieces: 2, effect: "Basic Attack DMG +3% upon using a Fire attack." },
		]);
		expect(EQUIPMENT_SET_EFFECTS_DATA.Arbiter).toEqual([
			{ pieces: 2, effect: "Ice DMG +10% for 5s upon using a Switch Skill." },
			{
				pieces: 4,
				effect:
					"Ice DMG +10% for 5s upon attacking an enemy with Ice Affliction.",
			},
		]);
	});

	it("marks the newly added Prime set effects as pending", () => {
		for (const setName of [
			"Gourmand's Grand Banquet",
			"Devourer of the Abyss",
			"Forest Tyrant",
			"Sirius",
			"Ancient Stone",
			"Mount Tai's Towering Might",
			"Heart of Eternal Frost",
			"Vanguard of Victory",
			"Gourmand Level",
			"Victorious General's Rites",
			"Thousand-Year-Old Tree",
			"Night of a Full Moon",
			"Fox Youkai's Fighting Spirit",
			"Blossoms in Full Bloom",
		] as const) {
			expect(
				EQUIPMENT_SET_EFFECTS_DATA[setName].every(
					({ effect }) => effect === "Effect details pending.",
				),
			).toBe(true);
		}
	});
});
