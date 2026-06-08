export type MonsterCodexSource =
	| "all"
	| "capture"
	| "conquest"
	| "mutation"
	| "request";
export type MonsterCodexSourceData = Record<
	SourceId,
	{ id: SourceId; source: MonsterCodexSource; label: string }
>;

export const SOURCE_ID_BY_SOURCE = {
	ALL: 0,
	CAPTURE: 1,
	CONQUEST: 2,
	MUTATION: 3,
	REQUEST: 4,
} as const;
export type SourceId =
	(typeof SOURCE_ID_BY_SOURCE)[keyof typeof SOURCE_ID_BY_SOURCE];

export const MONSTERLINGS_SOURCE_DATA: MonsterCodexSourceData = {
	0: {
		id: SOURCE_ID_BY_SOURCE.ALL,
		source: "all",
		label: "All",
	},
	1: {
		id: SOURCE_ID_BY_SOURCE.CAPTURE,
		source: "capture",
		label: "Capture",
	},
	2: {
		id: SOURCE_ID_BY_SOURCE.CONQUEST,
		source: "conquest",
		label: "Conquest",
	},
	3: {
		id: SOURCE_ID_BY_SOURCE.MUTATION,
		source: "mutation",
		label: "Mutation",
	},
	4: {
		id: SOURCE_ID_BY_SOURCE.REQUEST,
		source: "request",
		label: "Request Board",
	},
};
