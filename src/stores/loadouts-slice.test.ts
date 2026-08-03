import { describe, expect, it } from "vitest";
import { normalizeLoadouts } from "@/stores/loadouts-slice";

describe("normalizeLoadouts", () => {
	it("defaults legacy equipment and normalizes equipment tuples", () => {
		const normalized = normalizeLoadouts({
			legacy: {
				name: "Legacy",
				characters: [
					{
						characterId: 1,
						monsterlingIds: [null, null, null],
						artifactInstanceId: null,
					},
				],
			},
			current: {
				name: "Current",
				characters: [
					{
						characterId: 1,
						monsterlingIds: [null, null, null],
						artifactInstanceId: null,
						equipment_ids: [10, "invalid", 30, 40, 50],
					},
				],
			},
		});

		expect(normalized.legacy.characters[0].equipment_ids).toEqual([
			null,
			null,
			null,
			null,
		]);
		expect(normalized.current.characters[0].equipment_ids).toEqual([
			10,
			null,
			30,
			40,
		]);
		expect(normalized.legacy.notes).toBe("");
		expect(normalized.legacy.characters[0].stat_values).toEqual({});
		expect(normalized.legacy.characters[0].pinned_stat_ids).toEqual([]);
	});

	it("normalizes numeric stats and canonicalizes, deduplicates, validates, and caps pins", () => {
		const normalized = normalizeLoadouts({
			team: {
				notes: "x".repeat(2100),
				characters: [
					{
						stat_values: { atk: 1200, crit_rate: 22.5, hp: -1, unknown: 4 },
						pinned_stat_ids: [
							"atk",
							"crit_rate",
							"atk",
							"hp",
							"crit_dmg",
							"special_skill_cd",
							"elem_weak_dmg_boost",
						],
					},
				],
			},
		});
		expect(normalized.team.notes).toHaveLength(2000);
		expect(normalized.team.characters[0].stat_values).toEqual({
			atk: 1200,
			crit_rate: 22.5,
		});
		expect(normalized.team.characters[0].pinned_stat_ids).toEqual([
			"atk",
			"hp",
			"crit_rate",
			"crit_dmg",
			"special_skill_cd",
		]);
	});
});
