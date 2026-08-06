import toast from "react-hot-toast";
import { driveFetch } from "@/components/account/google/utils/drive-client";
import { normalizeChecklistPersistedState } from "@/components/checklist/utils/checklist-persistence";
import { consolidateMonsterlingLinkChainLevels } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { G_ACCESS_TOKEN_SESSION } from "@/constants";
import { type StoreState, useAppStore } from "@/stores/app-store";
import { normalizeLoadoutSnapshots } from "@/stores/loadout-snapshots-slice";
import { normalizeLoadouts } from "@/stores/loadouts-slice";
import { normalizeMonsterlingLinkChainPinnedIds } from "@/stores/monsterlings-slice";

const FILE_NAME = "state.json";

let fileId: string | null = null;
let debounce: number | undefined;
let unsubscribeAutoSync: (() => void) | null = null;
let uploadController: AbortController | null = null;
let initPromise: Promise<void> | null = null;
let nextOperationId = 0;
const activeOperations = new Set<number>();
let suppressAutoSync = false;
let isInitialized = false;
let pendingRemoteBackup: Backup | null = null;
let syncGeneration = 0;

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
	| "loadoutSnapshots"
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
		loadoutSnapshots: state.loadoutSnapshots,
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

	assertResponseOk(res, "finding remote file");
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

	assertResponseOk(res, "creating remote file");
	const json = await res.json();
	if (!json.id) throw new Error("Google Drive did not return a file ID");
	return json.id as string;
}

function assertResponseOk(response: Response, operation: string) {
	if (response.ok === false) throw new Error(`Failed ${operation}`);
}

function readRecordField<T>(
	backup: Record<string, unknown>,
	field: string,
	fallback: T,
): T {
	const value = backup[field];
	if (value === undefined) return fallback;
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`Google Drive backup has an invalid ${field} field`);
	}
	return value as T;
}

function readArrayField<T>(
	backup: Record<string, unknown>,
	field: string,
	fallback: T,
): T {
	const value = backup[field];
	if (value === undefined) return fallback;
	if (!Array.isArray(value)) {
		throw new Error(`Google Drive backup has an invalid ${field} field`);
	}
	return value as T;
}

function beginOperation() {
	const operationId = ++nextOperationId;
	activeOperations.add(operationId);
	useAppStore.getState().setSyncInProgress(true);
	return operationId;
}

function endOperation(operationId: number) {
	activeOperations.delete(operationId);
	if (activeOperations.size === 0)
		useAppStore.getState().setSyncInProgress(false);
}

export async function download(): Promise<Backup | null> {
	let operationId: number | undefined;
	try {
		if (!fileId) return null;
		operationId = beginOperation();

		const res = await driveFetch(
			`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
		);

		assertResponseOk(res, "downloading remote file");
		const backup = (await res.json()) as Record<string, unknown>;
		if (
			!backup ||
			typeof backup !== "object" ||
			Array.isArray(backup) ||
			!Number.isFinite(backup.backupUpdatedAt)
		) {
			throw new Error("Google Drive returned an invalid backup");
		}
		const charactersOwned = readRecordField<Backup["charactersOwned"]>(
			backup,
			"charactersOwned",
			{},
		);
		const monsterlingsOwned = readRecordField<Backup["monsterlingsOwned"]>(
			backup,
			"monsterlingsOwned",
			{},
		);
		const monsterlingLinkChainLevels = readRecordField<
			Backup["monsterlingLinkChainLevels"] | undefined
		>(backup, "monsterlingLinkChainLevels", undefined);
		const checklistState = normalizeChecklistPersistedState({
			checklistTasks: readRecordField(backup, "checklistTasks", {}),
			checklistCompletions: readRecordField(backup, "checklistCompletions", {}),
			checklistPermanentNotes: readRecordField(
				backup,
				"checklistPermanentNotes",
				{},
			),
			checklistPreferences: readRecordField(backup, "checklistPreferences", {}),
		});

		return {
			backupUpdatedAt: backup.backupUpdatedAt as number,
			monsterCodexCompleted: readArrayField(
				backup,
				"monsterCodexCompleted",
				[],
			),
			monsterCodexFavorites: readArrayField(
				backup,
				"monsterCodexFavorites",
				[],
			),
			charactersOwned,
			...consolidateMonsterlingLinkChainLevels(
				monsterlingsOwned,
				monsterlingLinkChainLevels,
			),
			monsterlingLinkChainPinnedIds: normalizeMonsterlingLinkChainPinnedIds(
				readArrayField(backup, "monsterlingLinkChainPinnedIds", []),
			),
			loadouts: normalizeLoadouts(readRecordField(backup, "loadouts", {})),
			loadoutSnapshots: normalizeLoadoutSnapshots(
				readRecordField(backup, "loadoutSnapshots", {}),
			),
			...checklistState,
			artifactsOwned: readRecordField(backup, "artifactsOwned", {}),
		};
	} catch (e) {
		toast.error(
			`Something went wrong downloading remote file\n\n${(e as Error).message}`,
		);

		return null;
	} finally {
		if (operationId !== undefined) endOperation(operationId);
	}
}

export async function upload(data: Backup, signal?: AbortSignal) {
	if (!fileId) throw new Error("Google Drive file ID is unavailable");
	const operationId = beginOperation();
	try {
		const res = await driveFetch(
			`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
				signal,
			},
		);
		assertResponseOk(res, "uploading remote file");
	} catch (e) {
		if ((e as DOMException).name === "AbortError") {
			return;
		}

		toast.error(
			`Something went wrong uploading file\n\n${(e as Error).message}`,
		);

		throw e;
	} finally {
		endOperation(operationId);
	}
}

