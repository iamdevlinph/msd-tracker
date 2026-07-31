import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { CharId } from "@/data/characters/CHARACTERS_DATA";
import type { StoreState } from "@/stores/app-store";

export type LoadoutCharacterSlot = {
	characterId: CharId | null;
	monsterlingIds: [string | null, string | null, string | null];
	legendaryMonsterlingId?: string | null;
	artifactInstanceId: string | null;
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
	legendaryMonsterlingId: null,
	artifactInstanceId: null,
});

export const normalizeLoadouts = (
	loadouts: unknown,
): Record<string, LoadoutOwned> => {
	if (!loadouts || typeof loadouts !== "object") return {};
	return Object.fromEntries(
		Object.entries(loadouts as Record<string, Partial<LoadoutOwned>>).flatMap(
			([id, loadout]) => {
				if (!loadout || !Array.isArray(loadout.characters)) return [];
				const characters = loadout.characters.map((slot) => ({
					characterId: slot.characterId ?? null,
					monsterlingIds: [...(slot.monsterlingIds ?? [null, null, null])],
					legendaryMonsterlingId: slot.legendaryMonsterlingId ?? null,
					artifactInstanceId: slot.artifactInstanceId ?? null,
				})) as LoadoutOwned["characters"];
				return [[id, { id, name: loadout.name ?? "Loadout", characters }]];
			},
		),
	);
};

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
