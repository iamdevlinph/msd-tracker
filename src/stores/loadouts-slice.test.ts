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
	});
});
