import {
	ELEMENT_ID_BY_ELEMENT,
	type ElementId,
} from "@/data/elements/ELEMENTS_DATA";
import { STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
import type { LoadoutStatKey } from "@/stores/loadouts-slice";

type StaticLoadoutStatKey = Exclude<LoadoutStatKey, "element_atk">;

export const LOADOUT_STAT_DATA: Record<StaticLoadoutStatKey, number> = {
	atk: STAT_ID_BY_STAT.ATK,
	hp: STAT_ID_BY_STAT.HP,
	crit_rate: STAT_ID_BY_STAT.CRIT_RATE,
	crit_dmg: STAT_ID_BY_STAT.CRIT_DMG,
	special_skill_cd: STAT_ID_BY_STAT.SPECIAL_SKILL_CD,
	elem_weak_dmg_boost: STAT_ID_BY_STAT.ELEM_WEAK_DMG_BOOST,
	boss_enemy_dmg_boost: STAT_ID_BY_STAT.BOSS_ENEMIES_DMG_BOOST,
};

export const ELEMENT_ATK_STAT_DATA: Record<ElementId, number> = {
	[ELEMENT_ID_BY_ELEMENT.EARTH]: STAT_ID_BY_STAT.EARTH_DMG,
	[ELEMENT_ID_BY_ELEMENT.FIRE]: STAT_ID_BY_STAT.FIRE_DMG,
	[ELEMENT_ID_BY_ELEMENT.ICE]: STAT_ID_BY_STAT.ICE_DMG,
	[ELEMENT_ID_BY_ELEMENT.LIGHTNING]: STAT_ID_BY_STAT.LIGHTNING_DMG,
	[ELEMENT_ID_BY_ELEMENT.WIND]: STAT_ID_BY_STAT.WIND_DMG,
	// No dedicated Water/Dark assets exist; retain a safe stat icon fallback.
	[ELEMENT_ID_BY_ELEMENT.WATER]: STAT_ID_BY_STAT.PHYS_DMG,
	[ELEMENT_ID_BY_ELEMENT.DARK]: STAT_ID_BY_STAT.PHYS_DMG,
	[ELEMENT_ID_BY_ELEMENT.PHYSICAL]: STAT_ID_BY_STAT.PHYS_DMG,
};
