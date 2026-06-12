import { create } from "zustand";
import type { CompletedFilter } from "@/components/monster-codex/components/codex-filter";
import {
	MONSTERLINGS_DATA,
	type MonsterCodexData,
} from "@/data/MONSTERLINGS_DATA";
import {
	SOURCE_ID_BY_SOURCE,
	type SourceId,
} from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION, type RegionId } from "@/data/REGIONS_DATA";
import { useAppStore } from "@/stores/app-store";

const initialState = {
	monsterlings: {},
	// cachedResults: {},
	filters: {
		source: 0 as SourceId,
		region: 0 as RegionId,
		completed: "all" as CompletedFilter,
		search: "",
	},
};

export type MonsterCodexStoreState = {
	monsterlings: MonsterCodexData;
	// cachedResults: Record<string, unknown>;

	filterCodex: (filter?: MonsterCodexStoreState["filters"]) => void;

	filters: {
		source?: SourceId;
		region?: RegionId;
		completed?: CompletedFilter;
		search?: string;
	};
};

export const useMonsterCodexFilterStore = create<MonsterCodexStoreState>()(
	(set) => ({
		...initialState,

		filterCodex: (filter) =>
			set((state) => {
				const nextFilter = {
					...state.filters,
					...filter,
				};

				const { region, source, completed } = nextFilter;

				// const cacheKey = `filter-${region}-${source}`;
				// const cached = get().cachedResults[cacheKey];
				// if (cached) {
				// 	return {
				// 		monsterlings: JSON.parse(cached as string),
				// 	};
				// }

				const completedSet = new Set(
					useAppStore.getState().monsterCodexCompleted,
				);

				const search = nextFilter.search?.trim().toLowerCase();

				// const filtered = Object.values(MONSTERLINGS_DATA).filter(
				// 	(monsterling) => {
				// 		if (search && !monsterling.name.toLowerCase().includes(search)) {
				// 			return false;
				// 		}

				// 		if (
				// 			region !== undefined &&
				// 			region !== REGION_ID_BY_REGION.ALL &&
				// 			monsterling.region_id !== region
				// 		) {
				// 			return false;
				// 		}

				// 		if (
				// 			source !== undefined &&
				// 			source !== SOURCE_ID_BY_SOURCE.ALL &&
				// 			!monsterling.source_id.includes(source)
				// 		) {
				// 			return false;
				// 		}

				// 		const isCompleted = completedSet.has(monsterling.id);

				// 		if (completed === "completed" && !isCompleted) {
				// 			return false;
				// 		}

				// 		if (completed === "incomplete" && isCompleted) {
				// 			return false;
				// 		}

				// 		return true;
				// 	},
				// );

				const filtered = Object.fromEntries(
					Object.entries(MONSTERLINGS_DATA).filter(([_, monsterling]) => {
						if (search && !monsterling.name.toLowerCase().includes(search)) {
							return false;
						}

						if (
							region !== undefined &&
							region !== REGION_ID_BY_REGION.ALL &&
							monsterling.region_id !== region
						) {
							return false;
						}

						if (
							source !== undefined &&
							source !== SOURCE_ID_BY_SOURCE.ALL &&
							!monsterling.source_id.includes(source)
						) {
							return false;
						}

						const isCompleted = completedSet.has(monsterling.id);

						if (completed === "completed" && !isCompleted) {
							return false;
						}

						if (completed === "incomplete" && isCompleted) {
							return false;
						}

						return true;
					}),
				);

				return {
					monsterlings: filtered,
					filters: nextFilter,
					// cachedResults: {
					// 	...state.cachedResults,
					// 	[cacheKey]: JSON.stringify(filtered),
					// },
				};
			}),
	}),
);