export async function initSync() {
	if (isInitialized) return;
	if (initPromise) return initPromise;
	const generation = syncGeneration;
	const currentInitPromise = runInitSync(generation);
	initPromise = currentInitPromise;
	try {
		await currentInitPromise;
	} finally {
		if (initPromise === currentInitPromise) initPromise = null;
	}
}

async function waitForHydration() {
	if (useAppStore.getState().isHydrated || useAppStore.persist.hasHydrated())
		return;
	await new Promise<void>((resolve) => {
		const unsubscribe = useAppStore.subscribe((state) => {
			if (state.isHydrated || useAppStore.persist.hasHydrated()) {
				unsubscribe();
				resolve();
			}
		});
	});
}

function ensureCurrentGeneration(generation: number) {
	if (generation !== syncGeneration)
		throw new DOMException("Sync stopped", "AbortError");
}

async function runInitSync(generation: number) {
	toast("Initializing data");
	await waitForHydration();
	ensureCurrentGeneration(generation);
	cancelPendingUpload();
	const operationId = beginOperation();

	try {
		const existing = await findFile();
		ensureCurrentGeneration(generation);

		if (!existing) {
			const createdBackup = select(useAppStore.getState());
			const createdFileId = await createFile(createdBackup);
			ensureCurrentGeneration(generation);
			fileId = createdFileId;
			setupAutoSync();
			const latestBackup = select(useAppStore.getState());
			if (latestBackup.backupUpdatedAt !== createdBackup.backupUpdatedAt) {
				await upload(latestBackup);
			}
			ensureCurrentGeneration(generation);
			isInitialized = true;
			return;
		}

		if (!existing.id) throw new Error("Google Drive file is missing its ID");
		fileId = existing.id;

		const remote = await download();
		ensureCurrentGeneration(generation);
		if (!remote) throw new Error("Unable to download the Google Drive backup");
		const local = useAppStore.getState();
		if (remote && remote.backupUpdatedAt !== local.backupUpdatedAt) {
			pendingRemoteBackup = remote;
			cancelPendingUpload();
			useAppStore.setState({
				syncConflict: {
					local: {
						updatedAt: local.backupUpdatedAt,
						size: getSize(select(local)),
						metadata: {
							charactersOwned: Object.keys(local.charactersOwned).length,
							monsterlingsOwned: Object.keys(local.monsterlingsOwned).length,
							loadouts: Object.keys(local.loadouts).length,
							snapshots: Object.keys(local.loadoutSnapshots).length,
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
							snapshots: Object.keys(remote.loadoutSnapshots ?? {}).length,
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
			pendingRemoteBackup = null;
			useAppStore.getState().setSyncConflict(null);
			await upload(select(local));
		}

		ensureCurrentGeneration(generation);
		setupAutoSync();
		isInitialized = true;
	} catch (e) {
		if ((e as DOMException).name === "AbortError") return;
		toast.error(
			`Something went wrong with initializing data\n\n${(e as Error).message}`,
		);
	} finally {
		endOperation(operationId);
	}
}

function setupAutoSync() {
	if (unsubscribeAutoSync) return;
	const unsubscribe = useAppStore.subscribe(
		(state) => state.backupUpdatedAt,
		(newValue, prevValue) => {
			if (useAppStore.getState().syncConflict) {
				cancelPendingUpload();
				return;
			}
			if (suppressAutoSync) return;
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

			if (debounce !== undefined) window.clearTimeout(debounce);

			debounce = window.setTimeout(async () => {
				toast("Sync start");
				const controller = new AbortController();
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
					if (uploadController === controller) uploadController = null;
				}
			}, 2000);
		},
	);

	unsubscribeAutoSync = unsubscribe;
	return unsubscribe;
}

export function cancelPendingUpload() {
	if (debounce !== undefined) {
		window.clearTimeout(debounce);
		debounce = undefined;
	}
	uploadController?.abort();
	uploadController = null;
}

export function teardownSync() {
	syncGeneration += 1;
	cancelPendingUpload();
	unsubscribeAutoSync?.();
	unsubscribeAutoSync = null;
	initPromise = null;
	isInitialized = false;
	pendingRemoteBackup = null;
	fileId = null;
	activeOperations.clear();
	useAppStore.setState({ syncInProgress: false, syncConflict: null });
}

export async function resolveSyncConflict(choice: "local" | "remote") {
	if (!useAppStore.getState().syncConflict) {
		throw new Error("There is no sync conflict to resolve");
	}

	cancelPendingUpload();
	if (choice === "local") {
		await upload(select(useAppStore.getState()));
		useAppStore.getState().setSyncConflict(null);
		pendingRemoteBackup = null;
		return;
	}

	if (!pendingRemoteBackup) {
		throw new Error("The remote backup is no longer available; refresh sync");
	}

	suppressAutoSync = true;
	try {
		useAppStore.setState({ ...pendingRemoteBackup, syncConflict: null });
		pendingRemoteBackup = null;
	} finally {
		suppressAutoSync = false;
	}
}

function getSize(obj: unknown) {
	return new Blob([JSON.stringify(obj)]).size;
}
