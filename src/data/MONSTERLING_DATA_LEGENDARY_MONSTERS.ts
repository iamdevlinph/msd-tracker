import { ELEMENT_ID_BY_ELEMENT } from "@/data/ELEMENTS_DATA";
import type { MonsterCodexData } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

// for legendary monsterlings start the id with 100_001
export const MONSTERLING_DATA_LEGENDARY_MONSTERS: MonsterCodexData = {
	[100_001]: {
		id: 100_001,
		display_id: 1,
		name: "Reginula",
		image: "/images/Monsterling_Icons/MIcon_MonsterlingReginula.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE, // TODO: need to find out
		region_id: REGION_ID_BY_REGION.LEGENDARY,
		source_id: [SOURCE_ID_BY_SOURCE.LEGENDARY_CONQUEST], // TODO: keep or idk
		ability: "",
	},
};
