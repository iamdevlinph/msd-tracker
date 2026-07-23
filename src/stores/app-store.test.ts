// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { migrateAppStore, useAppStore } from "@/stores/app-store";

const ownedMonsterling = {
	monsterling_id: 67,
	tier_id: 5 as const,
	traits: [],
};

afterEach(() => {
	vi.restoreAllMocks();
	useAppStore.setState({
		monsterlingsOwned: {},
		monsterlingLinkChainLevels: {},
	});
});

describe("Monsterling Link Chain persistence", () => {
	it("migrates the highest existing level and strips legacy instance fields", () => {
		const migrated = migrateAppStore({
			monsterlingsOwned: {
				lower: { ...ownedMonsterling, link_chain_level: 3 },
				higher: { ...ownedMonsterling, link_chain_level: 5 },
				invalid: {
					...ownedMonsterling,
					monsterling_id: 68,
					link_chain_level: 8,
				},
				ineligible: {
					...ownedMonsterling,
					monsterling_id: 1,
					link_chain_level: 5,
				},
			},
			monsterlingLinkChainLevels: { 67: 4, 68: 2, 1: 5 },
		});

		expect(migrated.monsterlingLinkChainLevels).toEqual({ 67: 5, 68: 2 });
		for (const monsterling of Object.values(migrated.monsterlingsOwned)) {
			expect(monsterling).not.toHaveProperty("link_chain_level");
		}
		expect(migrateAppStore(migrated)).toEqual(migrated);
	});

	it("saves one shared level, retains it on delete, and clears it on reset", () => {
		vi.spyOn(Date, "now").mockReturnValue(123);
		const store = useAppStore.getState();

		store.setMonsterlingOwned(ownedMonsterling, undefined, 4);
		store.setMonsterlingOwned(
			{ ...ownedMonsterling, tier_id: 4 },
			undefined,
			5,
		);

		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
			67: 5,
		});
		expect(useAppStore.getState().backupUpdatedAt).toBe(123);
		for (const monsterling of Object.values(
			useAppStore.getState().monsterlingsOwned,
		)) {
			expect(monsterling).not.toHaveProperty("link_chain_level");
		}

		const [firstId, lastId] = Object.keys(
			useAppStore.getState().monsterlingsOwned,
		);
		useAppStore.getState().deleteMonsterlingOwned(firstId);
		useAppStore
			.getState()
			.setMonsterlingOwned(
				{ ...ownedMonsterling, monsterling_id: 1 },
				lastId,
				1,
			);
		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
			67: 5,
		});
		useAppStore.getState().deleteMonsterlingOwned(lastId);
		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
			67: 5,
		});

		useAppStore.getState().resetMonsterlingSlice();
		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({});
	});

	it("removes the sparse shared entry when saving level one", () => {
		useAppStore.setState({ monsterlingLinkChainLevels: { 67: 5 } });

		useAppStore.getState().setMonsterlingOwned(ownedMonsterling, undefined, 1);

		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({});
	});
});
