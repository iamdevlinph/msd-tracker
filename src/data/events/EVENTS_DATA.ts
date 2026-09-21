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

const VIVIAN_NOTICE_TITLE = "9/8 (Tue) Event Notice";
const VIVIAN_NOTICE_URL = "https://forum.netmarble.com/stardive_gl/view/6/600";
const SEPTEMBER_16_NOTICE_TITLE = "9/16 (Wed) Event Notice";
const SEPTEMBER_16_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/611";
const SEPTEMBER_22_NOTICE_TITLE = "9/22 (Wed) Event Notice";
const SEPTEMBER_22_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/626";

export const EVENTS_DATA: ChecklistEvent[] = [
	// Fixed daily schedules reset at 00:00Z unless recurrenceStartAt is set.
	{
		id: "600-moonlight-bunny-show-event-stage-chase-the-bunny",
		title: "Moonlight Bunny Show — Event Stage/Chase the Bunny!",
		noticeTitle: VIVIAN_NOTICE_TITLE,
		noticeUrl: `${VIVIAN_NOTICE_URL}#:~:text=Event%201.%20Moonlight%20Bunny%20Show`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-09T00:00:00.000Z",
		endAt: "2026-09-29T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "600-moonlight-bunny-show-shop-story-missions",
		title: "Moonlight Bunny Show — Shop/Story/Missions",
		noticeTitle: VIVIAN_NOTICE_TITLE,
		noticeUrl: `${VIVIAN_NOTICE_URL}#:~:text=Event%201.%20Moonlight%20Bunny%20Show`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-09T00:00:00.000Z",
		endAt: "2026-10-06T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "600-secret-fanservice-for-my-biggest-fans",
		title: "Secret Fanservice for My Biggest Fans",
		noticeTitle: VIVIAN_NOTICE_TITLE,
		noticeUrl: `${VIVIAN_NOTICE_URL}#:~:text=Event%202.%20Secret%20Fanservice%20for%20My%20Biggest%20Fans`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-09T00:00:00.000Z",
		endAt: "2026-09-29T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "600-vivians-7-day-gifts",
		title: "Vivian’s 7-Day Gifts",
		noticeTitle: VIVIAN_NOTICE_TITLE,
		noticeUrl: `${VIVIAN_NOTICE_URL}#:~:text=Event%203.%20Vivian%E2%80%99s%207-Day%20Gifts`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-09T00:00:00.000Z",
		endAt: "2026-09-29T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "600-special-missions-with-vivian",
		title: "Special Missions with Vivian",
		noticeTitle: VIVIAN_NOTICE_TITLE,
		noticeUrl: `${VIVIAN_NOTICE_URL}#:~:text=Event%204.%20Special%20Missions%20with%20Vivian`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-09T00:00:00.000Z",
		endAt: "2026-09-29T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "600-anomaly-amons-shadow",
		title: "Anomaly: Amon's Shadow",
		noticeTitle: VIVIAN_NOTICE_TITLE,
		noticeUrl: `${VIVIAN_NOTICE_URL}#:~:text=Event%206.%20Anomaly%3A%20Amon's%20Shadow`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-16T00:00:00.000Z",
		endAt: "2026-09-29T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "600-an-invitation-to-break-the-ice",
		title: "An Invitation to Break the Ice",
		noticeTitle: VIVIAN_NOTICE_TITLE,
		noticeUrl: `${VIVIAN_NOTICE_URL}#:~:text=Event%207.%20An%20Invitation%20to%20Break%20the%20Ice`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-23T00:00:00.000Z",
		endAt: "2026-09-29T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "611-combine-monsterlings-missions",
		title: "Combine Monsterlings Missions",
		noticeTitle: SEPTEMBER_16_NOTICE_TITLE,
		noticeUrl: `${SEPTEMBER_16_NOTICE_URL}#:~:text=Event%201.%20Combine%20Monsterlings%20Missions`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-16T00:00:00.000Z",
		endAt: "2026-09-22T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "611-10-day-check-in-mission",
		title: "10-Day Check-In Mission",
		noticeTitle: SEPTEMBER_16_NOTICE_TITLE,
		noticeUrl: `${SEPTEMBER_16_NOTICE_URL}#:~:text=Event%202.%2010-Day%20Check-In%20Mission`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-16T00:00:00.000Z",
		endAt: "2026-09-29T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "626-moon-gazing-7-day-check-in-pass",
		title: "Moon Gazing 7-Day Check-In Pass",
		noticeTitle: SEPTEMBER_22_NOTICE_TITLE,
		noticeUrl: `${SEPTEMBER_22_NOTICE_URL}#:~:text=Event%201.%20Moon%20Gazing%207-Day%20Check-In%20Pass`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-22T00:00:00.000Z",
		endAt: "2026-10-05T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "626-bonus-time-event",
		title: "Bonus Time Event",
		noticeTitle: SEPTEMBER_22_NOTICE_TITLE,
		noticeUrl: `${SEPTEMBER_22_NOTICE_URL}#:~:text=Event%202.%20Bonus%20Time%20Event`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-23T00:00:00.000Z",
		endAt: "2026-09-29T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
];
