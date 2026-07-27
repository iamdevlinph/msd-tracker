import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import {
	getLinkChainLevelOrOne,
	type LinkChainLevel,
	type MonsterlingLinkChainLevels,
} from "@/components/monsterlings/components/monsterling-link-chain-utils";
import type { CharId } from "@/data/CHARACTERS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import type { StoreState } from "@/stores/app-store";

export type MonsterlingsSlice = {
	monsterlingsOwned: Record<string, MonsterlingOwned & { usedBy?: CharId[] }>;
	monsterlingLinkChainLevels: MonsterlingLinkChainLevels;

	setMonsterlingOwned: (
		monsterling: MonsterlingOwned,
		id: string | undefined,
		linkChainLevel: LinkChainLevel,
	) => void;
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
		monsterlingLinkChainLevels: {},

		setMonsterlingOwned: (monsterling, id, linkChainLevel) =>
			set((state) => {
				const monsterlingOwnedId = id ?? nanoid();
				const info = MONSTERLINGS_DATA[monsterling.monsterling_id];
				const nextLevel = getLinkChainLevelOrOne(linkChainLevel);
				const levels = { ...state.monsterlingLinkChainLevels };
				if (!info?.linkChain) {
					delete levels[monsterling.monsterling_id];
				} else if (nextLevel === 1) {
					delete levels[monsterling.monsterling_id];
				} else {
					levels[monsterling.monsterling_id] = nextLevel;
				}
				return {
					monsterlingsOwned: {
						...state.monsterlingsOwned,
						[monsterlingOwnedId]: monsterling,
					},
					monsterlingLinkChainLevels: levels,
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
