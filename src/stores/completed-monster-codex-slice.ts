import { arrayRemoveItem } from "common-utils-pkg";
import type { StateCreator } from "zustand";
import type { StoreState } from "@/stores/app-store";
import { nextBackupUpdatedAt } from "@/stores/backup-timestamp";

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
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),

	deleteMonsterCodexComplete: (id) =>
		set((state) => {
			const newArr = arrayRemoveItem(state.monsterCodexCompleted, id);
			return {
				monsterCodexCompleted: newArr,
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),

	toggleMonsterCodexFavorite: (id) =>
		set((state) => ({
			monsterCodexFavorites: state.monsterCodexFavorites.includes(id)
				? arrayRemoveItem(state.monsterCodexFavorites, id)
				: [...state.monsterCodexFavorites, id],
			backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
		})),

	resetCodexStore: () =>
		set((state) => ({
			monsterCodexCompleted: [],
			monsterCodexFavorites: [],
			backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
		})),
});
