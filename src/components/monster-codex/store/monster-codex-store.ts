import { create } from "zustand";

import type { CompletedFilter } from "@/components/monster-codex/store/monster-codex-constants";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import {
	SOURCE_ID_BY_SOURCE,
	type SourceId,
} from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION, type RegionId } from "@/data/REGIONS_DATA";
import { useStore } from "@/stores/app-store";

const initialState = {
	monsterlings: [],
	// cachedResults: {},
	filters: {
		source: 0 as SourceId,
		region: 0 as RegionId,
		completed: "all" as CompletedFilter,
		search: "",
	},
};

export type MonsterCodexStoreState = {
	monsterlings: typeof MONSTERLINGS_DATA;
	// cachedResults: Record<string, unknown>;

	// filterBySource: (filter: {
	// 	source?: SourceId;
	// 	region?: MonsterCodexRegions;
	// 	completed?: CompletedFilter;
	// }) => void;

	filterCodex: (filter?: MonsterCodexStoreState["filters"]) => void;

	filters: {
		source?: SourceId;
		region?: RegionId;
		completed?: CompletedFilter;
		search?: string;
	};
};

export const useMonsterCodexStore = create<MonsterCodexStoreState>()((set) => ({
	...initialState,

	// filterBySource: (filter) =>
	// 	set((state) => {
	// const cacheKey = `filterBySource-${filter.source}`;

	// const cached = get().cachedResults[cacheKey];
	// if (cached)
	// 	return {
	// 		monsterlings: JSON.parse(cached as string),
	// 	};

	// if (filter.source === "all") {
	// 	return {
	// 		monsterlings: MONSTERLINGS_DATA,
	// 		cachedResults: {
	// 			...state.cachedResults,
	// 			[cacheKey]: JSON.stringify(MONSTERLINGS_DATA),
	// 		},
	// 	};
	// }

	// const sourceObj = MONSTERLINGS_SOURCE_DATA.filter(
	// 	(value) => value.source === filter.source,
	// );

	// const data = MONSTERLINGS_DATA.filter(
	// 	(vlaue) => vlaue.source_id === sourceObj[0].id,
	// );

	// return {
	// 	monsterlings: data,
	// 	cachedResults: {
	// 		...state.cachedResults,
	// 		[cacheKey]: JSON.stringify(data),
	// 	},
	// };

	// 	return state;
	// }),

	filterCodex: (filter) =>
		set((state) => {
			const nextFilter = {
				...state.filters,
				...filter,
			};

			const completedSet = new Set(useStore.getState().monsterCodexCompleted);

			const search = nextFilter.search?.trim().toLowerCase();

			const filtered = MONSTERLINGS_DATA.filter((monsterling) => {
				if (search && !monsterling.name.toLowerCase().includes(search)) {
					return false;
				}

				if (
					nextFilter.region !== undefined &&
					nextFilter.region !== REGION_ID_BY_REGION.ALL &&
					monsterling.region_id !== nextFilter.region
				) {
					return false;
				}

				if (
					nextFilter.source !== undefined &&
					nextFilter.source !== SOURCE_ID_BY_SOURCE.ALL &&
					!monsterling.source_id.includes(nextFilter.source)
				) {
					return false;
				}

				const isCompleted = completedSet.has(monsterling.id);

				if (nextFilter.completed === "completed" && !isCompleted) {
					return false;
				}

				if (nextFilter.completed === "incomplete" && isCompleted) {
					return false;
				}

				return true;
			});

			return {
				monsterlings: filtered,
				filters: nextFilter,
			};
		}),
}));
