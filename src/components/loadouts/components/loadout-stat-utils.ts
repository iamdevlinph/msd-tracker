import { STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
import type { LoadoutStatKey } from "@/stores/loadouts-slice";

export const LOADOUT_STAT_DATA: Record<LoadoutStatKey, number> = {
	atk: STAT_ID_BY_STAT.ATK,
	hp: STAT_ID_BY_STAT.HP,
	crit_rate: STAT_ID_BY_STAT.CRIT_RATE,
	crit_dmg: STAT_ID_BY_STAT.CRIT_DMG,
	special_skill_cd: STAT_ID_BY_STAT.SPECIAL_SKILL_CD,
	elem_weak_dmg_boost: STAT_ID_BY_STAT.ELEM_WEAK_DMG_BOOST,
	boss_enemy_dmg_boost: STAT_ID_BY_STAT.BOSS_ENEMIES_DMG_BOOST,
};
