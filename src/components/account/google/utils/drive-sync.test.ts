// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	download,
	initSync,
	resolveSyncConflict,
	retrySync,
	select,
	teardownSync,
} from "@/components/account/google/utils/drive-sync";
import { G_ACCESS_TOKEN_SESSION } from "@/constants";
import { useAppStore } from "@/stores/app-store";
import { defaultChecklistPreferences } from "@/stores/checklist-slice";

const { driveFetch } = vi.hoisted(() => ({ driveFetch: vi.fn() }));
const { toast } = vi.hoisted(() => ({
	toast: Object.assign(vi.fn(), {
		loading: vi.fn(),
		success: vi.fn(),
		error: vi.fn(),
		dismiss: vi.fn(),
	}),
}));

const { monsterlingsData } = vi.hoisted(() => ({
	monsterlingsData: {
		1: {
			id: 1,
			name: "Fixture Ineligible",
		},
		67: {
			id: 67,
			name: "Fixture Linker",
			linkChain: { unlock_level: 1, name: "Fixture Link Chain" },
		},
		68: {
			id: 68,
			name: "Fixture Second Linker",
			linkChain: { unlock_level: 1, name: "Fixture Second Link Chain" },
		},
	},
}));

vi.mock("react-hot-toast", () => ({ default: toast }));
vi.mock("@/components/account/google/utils/drive-client", () => ({
	driveFetch,
}));
vi.mock("@/data/monsterlings/MONSTERLINGS_DATA", () => ({
	MONSTERLINGS_DATA: monsterlingsData,
}));

