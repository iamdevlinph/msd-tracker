import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { CharId } from "@/data/characters/CHARACTERS_DATA";
import type { EquipmentId } from "@/data/equipment/EQUIPMENT_DATA";
import type { StoreState } from "@/stores/app-store";

export type EquipmentIds = [
	EquipmentId | null,
	EquipmentId | null,
	EquipmentId | null,
	EquipmentId | null,
];

const normalizeEquipmentIds = (ids: unknown): EquipmentIds =>
	Array.from({ length: 4 }, (_, index) => {
		const id = Array.isArray(ids) ? ids[index] : null;
		return typeof id === "number" ? id : null;
	}) as EquipmentIds;

export type LoadoutCharacterSlot = {
	characterId: CharId | null;
	monsterlingIds: [string | null, string | null, string | null];
	legendaryMonsterlingId?: string | null;
	artifactInstanceId: string | null;
	equipment_ids?: EquipmentIds;
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
	equipment_ids: [null, null, null, null],
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
					equipment_ids: normalizeEquipmentIds(slot.equipment_ids),
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
