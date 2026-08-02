import type { Artifact } from "@/data/artifacts/ARTIFACTS_DATA";
import type { CharacterClassId } from "@/data/character-classes/CHARACTER_CLASS_DATA";
import type { ElementId } from "@/data/elements/ELEMENTS_DATA";
import type { TierId } from "@/data/tiers/TIERS_DATA";

export const FUSION_LEVELS = [1, 2, 3, 4, 5] as const;

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
	artifacts: Artifact[],
	filters: Partial<ArtifactFilters>,
) => {
	const search = filters.search?.trim().toLowerCase();
	return artifacts.filter(
		(a) =>
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

export const sortArtifacts = (artifacts: Artifact[]) =>
	[...artifacts].sort(compareArtifacts);

export const compareOwnedArtifacts = (
	a: { artifact: Artifact; fusionLevel: number; id: string },
	b: { artifact: Artifact; fusionLevel: number; id: string },
) =>
	compareArtifacts(a.artifact, b.artifact) ||
	a.fusionLevel - b.fusionLevel ||
	a.id.localeCompare(b.id);
