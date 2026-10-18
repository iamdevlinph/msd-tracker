import type { Artifact } from "@/data/artifacts/ARTIFACTS_DATA";
import type { CharacterClassId } from "@/data/character-classes/CHARACTER_CLASS_DATA";
import type { ElementId } from "@/data/elements/ELEMENTS_DATA";
import type { TierId } from "@/data/tiers/TIERS_DATA";

export const isArtifactVisible = ({ is_hidden }: Pick<Artifact, "is_hidden">) =>
	import.meta.env.VITE_NODE_ENV === "development" || !is_hidden;

export const FUSION_LEVELS = [1, 2, 3, 4, 5] as const;

export const ARTIFACT_CATALOG_SORTS = {
	NAME_ASC: "name-asc",
	NAME_DESC: "name-desc",
	TIER_ASC: "tier-asc",
	TIER_DESC: "tier-desc",
} as const;

export type ArtifactCatalogSort =
	(typeof ARTIFACT_CATALOG_SORTS)[keyof typeof ARTIFACT_CATALOG_SORTS];

export type ArtifactFilters = {
	search: string;
	selectedElements: ElementId[];
	selectedCharacterClass: CharacterClassId[];
	selectedTiers: TierId[];
};

export const emptyArtifactFilters = (): ArtifactFilters => ({
	search: "",
	selectedElements: [],
	selectedCharacterClass: [],
	selectedTiers: [],
});

export const filterArtifacts = (
	artifacts: readonly Artifact[],
	filters: Partial<ArtifactFilters>,
) => {
	const search = filters.search?.trim().toLowerCase();
	return artifacts.filter(
		(a) =>
			isArtifactVisible(a) &&
			(!search || a.name.toLowerCase().includes(search)) &&
			(!filters.selectedTiers?.length ||
				filters.selectedTiers.includes(a.tier_id)) &&
			(!filters.selectedCharacterClass?.length ||
				filters.selectedCharacterClass.includes(a.class_id)) &&
			(!filters.selectedElements?.length ||
				(a.element_effect_id != null &&
					filters.selectedElements.includes(a.element_effect_id))),
	);
};

/** Stable catalog ordering shared by artifact lists and pickers. */
export const compareArtifacts = (a: Artifact, b: Artifact) =>
	b.tier_id - a.tier_id || a.name.localeCompare(b.name) || a.id - b.id;

export const sortArtifacts = (
	artifacts: readonly Artifact[],
	sort: ArtifactCatalogSort = ARTIFACT_CATALOG_SORTS.TIER_DESC,
) =>
	[...artifacts].sort((a, b) => {
		const nameOrder = a.name.localeCompare(b.name) || a.id - b.id;
		if (sort === ARTIFACT_CATALOG_SORTS.NAME_ASC) return nameOrder;
		if (sort === ARTIFACT_CATALOG_SORTS.NAME_DESC)
			return -a.name.localeCompare(b.name) || a.id - b.id;
		const tierOrder = a.tier_id - b.tier_id;
		return (
			(sort === ARTIFACT_CATALOG_SORTS.TIER_ASC ? tierOrder : -tierOrder) ||
			nameOrder
		);
	});

export const compareOwnedArtifacts = (
	a: { artifact: Artifact; fusionLevel: number; id: string },
	b: { artifact: Artifact; fusionLevel: number; id: string },
) =>
	compareArtifacts(a.artifact, b.artifact) ||
	a.fusionLevel - b.fusionLevel ||
	a.id.localeCompare(b.id);
