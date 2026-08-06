export const LOADOUT_SNAPSHOT_TAGS = {
	CONQUEST: "conquest",
	RIFT: "rift",
	LEGENDARY_CONQUEST: "legendary_conquest",
	OTHERS: "others",
} as const;
export type LoadoutSnapshotTag =
	(typeof LOADOUT_SNAPSHOT_TAGS)[keyof typeof LOADOUT_SNAPSHOT_TAGS];

export const LOADOUT_SNAPSHOT_DIFFICULTIES = {
	NORMAL: "normal",
	RAGING: "raging",
	AWAKENED: "awakened",
	VOID: "void",
	ABYSS: "abyss",
} as const;
export type LoadoutSnapshotDifficulty =
	(typeof LOADOUT_SNAPSHOT_DIFFICULTIES)[keyof typeof LOADOUT_SNAPSHOT_DIFFICULTIES];
export const LOADOUT_SNAPSHOT_DIFFICULTY_LABELS: Record<
	LoadoutSnapshotDifficulty,
	string
> = {
	normal: "Normal",
	raging: "Raging",
	awakened: "Awakened",
	void: "Void",
	abyss: "Abyss",
};
export const LOADOUT_SNAPSHOT_DIFFICULTY_OPTIONS = Object.values(
	LOADOUT_SNAPSHOT_DIFFICULTIES,
).map((value) => ({
	value,
	label: LOADOUT_SNAPSHOT_DIFFICULTY_LABELS[value],
}));

export const LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS = [
	38, 67, 94, 119, 143, 164,
] as const;
export type LoadoutSnapshotConquestBossId =
	(typeof LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS)[number];

// Keep these IDs aligned with the canonical game element catalog.
export const LOADOUT_SNAPSHOT_ELEMENTS = {
	EARTH: 1,
	FIRE: 2,
	ICE: 3,
	LIGHTNING: 4,
	WIND: 5,
} as const;
export type LoadoutSnapshotElement =
	(typeof LOADOUT_SNAPSHOT_ELEMENTS)[keyof typeof LOADOUT_SNAPSHOT_ELEMENTS];
export const LOADOUT_SNAPSHOT_ELEMENT_LABELS: Record<
	LoadoutSnapshotElement,
	string
> = {
	1: "Earth",
	2: "Fire",
	3: "Ice",
	4: "Lightning",
	5: "Wind",
};
export const LOADOUT_SNAPSHOT_ELEMENT_OPTIONS = Object.values(
	LOADOUT_SNAPSHOT_ELEMENTS,
).map((value) => ({ value, label: LOADOUT_SNAPSHOT_ELEMENT_LABELS[value] }));

export const LOADOUT_SNAPSHOT_TAG_LABELS: Record<LoadoutSnapshotTag, string> = {
	[LOADOUT_SNAPSHOT_TAGS.CONQUEST]: "Conquest",
	[LOADOUT_SNAPSHOT_TAGS.RIFT]: "Rift",
	[LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST]: "Legendary Conquest",
	[LOADOUT_SNAPSHOT_TAGS.OTHERS]: "Others",
};

export const LOADOUT_SNAPSHOT_TAG_STYLES: Record<LoadoutSnapshotTag, string> = {
	[LOADOUT_SNAPSHOT_TAGS.CONQUEST]:
		"border-rose-300 bg-rose-100 text-rose-700 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-300",
	[LOADOUT_SNAPSHOT_TAGS.RIFT]:
		"border-violet-300 bg-violet-100 text-violet-700 dark:border-violet-700 dark:bg-violet-950 dark:text-violet-300",
	[LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST]:
		"border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300",
	[LOADOUT_SNAPSHOT_TAGS.OTHERS]:
		"border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
};

export const LOADOUT_SNAPSHOT_SORTS = {
	NAME_ASC: "name-asc",
	NAME_DESC: "name-desc",
	CREATED_ASC: "created-asc",
	CREATED_DESC: "created-desc",
} as const;
export type LoadoutSnapshotSort =
	(typeof LOADOUT_SNAPSHOT_SORTS)[keyof typeof LOADOUT_SNAPSHOT_SORTS];
