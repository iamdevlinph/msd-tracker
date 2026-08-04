import { afterEach, describe, expect, it, vi } from "vitest";
import { LOADOUT_SNAPSHOT_TAGS } from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import { useAppStore } from "@/stores/app-store";
import { normalizeLoadoutSnapshots } from "@/stores/loadout-snapshots-slice";
import {
	emptyLoadoutCharacterSlot,
	type LoadoutOwned,
} from "@/stores/loadouts-slice";

const loadout: LoadoutOwned = {
	id: "team",
	name: "Team",
	characters: [
		{
			...emptyLoadoutCharacterSlot(),
			characterId: 1,
			monsterlingIds: ["monster", "missing", null],
			artifactInstanceId: "artifact",
			stat_values: { atk: 1200 },
		},
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
	],
};

describe("loadout snapshots store", () => {
	afterEach(() => vi.restoreAllMocks());

	it("normalizes valid records and rejects malformed records", () => {
		const source = {
			bad: { name: "Bad", created_at: "y", loadout },
			ok: { name: "  Saved  ", tag: "invalid", created_at: 10, loadout },
		};
		const normalized = normalizeLoadoutSnapshots(source);
		expect(normalized.bad).toBeUndefined();
		expect(normalized.ok.name).toBe("Saved");
		expect(normalized.ok.tag).toBe(LOADOUT_SNAPSHOT_TAGS.OTHERS);
		expect(normalized.ok.loadout.characters).toHaveLength(3);
		normalized.ok.loadout.characters[0].stat_values = { atk: 9 };
		expect(source.ok.loadout.characters[0].stat_values).toEqual({ atk: 1200 });
	});

	it("captures only referenced mutable records and remains independent", () => {
		vi.spyOn(Date, "now").mockReturnValue(123);
		useAppStore.setState({
			backupUpdatedAt: 1,
			loadouts: { team: loadout },
			loadoutSnapshots: {},
			charactersOwned: {
				1: {
					id: 1,
					awakening: 2,
					skills: { basic: 1, switch: 2, special: 3, ultimate: 4 },
				},
				2: {
					id: 2,
					awakening: 0,
					skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
				},
			},
			monsterlingsOwned: {
				monster: {
					monsterling_id: 67,
					tier_id: 5,
					traits: [{ tier_id: 5, stat_id: 7 }],
					usedBy: [1],
				},
				extra: { monsterling_id: 1, tier_id: 4, traits: [] },
			},
			monsterlingLinkChainLevels: { 67: 5, 1: 3 },
			artifactsOwned: {
				artifact: { artifact_id: 1, fusion_level: 3 },
				extra: { artifact_id: 2, fusion_level: 1 },
			},
		});

		const id = useAppStore.getState().createLoadoutSnapshot({
			loadoutId: "team",
			name: " Clear ",
			tag: LOADOUT_SNAPSHOT_TAGS.CONQUEST,
		});
		expect(id).not.toBeNull();
		const snapshot = useAppStore.getState().loadoutSnapshots[id as string];
		expect(snapshot.name).toBe("Clear");
		expect(snapshot.created_at).toBe(123);
		expect(snapshot.characters_owned).toEqual({
			1: expect.objectContaining({ awakening: 2 }),
		});
		expect(snapshot.monsterlings_owned).toEqual({
			monster: {
				monsterling_id: 67,
				tier_id: 5,
				traits: [{ tier_id: 5, stat_id: 7 }],
			},
		});
		expect(snapshot.monsterling_link_chain_levels).toEqual({ 67: 5 });
		expect(snapshot.artifacts_owned).toEqual({
			artifact: { artifact_id: 1, fusion_level: 3 },
		});
		expect(useAppStore.getState().backupUpdatedAt).toBe(123);

		loadout.characters[0].stat_values = { atk: 1 };
		expect(snapshot.loadout.characters[0].stat_values).toEqual({ atk: 1200 });
		useAppStore.getState().deleteLoadoutSnapshot(id as string);
		expect(useAppStore.getState().loadoutSnapshots).toEqual({});
		expect(useAppStore.getState().backupUpdatedAt).toBe(123);
	});
});
