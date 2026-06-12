type StatData = Record<
	StatId,
	{ id: StatId; trait: string; values: Record<TierId, number> }
>;

import { TIER_ID_BY_TIER, type TierId } from "@/data/TIERS_DATA";

export const STAT_ID_BY_STAT = {
	ICE_DMG: "Ice Dmg",
	FIRE_DMG: "Fire Dmg",
} as const;
export type StatId = (typeof STAT_ID_BY_STAT)[keyof typeof STAT_ID_BY_STAT];

export const STAT_DATA: StatData = {
	[STAT_ID_BY_STAT.ICE_DMG]: {
		id: STAT_ID_BY_STAT.ICE_DMG,
		trait: "Ice Damage",
		values: {
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
	},
	[STAT_ID_BY_STAT.FIRE_DMG]: {
		id: STAT_ID_BY_STAT.FIRE_DMG,
		trait: "Ice Damage",
		values: {
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
	},
};
