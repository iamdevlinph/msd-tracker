export type ChecklistKind = "event" | "permanent" | "custom";
export type ChecklistRecurrence = "none" | "daily" | "weekly" | "interval_days";
export type ChecklistMode = "fixed" | "after_completion";

export type ChecklistDefinition = {
	id: string;
	title: string;
	description?: string;
	noticeTitle?: string;
	kind: ChecklistKind;
	startAt: string;
	endAt?: string;
	recurrence?: ChecklistRecurrence;
	intervalDays?: number;
	mode?: ChecklistMode;
	dueDurationMinutes?: number;
};

export const PERMANENT_EVENTS: ChecklistDefinition[] = [
	{
		id: "dimensional-rift",
		title: "Dimensional Rift",
		kind: "permanent",
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: "weekly",
	},
	{
		id: "legendary-conquest",
		title: "Legendary Conquest",
		kind: "permanent",
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: "weekly",
	},
	{
		id: "conquest-daily",
		title: "Conquest",
		kind: "permanent",
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: "daily",
	},
	{
		id: "dispatch",
		title: "Dispatch",
		kind: "permanent",
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: "daily",
	},
];
