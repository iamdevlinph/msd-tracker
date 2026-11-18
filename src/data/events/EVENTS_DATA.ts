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
	endAt?: UtcISOString;
	recurrence?:
		| typeof CHECKLIST_RECURRENCES.NONE
		| typeof CHECKLIST_RECURRENCES.DAILY
		| typeof CHECKLIST_RECURRENCES.WEEKLY;
};

const ASHEN_CRADLE_NOTICE_TITLE =
	"9/29 (Tue)「Ashen Cradle Lullaby」Event Notice";
const ASHEN_CRADLE_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/637";

const NOVEMBER_10_NOTICE_TITLE =
	"11/10 (Tue) 「Light From a Fallen Star」 Event Notice";
const NOVEMBER_10_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/770";
const NOVEMBER_10_COMMUNITY_NOTICE_TITLE =
	"11/10 (Tue) 1.5 Version Update Celebration! 2 Community Events Notice";
const NOVEMBER_10_COMMUNITY_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/771";

const NOVEMBER_18_NOTICE_TITLE = "11/18 (Wed) Event Notice";
const NOVEMBER_18_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/793";

export const EVENTS_DATA: ChecklistEvent[] = [
	// Fixed daily schedules reset at 00:00Z unless recurrenceStartAt is set.
	{
		id: "637-unknown-conquest-mission",
		title: "「Unknown」 Conquest Mission",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%209.%20%E3%80%8CUnknown%E3%80%8D%20Conquest%20Mission`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "770-a-flame-chasing-freedom-event-stages-mini-game",
		title: "A Flame Chasing Freedom — Event Stages/Duckie Duckie? Boing Boing!",
		noticeTitle: NOVEMBER_10_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_10_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%201.%20A%20Flame%20Chasing%20Freedom`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-11T03:00:00.000Z",
		endAt: "2026-12-01T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "770-a-flame-chasing-freedom-shop-story-missions",
		title: "A Flame Chasing Freedom — Shop/Story/Missions",
		noticeTitle: NOVEMBER_10_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_10_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%201.%20A%20Flame%20Chasing%20Freedom`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-11T03:00:00.000Z",
		endAt: "2026-12-08T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "770-boom-take-whatevers-left-after-the-explosion",
		title: "Boom! Take whatever's left after the explosion!",
		noticeTitle: NOVEMBER_10_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_10_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%202.%20Boom!%20Take%20whatever's%20left%20after%20the%20explosion!`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-11T03:00:00.000Z",
		endAt: "2026-12-01T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "770-mads-7-day-gifts",
		title: "M.A.D.'s 7-Day Gifts",
		noticeTitle: NOVEMBER_10_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_10_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%203.%20M.A.D.'s%207-Day%20Gifts`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-11T03:00:00.000Z",
		endAt: "2026-12-01T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "770-special-missions-with-mad",
		title: "Special Missions with M.A.D.",
		noticeTitle: NOVEMBER_10_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_10_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%204.%20Special%20Missions%20with%20M.A.D.`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-11T03:00:00.000Z",
		endAt: "2026-12-01T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "771-a-flame-chasing-freedom-record-screenshot-event",
		title: "[A Flame Chasing Freedom] Celebration! Record Screenshot Event",
		noticeTitle: NOVEMBER_10_COMMUNITY_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_10_COMMUNITY_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%202.%20%5BA%20Flame%20Chasing%20Freedom%5D%20Celebration!%20Record%20Screenshot%20Event`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-11T02:51:00.000Z",
		endAt: "2026-12-02T01:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
		participation: "x",
	},
	{
		id: "793-monsterling-combining-missions",
		title: "Monsterling Combining Missions",
		description:
			"Combine Monsterlings 100, 200, 300, 400, 500, 600, and 700 times to earn milestone rewards, then claim the all-missions reward.",
		noticeTitle: NOVEMBER_18_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_18_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%201.%20Monsterling%20Combining%20Missions`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-18T00:00:00.000Z",
		endAt: "2026-11-24T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "793-10-day-check-in-mission",
		title: "10-Day Check-In Mission",
		description:
			"Log in every day, complete check-in missions, and claim rewards. Daily reset: 00:00 UTC.",
		noticeTitle: NOVEMBER_18_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_18_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%202.%2010-Day%20Check-In%20Mission`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-18T00:00:00.000Z",
		endAt: "2026-12-01T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "793-anomaly-gulgak",
		title: "Anomaly: Gulgak",
		description:
			"Conquer Gulgak and accept one Emergency Conquest Request per day. Daily reset: 00:00 UTC.",
		noticeTitle: NOVEMBER_18_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_18_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%203.%20Anomaly%3A%20Gulgak`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-18T00:00:00.000Z",
		endAt: "2026-12-01T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
];
