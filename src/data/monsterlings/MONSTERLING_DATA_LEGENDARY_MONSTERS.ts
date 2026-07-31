import { ELEMENT_ID_BY_ELEMENT } from "@/data/elements/ELEMENTS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import type { MonsterCodexData } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";

// for legendary monsterlings start the id with 100_001
export const MONSTERLING_DATA_LEGENDARY_MONSTERS: MonsterCodexData = {
	[100_001]: {
		id: 100_001,
		display_id: 1,
		name: "Reginula",
		linkChain: {
			name: "Star Waves",
			trigger: ["While equipped"],
			effect:
				"Accompanies the character into battle and actively participates in combat.",
		},
		image: "/images/Monsterling_Icons/MIcon_MonsterlingReginula.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE, // TODO: need to find out
		region_id: REGION_ID_BY_REGION.LEGENDARY,
		source_id: [SOURCE_ID_BY_SOURCE.LEGENDARY_CONQUEST], // TODO: keep or idk
		ability: "",
	},
};
