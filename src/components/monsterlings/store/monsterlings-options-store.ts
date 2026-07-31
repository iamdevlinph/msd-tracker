import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SelectOption } from "@/constants";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";

const MONSTERLING_OPTIONS_VERSION = "1.2.0";
export const MONSTERLING_OPTIONS_CACHE = "monster-options-cache";

const initialState = {
	monsterlingOptions: [],
	version: MONSTERLING_OPTIONS_VERSION,
};

export type MonsterlingsOptionsStore = {
	monsterlingOptions: SelectOption[];
	version: string;
	getMonsterlingOptions: () => SelectOption[];
};

export const useMonsterOptionStore = create<MonsterlingsOptionsStore>()(
	persist(
		(set, get) => ({
			...initialState,

			getMonsterlingOptions: () => {
				const state = get();

				if (
					state.monsterlingOptions.length > 0 &&
					state.version === MONSTERLING_OPTIONS_VERSION
				) {
					return state.monsterlingOptions;
				}

				const options = buildOptions();

				set({
					monsterlingOptions: options,
					version: MONSTERLING_OPTIONS_VERSION,
				});

				return options;
			},
		}),
		{
			name: MONSTERLING_OPTIONS_CACHE,
		},
	),
);

function buildOptions(): SelectOption[] {
	return Object.entries(MONSTERLINGS_DATA).map(([key, val]) => ({
		label: val.name,
		value: key,
	}));
}
