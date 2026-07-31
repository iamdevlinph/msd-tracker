export const CHARACTER_SKILLS = {
	BASIC: "basic",
	SWITCH: "switch",
	SPECIAL: "special",
	ULTIMATE: "ultimate",
} as const;

export type CharacterSkill =
	(typeof CHARACTER_SKILLS)[keyof typeof CHARACTER_SKILLS];
