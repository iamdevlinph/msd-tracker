import { create } from "zustand";
import {
	SOURCE_ID_BY_SOURCE,
	type SourceId,
} from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION, type RegionId } from "@/data/REGIONS_DATA";

export const CODEX_VIEWS = [
	"favorite",
	"all",
	"completed",
	"incomplete",
] as const;
export type CodexView = (typeof CODEX_VIEWS)[number];

export type CodexFilters = {
	source: SourceId;
	region: RegionId;
	view: CodexView;
	search: string;
};

export const initialCodexFilters: CodexFilters = {
	source: SOURCE_ID_BY_SOURCE.ALL,
	region: REGION_ID_BY_REGION.ALL,
	view: "favorite",
	search: "",
};

export type CodexStoreState = {
	filters: CodexFilters;
	setCodexFilters: (filters: Partial<CodexFilters>) => void;
	resetCodexFilters: () => void;
};

export const useCodexStore = create<CodexStoreState>()((set) => ({
	filters: initialCodexFilters,
	setCodexFilters: (filters) =>
		set((state) => ({ filters: { ...state.filters, ...filters } })),
	resetCodexFilters: () => set({ filters: initialCodexFilters }),
}));
