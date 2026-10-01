import { ELEMENT_ID_BY_ELEMENT } from "@/data/elements/ELEMENTS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import type { MonsterCodexData } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";

// for legendary monsterlings start the id with 100_001
export const MONSTERLING_DATA_LEGENDARY_MONSTERS: MonsterCodexData = {
	[100_001]: {
		id: 100_001,
		display_id: 1,
		name: "Reginula",
		linkChain: {
			unlock_level: 20,
			sort_order: 2,
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			name: "Star Waves",
			trigger: ["While equipped"],
			effect:
				"Accompanies the character into battle and actively participates in combat.",
		},
		image: "/images/Monsterling_Icons/MIcon_MonsterlingReginula.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE, // TODO: need to find out
		region_id: REGION_ID_BY_REGION.LEGENDARY,
		source_id: [SOURCE_ID_BY_SOURCE.LEGENDARY_CONQUEST], // TODO: keep or idk
		ability: "",
	},
	[100_002]: {
		id: 100_002,
		display_id: 2,
		name: "Sorin",
		linkChain: {
			unlock_level: 20,
			sort_order: 3,
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			name: "Sorin",
			trigger: ["Details pending"],
			effect: "Details pending",
		},
		image: "/images/Monsterling_Icons/MonsterlingSorin.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE, // TODO: need to find out
		region_id: REGION_ID_BY_REGION.LEGENDARY,
		source_id: [SOURCE_ID_BY_SOURCE.LEGENDARY_CONQUEST],
		ability: "",
	},
};
