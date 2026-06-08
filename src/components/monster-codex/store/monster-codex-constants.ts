import { REGIONS_DATA } from "@/components/monster-codex/data/REGIONS_DATA";

export type MonsterCodexEntry = {
	id: number;
	name: string;
	region_id: number;
	source_id: number[];
	image: string;
	element: string;
	ability: string;
};

export const COMPLETE_FILTERS = ["all", "completed", "incomplete"] as const;
export type CompletedFilter = (typeof COMPLETE_FILTERS)[number];

export type MonsterCodexSource =
	| "all"
	| "capture"
	| "conquest"
	| "mutation"
	| "request";
export type MonsterCodexSourceData = Record<
	number,
	{ id: number; source: MonsterCodexSource; label: string }
>;
export const MONSTER_CODEX_REGION = REGIONS_DATA.map((item) => item.region);
export type MonsterCodexRegion = (typeof MONSTER_CODEX_REGION)[number];
