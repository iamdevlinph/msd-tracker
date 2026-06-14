type StatData = Record<
	StatId,
	{
		id: StatId;
		stat: string;
		values: Record<TierId, number>;
		image: string;
		label: string; // label displayed on the monsterling trait
	}
>;

import { TIER_ID_BY_TIER, type TierId } from "@/data/TIERS_DATA";

export const STAT_ID_BY_STAT = {
	PHYS_DMG: "PHYS_DMG",
	ICE_DMG: "ICE_DMG",
	FIRE_DMG: "FIRE_DMG",
	EARTH_DMG: "EARTH_DMG",
	LIGHTNING_DMG: "LIGHTNING_DMG",
	WIND_DMG: "WIND_DMG",
	ATK: "ATK",
	DEF: "DEF",
	HP: "HP",
	CRIT_RATE: "CRIT_RATE",
	CRIT_DMG: "CRIT_DMG",
	SUPPORT_DMG_BOOST: "SUPPORT_DMG_BOOST",
	SUPPRESSION_DMG_BOOST: "SUPPRESSION_DMG_BOOST",
	BRAWL_DMG_BOOST: "BRAWL_DMG_BOOST",
	NEUTRALIZATION_DMG_BOOST: "NEUTRALIZATION_DMG_BOOST",
	NORMAL_ENEMIES_DMG_BOOST: "NORMAL_ENEMIES_DMG_BOOST",
	BOSS_ENEMIES_DMG_BOOST: "BOSS_ENEMIES_DMG_BOOST",
	SPECIAL_SKILL_CD: "SPECIAL_SKILL_CD",
	ELEM_WEAK_DMG_BOOST: "ELEM_WEAK_DMG_BOOST",
} as const;
export type StatId = (typeof STAT_ID_BY_STAT)[keyof typeof STAT_ID_BY_STAT];

export const STAT_DATA: StatData = {
	[STAT_ID_BY_STAT.ATK]: {
		id: STAT_ID_BY_STAT.ATK,
		stat: "ATK",
		label: "ATK",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_atk.png",
	},
	[STAT_ID_BY_STAT.DEF]: {
		id: STAT_ID_BY_STAT.DEF,
		stat: "DEF",
		label: "DEF",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_def.png",
	},
	[STAT_ID_BY_STAT.HP]: {
		id: STAT_ID_BY_STAT.HP,
		stat: "HP",
		label: "HP",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_hp.png",
	},
	[STAT_ID_BY_STAT.CRIT_RATE]: {
		id: STAT_ID_BY_STAT.CRIT_RATE,
		stat: "Crit Rate",
		label: "Crit Rate",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_critical_rate.png",
	},
	[STAT_ID_BY_STAT.CRIT_DMG]: {
		id: STAT_ID_BY_STAT.CRIT_DMG,
		stat: "Crit DMG",
		label: "Crit DMG",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_critical_damage.png",
	},

	[STAT_ID_BY_STAT.SUPPORT_DMG_BOOST]: {
		id: STAT_ID_BY_STAT.SUPPORT_DMG_BOOST,
		stat: "Support DMG Boost",
		label: "Support Skill DMG",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/Icon_Stat_support_dmg_rate.png",
	},
	[STAT_ID_BY_STAT.SUPPRESSION_DMG_BOOST]: {
		id: STAT_ID_BY_STAT.SUPPRESSION_DMG_BOOST,
		stat: "Suppression DMG Boost",
		label: "Suppression DMG",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_force.png",
	},
	[STAT_ID_BY_STAT.BRAWL_DMG_BOOST]: {
		id: STAT_ID_BY_STAT.BRAWL_DMG_BOOST,
		stat: "Brawl DMG Boost",
		label: "Brawl DMG",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_tussle_atk_rate.png",
	},
	[STAT_ID_BY_STAT.NEUTRALIZATION_DMG_BOOST]: {
		id: STAT_ID_BY_STAT.NEUTRALIZATION_DMG_BOOST,
		stat: "Neutralization DMG Boost",
		label: "Neutralization DMG",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_stagger_rate.png",
	},

	[STAT_ID_BY_STAT.NORMAL_ENEMIES_DMG_BOOST]: {
		id: STAT_ID_BY_STAT.NORMAL_ENEMIES_DMG_BOOST,
		stat: "DMG Boost against normal enemies",
		label: "DMG to Normal Enemies",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_normal_mob_atk_rate.png",
	},
	[STAT_ID_BY_STAT.BOSS_ENEMIES_DMG_BOOST]: {
		id: STAT_ID_BY_STAT.BOSS_ENEMIES_DMG_BOOST,
		stat: "DMG Boost against boss enemies",
		label: "DMG to Boss Enemies",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_boss_mob_atk_rate.png",
	},
	[STAT_ID_BY_STAT.SPECIAL_SKILL_CD]: {
		id: STAT_ID_BY_STAT.SPECIAL_SKILL_CD,
		stat: "Special Skill Cooldown Reduction",
		label: "Special Skill Cooldown",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_active_cooltime_reduce_rate.png",
	},
	[STAT_ID_BY_STAT.ELEM_WEAK_DMG_BOOST]: {
		id: STAT_ID_BY_STAT.ELEM_WEAK_DMG_BOOST,
		stat: "Elemental Weakness DMG Boost",
		label: "Elemental Weakness DMG",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_weakness_atk.png",
	},
	[STAT_ID_BY_STAT.PHYS_DMG]: {
		id: STAT_ID_BY_STAT.PHYS_DMG,
		stat: "Physical DMG Boost",
		label: "Physical DMG Boost",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_atk_physical.png",
	},
	[STAT_ID_BY_STAT.FIRE_DMG]: {
		id: STAT_ID_BY_STAT.FIRE_DMG,
		stat: "Fire DMG Boost",
		label: "Fire DMG Boost",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_fire_atk.png",
	},
	[STAT_ID_BY_STAT.ICE_DMG]: {
		id: STAT_ID_BY_STAT.ICE_DMG,
		stat: "Ice DMG Boost",
		label: "Ice DMG Boost",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_ice_atk.png",
	},
	[STAT_ID_BY_STAT.WIND_DMG]: {
		id: STAT_ID_BY_STAT.WIND_DMG,
		stat: "Wind DMG Boost",
		label: "Wind DMG Boost",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_wind_atk.png",
	},
	[STAT_ID_BY_STAT.LIGHTNING_DMG]: {
		id: STAT_ID_BY_STAT.LIGHTNING_DMG,
		stat: "Lightning DMG Boost",
		label: "Lightning DMG Boost",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_lightning_atk.png",
	},
	[STAT_ID_BY_STAT.EARTH_DMG]: {
		id: STAT_ID_BY_STAT.EARTH_DMG,
		stat: "Earth DMG Boost",
		label: "Earth DMG Boost",
		values: {
			[TIER_ID_BY_TIER.FODDER_1]: 11,
			[TIER_ID_BY_TIER.STANDARD_2]: 11,
			[TIER_ID_BY_TIER.SELECT_3]: 11,
			[TIER_ID_BY_TIER.CHOICE_4]: 11,
			[TIER_ID_BY_TIER.PRIME_5]: 22,
		},
		image: "/images/Icon_Stat/icon_stat_earth_atk.png",
	},
};
