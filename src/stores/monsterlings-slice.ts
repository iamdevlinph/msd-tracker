import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import type { StoreState } from "@/stores/app-store";

export type MonsterlingsSlice = {
	monsterlingsOwned: Record<string, MonsterlingOwned>;

	setMonsterlingOwned: (monsterling: MonsterlingOwned, id?: string) => void;
	deleteMonsterlingOwned: (id: string) => void;

	resetMonsterlingSlice: () => void;
};

export const createMonsterlingsSlice: StateCreator<
	StoreState,
	[],
	[],
	MonsterlingsSlice
> = (set) => {
	return {
		monsterlingsOwned: {},

		setMonsterlingOwned: (monsterling, id) =>
			set((state) => {
				const monsterlingOwnedId = id ?? nanoid();
				return {
					monsterlingsOwned: {
						...state.monsterlingsOwned,
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

		resetMonsterlingSlice: () =>
			set({
				monsterlingsOwned: {},
				backupUpdatedAt: Date.now(),
			}),
	};
};
