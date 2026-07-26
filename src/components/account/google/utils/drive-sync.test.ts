// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	download,
	initSync,
	select,
} from "@/components/account/google/utils/drive-sync";
import { useAppStore } from "@/stores/app-store";
import { defaultChecklistPreferences } from "@/stores/checklist-slice";

const { driveFetch } = vi.hoisted(() => ({ driveFetch: vi.fn() }));

vi.mock("@/components/account/google/utils/drive-client", () => ({
	driveFetch,
}));

describe("Drive Monsterling backups", () => {
	afterEach(() => {
		driveFetch.mockReset();
		useAppStore.setState({
			monsterlingsOwned: {},
			monsterlingLinkChainLevels: {},
			checklistTasks: {},
			checklistCompletions: {},
			checklistPreferences: defaultChecklistPreferences,
			syncConflict: null,
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
		expect(selected).not.toHaveProperty("syncInProgress");
		expect(selected.checklistTasks).toEqual({});
		expect(selected.checklistCompletions).toEqual({});
		expect(selected.checklistPreferences).toEqual(defaultChecklistPreferences);
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
		expect(downloaded?.checklistPreferences).toEqual(
			defaultChecklistPreferences,
		);
	});

	it("anchors legacy checklist dates without changing the local backup timestamp", async () => {
		useAppStore.setState({ backupUpdatedAt: 77 });
		driveFetch.mockResolvedValueOnce({
			json: async () => ({
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
				},
			}),
		});

		const downloaded = await download();
		expect(downloaded?.checklistTasks.legacy.startAt).toBe(
			"2026-07-27T00:00:00.000Z",
		);
		expect(downloaded?.checklistTasks.legacy.scheduleVersion).toBe(2);
		expect(useAppStore.getState().backupUpdatedAt).toBe(77);
	});
});
