import type { ElementId } from "@/data/elements/ELEMENTS_DATA";
import type { SourceId } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import { MONSTERLING_DATA_ELENDOR } from "@/data/monsterlings/MONSTERLING_DATA_ELENDOR";
import { MONSTERLING_DATA_EVENTS } from "@/data/monsterlings/MONSTERLING_DATA_EVENTS";
import { MONSTERLING_DATA_LEGENDARY_MONSTERS } from "@/data/monsterlings/MONSTERLING_DATA_LEGENDARY_MONSTERS";
import { MONSTERLING_DATA_MUWON } from "@/data/monsterlings/MONSTERLING_DATA_MUWON";
import { MONSTERLING_DATA_NAMRYUNG } from "@/data/monsterlings/MONSTERLING_DATA_NAMRYUNG";
import { MONSTERLING_DATA_SERENIA } from "@/data/monsterlings/MONSTERLING_DATA_SERENIA";
import { MONSTERLING_DATA_SURAH } from "@/data/monsterlings/MONSTERLING_DATA_SURAH";
import { MONSTERLING_DATA_VARHINE } from "@/data/monsterlings/MONSTERLING_DATA_VARHINE";
import type { RegionId } from "@/data/regions/REGIONS_DATA";
import type { TierId } from "@/data/tiers/TIERS_DATA";

export type MonsterCodexEntry = {
	id: number;
	display_id?: number;
	name: string;
	region_id: RegionId;
	source_id: SourceId[];
	image: string;
	element_id: ElementId;
	ability: string;
	linkChain?: {
		name: string;
		tier_id: TierId;
		trigger: string[];
		effect: string;
		bonusEffects?: string[];
		unlock_level: number;
	};
};

// TODO: Double check [SOURCE_ID_BY_SOURCE.REQUEST] if can also capture
export type MonsterCodexData = Record<number, MonsterCodexEntry>;

export const MONSTERLINGS_DATA: MonsterCodexData = {
	...MONSTERLING_DATA_ELENDOR,
	...MONSTERLING_DATA_VARHINE,
	...MONSTERLING_DATA_SERENIA,
	...MONSTERLING_DATA_SURAH,
	...MONSTERLING_DATA_NAMRYUNG,
	...MONSTERLING_DATA_MUWON,
	...MONSTERLING_DATA_LEGENDARY_MONSTERS,
	...MONSTERLING_DATA_EVENTS,
};
