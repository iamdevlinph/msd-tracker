import { arrayRemoveItem } from "common-utils-pkg";
import type { StateCreator } from "zustand";
import type { StoreState } from "@/stores/app-store";

export type CompletedCodexSlice = {
	monsterCodexCompleted: number[];
	monsterCodexFavorites: number[];
	setMonsterCodexComplete: (id: number) => void;
	deleteMonsterCodexComplete: (id: number) => void;
	toggleMonsterCodexFavorite: (id: number) => void;

	resetCodexStore: () => void;
};

export const createMonsterCodexSlice: StateCreator<
	StoreState,
	[],
	[],
	CompletedCodexSlice
> = (set) => ({
	monsterCodexCompleted: [],
	monsterCodexFavorites: [],

	setMonsterCodexComplete: (id) =>
		set((state) => {
			return {
				monsterCodexCompleted: [...state.monsterCodexCompleted, id],
				backupUpdatedAt: Date.now(),
			};
		}),

	deleteMonsterCodexComplete: (id) =>
		set((state) => {
			const newArr = arrayRemoveItem(state.monsterCodexCompleted, id);
			return {
				monsterCodexCompleted: newArr,
				backupUpdatedAt: Date.now(),
			};
		}),

	toggleMonsterCodexFavorite: (id) =>
		set((state) => ({
			monsterCodexFavorites: state.monsterCodexFavorites.includes(id)
				? arrayRemoveItem(state.monsterCodexFavorites, id)
				: [...state.monsterCodexFavorites, id],
			backupUpdatedAt: Date.now(),
		})),

	resetCodexStore: () =>
		set({
			monsterCodexCompleted: [],
			monsterCodexFavorites: [],
			backupUpdatedAt: Date.now(),
		}),
});
