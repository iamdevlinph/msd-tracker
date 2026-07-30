import type { Artifact } from "@/data/ARTIFACTS_DATA";
import type { CharacterClassId } from "@/data/CHARACTER_CLASS_DATA";
import type { ElementId } from "@/data/ELEMENTS_DATA";
import type { TierId } from "@/data/TIERS_DATA";

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
