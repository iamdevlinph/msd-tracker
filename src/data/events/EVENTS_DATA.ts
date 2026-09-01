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

const BRISSHELL_EVENT_NOTICE_TITLE =
	"8/18 (Tue) [Girl from the Void] Event Notice";
const BRISSHELL_EVENT_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/548";
const AUGUST_26_EVENT_NOTICE_TITLE = "8/26 (Wed) Event Notice";
const AUGUST_26_EVENT_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/565";
const SEPTEMBER_2_EVENT_NOTICE_TITLE = "9/2 (Wed) Event Notice";
const SEPTEMBER_2_EVENT_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/571";

export const EVENTS_DATA: ChecklistEvent[] = [
	// Fixed daily schedules reset at 00:00Z unless recurrenceStartAt is set.
	{
		id: "tons-of-recruitment-tickets-check-in-streak-gift",
		title: "Tons of Recruitment Tickets! Check-In Streak Gift",
		noticeTitle: BRISSHELL_EVENT_NOTICE_TITLE,
		noticeUrl: `${BRISSHELL_EVENT_NOTICE_URL}#:~:text=Tons%20of%20Recruitment%20Tickets!%20Check-In%20Streak%20Gift`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-19T05:30:00.000Z",
		endAt: "2026-09-02T05:30:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "girl-from-the-void-event-stage-brisshells-link-rush",
		title: "Girl from the Void — Event Stage/Brisshell’s Link Rush",
		noticeTitle: BRISSHELL_EVENT_NOTICE_TITLE,
		noticeUrl: `${BRISSHELL_EVENT_NOTICE_URL}#:~:text=Girl%20from%20the%20Void%20%E2%80%94%20Event%20Stage%2FBrisshell%E2%80%99s%20Link%20Rush`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-19T05:30:00.000Z",
		endAt: "2026-09-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "girl-from-the-void-shop-story-missions",
		title: "Girl from the Void — Shop/Story/Missions",
		noticeTitle: BRISSHELL_EVENT_NOTICE_TITLE,
		noticeUrl: `${BRISSHELL_EVENT_NOTICE_URL}#:~:text=Girl%20from%20the%20Void%20%E2%80%94%20Shop%2FStory%2FMissions`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-19T05:30:00.000Z",
		endAt: "2026-09-15T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "th-this-is-for-being-my-friend",
		title: "Th-this is for being my friend...",
		noticeTitle: BRISSHELL_EVENT_NOTICE_TITLE,
		noticeUrl: `${BRISSHELL_EVENT_NOTICE_URL}#:~:text=Th-this%20is%20for%20being%20my%20friend...`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-19T05:30:00.000Z",
		endAt: "2026-09-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "brisshells-7-day-gifts",
		title: "Brisshell’s 7-Day Gifts",
		noticeTitle: BRISSHELL_EVENT_NOTICE_TITLE,
		noticeUrl: `${BRISSHELL_EVENT_NOTICE_URL}#:~:text=Brisshell%E2%80%99s%207-Day%20Gifts`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-19T05:30:00.000Z",
		endAt: "2026-09-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "special-missions-with-brisshell",
		title: "Special Missions with Brisshell",
		noticeTitle: BRISSHELL_EVENT_NOTICE_TITLE,
		noticeUrl: `${BRISSHELL_EVENT_NOTICE_URL}#:~:text=Special%20Missions%20with%20Brisshell`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-19T05:30:00.000Z",
		endAt: "2026-09-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "anomaly-el-dorado-guardian",
		title: "Anomaly: El Dorado Guardian",
		noticeTitle: BRISSHELL_EVENT_NOTICE_TITLE,
		noticeUrl: `${BRISSHELL_EVENT_NOTICE_URL}#:~:text=Anomaly%3A%20El%20Dorado%20Guardian`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-26T00:00:00.000Z",
		endAt: "2026-09-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "brisshell-an-invitation-to-break-the-ice",
		title: "An Invitation to Break the Ice",
		noticeTitle: BRISSHELL_EVENT_NOTICE_TITLE,
		noticeUrl: `${BRISSHELL_EVENT_NOTICE_URL}#:~:text=An%20Invitation%20to%20Break%20the%20Ice`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-02T00:00:00.000Z",
		endAt: "2026-09-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "combine-monsterlings-missions",
		title: "Combine Monsterlings Missions",
		noticeTitle: AUGUST_26_EVENT_NOTICE_TITLE,
		noticeUrl: `${AUGUST_26_EVENT_NOTICE_URL}#:~:text=Combine%20Monsterlings%20Missions`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-26T00:00:00.000Z",
		endAt: "2026-09-01T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "10-day-check-in-mission",
		title: "10-Day Check-In Mission",
		noticeTitle: AUGUST_26_EVENT_NOTICE_TITLE,
		noticeUrl: `${AUGUST_26_EVENT_NOTICE_URL}#:~:text=10-Day%20Check-In%20Mission`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-08-26T00:00:00.000Z",
		endAt: "2026-09-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "571-bonus-time-event",
		title: "Bonus Time Event",
		noticeTitle: SEPTEMBER_2_EVENT_NOTICE_TITLE,
		noticeUrl: `${SEPTEMBER_2_EVENT_NOTICE_URL}#:~:text=Bonus%20Time%20Event`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-02T00:00:00.000Z",
		endAt: "2026-09-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
];
