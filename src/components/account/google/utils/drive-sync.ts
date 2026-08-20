import toast from "react-hot-toast";
import {
	driveFetch,
	refreshGoogleAccessToken,
} from "@/components/account/google/utils/drive-client";
import { normalizeChecklistPersistedState } from "@/components/checklist/utils/checklist-persistence";
import { consolidateMonsterlingLinkChainLevels } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { type StoreState, useAppStore } from "@/stores/app-store";
import { normalizeLoadoutSnapshots } from "@/stores/loadout-snapshots-slice";
import {
	normalizeLoadoutCardPreferences,
	normalizeLoadouts,
} from "@/stores/loadouts-slice";
import { normalizeMonsterlingLinkChainPinnedIds } from "@/stores/monsterlings-slice";

const FILE_NAME = "state.json";

let fileId: string | null = null;
let unsubscribeAutoSync: (() => void) | null = null;
let uploadController: AbortController | null = null;
let activeUploadPromise: Promise<void> | null = null;
let initPromise: Promise<void> | null = null;
let initPromiseGeneration = -1;
let nextOperationId = 0;
const activeOperations = new Set<number>();
let suppressAutoSync = false;
let isInitialized = false;
let pendingRemoteBackup: Backup | null = null;
let syncGeneration = 0;
let initController: AbortController | null = null;
let isCreatingFile = false;
let queuedUpload: Backup | null = null;
let queuedUploadKind: "background" | "conflict-local" = "background";
let uploadQueuePromise: Promise<void> | null = null;
let lastUploadError: unknown = null;
let lastFailureNotice = "";
let manualRetryController: AbortController | null = null;
const SYNC_TOAST_ID = "google-drive-sync";

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
	| "loadoutCardPreferences"
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
		loadoutCardPreferences: normalizeLoadoutCardPreferences(
			state.loadoutCardPreferences,
		),
		loadoutSnapshots: state.loadoutSnapshots,
		checklistTasks: state.checklistTasks,
		checklistCompletions: state.checklistCompletions,
		checklistPermanentNotes: state.checklistPermanentNotes,
		checklistPreferences: state.checklistPreferences,
		artifactsOwned: state.artifactsOwned,
	};
}

async function findFile(signal?: AbortSignal) {
	const res = await driveFetch(
		"https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&fields=files(id,name)",
		{ signal },
	);

	assertResponseOk(res, "finding remote file");
	const json = await res.json();
	return json.files?.find((f: File) => f.name === FILE_NAME);
}

async function createFile(data: Backup, signal?: AbortSignal) {
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
		{ method: "POST", body: form, signal },
	);

	assertResponseOk(res, "creating remote file");
	const json = await res.json();
	if (!json.id) throw new Error("Google Drive did not return a file ID");
	return json.id as string;
}

