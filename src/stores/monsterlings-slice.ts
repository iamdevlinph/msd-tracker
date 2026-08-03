import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import {
	LINK_CHAIN_LEVELS,
	type LinkChainLevel,
	type MonsterlingLinkChainLevels,
} from "@/components/monsterlings/components/monsterling-link-chain-utils";
import type { CharId } from "@/data/characters/CHARACTERS_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import type { StoreState } from "@/stores/app-store";

export type MonsterlingsSlice = {
	monsterlingsOwned: Record<string, MonsterlingOwned & { usedBy?: CharId[] }>;
	monsterlingLinkChainLevels: MonsterlingLinkChainLevels;
	monsterlingLinkChainPinnedIds: number[];

	setMonsterlingOwned: (
		monsterling: MonsterlingOwned,
		id: string | undefined,
	) => void;
	setMonsterlingLinkChainLevel: (id: number, level: LinkChainLevel) => void;
	setMonsterlingLinkChainPinned: (id: number, isPinned: boolean) => void;
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
		monsterlingLinkChainPinnedIds: [],

		setMonsterlingOwned: (monsterling, id) =>
			set((state) => {
				const monsterlingOwnedId = id ?? nanoid();
				return {
					monsterlingsOwned: {
						...state.monsterlingsOwned,
						[monsterlingOwnedId]: monsterling,
					},
					backupUpdatedAt: Date.now(),
				};
			}),

		setMonsterlingLinkChainLevel: (id, level) =>
			set((state) => {
				if (
					!MONSTERLINGS_DATA[id]?.linkChain ||
					!LINK_CHAIN_LEVELS.includes(level)
				) {
					return state;
				}
				const levels = { ...state.monsterlingLinkChainLevels };
				if (level === 1) delete levels[id];
				else levels[id] = level;
				return {
					monsterlingLinkChainLevels: levels,
					backupUpdatedAt: Date.now(),
				};
			}),

		setMonsterlingLinkChainPinned: (id, isPinned) =>
			set((state) => {
				if (!MONSTERLINGS_DATA[id]?.linkChain) return state;
				const pins = state.monsterlingLinkChainPinnedIds.filter(
					(pinnedId) => pinnedId !== id,
				);
				if (isPinned) pins.push(id);
				return {
					monsterlingLinkChainPinnedIds: pins,
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

export const normalizeMonsterlingLinkChainPinnedIds = (value: unknown) =>
	Array.isArray(value)
		? [...new Set(value)].filter(
				(id): id is number =>
					typeof id === "number" && Boolean(MONSTERLINGS_DATA[id]?.linkChain),
			)
		: [];
