import {
	SOURCE_CAPTURE_ID,
	SOURCE_MUTATION_ID,
} from "@/components/monster-codex/data/SOURCE_MAPPING";
import type { MonsterCodexEntry } from "@/components/monster-codex/store/monster-codex-constants";

export const MONSTERLINGS_LIST: MonsterCodexEntry[] = [
	{
		id: 1,
		name: "Cappy",
		region_id: 1,
		source_id: SOURCE_CAPTURE_ID,
	},
	{
		id: 2,
		name: "Cappyberry",
		region_id: 1,
		source_id: SOURCE_CAPTURE_ID,
	},
	{
		id: 3,
		name: "Cappy Mama",
		region_id: 1,
		source_id: SOURCE_MUTATION_ID,
	},
];
