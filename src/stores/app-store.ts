import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import {
	type CharactersOwnedSlice,
	createCharactersOwnedSlice,
} from "@/stores/characters-owned-slice";
import {
	type CompletedCodexSlice,
	createMonsterCodexSlice,
} from "@/stores/completed-codex-slice";

export type StoreState = {
	logout: () => void;

	backupUpdatedAt: number;
	syncInProgress: boolean;
	setSyncInProgress: (flag: boolean) => void;
	syncConflict: {
		local: {
			updatedAt: number;
			size: number;
		};
		remote: {
			updatedAt: number;
			size: number;
		};
	} | null;
	setSyncConflict: (c: StoreState["syncConflict"]) => void;

	isHydrated: boolean;
	setHasHydrated: (flag: boolean) => void;

	resetStore: () => void;
} & CompletedCodexSlice &
	CharactersOwnedSlice;

const initialState = {
	backupUpdatedAt: Date.now(),
	syncInProgress: false,
	syncConflict: null,
	isHydrated: false,
};

export const useAppStore = create<StoreState>()(
	subscribeWithSelector(
		persist(
			(set, get, api) => ({
				...initialState,

				logout: () => set({ ...initialState }),

				setSyncInProgress: (flag) => set({ syncInProgress: flag }),

				setHasHydrated: (state) => set({ isHydrated: state }),

				setSyncConflict: (conflict) => set({ syncConflict: conflict }),

				...createMonsterCodexSlice(set, get, api),
				...createCharactersOwnedSlice(set, get, api),

				resetStore: () =>
					set({ monsterCodexCompleted: [], backupUpdatedAt: Date.now() }),
			}),
			{
				name: "msd-tracker",
				onRehydrateStorage: (_state) => {
					// NOTE: In the `google-section.tsx` I get hydration error
					// when setting `disabled={!authenticatedGithub}` for the Login with Google button
					console.log("Hydration started");

					// 2. Return a callback function
					// This inner function executes immediately AFTER hydration finishes
					return (hydratedState, error) => {
						if (!error && hydratedState) {
							// Option A: Call an action function defined on your store
							hydratedState.setHasHydrated(true);
							console.log("Hydration completed");

							// Option B: If you passed 'set' into your config, you can use it directly:
							// set({ hasHydrated: true })
						}
					};
				},
			},
		),
	),
);
