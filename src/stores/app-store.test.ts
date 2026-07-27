// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { migrateAppStore, useAppStore } from "@/stores/app-store";

const { monsterlingsData } = vi.hoisted(() => ({
	monsterlingsData: {
		1: {
			id: 1,
			name: "Fixture Ineligible",
		},
		67: {
			id: 67,
			name: "Fixture Linker",
			linkChain: { name: "Fixture Link Chain" },
		},
		68: {
			id: 68,
			name: "Fixture Second Linker",
			linkChain: { name: "Fixture Second Link Chain" },
		},
	},
}));

vi.mock("@/data/MONSTERLINGS_DATA", () => ({
	MONSTERLINGS_DATA: monsterlingsData,
}));

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

	it("saves one shared level, retains it on delete and reset", () => {
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
		expect(useAppStore.getState().monsterlingsOwned).toEqual({});
		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
			67: 5,
		});
		expect(useAppStore.getState().backupUpdatedAt).toBe(123);
	});

	it("does not downgrade a shared level when saving a lower level", () => {
		useAppStore.setState({
			monsterlingLinkChainLevels: { 1: 5, 67: 5 } as never,
		});

		useAppStore.getState().setMonsterlingOwned(ownedMonsterling, undefined, 1);
		useAppStore
			.getState()
			.setMonsterlingOwned(
				{ ...ownedMonsterling, monsterling_id: 1 },
				undefined,
				1,
			);

		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
			67: 5,
		});
	});

	it("keeps a first-time level-one species implicit and upgrades higher levels", () => {
		useAppStore.getState().setMonsterlingOwned(ownedMonsterling, undefined, 1);
		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({});

		useAppStore.getState().setMonsterlingOwned(ownedMonsterling, undefined, 3);
		useAppStore.getState().setMonsterlingOwned(ownedMonsterling, undefined, 2);
		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
			67: 3,
		});
	});
});
