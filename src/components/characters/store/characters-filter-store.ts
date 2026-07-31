import { create } from "zustand";
import type { CharacterClassId } from "@/data/character-classes/CHARACTER_CLASS_DATA";
import type { ElementId } from "@/data/elements/ELEMENTS_DATA";
import type { TierId } from "@/data/tiers/TIERS_DATA";

export type CharacterStoreState = {
	characterFilters: CharacterFilters;

	setCharacaterFilters: (filters: CharacterFilters) => void;
};

export const CHARACTER_SORTS = {
	NAME_ASC: "name-asc",
	NAME_DESC: "name-desc",
	AWAKENING_ASC: "awakening-asc",
	AWAKENING_DESC: "awakening-desc",
} as const;

export type CharacterSort =
	(typeof CHARACTER_SORTS)[keyof typeof CHARACTER_SORTS];

export type CharacterFilters = {
	search: string;
	selectedCharacterClass: CharacterClassId[];
	selectedElements: ElementId[];
	selectedTiers: TierId[];
	sort: CharacterSort;
};

export const emptyCharacterFilters = (): CharacterFilters => ({
	search: "",
	selectedCharacterClass: [],
	selectedElements: [],
	selectedTiers: [],
	sort: CHARACTER_SORTS.NAME_ASC,
});

export const initialCharacterState: Pick<
	CharacterStoreState,
	"characterFilters"
> = {
	characterFilters: emptyCharacterFilters(),
};

export const useCharacterFilter = create<CharacterStoreState>()((set) => ({
	...initialCharacterState,

	setCharacaterFilters: (filter) =>
		set((state) => ({
			characterFilters: {
				...state.characterFilters,
				...filter,
			},
		})),
}));
