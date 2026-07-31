import { ELEMENT_ID_BY_ELEMENT } from "@/data/elements/ELEMENTS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import type { MonsterCodexData } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";

// for events monsterlings start with 200_001
export const MONSTERLING_DATA_EVENTS: MonsterCodexData = {
	[200_001]: {
		id: 200_001,
		display_id: 1,
		name: "Cappy: Summer Dive!",
		image: "/images/Monsterling_Icons/MonsterlingChopySummer.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.EVENTS,
		source_id: [SOURCE_ID_BY_SOURCE.EVENTS], // TODO: keep or idk
		ability: "",
	},
	[200_002]: {
		id: 200_002,
		display_id: 2,
		name: "Slimelet: Summer Dive!",
		image: "/images/Monsterling_Icons/MonsterlingSlimeSummer.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.EVENTS,
		source_id: [SOURCE_ID_BY_SOURCE.EVENTS], // TODO: keep or idk
		ability: "",
	},
	[200_003]: {
		id: 200_003,
		display_id: 3,
		name: "Shellymander: Summer Dive!",
		image: "/images/Monsterling_Icons/MonsterlingSoranyongSummer.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.EVENTS,
		source_id: [SOURCE_ID_BY_SOURCE.EVENTS], // TODO: keep or idk
		ability: "",
	},
};
