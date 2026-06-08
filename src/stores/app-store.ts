import { arrayRemoveItem } from "common-utils-pkg";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

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

	monsterCodexCompleted: number[];
	setMonsterCodexComplete: (id: number) => void;
	deleteMonsterCodexComplete: (id: number) => void;

	resetStore: () => void;
};

const initialState = {
	backupUpdatedAt: Date.now(),
	syncInProgress: false,
	syncConflict: null,
	isHydrated: false,

	monsterCodexCompleted: [],
};

export const useStore = create<StoreState>()(
	subscribeWithSelector(
		persist(
			(set) => ({
				...initialState,

				logout: () => set({ ...initialState }),

				setSyncInProgress: (flag) => set({ syncInProgress: flag }),

				setHasHydrated: (state) => set({ isHydrated: state }),

				setSyncConflict: (conflict) => set({ syncConflict: conflict }),

				setMonsterCodexComplete: (id) =>
					set((state) => {
						return {
							monsterCodexCompleted: [...state.monsterCodexCompleted, id],
						};
					}),

				deleteMonsterCodexComplete: (id) =>
					set((state) => {
						const newArr = arrayRemoveItem(state.monsterCodexCompleted, id);
						return {
							monsterCodexCompleted: newArr,
						};
					}),

				resetStore: () => set({ monsterCodexCompleted: [] }),
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
