export const SOURCE_CAPTURE_ID = 1;
export const SOURCE_CONQUEST_ID = 2;
export const SOURCE_MUTATION_ID = 3;
export const SOURCE_REQUEST_ID = 4;

export const SOURCE_MAPPING = [
	{
		id: "all",
		source: "all",
		label: "All",
	},
	{
		id: SOURCE_CAPTURE_ID,
		source: "capture",
		label: "Capture",
	},
	{
		id: SOURCE_CONQUEST_ID,
		source: "conquest",
		label: "Conquest",
	},
	{
		id: SOURCE_MUTATION_ID,
		source: "mutation",
		label: "Mutation",
	},
	{
		id: SOURCE_REQUEST_ID,
		source: "request",
		label: "Request Board",
	},
] as const;
