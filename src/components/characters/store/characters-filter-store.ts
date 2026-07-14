import { create } from "zustand";
import type { CharacterClassId } from "@/data/CHARACTER_CLASS_DATA";
import type { ElementId } from "@/data/ELEMENTS_DATA";

export type CharacterStoreState = {
	characterFilters: CharacterFilters;

	setCharacaterFilters: (filters: CharacterFilters) => void;
};

export type CharacterFilters = {
	search: string;
	selectedCharacterClass: CharacterClassId[];
	selectedElements: ElementId[];
};

export const emptyCharacterFilters = (): CharacterFilters => ({
	search: "",
	selectedCharacterClass: [],
	selectedElements: [],
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
