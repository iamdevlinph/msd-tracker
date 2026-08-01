export const LOADOUT_TARGET_TYPES = {
	CHARACTER: "character",
	MONSTERLING: "monsterling",
	ARTIFACT: "artifact",
	EQUIPMENT: "equipment",
} as const;
export type LoadoutTargetType =
	(typeof LOADOUT_TARGET_TYPES)[keyof typeof LOADOUT_TARGET_TYPES];

export const LOADOUT_IMAGE_ACTIONS = {
	COPY: "copy",
	DOWNLOAD: "download",
} as const;
export type LoadoutImageAction =
	(typeof LOADOUT_IMAGE_ACTIONS)[keyof typeof LOADOUT_IMAGE_ACTIONS];

export const LOADOUT_ACTION_SOURCES = {
	CARD: "card",
	PREVIEW: "preview",
} as const;
export type LoadoutActionSource =
	(typeof LOADOUT_ACTION_SOURCES)[keyof typeof LOADOUT_ACTION_SOURCES];
