import toast from "react-hot-toast";
import { driveFetch } from "@/components/account/google/utils/drive-client";
import { normalizeChecklistPersistedState } from "@/components/checklist/utils/checklist-persistence";
import { consolidateMonsterlingLinkChainLevels } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { G_ACCESS_TOKEN_SESSION } from "@/constants";
import { type StoreState, useAppStore } from "@/stores/app-store";
import { normalizeLoadouts } from "@/stores/loadouts-slice";
import { normalizeMonsterlingLinkChainPinnedIds } from "@/stores/monsterlings-slice";

const FILE_NAME = "state.json";

let fileId: string | null = null;
let debounce: number;

type Backup = Pick<
	StoreState,
	| "backupUpdatedAt"
	| "monsterCodexCompleted"
	| "monsterCodexFavorites"
	| "charactersOwned"
	| "monsterlingsOwned"
	| "monsterlingLinkChainLevels"
	| "monsterlingLinkChainPinnedIds"
	| "loadouts"
	| "checklistTasks"
	| "checklistCompletions"
	| "checklistPermanentNotes"
	| "checklistPreferences"
	| "artifactsOwned"
>;

export function select(state: StoreState): Backup {
	const consolidatedMonsterlingState = consolidateMonsterlingLinkChainLevels(
		state.monsterlingsOwned,
		state.monsterlingLinkChainLevels,
	);
	return {
		backupUpdatedAt: state.backupUpdatedAt,
		monsterCodexCompleted: state.monsterCodexCompleted,
		monsterCodexFavorites: state.monsterCodexFavorites,
		charactersOwned: state.charactersOwned,
		...consolidatedMonsterlingState,
		monsterlingLinkChainPinnedIds: normalizeMonsterlingLinkChainPinnedIds(
			state.monsterlingLinkChainPinnedIds,
		),
		loadouts: state.loadouts,
		checklistTasks: state.checklistTasks,
		checklistCompletions: state.checklistCompletions,
		checklistPermanentNotes: state.checklistPermanentNotes,
		checklistPreferences: state.checklistPreferences,
		artifactsOwned: state.artifactsOwned,
	};
}

async function findFile() {
	const res = await driveFetch(
		"https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&fields=files(id,name)",
	);

	const json = await res.json();
	return json.files?.find((f: File) => f.name === FILE_NAME);
}

async function createFile(data: Backup) {
	const form = new FormData();

	form.append(
		"metadata",
		new Blob(
			[JSON.stringify({ name: FILE_NAME, parents: ["appDataFolder"] })],
			{ type: "application/json" },
		),
	);

	form.append(
		"file",
		new Blob([JSON.stringify(data)], {
			type: "application/json",
		}),
	);

	const res = await driveFetch(
		"https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
		{ method: "POST", body: form },
	);

	const json = await res.json();
	fileId = json.id;
}

export async function download(): Promise<Backup | null> {
	try {
		if (!fileId) return null;
		useAppStore.getState().setSyncInProgress(true);

		const res = await driveFetch(
			`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
		);

		const backup = (await res.json()) as Omit<
			Backup,
			| "monsterCodexFavorites"
			| "monsterlingLinkChainLevels"
			| "monsterlingLinkChainPinnedIds"
		> &
			Partial<
				Pick<
					Backup,
					| "monsterCodexFavorites"
					| "monsterlingLinkChainLevels"
					| "monsterlingLinkChainPinnedIds"
				>
			>;

		return {
			...backup,
			loadouts: normalizeLoadouts(backup.loadouts),
			...normalizeChecklistPersistedState(backup),
			...consolidateMonsterlingLinkChainLevels(
				backup.monsterlingsOwned ?? {},
				backup.monsterlingLinkChainLevels,
			),
			monsterCodexFavorites: backup.monsterCodexFavorites ?? [],
			monsterlingLinkChainPinnedIds: normalizeMonsterlingLinkChainPinnedIds(
				backup.monsterlingLinkChainPinnedIds,
			),
			artifactsOwned: backup.artifactsOwned ?? {},
		};
	} catch (e) {
		toast.error(
			`Something went wrong downloading remote file\n\n${(e as Error).message}`,
		);

		return null;
	} finally {
		useAppStore.getState().setSyncInProgress(false);
	}
}

export async function upload(data: Backup, signal?: AbortSignal) {
	try {
		if (!fileId) return;

		useAppStore.getState().setSyncInProgress(true);

		await driveFetch(
			`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
				signal,
			},
		);
	} catch (e) {
		if ((e as DOMException).name === "AbortError") {
			return;
		}

		toast.error(
			`Something went wrong uploading file\n\n${(e as Error).message}`,
		);

		throw e;
	} finally {
		useAppStore.getState().setSyncInProgress(false);
	}
}

