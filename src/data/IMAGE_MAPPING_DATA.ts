export const IMAGE_MAPPING_ID = {
	AWAKENING: "awakening",
	SKILL_BASIC: "skill.basic",
	SKILL_SWITCH: "skill.switch",
	SKILL_SPECIAL: "skill.special",
	SKILL_ULTIMATE: "skill.ultimate",
} as const;
export type MiscId = (typeof IMAGE_MAPPING_ID)[keyof typeof IMAGE_MAPPING_ID];

type MiscData = Record<MiscId, { id: MiscId; image: string }>;

export const IMAGE_MAPPING: MiscData = {
	[IMAGE_MAPPING_ID.AWAKENING]: {
		id: IMAGE_MAPPING_ID.AWAKENING,
		image: "/images/Misc/awakening-icon.png",
	},
	[IMAGE_MAPPING_ID.SKILL_BASIC]: {
		id: IMAGE_MAPPING_ID.SKILL_BASIC,
		image: "/images/Misc/skill-basic.png",
	},
	[IMAGE_MAPPING_ID.SKILL_SWITCH]: {
		id: IMAGE_MAPPING_ID.SKILL_SWITCH,
		image: "/images/Misc/skill-switch.png",
	},
	[IMAGE_MAPPING_ID.SKILL_SPECIAL]: {
		id: IMAGE_MAPPING_ID.SKILL_SPECIAL,
		image: "/images/Misc/skill-special.png",
	},
	[IMAGE_MAPPING_ID.SKILL_ULTIMATE]: {
		id: IMAGE_MAPPING_ID.SKILL_ULTIMATE,
		image: "/images/Misc/skill-ultimate.png",
	},
};
