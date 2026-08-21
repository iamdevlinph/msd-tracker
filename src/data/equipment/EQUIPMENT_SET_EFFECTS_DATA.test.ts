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

	it("contains finalized effects for the newly added Prime sets", () => {
		expect(
			Object.values(EQUIPMENT_SET_EFFECTS_DATA)
				.flatMap((effects) => effects.map(({ effect }) => effect))
				.join("\n"),
		).not.toContain("Effect details pending.");
		expect(EQUIPMENT_SET_EFFECTS_DATA["Forest Tyrant"]).toEqual([
			{ pieces: 2, effect: "Ice DMG +7.5% for 3s upon using a Basic Attack" },
			{
				pieces: 4,
				effect:
					"Crit Rate +5% for 5s upon attacking an enemy with Ice Affliction",
			},
		]);
		expect(EQUIPMENT_SET_EFFECTS_DATA["Thousand-Year-Old Tree"]).toEqual([
			{
				pieces: 2,
				effect: "Teammates' Fire DMG +7.5% for 5s upon using a Support Skill",
			},
		]);
	});
});