export async function initSync() {
	toast("Initializing data");

	useAppStore.getState().setSyncInProgress(true);

	try {
		// existing logic
		const local = useAppStore.getState();

		const existing = await findFile();

		if (!existing) {
			await createFile(select(local));
			setupAutoSync();
			return;
		}

		fileId = existing.id;

		const remote = await download();
		if (remote && remote.backupUpdatedAt !== local.backupUpdatedAt) {
			useAppStore.setState({
				syncConflict: {
					local: {
						updatedAt: local.backupUpdatedAt,
						size: getSize(local),
						metadata: {
							charactersOwned: Object.keys(local.charactersOwned).length,
							monsterlingsOwned: Object.keys(local.monsterlingsOwned).length,
							loadouts: Object.keys(local.loadouts).length,
							codexCompleted: local.monsterCodexCompleted.length,
							codexFavorites: local.monsterCodexFavorites.length,
							linkChainsUpgraded: Object.keys(local.monsterlingLinkChainLevels)
								.length,
							linkChainsPinned: local.monsterlingLinkChainPinnedIds.length,
							checklistTasks: Object.keys(local.checklistTasks).length,
							checklistCompletions: Object.keys(local.checklistCompletions)
								.length,
							artifactsOwned: Object.keys(local.artifactsOwned).length,
						},
					},
					remote: {
						updatedAt: remote.backupUpdatedAt,
						size: getSize(remote),
						metadata: {
							charactersOwned: Object.keys(remote.charactersOwned).length,
							monsterlingsOwned: Object.keys(remote.monsterlingsOwned).length,
							loadouts: Object.keys(remote.loadouts ?? {}).length,
							codexCompleted: remote.monsterCodexCompleted.length,
							codexFavorites: remote.monsterCodexFavorites.length,
							linkChainsUpgraded: Object.keys(
								remote.monsterlingLinkChainLevels ?? {},
							).length,
							linkChainsPinned: (remote.monsterlingLinkChainPinnedIds ?? [])
								.length,
							checklistTasks: Object.keys(remote.checklistTasks ?? {}).length,
							checklistCompletions: Object.keys(
								remote.checklistCompletions ?? {},
							).length,
							artifactsOwned: Object.keys(remote.artifactsOwned ?? {}).length,
						},
					},
				},
			});
		} else {
			await upload(select(local));
		}

		setupAutoSync();
	} catch (e) {
		toast.error(
			`Something went wrong with initializing data\n\n${(e as Error).message}`,
		);
	} finally {
		useAppStore.getState().setSyncInProgress(false);
	}
}

let uploadController: AbortController | null = null;

function setupAutoSync() {
	const unsubscribe = useAppStore.subscribe(
		(state) => state.backupUpdatedAt,
		(newValue, prevValue) => {
			// if not logged in with google skip sync
			const accessToken = sessionStorage.getItem(G_ACCESS_TOKEN_SESSION);

			if (!accessToken) {
				// return toast.error("Not logged in to Google", {
				// 	description: "Cannot sync since you are not logged in to Google",
				// });
				console.error("Not logged in to Google", {
					description: "Cannot sync since you are not logged in to Google",
				});

				return;
			}

			if (newValue === prevValue) return;

			clearTimeout(debounce);

			debounce = window.setTimeout(async () => {
				toast("Sync start");
				const controller = new AbortController();
				useAppStore.getState().setSyncInProgress(true);

				uploadController?.abort();
				uploadController = controller;

				try {
					const data = select(useAppStore.getState());
					await upload(data, controller.signal);

					if (!controller.signal.aborted) {
						toast.success("Sync success");
					}
				} catch (e) {
					if ((e as DOMException).name !== "AbortError") {
						toast.error(`Sync failed\n\n${(e as Error).message}`);
					}
				} finally {
					if (uploadController === controller) {
						useAppStore.getState().setSyncInProgress(false);
					}
				}
			}, 2000);
		},
	);

	return unsubscribe;
}

function getSize(obj: unknown) {
	return new Blob([JSON.stringify(obj)]).size;
}
