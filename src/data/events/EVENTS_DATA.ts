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
const CHLOE_SCREENSHOT_NOTICE_TITLE =
	"10/20 (Tue)「Full Speed Runaway Train Crash」Chloe Screenshot Event Notice";
const CHLOE_SCREENSHOT_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/725";

export const EVENTS_DATA: ChecklistEvent[] = [
	// Fixed daily schedules reset at 00:00Z unless recurrenceStartAt is set.
	{
		id: "637-nyanners-special-check-in-pass",
		title: "Nyanners's Special Check-In Pass!",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%201.%20Nyanners's%20Special%20Check-In%20Pass!`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-10-27T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
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
		id: "637-wanderers-beyond-borders-shop-story-missions",
		title: "Wanderers Beyond Borders — Shop/Story/Missions",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%204.%20Wanderers%20Beyond%20Borders`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-10-27T23:59:00.000Z",
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
		id: "724-equipment-crafting-mission",
		title: "Equipment Crafting Mission",
		noticeTitle: OCTOBER_20_NOTICE_TITLE,
		noticeUrl: `${OCTOBER_20_NOTICE_URL}#:~:text=Event%205.%20Equipment%20Crafting%20Mission`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-21T02:00:00.000Z",
		endAt: "2026-10-27T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "725-chloe-screenshot-event",
		title: "「Full Speed Runaway Train Crash」Chloe Screenshot Event!",
		noticeTitle: CHLOE_SCREENSHOT_NOTICE_TITLE,
		noticeUrl: `${CHLOE_SCREENSHOT_NOTICE_URL}#:~:text=%E3%80%8CFull%20Speed%20Runaway%20Train%20Crash%E3%80%8DChloe%20Screenshot%20Event!`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-21T09:51:00.000Z",
		endAt: "2026-10-28T01:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
		participation: "discord",
	},
];
