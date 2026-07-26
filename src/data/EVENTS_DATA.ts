import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";

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
	startAt: string;
	endAt: string;
	recurrence?: "none" | "daily" | "weekly";
};

export const EVENTS_DATA: ChecklistEvent[] = [
	// Copyable example (reset-aligned ISO timestamps use 00:00Z for 08:00 GMT+8;
	// weekly anchors should be Monday 00:00Z):
	// {
	// 	id: "limited-event",
	// 	title: "Limited Event",
	// 	kind: "event",
	// 	startAt: "2026-07-27T00:00:00.000Z",
	// 	endAt: "2026-08-03T00:00:00.000Z",
	// 	recurrence: "daily",
	// },
];
