import {
	LOADOUT_SNAPSHOT_TAGS,
	type LoadoutSnapshotConquestBossId,
	type LoadoutSnapshotElement,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import type { LoadoutSnapshot } from "@/stores/loadout-snapshots-slice";

export const LOADOUT_SNAPSHOT_ALL_TAGS = "all" as const;
export type LoadoutSnapshotFilterTag =
	| LoadoutSnapshotTag
	| typeof LOADOUT_SNAPSHOT_ALL_TAGS;

export type LoadoutSnapshotFilters = {
	search: string;
	tag: LoadoutSnapshotFilterTag;
	selectedElementIds: LoadoutSnapshotElement[];
	selectedBossIds: LoadoutSnapshotConquestBossId[];
};

export const matchesLoadoutSnapshotFilters = (
	snapshot: LoadoutSnapshot,
	filters: LoadoutSnapshotFilters,
): boolean => {
	const query = filters.search.trim().toLocaleLowerCase();
	if (query && !snapshot.name.toLocaleLowerCase().includes(query)) return false;
	if (filters.tag !== LOADOUT_SNAPSHOT_ALL_TAGS && snapshot.tag !== filters.tag)
		return false;

	if (
		filters.tag === LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST &&
		filters.selectedElementIds.length > 0
	) {
		if (
			!snapshot.details ||
			!("element_id" in snapshot.details) ||
			!filters.selectedElementIds.includes(snapshot.details.element_id)
		)
			return false;
	}
	if (
		filters.tag === LOADOUT_SNAPSHOT_TAGS.CONQUEST &&
		filters.selectedBossIds.length > 0
	) {
		if (
			!snapshot.details ||
			!("difficulty" in snapshot.details) ||
			snapshot.details.boss_id === undefined ||
			!filters.selectedBossIds.includes(snapshot.details.boss_id)
		)
			return false;
	}

	return true;
};
