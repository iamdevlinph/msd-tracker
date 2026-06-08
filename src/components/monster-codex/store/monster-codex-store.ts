import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MonsterCodexRegions } from "@/components/monster-codex/components/regions";
import { MONSTERLINGS_LIST } from "@/components/monster-codex/data/MONSTERLINGS_LIST";
import { SOURCE_MAPPING } from "@/components/monster-codex/data/SOURCE_MAPPING";
import type { MonsterCodexSource } from "@/components/monster-codex/store/monster-codex-constants";

const initialState = {
	monsterlings: [],
	cachedResults: {},
};

export type MonsterCodexStoreState = {
	monsterlings: typeof MONSTERLINGS_LIST;
	cachedResults: Record<string, unknown>;

	filterBySource: (filter: {
		source?: MonsterCodexSource;
		region?: MonsterCodexRegions;
	}) => void;
};

export const useMonsterCodexStore = create<MonsterCodexStoreState>()(
	persist(
		(set, get) => ({
			...initialState,

			filterBySource: (filter) =>
				set((state) => {
					const cacheKey = `filterBySource-${filter.source}`;

					const cached = get().cachedResults[cacheKey];
					if (cached)
						return {
							monsterlings: JSON.parse(cached as string),
						};

					if (filter.source === "all") {
						return {
							monsterlings: MONSTERLINGS_LIST,
							cachedResults: {
								...state.cachedResults,
								[cacheKey]: JSON.stringify(MONSTERLINGS_LIST),
							},
						};
					}

					const sourceObj = SOURCE_MAPPING.filter(
						(value) => value.source === filter.source,
					);

					const data = MONSTERLINGS_LIST.filter(
						(vlaue) => vlaue.source_id === sourceObj[0].id,
					);

					return {
						monsterlings: data,
						cachedResults: {
							...state.cachedResults,
							[cacheKey]: JSON.stringify(data),
						},
					};
				}),
		}),
		{
			name: "monster-codex-beta-v2",
		},
	),
);
