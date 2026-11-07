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

const OCTOBER_20_NOTICE_TITLE =
	"10/20 (Tue) 「Full Speed Runaway Train Crash」Event Notice";
const OCTOBER_20_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/724";

const OCTOBER_28_NOTICE_TITLE = "10/28 (Wed) Event Notice";
const OCTOBER_28_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/734";

const NOVEMBER_4_NOTICE_TITLE = "11/4 (Wed) Event Notice";
const NOVEMBER_4_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/737";

export const EVENTS_DATA: ChecklistEvent[] = [
	// Fixed daily schedules reset at 00:00Z unless recurrenceStartAt is set.
	{
		id: "637-nyanners-special-missions",
		title: "Nyanners's Special Missions!",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%202.%20Nyanners's%20Special%20Missions!`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "637-mew-mew-gift-draw",
		title: "Mew-Mew Gift Draw",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%203.%20Mew-Mew%20Gift%20Draw`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
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
		id: "724-the-road-to-a-broken-heart-event-stage-intensive-training",
		title: "The Road to a Broken Heart — Event Stage/Intensive Training!",
		noticeTitle: OCTOBER_20_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_20_NOTICE_URL}#:~:text=Event%201.%20The%20Road%20to%20a%20Broken%20Heart`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-21T02:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "724-the-road-to-a-broken-heart-shop-story-missions",
		title: "The Road to a Broken Heart — Shop/Story/Missions",
		noticeTitle: OCTOBER_20_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_20_NOTICE_URL}#:~:text=Event%201.%20The%20Road%20to%20a%20Broken%20Heart`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-21T02:00:00.000Z",
		endAt: "2026-11-17T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "724-energetic-fighters-enthusiastic-cheer",
		title: "Energetic Fighter's Enthusiastic Cheer",
		noticeTitle: OCTOBER_20_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_20_NOTICE_URL}#:~:text=Event%202.%20Energetic%20Fighter's%20Enthusiastic%20Cheer`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-21T02:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "724-chloes-7-day-gifts",
		title: "Chloe’s 7-Day Gifts",
		noticeTitle: OCTOBER_20_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_20_NOTICE_URL}#:~:text=Event%203.%20Chloe%E2%80%99s%207-Day%20Gifts`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-21T02:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "724-special-missions-with-chloe",
		title: "Special Missions with Chloe",
		noticeTitle: OCTOBER_20_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_20_NOTICE_URL}#:~:text=Event%204.%20Special%20Missions%20with%20Chloe`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-21T02:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "734-nightmarch-midnight-commotion-trick-or-slash",
		title: "Nightmarch Midnight Commotion — Trick or Slash!!",
		noticeTitle: OCTOBER_28_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_28_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%201.%20Nightmarch%20Midnight%20Commotion`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-28T00:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "734-nightmarch-midnight-commotion-story",
		title: "Nightmarch Midnight Commotion — Story",
		noticeTitle: OCTOBER_28_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_28_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%201.%20Nightmarch%20Midnight%20Commotion`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-28T00:00:00.000Z",
		endAt: "2026-11-17T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "734-10-day-check-in-mission",
		title: "10-Day Check-In Mission",
		noticeTitle: OCTOBER_28_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_28_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%203.%2010-Day%20Check-In%20Mission`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-28T00:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "734-anomaly-fiend",
		title: "Anomaly: Fiend",
		noticeTitle: OCTOBER_28_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_28_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%204.%20Anomaly%3A%20Fiend`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-28T00:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "737-bonus-time-event",
		title: "Bonus Time Event",
		noticeTitle: NOVEMBER_4_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_4_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%201.%20Bonus%20Time%20Event`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-04T00:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "737-an-invitation-to-break-the-ice",
		title: "An Invitation to Break the Ice",
		noticeTitle: NOVEMBER_4_NOTICE_TITLE,
		noticeUrl: `${NOVEMBER_4_NOTICE_URL}#:~:text=%F0%9F%8C%A0%20Event%202.%20An%20Invitation%20to%20Break%20the%20Ice`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-11-04T00:00:00.000Z",
		endAt: "2026-11-10T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
];
