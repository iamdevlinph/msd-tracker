import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { CharId } from "@/data/CHARACTERS_DATA";
import type { StoreState } from "@/stores/app-store";

export type LoadoutCharacterSlot = {
	characterId: CharId | null;
	monsterlingIds: [string | null, string | null, string | null];
};

export type LoadoutOwned = {
	id: string;
	name: string;
	characters: [
		LoadoutCharacterSlot,
		LoadoutCharacterSlot,
		LoadoutCharacterSlot,
	];
};

export type LoadoutsSlice = {
	loadouts: Record<string, LoadoutOwned>;

	setLoadout: (loadout: Omit<LoadoutOwned, "id">, id?: string) => void;
	deleteLoadout: (id: string) => void;
	resetLoadoutsSlice: () => void;
};

export const emptyLoadoutCharacterSlot = (): LoadoutCharacterSlot => ({
	characterId: null,
	monsterlingIds: [null, null, null],
});

export const createLoadoutsSlice: StateCreator<
	StoreState,
	[],
	[],
	LoadoutsSlice
> = (set) => ({
	loadouts: {},

	setLoadout: (loadout, id) =>
		set((state) => {
			const loadoutId = id ?? nanoid();

			return {
				loadouts: {
					...state.loadouts,
					[loadoutId]: {
						id: loadoutId,
						...loadout,
					},
				},
				backupUpdatedAt: Date.now(),
			};
		}),

	deleteLoadout: (id) =>
		set((state) => {
			const { [id]: _toDelete, ...rest } = state.loadouts;

			return {
				loadouts: { ...rest },
				backupUpdatedAt: Date.now(),
			};
		}),

	resetLoadoutsSlice: () =>
		set({
			loadouts: {},
			backupUpdatedAt: Date.now(),
		}),
});
