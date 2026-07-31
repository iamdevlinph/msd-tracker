import { create } from "zustand";
import type { LinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";

export type LinkChainsFilters = {
	search: string;
	selectedLevels: LinkChainLevel[];
};
export const emptyLinkChainsFilters = (): LinkChainsFilters => ({
	search: "",
	selectedLevels: [],
});
export const useLinkChainsFilter = create<{
	filters: LinkChainsFilters;
	setFilters: (filters: LinkChainsFilters) => void;
}>()((set) => ({
	filters: emptyLinkChainsFilters(),
	setFilters: (filters) => set({ filters }),
}));
