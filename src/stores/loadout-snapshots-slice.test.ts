import { afterEach, describe, expect, it, vi } from "vitest";
import {
	CONQUEST_DIFFICULTIES,
	LOADOUT_SNAPSHOT_ELEMENTS,
	LOADOUT_SNAPSHOT_TAGS,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
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
			existing: {
				name: "Others - Existing",
				tag: LOADOUT_SNAPSHOT_TAGS.RIFT,
				created_at: 10,
				loadout,
			},
		};
		const normalized = normalizeLoadoutSnapshots(source);
		expect(normalized.bad).toBeUndefined();
		expect(normalized.ok.name).toBe("Saved");
		expect(normalized.ok.tag).toBe(LOADOUT_SNAPSHOT_TAGS.OTHERS);
		expect(normalized.existing.name).toBe("Others - Existing");
		expect(normalized.ok.loadout.characters).toHaveLength(3);
		normalized.ok.loadout.characters[0].stat_values = { atk: 9 };
		expect(source.ok.loadout.characters[0].stat_values).toEqual({ atk: 1200 });
	});

	it("normalizes notes and validates category details", () => {
		const normalized = normalizeLoadoutSnapshots({
			conquest: {
				name: "Conquest",
				tag: LOADOUT_SNAPSHOT_TAGS.CONQUEST,
				created_at: 1,
				loadout,
				notes: "n".repeat(2100),
				details: {
					boss_id: 38,
					difficulty: CONQUEST_DIFFICULTIES.NORMAL,
					level: 10,
					clear_time: "09:59.99",
					res_element_ids: [1, 2, 2, 8],
				},
			},
			unknown_boss: {
				name: "Legacy Conquest",
				tag: LOADOUT_SNAPSHOT_TAGS.CONQUEST,
				created_at: 1,
				loadout,
				details: {
					boss_id: 999,
					difficulty: CONQUEST_DIFFICULTIES.NORMAL,
					level: 1,
					clear_time: "00:00.00",
				},
			},
			rift: {
				name: "Rift",
				tag: LOADOUT_SNAPSHOT_TAGS.RIFT,
				created_at: 1,
				loadout,
				details: { level: 50, clear_time: "01:02.03", score: 12345678 },
			},
			legacy_rift: {
				name: "Legacy Rift",
				tag: LOADOUT_SNAPSHOT_TAGS.RIFT,
				created_at: 1,
				loadout,
				details: { level: 1 },
			},
			malformed_rift: {
				name: "Malformed Rift",
				tag: LOADOUT_SNAPSHOT_TAGS.RIFT,
				created_at: 1,
				loadout,
				details: { level: 1, clear_time: "1:00.00" },
			},
			normal_fifteen: {
				name: "Normal 15",
				tag: LOADOUT_SNAPSHOT_TAGS.CONQUEST,
				created_at: 1,
				loadout,
				details: {
					boss_id: 38,
					difficulty: CONQUEST_DIFFICULTIES.NORMAL,
					level: 15,
					clear_time: "00:00.00",
				},
			},
			raging_fifteen: {
				name: "Raging 15",
				tag: LOADOUT_SNAPSHOT_TAGS.CONQUEST,
				created_at: 1,
				loadout,
				details: {
					boss_id: 38,
					difficulty: CONQUEST_DIFFICULTIES.RAGING,
					level: 15,
					clear_time: "00:00.00",
				},
			},
			legendary: {
				name: "Legendary",
				tag: LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST,
				created_at: 1,
				loadout,
				details: {
					element_id: LOADOUT_SNAPSHOT_ELEMENTS.WIND,
					score: 0,
					res_element_ids: [5],
				},
			},
			invalid: {
				name: "Invalid",
				tag: LOADOUT_SNAPSHOT_TAGS.CONQUEST,
				created_at: 1,
				loadout,
				details: { difficulty: "Normal", level: 1, clear_time: "1:00.00" },
			},
		});
		expect(normalized.conquest.notes).toHaveLength(2000);
		expect(normalized.conquest.details).toEqual({
			boss_id: 38,
			difficulty: "normal",
			level: 10,
			clear_time: "09:59.99",
			res_element_ids: [1, 2],
		});
		expect(normalized.unknown_boss.details).toEqual({
			difficulty: "normal",
			level: 1,
			clear_time: "00:00.00",
			res_element_ids: [],
		});
		expect(normalized.rift.details).toEqual({
			level: 50,
			clear_time: "01:02.03",
			score: 12345678,
		});
		expect(normalized.legacy_rift.details).toEqual({
			level: 1,
			clear_time: "00:00.00",
		});
		expect(normalized.malformed_rift.details).toBeNull();
		expect(normalized.normal_fifteen.details).toEqual(
			expect.objectContaining({ level: 15 }),
		);
		expect(normalized.raging_fifteen.details).toBeNull();
		expect(normalized.legendary.details).toEqual({
			element_id: 5,
			score: 0,
			res_element_ids: [5],
		});
		expect(normalized.invalid.details).toBeNull();
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
		expect(useAppStore.getState().backupUpdatedAt).toBe(124);
	});

	it("keeps newly-created names unprefixed for every tag", () => {
		useAppStore.setState({ loadouts: { team: loadout }, loadoutSnapshots: {} });
		for (const tag of Object.values(LOADOUT_SNAPSHOT_TAGS)) {
			const id = useAppStore.getState().createLoadoutSnapshot({
				loadoutId: "team",
				name: "  Clear  ",
				tag,
			});
			expect(id).not.toBeNull();
			expect(useAppStore.getState().loadoutSnapshots[id as string].name).toBe(
				"Clear",
			);
		}
	});

	it("prefixes an existing name only when its tag changes", () => {
		useAppStore.setState({ loadouts: { team: loadout }, loadoutSnapshots: {} });
		const id = useAppStore.getState().createLoadoutSnapshot({
			loadoutId: "team",
			name: "Clear",
			tag: LOADOUT_SNAPSHOT_TAGS.OTHERS,
		});
		useAppStore.getState().updateLoadoutSnapshot(id as string, {
			name: "  Clear  ",
			tag: LOADOUT_SNAPSHOT_TAGS.RIFT,
		});
		expect(useAppStore.getState().loadoutSnapshots[id as string].name).toBe(
			"Rift - Clear",
		);
	});

	it("updates only editable metadata and preserves frozen fields", () => {
		vi.spyOn(Date, "now").mockReturnValue(10);
		useAppStore.setState({ backupUpdatedAt: 0 });
		useAppStore.setState({ loadouts: { team: loadout }, loadoutSnapshots: {} });
		const id = useAppStore.getState().createLoadoutSnapshot({
			loadoutId: "team",
			name: "Before",
			tag: LOADOUT_SNAPSHOT_TAGS.RIFT,
			details: { level: 1, clear_time: "00:00.00" },
		});
		const before = useAppStore.getState().loadoutSnapshots[id as string];
		vi.spyOn(Date, "now").mockReturnValue(20);
		useAppStore.getState().updateLoadoutSnapshot(id as string, {
			name: " After ",
			tag: LOADOUT_SNAPSHOT_TAGS.RIFT,
			notes: "note",
			details: { level: 50, clear_time: "00:00.00", score: 0 },
		});
		const after = useAppStore.getState().loadoutSnapshots[id as string];
		expect(after.name).toBe("After");
		expect(after.notes).toBe("note");
		expect(after.details).toEqual({
			level: 50,
			clear_time: "00:00.00",
			score: 0,
		});
		expect(after.id).toBe(before.id);
		expect(after.created_at).toBe(before.created_at);
		expect(after.loadout).toEqual(before.loadout);
		expect(useAppStore.getState().backupUpdatedAt).toBe(20);
	});
});
