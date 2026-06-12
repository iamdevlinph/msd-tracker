import { TIER_ID_BY_TIER } from "@/data/TIERS_DATA";

export const STAT_ID_BY_STAT = {
	ICE_DMG: "Ice Dmg",
	FIRE_DMG: "Fire Dmg",
} as const;
export type StatId = (typeof STAT_ID_BY_STAT)[keyof typeof STAT_ID_BY_STAT];

export const STAT_DATA = {
	[STAT_ID_BY_STAT.ICE_DMG]: {
		id: STAT_ID_BY_STAT,
		trait: "Ice Damage",
		values: {
			[TIER_ID_BY_TIER.CHOICE_4]: 4,
			[TIER_ID_BY_TIER.PRIME_5]: 5,
		},
	},
};
