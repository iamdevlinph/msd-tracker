import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SelectOption } from "@/constants";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";

const VERSION = "1.1.0";

const initialState = {
	monsterlingOptions: [],
	version: VERSION,
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

				if (state.monsterlingOptions.length > 0 && state.version === VERSION) {
					return state.monsterlingOptions;
				}

				const options = buildOptions();

				set({
					monsterlingOptions: options,
					version: VERSION,
				});

				return options;
			},
		}),
		{
			name: "monster-options-cache",
		},
	),
);

function buildOptions(): SelectOption[] {
	return Object.entries(MONSTERLINGS_DATA).map(([key, val]) => ({
		label: val.name,
		value: key,
	}));
}
