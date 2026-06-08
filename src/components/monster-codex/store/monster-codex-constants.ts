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
