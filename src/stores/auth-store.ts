import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import type { GetIssuesFnType } from "@/actions/get-issues.functions";
import type { GetRepositoriesFnType } from "@/actions/get-repositories.functions";
import { getRepoFromURL } from "@/lib/get-repo-from-url";
import { trimDownIssue } from "@/lib/trim-down-issue-obj";

export type AuthState = {
	authenticatedGithub: boolean;
	githubLogin: string | null;
	installationId: number | null;

	pinnedRepos: {
		all: GetRepositoriesFnType["full_name"][];
		byName: Record<
			string,
			{
				name: GetRepositoriesFnType["full_name"];
				issueIds: number[];
			}
		>;
	};
	pinnedIssues: {
		all: GetIssuesFnType["id"][];
		byId: Record<string, GetIssuesFnType>;
	};

	setAuth: (login: string, installationId: number) => void;
	pinIssue: (issue: GetIssuesFnType) => void;
	unpinIssue: (issueId: number) => void;
	logout: () => void;
	updatePinnedIssue: (issue: GetIssuesFnType) => void;

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
	setSyncConflict: (c: AuthState["syncConflict"]) => void;

	isHydrated: boolean;
	setHasHydrated: (flag: boolean) => void;
};

const initialState = {
	authenticatedGithub: false,
	githubLogin: null,
	installationId: null,
	pinnedRepos: { all: [], byName: {} },
	pinnedIssues: { all: [], byId: {} },
	backupUpdatedAt: Date.now(),
	syncInProgress: false,
	syncConflict: null,
	isHydrated: false,
};

export const useAuthStore = create<AuthState>()(
	subscribeWithSelector(
		persist(
			(set) => ({
				...initialState,

				setAuth: (login, installationId) =>
					set({
						authenticatedGithub: true,
						githubLogin: login,
						installationId,
					}),

				pinIssue: (issue) =>
					set((state) => {
						const { fullRepoName } = getRepoFromURL(issue.repository_url);
						const repo = state.pinnedRepos.byName[fullRepoName];
						const repoExists = !!repo;
						const issueExists = !!state.pinnedIssues.byId[issue.id];

						// already checked in the add-issue-url
						// maybe just remove
						const issueAlreadyInRepo = repoExists
							? repo.issueIds.includes(issue.id)
							: false;

						return {
							backupUpdatedAt: Date.now(),
							pinnedIssues: {
								all: issueExists
									? state.pinnedIssues.all
									: [...state.pinnedIssues.all, issue.id],
								byId: {
									...state.pinnedIssues.byId,
									[issue.id]: { ...trimDownIssue(issue) },
								},
							},
							pinnedRepos: {
								all: repoExists
									? state.pinnedRepos.all
									: [...state.pinnedRepos.all, fullRepoName],
								byName: {
									...state.pinnedRepos.byName,
									[fullRepoName]: {
										name: fullRepoName,
										issueIds: repoExists
											? issueAlreadyInRepo
												? repo.issueIds
												: [...repo.issueIds, issue.id]
											: [issue.id],
									},
								},
							},
						};
					}),

				unpinIssue: (issueId) =>
					set((state) => {
						const issue = state.pinnedIssues.byId[issueId];

						if (!issue) {
							return state;
						}

						const { fullRepoName } = getRepoFromURL(issue.repository_url);
						const repo = state.pinnedRepos.byName[fullRepoName];
						const nextIssueIds = repo.issueIds.filter((id) => id !== issueId);

						const nextRepos = {
							...state.pinnedRepos.byName,
						};

						const nextRepoAll = state.pinnedRepos.all.filter(
							(name) => name !== fullRepoName,
						);

						// remove empty repo
						if (nextIssueIds.length === 0) {
							delete nextRepos[fullRepoName];
						} else {
							nextRepos[fullRepoName] = {
								name: fullRepoName,

								issueIds: nextIssueIds,
							};
						}

						const nextIssues = {
							...state.pinnedIssues.byId,
						};

						delete nextIssues[issueId];

						return {
							backupUpdatedAt: Date.now(),
							pinnedIssues: {
								all: state.pinnedIssues.all.filter((id) => id !== issueId),
								byId: nextIssues,
							},
							pinnedRepos: {
								all:
									nextIssueIds.length === 0
										? nextRepoAll
										: state.pinnedRepos.all,
								byName: nextRepos,
							},
						};
					}),

				logout: () => set({ ...initialState }),

				updatePinnedIssue: (issue) =>
					set((state) => {
						const id = issue.id;
						return {
							backupUpdatedAt: Date.now(),
							pinnedIssues: {
								...state.pinnedIssues,
								byId: {
									...state.pinnedIssues.byId,
									[id]: {
										...state.pinnedIssues.byId[id],
										...trimDownIssue(issue),
									},
								},
							},
						};
					}),

				setSyncInProgress: (flag) => set({ syncInProgress: flag }),

				setHasHydrated: (state) => set({ isHydrated: state }),

				setSyncConflict: (conflict) => set({ syncConflict: conflict }),
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
