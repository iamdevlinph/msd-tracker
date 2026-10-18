import { afterEach, describe, expect, it, vi } from "vitest";
import {
	ARTIFACT_CATALOG_SORTS,
	compareOwnedArtifacts,
	filterArtifacts,
	sortArtifacts,
} from "@/components/artifacts/utils/artifact-utils";

const artifacts = [
	{
		id: 1,
		name: "Beta Support",
		image: "/beta.webp",
		tier_id: 4,
		class_id: 4,
	},
	{
		id: 2,
		name: "Alpha Fighter",
		image: "/alpha.webp",
		tier_id: 5,
		class_id: 1,
		element_effect_id: 2,
	},
	{
		id: 3,
		name: "Gamma Support",
		image: "/gamma.webp",
		tier_id: 3,
		class_id: 4,
		element_effect_id: 3,
	},
	{
		id: 4,
		name: "Hidden Support",
		image: "/hidden.webp",
		tier_id: 5,
		class_id: 4,
		is_hidden: true,
	},
	{
		id: 5,
		name: "Alpha Fighter",
		image: "/alpha-copy.webp",
		tier_id: 5,
		class_id: 1,
	},
] as const;

afterEach(() => vi.unstubAllEnvs());

describe("artifact filters", () => {
	it("filters case-insensitively with OR within and AND across groups", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		expect(
			filterArtifacts(artifacts, { search: "BETA" }).map(({ id }) => id),
		).toEqual([1]);
		expect(
			filterArtifacts(artifacts, {
				selectedTiers: [3, 4],
				selectedCharacterClass: [4],
				selectedElements: [3],
			}).map(({ id }) => id),
		).toEqual([3]);
		expect(
			filterArtifacts(artifacts, { selectedElements: [2, 3] }),
		).toHaveLength(2);
		expect(filterArtifacts(artifacts, {}).map(({ id }) => id)).not.toContain(4);
	});

	it("sorts artifacts in every catalog order with deterministic ties", () => {
		expect(sortArtifacts(artifacts).map(({ id }) => id)).toEqual([
			2, 5, 4, 1, 3,
		]);
		expect(
			sortArtifacts(artifacts, ARTIFACT_CATALOG_SORTS.NAME_ASC).map(
				({ id }) => id,
			),
		).toEqual([2, 5, 1, 3, 4]);
		expect(
			sortArtifacts(artifacts, ARTIFACT_CATALOG_SORTS.NAME_DESC).map(
				({ id }) => id,
			),
		).toEqual([4, 3, 1, 2, 5]);
		expect(
			sortArtifacts(artifacts, ARTIFACT_CATALOG_SORTS.TIER_ASC).map(
				({ id }) => id,
			),
		).toEqual([3, 1, 2, 5, 4]);
	});

	it("keeps owned-copy ordering stable after catalog ordering", () => {
		const artifact = artifacts[0];
		expect(
			compareOwnedArtifacts(
				{ artifact, fusionLevel: 1, id: "a" },
				{ artifact, fusionLevel: 3, id: "b" },
			),
		).toBeLessThan(0);
	});
});
