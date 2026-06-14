import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SelectOption } from "@/constants";
import { STAT_DATA } from "@/data/STAT_DATA";

const STAT_OPTIONS_VERSION = "1.1.0";
export const STAT_OPTIONS_CACHE = "stat-options-cache";

const initialState = {
	statOptions: [],
	version: STAT_OPTIONS_VERSION,
};

export type StatOptionsStore = {
	statOptions: SelectOption[];
	version: string;
	getStatOptions: () => SelectOption[];
};

export const useStatOptionStore = create<StatOptionsStore>()(
	persist(
		(set, get) => ({
			...initialState,

			getStatOptions: () => {
				const state = get();

				if (
					state.statOptions.length > 0 &&
					state.version === STAT_OPTIONS_VERSION
				) {
					return state.statOptions;
				}

				const options = buildOptions();

				set({
					statOptions: options,
					version: STAT_OPTIONS_VERSION,
				});

				return options;
			},
		}),
		{
			name: STAT_OPTIONS_CACHE,
		},
	),
);

function buildOptions(): SelectOption[] {
	return Object.entries(STAT_DATA).map(([key, val]) => ({
		label: val.stat,
		value: key,
	}));
}