function assertResponseOk(response: Response, operation: string) {
	if (!response || response.ok === false) {
		const error = new Error(`Failed ${operation}`) as Error & {
			status?: number;
		};
		error.status = response?.status;
		throw error;
	}
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

export async function download(signal?: AbortSignal): Promise<Backup | null> {
	let operationId: number | undefined;
	try {
		if (!fileId) return null;
		operationId = beginOperation();

		const res = await driveFetch(
			`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
			{ signal },
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
			loadoutCardPreferences: normalizeLoadoutCardPreferences(
				readRecordField(backup, "loadoutCardPreferences", {}),
			),
			loadoutSnapshots: normalizeLoadoutSnapshots(
				readRecordField(backup, "loadoutSnapshots", {}),
			),
			...checklistState,
			artifactsOwned: readRecordField(backup, "artifactsOwned", {}),
		};
	} catch {
		return null;
	} finally {
		if (operationId !== undefined) endOperation(operationId);
	}
}

export async function upload(data: Backup, signal?: AbortSignal) {
	if (!fileId) throw new Error("Google Drive file ID is unavailable");
	const operationId = beginOperation();
	try {
		for (let attempt = 0; ; attempt += 1) {
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
				break;
			} catch (error) {
				if ((error as DOMException).name === "AbortError") throw error;
				const status = (error as Error & { status?: number }).status;
				const retryable =
					status === 429 || status === undefined || status >= 500;
				if (!retryable || attempt >= 3) throw error;
				await new Promise<void>((resolve, reject) => {
					const timer = window.setTimeout(resolve, 2 ** attempt * 1000);
					signal?.addEventListener(
						"abort",
						() => {
							window.clearTimeout(timer);
							reject(new DOMException("Aborted", "AbortError"));
						},
						{ once: true },
					);
				});
			}
		}
	} catch (e) {
		if ((e as DOMException).name === "AbortError") throw e;
		throw e;
	} finally {
		endOperation(operationId);
	}
}

export async function initSync() {
	if (isInitialized) return;
	const generation = syncGeneration;
	if (initPromise) {
		if (initPromiseGeneration === generation) return initPromise;
		await initPromise;
		if (generation !== syncGeneration) return;
		return initSync();
	}
	const currentInitPromise = runInitSync(generation);
	initPromise = currentInitPromise;
	initPromiseGeneration = generation;
	try {
		await currentInitPromise;
	} finally {
		if (initPromise === currentInitPromise) {
			initPromise = null;
			initPromiseGeneration = -1;
		}
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
	const controller = new AbortController();
	initController = controller;

	try {
		const existing = await findFile(controller.signal);
		ensureCurrentGeneration(generation);

		if (!existing) {
			const createdBackup = select(useAppStore.getState());
			isCreatingFile = true;
			const createdFileId = await createFile(createdBackup);
			isCreatingFile = false;
			ensureCurrentGeneration(generation);
			fileId = createdFileId;
			setupAutoSync();
			const latestBackup = select(useAppStore.getState());
			if (latestBackup.backupUpdatedAt !== createdBackup.backupUpdatedAt) {
				scheduleUpload();
			}
			ensureCurrentGeneration(generation);
			isInitialized = true;
			return;
		}

		if (!existing.id) throw new Error("Google Drive file is missing its ID");
		fileId = existing.id;

		const remote = await download(controller.signal);
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
		}

		ensureCurrentGeneration(generation);
		setupAutoSync();
		isInitialized = true;
	} catch (e) {
		if ((e as DOMException).name === "AbortError") return;
		useAppStore
			.getState()
			.setSyncStatus("failed", "Changes not backed up. Retry Sync");
		toast.error(
			`Something went wrong with initializing data\n\n${(e as Error).message}`,
		);
	} finally {
		isCreatingFile = false;
		if (initController === controller) initController = null;
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
			if (newValue === prevValue) return;
			scheduleUpload();
		},
	);

	unsubscribeAutoSync = unsubscribe;
	return unsubscribe;
}

function scheduleUpload(shouldRetry = false) {
	if (!fileId) return;
	queuedUpload = select(useAppStore.getState());
	queuedUploadKind = "background";
	if (useAppStore.getState().syncStatus === "failed" && !shouldRetry) return;
	lastUploadError = null;
	lastFailureNotice = "";
	useAppStore.getState().setSyncStatus("pending");
	toast.loading("Sync start", { id: SYNC_TOAST_ID });
	void runUploadQueue();
}

function runUploadQueue() {
	if (uploadQueuePromise) return uploadQueuePromise;
	if (uploadController || !queuedUpload || !fileId) return Promise.resolve();
	const currentPromise = processUploadQueue();
	uploadQueuePromise = currentPromise;
	void currentPromise.then(() => {
		if (uploadQueuePromise === currentPromise) uploadQueuePromise = null;
	});
	return currentPromise;
}

async function processUploadQueue() {
	const generation = syncGeneration;
	while (queuedUpload && fileId) {
		const data = queuedUpload;
		const uploadKind = queuedUploadKind;
		queuedUpload = null;
		const controller = new AbortController();
		uploadController = controller;
		useAppStore.getState().setSyncStatus("syncing");
		const mutation = upload(data, controller.signal);
		activeUploadPromise = mutation;
		try {
			await mutation;
			ensureCurrentGeneration(generation);
			const latest = select(useAppStore.getState());
			if (latest.backupUpdatedAt !== data.backupUpdatedAt) {
				queuedUpload = latest;
				queuedUploadKind = uploadKind;
				useAppStore.getState().setSyncStatus("pending");
			} else {
				queuedUpload = null;
				lastUploadError = null;
				lastFailureNotice = "";
				useAppStore.setState({
					syncStatus: "idle",
					syncError: null,
				});
				if (uploadKind === "background") {
					toast.success("Sync success", { id: SYNC_TOAST_ID });
				}
			}
		} catch (error) {
			if ((error as DOMException).name !== "AbortError") {
				lastUploadError = error;
				queuedUpload = select(useAppStore.getState());
				queuedUploadKind = uploadKind;
				const message = "Changes not backed up";
				useAppStore.getState().setSyncStatus("failed", message);
				if (lastFailureNotice !== message) {
					lastFailureNotice = message;
					toast.error(message, { id: SYNC_TOAST_ID });
				}
			} else if (generation === syncGeneration) {
				queuedUpload = select(useAppStore.getState());
				queuedUploadKind = uploadKind;
				useAppStore.getState().setSyncStatus("pending");
			}
		} finally {
			if (uploadController === controller) uploadController = null;
			if (activeUploadPromise === mutation) activeUploadPromise = null;
		}
		if (generation !== syncGeneration) return;
		if (useAppStore.getState().syncStatus === "failed") return;
	}
}

export function retrySync() {
	if (useAppStore.getState().syncConflict) return;
	manualRetryController?.abort();
	const controller = new AbortController();
	manualRetryController = controller;
	queuedUpload = select(useAppStore.getState());
	queuedUploadKind = "background";
	void refreshAndRetryUpload(
		!isInitialized,
		syncGeneration,
		controller.signal,
	).finally(() => {
		if (manualRetryController === controller) manualRetryController = null;
	});
}

async function refreshAndRetryUpload(
	shouldInitialize: boolean,
	generation: number,
	signal: AbortSignal,
) {
	const retryBackup = queuedUpload ?? select(useAppStore.getState());
	try {
		await refreshGoogleAccessToken("manual-retry", signal);
		if (signal.aborted || generation !== syncGeneration) return;
		if (shouldInitialize) {
			await initSync();
			if (
				signal.aborted ||
				generation !== syncGeneration ||
				!isInitialized ||
				useAppStore.getState().syncStatus === "failed" ||
				useAppStore.getState().syncConflict
			) {
				queuedUpload = retryBackup;
				queuedUploadKind = "background";
				return;
			}
		}
		scheduleUpload(true);
	} catch (error) {
		if ((error as DOMException).name === "AbortError") return;
		lastUploadError = error;
		queuedUpload = select(useAppStore.getState());
		queuedUploadKind = "background";
		const message = "Changes not backed up";
		useAppStore.getState().setSyncStatus("failed", message);
		if (lastFailureNotice !== message) {
			lastFailureNotice = message;
			toast.error(message, { id: SYNC_TOAST_ID });
		}
	}
}

export function cancelPendingUpload(abortActive = false) {
	queuedUpload = null;
	if (abortActive) uploadController?.abort();
}

export function teardownSync() {
	syncGeneration += 1;
	manualRetryController?.abort();
	manualRetryController = null;
	if (!isCreatingFile) initController?.abort();
	cancelPendingUpload(true);
	unsubscribeAutoSync?.();
	unsubscribeAutoSync = null;
	isInitialized = false;
	pendingRemoteBackup = null;
	queuedUpload = null;
	queuedUploadKind = "background";
	toast.dismiss(SYNC_TOAST_ID);
	useAppStore.getState().setSyncStatus("idle");
	fileId = null;
	activeOperations.clear();
	useAppStore.setState({ syncInProgress: false, syncConflict: null });
}

let conflictResolutionPromise: Promise<"resolved" | "refreshed"> | null = null;

export async function resolveSyncConflict(choice: "local" | "remote") {
	if (conflictResolutionPromise) return conflictResolutionPromise;
	const resolution = resolveSyncConflictInternal(choice);
	conflictResolutionPromise = resolution;
	try {
		return await resolution;
	} finally {
		if (conflictResolutionPromise === resolution)
			conflictResolutionPromise = null;
	}
}

async function resolveSyncConflictInternal(choice: "local" | "remote") {
	const conflict = useAppStore.getState().syncConflict;
	if (!conflict) {
		throw new Error("There is no sync conflict to resolve");
	}

	cancelPendingUpload();
	if (choice === "local") {
		const generation = syncGeneration;
		if (uploadQueuePromise) {
			try {
				await uploadQueuePromise;
			} catch {
				// The queue reports terminal failures through syncStatus and its toast.
			}
		}
		toast.loading("Uploading data", { id: SYNC_TOAST_ID });
		queuedUpload = select(useAppStore.getState());
		queuedUploadKind = "conflict-local";
		try {
			await runUploadQueue();
			ensureCurrentGeneration(generation);
			if (useAppStore.getState().syncStatus === "failed")
				throw lastUploadError ?? new Error("Changes not backed up");
		} catch (error) {
			if ((error as DOMException).name === "AbortError") throw error;
			throw error;
		}
		useAppStore.getState().setSyncConflict(null);
		pendingRemoteBackup = null;
		useAppStore.setState({
			syncStatus: "idle",
			syncError: null,
		});
		toast.success("Data uploaded", { id: SYNC_TOAST_ID });
		return "resolved" as const;
	}

	if (!pendingRemoteBackup) {
		throw new Error("The remote backup is no longer available; refresh sync");
	}
	toast.loading("Downloading data", { id: SYNC_TOAST_ID });
	if (
		choice === "remote" &&
		useAppStore.getState().backupUpdatedAt !== conflict.local.updatedAt
	) {
		pendingRemoteBackup = null;
		useAppStore.getState().setSyncConflict(null);
		isInitialized = false;
		await initSync();
		if (useAppStore.getState().syncConflict) {
			toast.error("Sync conflict detected", { id: SYNC_TOAST_ID });
		} else if (useAppStore.getState().syncStatus === "failed") {
			toast.error("Changes not backed up", { id: SYNC_TOAST_ID });
		} else {
			toast.success("Data downloaded", { id: SYNC_TOAST_ID });
		}
		return "refreshed" as const;
	}

	suppressAutoSync = true;
	try {
		useAppStore.setState({ ...pendingRemoteBackup, syncConflict: null });
		pendingRemoteBackup = null;
	} finally {
		suppressAutoSync = false;
	}
	toast.success("Data downloaded", { id: SYNC_TOAST_ID });
	return "resolved" as const;
}

function getSize(obj: unknown) {
	return new Blob([JSON.stringify(obj)]).size;
}
