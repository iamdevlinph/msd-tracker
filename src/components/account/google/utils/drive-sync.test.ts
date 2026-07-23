// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import {
	download,
	initSync,
	select,
	setMissingOrInvalidLinkChainLevelsToOne,
} from "@/components/account/google/utils/drive-sync";
import { useAppStore } from "@/stores/app-store";

const { driveFetch } = vi.hoisted(() => ({ driveFetch: vi.fn() }));

vi.mock("@/components/account/google/utils/drive-client", () => ({
	driveFetch,
}));

describe("Drive Monsterling backups", () => {
	afterEach(() => {
		driveFetch.mockReset();
		useAppStore.setState({ monsterlingsOwned: {}, syncConflict: null });
	});

	it("keeps valid link-chain levels and sets missing or invalid values to one", () => {
		const monsterling = {
			monsterling_id: 1,
			tier_id: 5 as const,
			traits: [],
		};
		useAppStore.setState({
			monsterlingsOwned: {
				legacy: monsterling as never,
				current: { ...monsterling, link_chain_level: 5 },
			},
		});

		const selected = select(useAppStore.getState()).monsterlingsOwned;
		expect(selected.legacy.link_chain_level).toBe(1);
		expect(selected.current.link_chain_level).toBe(5);
		expect(
			setMissingOrInvalidLinkChainLevelsToOne({
				invalid: { ...monsterling, link_chain_level: 8 } as never,
			}).invalid.link_chain_level,
		).toBe(1);
	});

	it("adds level one when downloading a legacy backup", async () => {
		const legacyBackup = {
			backupUpdatedAt: 1,
			monsterCodexCompleted: [],
			charactersOwned: {},
			monsterlingsOwned: {
				legacy: {
					monsterling_id: 1,
					tier_id: 5,
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
		driveFetch.mockResolvedValueOnce({ json: async () => legacyBackup });

		const downloaded = await download();

		expect(downloaded?.monsterlingsOwned.legacy.link_chain_level).toBe(1);
	});
});
