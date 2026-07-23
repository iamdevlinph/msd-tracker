import { create } from "zustand";
import type { CharacterClassId } from "@/data/CHARACTER_CLASS_DATA";
import type { ElementId } from "@/data/ELEMENTS_DATA";
import type { TierId } from "@/data/TIERS_DATA";

export type CharacterStoreState = {
	characterFilters: CharacterFilters;

	setCharacaterFilters: (filters: CharacterFilters) => void;
};

export type CharacterSort =
	| "name-asc"
	| "name-desc"
	| "awakening-asc"
	| "awakening-desc";

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
	sort: "name-asc",
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
