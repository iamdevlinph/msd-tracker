import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";

type UtcISOString = `${string}Z`;

export type ChecklistEvent = Omit<
	ChecklistDefinition,
	| "kind"
	| "startAt"
	| "endAt"
	| "recurrence"
	| "intervalDays"
	| "mode"
	| "dueDurationMinutes"
> & {
	kind: "event";
	startAt: UtcISOString;
	endAt: UtcISOString;
	recurrence?: "none" | "daily" | "weekly";
};

export const EVENTS_DATA: ChecklistEvent[] = [
	// Copy the published UTC date/time, add the year, and append Z. Do not convert
	// it to the player's timezone. Daily reset is 00:00Z; weekly reset is Monday
	// 00:00Z.
	{
		id: "100-day-launch-anniversary-check-in",
		title: "100 Day Launch Anniversary 14-Day Check-In Pass",
		noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
		kind: "event",
		startAt: "2026-07-22T00:00:00.000Z",
		endAt: "2026-08-11T23:59:00.000Z",
		recurrence: "daily",
	},
	{
		id: "100-day-anniversary-bonus-time",
		title: "Bonus Time Event",
		noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
		kind: "event",
		startAt: "2026-07-22T00:00:00.000Z",
		endAt: "2026-07-28T23:59:00.000Z",
		recurrence: "daily",
	},
];
