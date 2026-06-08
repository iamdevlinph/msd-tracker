import { create } from "zustand";
import { MONSTERLINGS_DATA } from "@/components/monster-codex/data/MONSTERLINGS_DATA";
import { MONSTERLINGS_SOURCE_DATA } from "@/components/monster-codex/data/MONSTERLINGS_SOURCE_DATA";
import { REGIONS_DATA } from "@/components/monster-codex/data/REGIONS_DATA";
import type {
	CompletedFilter,
	MonsterCodexRegion,
	MonsterCodexSource,
} from "@/components/monster-codex/store/monster-codex-constants";
import { useStore } from "@/stores/app-store";

const initialState = {
	monsterlings: [],
	// cachedResults: {},
	filters: {
		source: "all" as MonsterCodexSource,
		region: "all" as MonsterCodexRegion,
		completed: "all" as CompletedFilter,
	},
};

export type MonsterCodexStoreState = {
	monsterlings: typeof MONSTERLINGS_DATA;
	// cachedResults: Record<string, unknown>;

	// filterBySource: (filter: {
	// 	source?: MonsterCodexSource;
	// 	region?: MonsterCodexRegions;
	// 	completed?: CompletedFilter;
	// }) => void;

	filterCodex: (filter?: MonsterCodexStoreState["filters"]) => void;

	filters: {
		source?: MonsterCodexSource;
		region?: MonsterCodexRegion;
		completed?: CompletedFilter;
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

			const filtered = MONSTERLINGS_DATA.filter((monsterling) => {
				if (nextFilter.region === "all") return true;

				// filter by region
				const region = Object.values(REGIONS_DATA).filter(
					(value) => nextFilter.region === value.region,
				);
				return monsterling.region_id === region[0].id;
			})
				.filter((monsterling) => {
					if (nextFilter.source === "all") return true;

					// filter by source
					const source = Object.values(MONSTERLINGS_SOURCE_DATA).filter(
						(value) => nextFilter.source === value.source,
					);
					return monsterling.source_id.includes(source[0].id);
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
}));
