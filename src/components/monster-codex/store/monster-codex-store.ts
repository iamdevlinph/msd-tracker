import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MonsterCodexRegions } from "@/components/monster-codex/components/regions";
import { MONSTERLINGS_LIST } from "@/components/monster-codex/data/MONSTERLINGS_LIST";
import { REGIONS_DATA } from "@/components/monster-codex/data/REGIONS_DATA";
import { SOURCE_MAPPING } from "@/components/monster-codex/data/SOURCE_MAPPING";
import type {
	CompletedFilter,
	MonsterCodexSource,
} from "@/components/monster-codex/store/monster-codex-constants";
import { useStore } from "@/stores/app-store";

const initialState = {
	monsterlings: [],
	// cachedResults: {},
	filters: {
		source: "all" as MonsterCodexSource,
		region: "elendor" as MonsterCodexRegions,
		completed: "all" as CompletedFilter,
	},
};

export type MonsterCodexStoreState = {
	monsterlings: typeof MONSTERLINGS_LIST;
	// cachedResults: Record<string, unknown>;

	// filterBySource: (filter: {
	// 	source?: MonsterCodexSource;
	// 	region?: MonsterCodexRegions;
	// 	completed?: CompletedFilter;
	// }) => void;

	filterCodex: (filter?: MonsterCodexStoreState["filters"]) => void;

	filters: {
		source?: MonsterCodexSource;
		region?: MonsterCodexRegions;
		completed?: CompletedFilter;
	};
};

export const useMonsterCodexStore = create<MonsterCodexStoreState>()(
	persist(
		(set, get) => ({
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
			// 		monsterlings: MONSTERLINGS_LIST,
			// 		cachedResults: {
			// 			...state.cachedResults,
			// 			[cacheKey]: JSON.stringify(MONSTERLINGS_LIST),
			// 		},
			// 	};
			// }

			// const sourceObj = SOURCE_MAPPING.filter(
			// 	(value) => value.source === filter.source,
			// );

			// const data = MONSTERLINGS_LIST.filter(
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

					const filtered = MONSTERLINGS_LIST.filter((monsterling) => {
						// filter by region
						const region = REGIONS_DATA.filter(
							(value) => nextFilter.region === value.region,
						);
						return monsterling.region_id === region[0].id;
					})
						.filter((monsterling) => {
							if (nextFilter.source === "all") return true;

							// filter by source
							const source = SOURCE_MAPPING.filter(
								(value) => nextFilter.source === value.source,
							);
							return monsterling.source_id === source[0].id;
						})
						.filter((monsterling) => {
							if (nextFilter.completed === "all" || !nextFilter.completed)
								return true;

							// filter by completed
							const monsterCodexCompleted =
								useStore.getState().monsterCodexCompleted;

							const isComplete =
								nextFilter.completed === "completed" &&
								monsterCodexCompleted.includes(monsterling.id);

							const isIncomplete =
								nextFilter.completed === "incomplete" &&
								!monsterCodexCompleted.includes(monsterling.id);

							const match = isComplete || isIncomplete;

							return match;
						});

					return {
						monsterlings: filtered,
						filters: nextFilter,
					};
				}),
		}),
		{
			name: "monster-codex-beta-v2",
		},
	),
);
