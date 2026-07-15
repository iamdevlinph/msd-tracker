import { create } from "zustand";
import type { TierId } from "@/data/TIERS_DATA";

export type MonsterlingFilters = {
	search: string;
	selectedTiers: TierId[];
};

export const emptyMonsterlingFilters = (): MonsterlingFilters => ({
	search: "",
	selectedTiers: [],
});

export const useMonsterlingFilter = create<{
	filters: MonsterlingFilters;
	setFilters: (filters: MonsterlingFilters) => void;
}>()((set) => ({
	filters: emptyMonsterlingFilters(),
	setFilters: (filters) => set({ filters }),
}));
