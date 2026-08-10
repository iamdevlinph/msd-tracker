import type { StateCreator } from "zustand";
import type { CharacterOwned } from "@/components/characters/components/character-details-form";
import type { StoreState } from "@/stores/app-store";
import { nextBackupUpdatedAt } from "@/stores/backup-timestamp";

export type CharactersOwnedSlice = {
	charactersOwned: Record<number, CharacterOwned>;

	setCharacterOwned: (character: CharacterOwned) => void;
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
			const tempCharacterOwn: CharacterOwned = {
				id: id,
				...rest,
			};
			return {
				charactersOwned: { ...state.charactersOwned, [id]: tempCharacterOwn },
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),

	deleteCharacterOwned: (id) =>
		set((state) => {
			const { [id]: _toDelete, ...rest } = state.charactersOwned;
			return {
				charactersOwned: { ...rest },
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),

	resetCharacterSlice: () =>
		set((state) => ({
			charactersOwned: [],
			backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
		})),
});
