import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { normalizeChecklistPersistedState } from "@/components/checklist/utils/checklist-persistence";
import { consolidateMonsterlingLinkChainLevels } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import {
	type ArtifactsOwnedSlice,
	createArtifactsOwnedSlice,
} from "@/stores/artifacts-owned-slice";
import {
	type CharactersOwnedSlice,
	createCharactersOwnedSlice,
} from "@/stores/characters-owned-slice";
import {
	type ChecklistSlice,
	createChecklistSlice,
} from "@/stores/checklist-slice";
import {
	type CompletedCodexSlice,
	createMonsterCodexSlice,
} from "@/stores/completed-monster-codex-slice";
import {
	createLoadoutSnapshotsSlice,
	type LoadoutSnapshotsSlice,
	normalizeLoadoutSnapshots,
} from "@/stores/loadout-snapshots-slice";
import {
	createLoadoutsSlice,
	type LoadoutsSlice,
	normalizeLoadouts,
} from "@/stores/loadouts-slice";
import {
	createMonsterlingsSlice,
	type MonsterlingsSlice,
	normalizeMonsterlingLinkChainPinnedIds,
} from "@/stores/monsterlings-slice";

export type StoreState = {
	logout: () => void;

	backupUpdatedAt: number;
	syncInProgress: boolean;
	setSyncInProgress: (flag: boolean) => void;
	syncConflict: {
		local: {
			updatedAt: number;
			size: number;
			metadata: {
				charactersOwned: number;
				monsterlingsOwned: number;
				loadouts: number;
				snapshots?: number;
				codexCompleted: number;
				codexFavorites: number;
				linkChainsUpgraded: number;
				linkChainsPinned?: number;
				checklistTasks?: number;
				checklistCompletions?: number;
				artifactsOwned?: number;
			};
		};
		remote: {
			updatedAt: number;
			size: number;
			metadata: {
				charactersOwned: number;
				monsterlingsOwned: number;
				loadouts: number;
				snapshots?: number;
				codexCompleted: number;
				codexFavorites: number;
				linkChainsUpgraded: number;
				linkChainsPinned?: number;
				checklistTasks?: number;
				checklistCompletions?: number;
				artifactsOwned?: number;
			};
		};
	} | null;
	setSyncConflict: (c: StoreState["syncConflict"]) => void;

	isHydrated: boolean;
	setHasHydrated: (flag: boolean) => void;
} & CompletedCodexSlice &
	CharactersOwnedSlice &
	MonsterlingsSlice &
	LoadoutsSlice &
	ChecklistSlice &
	ArtifactsOwnedSlice &
	LoadoutSnapshotsSlice;

const initialState = {
	backupUpdatedAt: Date.now(),
	syncInProgress: false,
	syncConflict: null,
	isHydrated: false,
};

export const migrateAppStore = (persistedState: unknown) => {
	const state = persistedState as Partial<StoreState>;
	return {
		...state,
		loadouts: normalizeLoadouts(state.loadouts),
		loadoutSnapshots: normalizeLoadoutSnapshots(state.loadoutSnapshots),
		artifactsOwned: state.artifactsOwned ?? {},
		...normalizeChecklistPersistedState(state),
		...consolidateMonsterlingLinkChainLevels(
			state.monsterlingsOwned as Parameters<
				typeof consolidateMonsterlingLinkChainLevels
			>[0],
			state.monsterlingLinkChainLevels,
		),
		monsterlingLinkChainPinnedIds: normalizeMonsterlingLinkChainPinnedIds(
			state.monsterlingLinkChainPinnedIds,
		),
	};
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
				...createMonsterlingsSlice(set, get, api),
				...createLoadoutsSlice(set, get, api),
				...createLoadoutSnapshotsSlice(set, get, api),
				...createChecklistSlice(set, get, api),
				...createArtifactsOwnedSlice(set, get, api),
			}),
			{
				name: "msd-tracker",
				version: 4,
				migrate: migrateAppStore,
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
