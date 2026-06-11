import type { StateCreator } from "zustand";
import type { Character } from "@/data/CHARACTERS_DATA";
import type { StoreState } from "@/stores/app-store";

export type CharacterOwned = {
	awakening: number;
	skills: {
		basic: number;
		switch: number;
		special: number;
		ultimate: number;
	};
	id: Character["id"];
};

export type CharactersOwnedSlice = {
	charactersOwned: Record<number, CharacterOwned>;

	setCharacterOwned: (character: CharacterOwned) => void;
	resetCharacterSlice: () => void;
};

export const createCharactersOwnedSlice: StateCreator<
	StoreState,
	[],
	[],
	CharactersOwnedSlice
> = (set) => ({
	charactersOwned: [],

	setCharacterOwned: ({ id, ...rest }) =>
		set((state) => {
			const tempCharacterOwn: CharacterOwned = {
				id: id,
				...rest,
			};
			return {
				charactersOwned: { ...state.charactersOwned, [id]: tempCharacterOwn },
				backupUpdatedAt: Date.now(),
			};
		}),

	resetCharacterSlice: () =>
		set({ charactersOwned: [], backupUpdatedAt: Date.now() }),
});
