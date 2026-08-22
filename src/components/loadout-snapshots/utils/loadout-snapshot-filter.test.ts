import { describe, expect, it } from "vitest";
import type { LoadoutSnapshot } from "@/stores/loadout-snapshots-slice";
import { emptyLoadoutCharacterSlot } from "@/stores/loadouts-slice";
import { LOADOUT_SNAPSHOT_TAGS } from "./loadout-snapshot-domain-values";
import {
	LOADOUT_SNAPSHOT_ALL_TAGS,
	type LoadoutSnapshotFilters,
	matchesLoadoutSnapshotFilters,
} from "./loadout-snapshot-filter";

const snapshot = (
	name: string,
	tag: LoadoutSnapshot["tag"],
	details?: LoadoutSnapshot["details"],
): LoadoutSnapshot => ({
	id: name,
	name,
	tag,
	created_at: 1,
	loadout: {
		id: "source",
		name: "Source",
		characters: [
			emptyLoadoutCharacterSlot(),
			emptyLoadoutCharacterSlot(),
			emptyLoadoutCharacterSlot(),
		],
	},
	characters_owned: {},
	monsterlings_owned: {},
	monsterling_link_chain_levels: {},
	artifacts_owned: {},
	details,
});

describe("matchesLoadoutSnapshotFilters", () => {
	it("combines search and tag with OR metadata selections", () => {
		const snapshots = [
			snapshot("Fire run", LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST, {
				element_id: 2,
				score: 1,
			}),
			snapshot("Earth run", LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST, {
				element_id: 1,
				score: 1,
			}),
			snapshot("Missing run", LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST),
			snapshot("Other fire", LOADOUT_SNAPSHOT_TAGS.OTHERS),
		];
		const filters = {
			search: "run",
			tag: LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST,
			selectedElementIds: [1, 2] as const,
			selectedBossIds: [],
			difficulty: null,
		};

		expect(
			snapshots.filter((item) =>
				matchesLoadoutSnapshotFilters(item, {
					...filters,
					selectedElementIds: [...filters.selectedElementIds],
				}),
			),
		).toHaveLength(2);
		expect(
			matchesLoadoutSnapshotFilters(snapshots[3], {
				...filters,
				selectedElementIds: [2],
			}),
		).toBe(false);
		expect(
			matchesLoadoutSnapshotFilters(snapshots[0], {
				search: "",
				tag: LOADOUT_SNAPSHOT_ALL_TAGS,
				selectedElementIds: [],
				selectedBossIds: [],
				difficulty: null,
			}),
		).toBe(true);
	});

	it("matches multiple conquest bosses and excludes missing or incompatible details only while active", () => {
		const withBoss = snapshot("Custos", LOADOUT_SNAPSHOT_TAGS.CONQUEST, {
			difficulty: "normal",
			level: 1,
			clear_time: "00:12.34",
			boss_id: 38,
		});
		const withSecondBoss = snapshot(
			"Dumpling",
			LOADOUT_SNAPSHOT_TAGS.CONQUEST,
			{
				difficulty: "normal",
				level: 1,
				clear_time: "00:12.34",
				boss_id: 67,
			},
		);
		const missingBoss = snapshot("Legacy", LOADOUT_SNAPSHOT_TAGS.CONQUEST, {
			difficulty: "normal",
			level: 1,
			clear_time: "00:12.34",
		});
		const incompatibleDetails = snapshot(
			"Wrong details",
			LOADOUT_SNAPSHOT_TAGS.CONQUEST,
			{ element_id: 2, score: 1 },
		);
		const base: LoadoutSnapshotFilters = {
			search: "",
			tag: LOADOUT_SNAPSHOT_TAGS.CONQUEST,
			selectedElementIds: [],
			selectedBossIds: [38, 67],
			difficulty: null,
		};

		expect(matchesLoadoutSnapshotFilters(withBoss, base)).toBe(true);
		expect(matchesLoadoutSnapshotFilters(withSecondBoss, base)).toBe(true);
		expect(matchesLoadoutSnapshotFilters(missingBoss, base)).toBe(false);
		expect(matchesLoadoutSnapshotFilters(incompatibleDetails, base)).toBe(
			false,
		);
		expect(
			matchesLoadoutSnapshotFilters(missingBoss, {
				...base,
				selectedBossIds: [],
			}),
		).toBe(true);
		expect(
			matchesLoadoutSnapshotFilters(incompatibleDetails, {
				...base,
				selectedBossIds: [],
			}),
		).toBe(true);
	});

	it("matches an active Difficulty and accepts all difficulties", () => {
		const normal = snapshot("Normal", LOADOUT_SNAPSHOT_TAGS.CONQUEST, {
			difficulty: "normal",
			level: 1,
			clear_time: "00:12.34",
			boss_id: 38,
		});
		const normalWrongBoss = snapshot(
			"Normal wrong boss",
			LOADOUT_SNAPSHOT_TAGS.CONQUEST,
			{
				difficulty: "normal",
				level: 1,
				clear_time: "00:12.34",
				boss_id: 67,
			},
		);
		const abyss = snapshot("Abyss", LOADOUT_SNAPSHOT_TAGS.CONQUEST, {
			difficulty: "abyss",
			level: 1,
			clear_time: "00:12.34",
			boss_id: 38,
		});
		const missing = snapshot("Missing", LOADOUT_SNAPSHOT_TAGS.CONQUEST);
		const incompatible = snapshot(
			"Incompatible",
			LOADOUT_SNAPSHOT_TAGS.CONQUEST,
			{
				element_id: 1,
				score: 1,
			},
		);
		const base: LoadoutSnapshotFilters = {
			search: "",
			tag: LOADOUT_SNAPSHOT_TAGS.CONQUEST,
			selectedElementIds: [],
			selectedBossIds: [38],
			difficulty: "normal",
		};

		expect(matchesLoadoutSnapshotFilters(normal, base)).toBe(true);
		expect(matchesLoadoutSnapshotFilters(normalWrongBoss, base)).toBe(false);
		expect(matchesLoadoutSnapshotFilters(abyss, base)).toBe(false);
		expect(matchesLoadoutSnapshotFilters(missing, base)).toBe(false);
		expect(matchesLoadoutSnapshotFilters(incompatible, base)).toBe(false);
		expect(
			matchesLoadoutSnapshotFilters(abyss, { ...base, difficulty: null }),
		).toBe(true);
	});
});
