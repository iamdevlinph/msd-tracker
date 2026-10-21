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
];
