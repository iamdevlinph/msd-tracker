export const CHECKLIST_KINDS = {
	EVENT: "event",
	PERMANENT: "permanent",
	CUSTOM: "custom",
} as const;
export type ChecklistKind =
	(typeof CHECKLIST_KINDS)[keyof typeof CHECKLIST_KINDS];

export const CHECKLIST_RECURRENCES = {
	NONE: "none",
	DAILY: "daily",
	WEEKLY: "weekly",
	INTERVAL_DAYS: "interval_days",
} as const;
export type ChecklistRecurrence =
	(typeof CHECKLIST_RECURRENCES)[keyof typeof CHECKLIST_RECURRENCES];
export const CHECKLIST_RECURRENCE_VALUES = [
	CHECKLIST_RECURRENCES.NONE,
	CHECKLIST_RECURRENCES.DAILY,
	CHECKLIST_RECURRENCES.WEEKLY,
	CHECKLIST_RECURRENCES.INTERVAL_DAYS,
] as const;
export const CHECKLIST_EVENT_RECURRENCE_VALUES = [
	CHECKLIST_RECURRENCES.NONE,
	CHECKLIST_RECURRENCES.DAILY,
	CHECKLIST_RECURRENCES.WEEKLY,
] as const;

export const CHECKLIST_MODES = {
	FIXED: "fixed",
	AFTER_COMPLETION: "after_completion",
} as const;
export type ChecklistMode =
	(typeof CHECKLIST_MODES)[keyof typeof CHECKLIST_MODES];
export const CHECKLIST_MODE_VALUES = [
	CHECKLIST_MODES.FIXED,
	CHECKLIST_MODES.AFTER_COMPLETION,
] as const;

// Shared by Rift and seasonal definitions; increment after official activity refreshes.
export const CURRENT_SEASON_COMPLETION_VERSION = 2;

export type ChecklistDefinition = {
	id: string;
	title: string;
	description?: string;
	noticeTitle?: string;
	kind: ChecklistKind;
	startAt: string;
	/** Optional UTC anchor for recurring resets after the initial launch. */
	recurrenceStartAt?: string;
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
		kind: CHECKLIST_KINDS.PERMANENT,
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.WEEKLY,
		completionVersion: CURRENT_SEASON_COMPLETION_VERSION,
	},
	{
		id: "monster-race",
		title: "Monster Race",
		kind: CHECKLIST_KINDS.PERMANENT,
		startAt: "2026-07-29T01:30:00.000Z",
		completionVersion: CURRENT_SEASON_COMPLETION_VERSION,
		seasonal: true,
	},
	{
		id: "legendary-conquest",
		title: "Legendary Conquest",
		kind: CHECKLIST_KINDS.PERMANENT,
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.WEEKLY,
	},
	{
		id: "conquest-daily",
		title: "Conquest",
		kind: CHECKLIST_KINDS.PERMANENT,
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "dispatch",
		title: "Dispatch",
		kind: CHECKLIST_KINDS.PERMANENT,
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "request-board",
		title: "Request Board",
		kind: CHECKLIST_KINDS.PERMANENT,
		startAt: "2024-01-01T00:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
];
