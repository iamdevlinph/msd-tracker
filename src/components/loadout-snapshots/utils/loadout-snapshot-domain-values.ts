export const LOADOUT_SNAPSHOT_TAGS = {
	CONQUEST: "conquest",
	RIFT: "rift",
	LEGENDARY_CONQUEST: "legendary_conquest",
	OTHERS: "others",
} as const;
export type LoadoutSnapshotTag =
	(typeof LOADOUT_SNAPSHOT_TAGS)[keyof typeof LOADOUT_SNAPSHOT_TAGS];

export const LOADOUT_SNAPSHOT_TAG_LABELS: Record<LoadoutSnapshotTag, string> = {
	[LOADOUT_SNAPSHOT_TAGS.CONQUEST]: "Conquest",
	[LOADOUT_SNAPSHOT_TAGS.RIFT]: "Rift",
	[LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST]: "Legendary Conquest",
	[LOADOUT_SNAPSHOT_TAGS.OTHERS]: "Others",
};

export const LOADOUT_SNAPSHOT_SORTS = {
	NAME_ASC: "name-asc",
	NAME_DESC: "name-desc",
	CREATED_ASC: "created-asc",
	CREATED_DESC: "created-desc",
} as const;
export type LoadoutSnapshotSort =
	(typeof LOADOUT_SNAPSHOT_SORTS)[keyof typeof LOADOUT_SNAPSHOT_SORTS];
