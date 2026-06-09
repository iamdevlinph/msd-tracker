import { arrayRemoveItem } from "common-utils-pkg";
import type { StateCreator } from "zustand";
import type { StoreState } from "@/stores/app-store";

export type CompletedCodexSlice = {
	monsterCodexCompleted: number[];
	setMonsterCodexComplete: (id: number) => void;
	deleteMonsterCodexComplete: (id: number) => void;
};

export const createMonsterCodexSlice: StateCreator<
	StoreState,
	[],
	[],
	CompletedCodexSlice
> = (set) => ({
	monsterCodexCompleted: [],

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
});
