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

const SUMMER_DIVE_NOTICE_TITLE =
	"7/7 (Tue)「An Unforgettable First Summer Dive!」Event Notice";

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
	{
		id: "grand-summer-festival-missions",
		title: "Grand Summer Festival Missions",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-07-28T23:59:00.000Z",
		recurrence: "none",
	},
	{
		id: "unforgettable-first-summer-dive-event-stage",
		title: "An Unforgettable First Summer Dive! — Event Stage/Summer Bounce",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-07-28T23:59:00.000Z",
		recurrence: "none",
	},
	{
		id: "unforgettable-first-summer-dive-shop-story-missions",
		title: "An Unforgettable First Summer Dive! — Shop/Story/Missions",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-08-04T23:59:00.000Z",
		recurrence: "none",
	},
	{
		id: "slicing-through-the-summer-days",
		title: "Slicing Through the Summer Days",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-07-28T23:59:00.000Z",
		recurrence: "none",
	},
	{
		id: "embracing-even-the-summer-heat",
		title: "Embracing Even the Summer Heat",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-07-28T23:59:00.000Z",
		recurrence: "none",
	},
	{
		id: "summer-special-7-day-gifts",
		title: "Summer Special 7-Day Gifts",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-07-28T23:59:00.000Z",
		recurrence: "daily",
	},
	{
		id: "monsterling-trait-change-support",
		title: "Monsterling Trait Change Support",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: "none",
	},
	{
		id: "legendary-monster-reginula-power-up-support",
		title: "Legendary Monster Reginula Power Up Support",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: "none",
	},
	{
		id: "invitation-to-break-the-ice",
		title: "An Invitation to Break the Ice",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-22T00:00:00.000Z",
		endAt: "2026-07-28T23:59:00.000Z",
		recurrence: "none",
	},
	{
		id: "anomaly-gulgak",
		title: "Anomaly: Gulgak",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: "event",
		startAt: "2026-07-15T00:00:00.000Z",
		endAt: "2026-07-28T23:59:00.000Z",
		recurrence: "daily",
	},
];
