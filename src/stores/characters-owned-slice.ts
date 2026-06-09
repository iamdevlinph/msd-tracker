import type { StateCreator } from "zustand";
import type { Character } from "@/data/CHARACTERS_DATA";
import type { StoreState } from "@/stores/app-store";

type CharacterOwned = {
	awakening: number;
	skills: {
		basic: number;
		switch: number;
		special: number;
		ultimate: number;
	};
} & Character;

export type CharactersOwnedSlice = {
	charactersOwned: CharacterOwned[];

	setCharacterOwned: (character: Character) => void;
	resetCharacterSlice: () => void;
};

export const createCharactersOwnedSlice: StateCreator<
	StoreState,
	[],
	[],
	CharactersOwnedSlice
> = (set) => ({
	charactersOwned: [],

	setCharacterOwned: (character) =>
		set((state) => {
			const tempCharacterOwn: CharacterOwned = {
				...character,
				awakening: 0,
				skills: {
					basic: 1,
					switch: 1,
					special: 1,
					ultimate: 1,
				},
			};
			return {
				charactersOwned: [...state.charactersOwned, tempCharacterOwn],
				backupUpdatedAt: Date.now(),
			};
		}),

	resetCharacterSlice: () =>
		set({ charactersOwned: [], backupUpdatedAt: Date.now() }),
});
