import { describe, expect, it } from "vitest";
import {
	compareOwnedArtifacts,
	filterArtifacts,
	sortArtifacts,
} from "@/components/artifacts/utils/artifact-utils";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";

describe("artifact filters", () => {
	it("filters case-insensitively with OR within and AND across groups", () => {
		const artifacts = Object.values(ARTIFACTS_DATA);
		expect(filterArtifacts(artifacts, { search: "fall" })).toHaveLength(1);
		expect(filterArtifacts(artifacts, { search: "FALL" })).toHaveLength(1);
		expect(
			filterArtifacts(artifacts, { selectedTiers: [3, 4] }).every(
				(artifact) => artifact.tier_id < 5,
			),
		).toBe(true);

		const elemental = filterArtifacts(artifacts, {
			selectedTiers: [4, 5],
			selectedCharacterClass: [1, 2],
			selectedElements: [2, 3],
		});
		expect(
			elemental.every(
				(artifact) =>
					[4, 5].includes(artifact.tier_id) &&
					[1, 2].includes(artifact.class_id) &&
					artifact.element_effect_id != null &&
					[2, 3].includes(artifact.element_effect_id),
			),
		).toBe(true);
	});

	it("sorts tier descending, then name and id deterministically", () => {
		const sorted = sortArtifacts(Object.values(ARTIFACTS_DATA));
		for (let i = 1; i < sorted.length; i++) {
			expect(sorted[i - 1].tier_id).toBeGreaterThanOrEqual(sorted[i].tier_id);
			if (sorted[i - 1].tier_id === sorted[i].tier_id) {
				expect(
					sorted[i - 1].name.localeCompare(sorted[i].name),
				).toBeLessThanOrEqual(0);
			}
		}
		expect(
			compareOwnedArtifacts(
				{ artifact: ARTIFACTS_DATA[1], fusionLevel: 1, id: "a" },
				{ artifact: ARTIFACTS_DATA[1], fusionLevel: 3, id: "b" },
			),
		).toBeLessThan(0);
	});
});
