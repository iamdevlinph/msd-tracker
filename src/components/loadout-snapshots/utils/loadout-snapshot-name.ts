import {
	LOADOUT_SNAPSHOT_TAG_LABELS,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";

const SNAPSHOT_TAG_PREFIX = /^(Conquest|Rift|Legendary Conquest|Others) - /;

/** Prefix a newly-created snapshot with the default Others category. */
export const formatNewLoadoutSnapshotName = (loadoutName: string): string =>
	`Others - ${loadoutName.trim()}`;

/** Replace a canonical category prefix while retaining the editable name suffix. */
export const formatLoadoutSnapshotNameForTag = (
	name: string,
	tag: LoadoutSnapshotTag,
): string => {
	const trimmedName = name.trim();
	const suffix = trimmedName.replace(SNAPSHOT_TAG_PREFIX, "");
	return `${LOADOUT_SNAPSHOT_TAG_LABELS[tag]} - ${suffix}`;
};
