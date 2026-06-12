import type { StateCreator } from "zustand";
import type { CharacterOwnedDetails } from "@/components/characters/components/character-details-form";
import type { StoreState } from "@/stores/app-store";

export type CharactersOwnedSlice = {
	charactersOwned: Record<number, CharacterOwnedDetails>;

	setCharacterOwned: (character: CharacterOwnedDetails) => void;
	deleteCharacterOwned: (id: number) => void;
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
			const tempCharacterOwn: CharacterOwnedDetails = {
				id: id,
				...rest,
			};
			return {
				charactersOwned: { ...state.charactersOwned, [id]: tempCharacterOwn },
				backupUpdatedAt: Date.now(),
			};
		}),

	deleteCharacterOwned: (id) =>
		set((state) => {
			const { [id]: _toDelete, ...rest } = state.charactersOwned;
			return {
				charactersOwned: { ...rest },
				backupUpdatedAt: Date.now(),
			};
		}),

	resetCharacterSlice: () =>
		set({ charactersOwned: [], backupUpdatedAt: Date.now() }),
});
