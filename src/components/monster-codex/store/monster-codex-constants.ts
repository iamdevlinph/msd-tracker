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

export type MonsterCodexRegion =
	| "all"
	| "elendor"
	| "muwon"
	| "namryung"
	| "serenia"
	| "surah"
	| "varhine";
export type MonsterCodexRegionData = Record<
	number,
	{ id: number; region: MonsterCodexRegion; image: string }
>;
