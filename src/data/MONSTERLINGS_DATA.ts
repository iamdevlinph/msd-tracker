import { MONSTERLING_DATA_ELENDOR } from "@/data/MONSTERLING_DATA_ELENDOR";
import { MONSTER_LING_DATA_MUWON } from "@/data/MONSTERLING_DATA_MUWON";
import { MONSTER_LING_DATA_NAMRYUNG } from "@/data/MONSTERLING_DATA_NAMRYUNG";
import { MONSTERLING_DATA_SERENIA } from "@/data/MONSTERLING_DATA_SERENIA";
import { MONSTERLING_DATA_SURAH } from "@/data/MONSTERLING_DATA_SURAH";
import { MONSTERLING_DATA_VARHINE } from "@/data/MONSTERLING_DATA_VARHINE";

export type MonsterCodexEntry = {
	id: number;
	name: string;
	region_id: number;
	source_id: number[];
	image: string;
	element: string;
	ability: string;
	linkChain?: {
		trigger: [];
	};
};

// TODO: Double check [SOURCE_ID_BY_SOURCE.REQUEST] if can also capture

export const MONSTERLINGS_DATA: MonsterCodexEntry[] = [
	...MONSTERLING_DATA_ELENDOR,
	...MONSTERLING_DATA_VARHINE,
	...MONSTERLING_DATA_SERENIA,
	...MONSTERLING_DATA_SURAH,
	...MONSTER_LING_DATA_NAMRYUNG,
	...MONSTER_LING_DATA_MUWON,
];
