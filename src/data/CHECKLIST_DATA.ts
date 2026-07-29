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
	completionVersion?: number;
	participation?: "discord";
	seasonal?: boolean;
};

export const PERMANENT_EVENTS: ChecklistDefinition[] = [
	{
		id: "dimensional-rift",
		title: "Dimensional Rift",
		kind: "permanent",
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: "weekly",
		completionVersion: 2,
	},
	{
		id: "monster-race",
		title: "Monster Race",
		kind: "permanent",
		startAt: "2026-07-29T01:30:00.000Z",
		completionVersion: 1,
		seasonal: true,
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
	{
		id: "request-board",
		title: "Request Board",
		kind: "permanent",
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: "daily",
	},
];
