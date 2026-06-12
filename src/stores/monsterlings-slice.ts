import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import type { StoreState } from "@/stores/app-store";

export type MonsterlingsSlice = {
	monsterlingsOwned: Record<string, MonsterlingOwned>;

	setMonsterlingOwned: (monsterling: MonsterlingOwned, id?: string) => void;
	deleteMonsterlingOwned: (id: string) => void;
};

export const createMonsterlingsSlice: StateCreator<
	StoreState,
	[],
	[],
	MonsterlingsSlice
> = (set) => ({
	monsterlingsOwned: {},

	setMonsterlingOwned: (monsterling, id) =>
		set((state) => {
			const monsterlingOwnedId = id ?? nanoid();
			return {
				monsterlings: {
					...state.charactersOwned,
					[monsterlingOwnedId]: {
						...monsterling,
					},
				},
				backupUpdatedAt: Date.now(),
			};
		}),

	deleteMonsterlingOwned: (id) =>
		set((state) => {
			const { [id]: _toDelete, ...rest } = state.monsterlingsOwned;
			return {
				monsterlingsOwned: { ...rest },
				backupUpdatedAt: Date.now(),
			};
		}),
});
