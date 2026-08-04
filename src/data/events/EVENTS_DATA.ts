import {
	CHECKLIST_KINDS,
	CHECKLIST_RECURRENCES,
	type ChecklistDefinition,
} from "@/data/checklist/CHECKLIST_DATA";

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
	kind: typeof CHECKLIST_KINDS.EVENT;
	startAt: UtcISOString;
	endAt: UtcISOString;
	recurrence?:
		| typeof CHECKLIST_RECURRENCES.NONE
		| typeof CHECKLIST_RECURRENCES.DAILY
		| typeof CHECKLIST_RECURRENCES.WEEKLY;
};

const SUMMER_DIVE_NOTICE_TITLE =
	"7/7 (Tue)「An Unforgettable First Summer Dive!」Event Notice";
const MABEL_EVENT_NOTICE_TITLE =
	"7/28 (Tue)「Inquisitor, Recorder of Reality and Phenomena Therein」Event Notice";
const MABEL_DISCORD_NOTICE_TITLE =
	"7/29 (Wed) Update Celebration! Two Discord Events";

export const EVENTS_DATA: ChecklistEvent[] = [
	// Copy the published UTC date/time, add the year, and append Z. Do not convert
	// it to the player's timezone. Daily reset is 00:00Z; weekly reset is Monday
	// 00:00Z.
	{
		id: "100-day-launch-anniversary-check-in",
		title: "100 Day Launch Anniversary 14-Day Check-In Pass",
		noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-22T00:00:00.000Z",
		endAt: "2026-08-11T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "unforgettable-first-summer-dive-shop-story-missions",
		title: "An Unforgettable First Summer Dive! — Shop/Story/Missions",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-08-04T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "monsterling-trait-change-support",
		title: "Monsterling Trait Change Support",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "legendary-monster-reginula-power-up-support",
		title: "Legendary Monster Reginula Power Up Support",
		noticeTitle: SUMMER_DIVE_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-07T00:00:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "inquisitors-day-off-event-stage-inquisition",
		title: "The Inquisitor's Day Off — Event Stage/Inquisition of the Lambs",
		noticeTitle: MABEL_EVENT_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-29T01:30:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "inquisitors-day-off-shop-story-missions",
		title: "The Inquisitor's Day Off — Shop/Story/Missions",
		noticeTitle: MABEL_EVENT_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-29T01:30:00.000Z",
		endAt: "2026-08-25T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "arbiters-divine-indulgence",
		title: "The Arbiter's Divine Indulgence",
		noticeTitle: MABEL_EVENT_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-29T01:30:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "inquisitor-mabel-7-day-gifts",
		title: "Inquisitor Mabel's 7-Day Gifts",
		noticeTitle: MABEL_EVENT_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-29T01:30:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
		recurrenceStartAt: "2026-07-29T00:00:00.000Z",
	},
	{
		id: "special-missions-with-mabel",
		title: "Special Missions with Mabel",
		noticeTitle: MABEL_EVENT_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-29T01:30:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "mabel-invitation-to-break-the-ice",
		title: "An Invitation to Break the Ice",
		noticeTitle: MABEL_EVENT_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-12T00:00:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "anomaly-blue-shadow",
		title: "Anomaly: Blue Shadow",
		noticeTitle: MABEL_EVENT_NOTICE_TITLE,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-05T00:00:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "mabel-update-check-in-discord",
		title: "Mabel Update Check-In!",
		noticeTitle: MABEL_DISCORD_NOTICE_TITLE,
		participation: "discord",
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-29T00:00:00.000Z",
		endAt: "2026-08-06T01:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "mabel-character-trivia-discord",
		title: "New Character Mabel Debut! Character Trivia Event",
		noticeTitle: MABEL_DISCORD_NOTICE_TITLE,
		participation: "discord",
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-07-29T00:00:00.000Z",
		endAt: "2026-08-19T01:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "forum.netmarble.com/stardive_gl/view/6/521-10-day-check-in",
		title: "10-Day Check-In Mission",
		noticeTitle: "8/5 (Wed) Event Notice",
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-05T00:00:00.000Z",
		endAt: "2026-08-18T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
];
