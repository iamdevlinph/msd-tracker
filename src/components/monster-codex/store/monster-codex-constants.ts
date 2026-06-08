import { REGIONS_DATA } from "@/components/monster-codex/data/REGIONS_DATA";
import { SOURCE_MAPPING } from "@/components/monster-codex/data/SOURCE_MAPPING";

export const MONSTER_CODEX_SOURCE = SOURCE_MAPPING.map((item) => item.source);
export type MonsterCodexSource = (typeof MONSTER_CODEX_SOURCE)[number];

export type MonsterCodexEntry = {
	id: number;
	name: string;
	region_id: number;
	source_id: number;
};

export const COMPLETE_FILTERS = ["all", "completed", "incomplete"] as const;
export type CompletedFilter = (typeof COMPLETE_FILTERS)[number];

export const MONSTER_CODEX_REGION = REGIONS_DATA.map((item) => item.region);
export type MonsterCodexRegion = (typeof MONSTER_CODEX_REGION)[number];