describe("Drive Monsterling backups", () => {
	afterEach(() => {
		vi.useRealTimers();
		sessionStorage.removeItem(G_ACCESS_TOKEN_SESSION);
		teardownSync();
		driveFetch.mockReset();
		toast.loading.mockReset();
		toast.success.mockReset();
		toast.error.mockReset();
		toast.dismiss.mockReset();
		useAppStore.setState({
			monsterlingsOwned: {},
			monsterlingLinkChainLevels: {},
			monsterlingLinkChainPinnedIds: [],
			loadoutSnapshots: {},
			checklistTasks: {},
			checklistCompletions: {},
			checklistPermanentNotes: {},
			checklistPreferences: defaultChecklistPreferences,
			syncConflict: null,
		});
	});

	it("serializes edits during an upload and sends the latest snapshot last", async () => {
		sessionStorage.setItem(G_ACCESS_TOKEN_SESSION, "token");
		useAppStore.setState({ backupUpdatedAt: 20, isHydrated: true });
		const remoteBackup = {
			backupUpdatedAt: 20,
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {},
			loadouts: {},
		};
		let finishFirstUpload: (() => void) | undefined;
		let activeUploads = 0;
		let maximumActiveUploads = 0;
		const uploadedRevisions: number[] = [];
		const uploadedShowFullyCompleted: boolean[] = [];
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ ok: true, json: async () => remoteBackup })
			.mockImplementation(async (_input, init) => {
				activeUploads += 1;
				maximumActiveUploads = Math.max(maximumActiveUploads, activeUploads);
				const uploadedBackup = JSON.parse(String(init?.body));
				uploadedRevisions.push(uploadedBackup.backupUpdatedAt);
				uploadedShowFullyCompleted.push(
					uploadedBackup.checklistPreferences.showFullyCompleted,
				);
				if (uploadedRevisions.length === 1) {
					await new Promise<void>((resolve) => {
						finishFirstUpload = resolve;
					});
				}
				activeUploads -= 1;
				return { ok: true };
			});

		await initSync();
		useAppStore.setState({
			backupUpdatedAt: 21,
			checklistPreferences: {
				...defaultChecklistPreferences,
				showFullyCompleted: false,
			},
		});
		expect(uploadedRevisions).toEqual([21]);
		expect(uploadedShowFullyCompleted).toEqual([false]);
		expect(toast.success).not.toHaveBeenCalledWith("Sync success", {
			id: "google-drive-sync",
		});

		useAppStore.setState({ backupUpdatedAt: 22 });
		useAppStore.setState({
			backupUpdatedAt: 23,
			checklistPreferences: {
				...defaultChecklistPreferences,
				showFullyCompleted: true,
			},
		});
		expect(uploadedRevisions).toEqual([21]);
		finishFirstUpload?.();
		await vi.waitFor(() => expect(uploadedRevisions).toEqual([21, 23]));

		expect(maximumActiveUploads).toBe(1);
		expect(uploadedShowFullyCompleted).toEqual([false, true]);
		expect(toast.success).toHaveBeenCalledWith("Sync success", {
			id: "google-drive-sync",
		});
	});

	it("retains a failed snapshot for manual retry", async () => {
		sessionStorage.setItem(G_ACCESS_TOKEN_SESSION, "token");
		useAppStore.setState({ backupUpdatedAt: 20, isHydrated: true });
		const uploadedRevisions: number[] = [];
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					backupUpdatedAt: 20,
					monsterCodexCompleted: [],
					charactersOwned: {},
					monsterlingsOwned: {},
					loadouts: {},
				}),
			})
			.mockImplementationOnce(async (_input, init) => {
				uploadedRevisions.push(JSON.parse(String(init?.body)).backupUpdatedAt);
				return { ok: false, status: 400 };
			})
			.mockImplementationOnce(async (_input, init) => {
				uploadedRevisions.push(JSON.parse(String(init?.body)).backupUpdatedAt);
				return { ok: true };
			});

		await initSync();
		useAppStore.setState({ backupUpdatedAt: 21 });
		await vi.waitFor(() =>
			expect(useAppStore.getState().syncStatus).toBe("failed"),
		);
		expect(uploadedRevisions).toEqual([21]);
		useAppStore.setState({ backupUpdatedAt: 22 });
		await Promise.resolve();
		expect(uploadedRevisions).toEqual([21]);

		retrySync();
		await vi.waitFor(() => expect(uploadedRevisions).toEqual([21, 22]));
		await vi.waitFor(() =>
			expect(useAppStore.getState().syncStatus).toBe("idle"),
		);
		expect(toast.success).toHaveBeenCalledWith("Sync success", {
			id: "google-drive-sync",
		});
	});

	it("aborts an active upload during teardown", async () => {
		sessionStorage.setItem(G_ACCESS_TOKEN_SESSION, "token");
		useAppStore.setState({ backupUpdatedAt: 20, isHydrated: true });
		let wasAborted = false;
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					backupUpdatedAt: 20,
					monsterCodexCompleted: [],
					charactersOwned: {},
					monsterlingsOwned: {},
					loadouts: {},
				}),
			})
			.mockImplementationOnce(
				async (_input, init) =>
					await new Promise((_resolve, reject) => {
						init?.signal?.addEventListener("abort", () => {
							wasAborted = true;
							reject(new DOMException("Aborted", "AbortError"));
						});
					}),
			);

		await initSync();
		useAppStore.setState({ backupUpdatedAt: 21 });
		await vi.waitFor(() =>
			expect(useAppStore.getState().syncStatus).toBe("syncing"),
		);
		teardownSync();

		await vi.waitFor(() => expect(wasAborted).toBe(true));
		expect(useAppStore.getState().syncStatus).toBe("idle");
		expect(toast.dismiss).toHaveBeenCalledWith("google-drive-sync");
		expect(toast.success).not.toHaveBeenCalledWith("Sync success", {
			id: "google-drive-sync",
		});
	});

	it("selects canonical levels and strips legacy instance values", () => {
		const monsterling = {
			monsterling_id: 67,
			tier_id: 5 as const,
			traits: [],
		};
		useAppStore.setState({
			monsterlingsOwned: {
				lower: { ...monsterling, link_chain_level: 3 } as never,
				current: { ...monsterling, link_chain_level: 5 } as never,
				ineligible: {
					...monsterling,
					monsterling_id: 1,
					link_chain_level: 5,
				} as never,
			},
			monsterlingLinkChainLevels: { 67: 4, 68: 2 },
			monsterlingLinkChainPinnedIds: [68, 67, 68, 1],
			loadoutSnapshots: { saved: { id: "saved" } as never },
		});

		const selected = select(useAppStore.getState());
		expect(selected.monsterlingLinkChainLevels).toEqual({ 67: 5, 68: 2 });
		expect(selected.monsterlingsOwned.lower).not.toHaveProperty(
			"link_chain_level",
		);
		expect(selected.monsterlingsOwned.current).not.toHaveProperty(
			"link_chain_level",
		);
		expect(selected.monsterlingLinkChainLevels).not.toHaveProperty("1");
		expect(selected.monsterlingLinkChainPinnedIds).toEqual([68, 67]);
		expect(selected.loadoutSnapshots).toEqual({
			saved: { id: "saved" },
		});
		expect(selected).not.toHaveProperty("syncInProgress");
		expect(selected.checklistTasks).toEqual({});
		expect(selected.checklistCompletions).toEqual({});
		expect(selected.checklistPermanentNotes).toEqual({});
		expect(selected.checklistPreferences).toEqual(defaultChecklistPreferences);
	});

	it("selects retained levels without owned copies", () => {
		useAppStore.setState({
			monsterlingsOwned: {},
			monsterlingLinkChainLevels: { 67: 4 },
			monsterlingLinkChainPinnedIds: [67],
		});

		expect(select(useAppStore.getState()).monsterlingLinkChainLevels).toEqual({
			67: 4,
		});
		expect(
			select(useAppStore.getState()).monsterlingLinkChainPinnedIds,
		).toEqual([67]);
	});

	it("downloads retained levels without owned copies", async () => {
		const backup = {
			backupUpdatedAt: 1,
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {},
			monsterlingLinkChainLevels: { 67: 4 },
			monsterlingLinkChainPinnedIds: [67, 1],
			loadouts: {
				team: {
					id: "team",
					name: "Team",
					characters: [
						{
							characterId: 1,
							monsterlingIds: [null, null, null],
							equipment_ids: [1, 2, null, null],
						},
						{ characterId: 2, monsterlingIds: [null, null, null] },
						{ characterId: 3, monsterlingIds: [null, null, null] },
					],
				},
			},
		};
		driveFetch
			.mockResolvedValueOnce({
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ json: async () => backup });

		await initSync();
		driveFetch.mockResolvedValueOnce({ json: async () => backup });

		const downloaded = await download();
		expect(downloaded?.monsterlingsOwned).toEqual({});
		expect(downloaded?.monsterlingLinkChainLevels).toEqual({ 67: 4 });
		expect(downloaded?.monsterlingLinkChainPinnedIds).toEqual([67]);
		expect(downloaded?.loadoutSnapshots).toEqual({});
		expect(
			downloaded?.loadouts.team.characters.map(
				({ artifactInstanceId }) => artifactInstanceId,
			),
		).toEqual([null, null, null]);
		expect(
			downloaded?.loadouts.team.characters.map(
				({ equipment_ids }) => equipment_ids,
			),
		).toEqual([
			[1, 2, null, null],
			[null, null, null, null],
			[null, null, null, null],
		]);
		expect(downloaded?.loadouts.team.characters[0].pinned_stat_ids).toEqual([
			"atk",
			"crit_rate",
			"crit_dmg",
			"special_skill_cd",
			"element_atk",
		]);
	});

	it("migrates existing levels when downloading a legacy backup", async () => {
		const legacyBackup = {
			backupUpdatedAt: 1,
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {
				lower: {
					monsterling_id: 67,
					tier_id: 5,
					link_chain_level: 3,
					traits: [],
				},
				higher: {
					monsterling_id: 67,
					tier_id: 4,
					link_chain_level: 5,
					traits: [],
				},
				invalid: {
					monsterling_id: 68,
					tier_id: 5,
					link_chain_level: 8,
					traits: [],
				},
			},
			loadouts: {},
		};
		driveFetch
			.mockResolvedValueOnce({
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ json: async () => legacyBackup });

		await initSync();
		expect(
			useAppStore.getState().syncConflict?.local.metadata.checklistTasks,
		).toBe(0);
		expect(
			useAppStore.getState().syncConflict?.remote.metadata.checklistCompletions,
		).toBe(0);
		driveFetch.mockResolvedValueOnce({ json: async () => legacyBackup });

		const downloaded = await download();

		expect(downloaded?.monsterlingLinkChainLevels).toEqual({ 67: 5 });
		expect(downloaded?.monsterlingsOwned.lower).not.toHaveProperty(
			"link_chain_level",
		);
		expect(downloaded?.monsterlingsOwned.higher).not.toHaveProperty(
			"link_chain_level",
		);
		expect(downloaded?.checklistTasks).toEqual({});
		expect(downloaded?.checklistCompletions).toEqual({});
		expect(downloaded?.checklistPermanentNotes).toEqual({});
		expect(downloaded?.checklistPreferences).toEqual(
			defaultChecklistPreferences,
		);
		expect(downloaded?.checklistPreferences.showFullyCompleted).toBe(true);
	});

	it("normalizes checklist tasks and event metadata without changing the local backup timestamp", async () => {
		useAppStore.setState({ backupUpdatedAt: 77 });
		const legacyBackup = {
			backupUpdatedAt: 1,
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {},
			loadouts: {},
			checklistTasks: {
				legacy: {
					title: "Legacy",
					kind: "custom",
					startAt: "2026-07-27T00:00:00+08:00",
					recurrence: "daily",
					scheduleVersion: 1,
				},
				anniversary: {
					title: "Anniversary check-in",
					noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
					kind: "event",
					startAt: "2026-07-22T00:00:00.000Z",
					endAt: "2026-08-11T23:59:00.000Z",
					recurrence: "daily",
					scheduleVersion: 1,
				},
			},
			checklistPermanentNotes: {
				"missing-definition": "  Remote note  ",
				blank: " ",
			},
		};
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ ok: true, json: async () => legacyBackup })
			.mockResolvedValueOnce({ ok: true, json: async () => legacyBackup });

		await initSync();

		const downloaded = await download();
		expect(downloaded?.checklistTasks.legacy.startAt).toBe(
			"2026-07-27T00:00:00.000Z",
		);
		expect(downloaded?.checklistTasks.legacy.scheduleVersion).toBe(2);
		expect(downloaded?.checklistTasks.anniversary).toMatchObject({
			kind: "event",
			source: "user",
			noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
			endAt: "2026-08-11T23:59:00.000Z",
		});
		expect(downloaded?.checklistPermanentNotes).toEqual({
			"missing-definition": "Remote note",
		});
		expect(useAppStore.getState().backupUpdatedAt).toBe(77);
	});

	it("applies the exact remote conflict snapshot without uploading it", async () => {
		useAppStore.setState({ backupUpdatedAt: 10, checklistTasks: {} });
		const remoteBackup = {
			backupUpdatedAt: 20,
			syncInProgress: true,
			setSyncConflict: "corrupted",
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {},
			loadouts: {},
			checklistTasks: {
				remote: {
					id: "remote",
					title: "Remote task",
					kind: "custom",
					startAt: "2026-08-06T00:00:00.000Z",
					scheduleVersion: 2,
				},
			},
		};
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ ok: true, json: async () => remoteBackup });

		await initSync();
		expect(useAppStore.getState().syncConflict).not.toBeNull();

		await resolveSyncConflict("remote");

		expect(useAppStore.getState().backupUpdatedAt).toBe(20);
		expect(useAppStore.getState().checklistTasks.remote.title).toBe(
			"Remote task",
		);
		expect(useAppStore.getState().syncConflict).toBeNull();
		expect(useAppStore.getState().syncInProgress).toBe(false);
		expect(typeof useAppStore.getState().setSyncConflict).toBe("function");
		expect(toast.loading).toHaveBeenCalledWith("Downloading data", {
			id: "google-drive-sync",
		});
		expect(toast.success).toHaveBeenCalledWith("Data downloaded", {
			id: "google-drive-sync",
		});
		expect(driveFetch).toHaveBeenCalledTimes(2);
	});

	it("keeps the conflict open when keeping local fails to upload", async () => {
		useAppStore.setState({ backupUpdatedAt: 10 });
		const remoteBackup = {
			backupUpdatedAt: 20,
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {},
			loadouts: {},
		};
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ ok: true, json: async () => remoteBackup })
			.mockResolvedValueOnce({ ok: false, status: 500 });

		await initSync();
		await expect(resolveSyncConflict("local")).rejects.toThrow(
			"Failed uploading remote file",
		);
		expect(useAppStore.getState().syncConflict).not.toBeNull();
		expect(toast.loading).toHaveBeenCalledWith("Uploading data", {
			id: "google-drive-sync",
		});
		expect(toast.error).toHaveBeenCalledWith("Changes not backed up", {
			id: "google-drive-sync",
		});
	}, 12000);

	it("reports the upload lifecycle when keeping local conflict data", async () => {
		useAppStore.setState({ backupUpdatedAt: 10 });
		const remoteBackup = {
			backupUpdatedAt: 20,
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {},
			loadouts: {},
		};
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ ok: true, json: async () => remoteBackup })
			.mockResolvedValueOnce({ ok: true });

		await initSync();
		await resolveSyncConflict("local");

		expect(toast.loading).toHaveBeenCalledWith("Uploading data", {
			id: "google-drive-sync",
		});
		expect(toast.success).toHaveBeenCalledWith("Data uploaded", {
			id: "google-drive-sync",
		});
		expect(useAppStore.getState().syncConflict).toBeNull();
	});

	it("does not upload local data when the remote download fails", async () => {
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ ok: false, status: 401 });

		await initSync();

		expect(driveFetch).toHaveBeenCalledTimes(2);
		expect(useAppStore.getState().syncConflict).toBeNull();
	});

	it("rejects malformed durable collection fields", async () => {
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					backupUpdatedAt: 20,
					charactersOwned: [],
				}),
			});

		await initSync();

		expect(driveFetch).toHaveBeenCalledTimes(2);
		expect(useAppStore.getState().syncConflict).toBeNull();
	});

	it("deduplicates repeated initialization", async () => {
		const remoteBackup = {
			backupUpdatedAt: 20,
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {},
			loadouts: {},
		};
		driveFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ id: "file", name: "state.json" }] }),
			})
			.mockResolvedValueOnce({ ok: true, json: async () => remoteBackup });

		await Promise.all([initSync(), initSync()]);
		await initSync();

		expect(driveFetch).toHaveBeenCalledTimes(2);
	});
});
