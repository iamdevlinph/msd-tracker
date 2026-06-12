import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { StatId } from "@/data/STAT_DATA";
import type { TierId } from "@/data/TIERS_DATA";
import type { StoreState } from "@/stores/app-store";

export type MonsterlingOwned = {
	monsterling_id: number;
	tier_id: TierId;
	traits: { tier_id: TierId; stat_id: StatId }[];
};

export type MonsterlingsSlice = {
	monsterlingsOwned: Record<string, MonsterlingOwned>;

	setMonsterlingOwned: (monsterling: MonsterlingOwned) => void;
	deleteMonsterlingOwned: (id: string) => void;
};

export const createMonsterlingsSlice: StateCreator<
	StoreState,
	[],
	[],
	MonsterlingsSlice
> = (set) => ({
	monsterlingsOwned: {},

	setMonsterlingOwned: (monsterling) =>
		set((state) => {
			const id = nanoid();
			return {
				monsterlings: {
					...state.charactersOwned,
					[id]: {
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
