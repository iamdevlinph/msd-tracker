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

const VIVIAN_NOTICE_TITLE = "9/8 (Tue) Event Notice";
const VIVIAN_NOTICE_URL = "https://forum.netmarble.com/stardive_gl/view/6/600";
const SEPTEMBER_22_NOTICE_TITLE = "9/22 (Wed) Event Notice";
const SEPTEMBER_22_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/626";
const COMMUNITY_EVENTS_NOTICE_TITLE =
	"9/29 (Tue) 1.4 Version Update Celebration! 3 Community Events Notice";
const COMMUNITY_EVENTS_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/638";
const ASHEN_CRADLE_NOTICE_TITLE =
	"9/29 (Tue)「Ashen Cradle Lullaby」Event Notice";
const ASHEN_CRADLE_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/637";

export const EVENTS_DATA: ChecklistEvent[] = [
	// Fixed daily schedules reset at 00:00Z unless recurrenceStartAt is set.
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
		id: "638-isabella-arrival-celebration-character-quiz-event",
		title: "New Character [Isabella] Arrival Celebration! Character Quiz Event",
		noticeTitle: COMMUNITY_EVENTS_NOTICE_TITLE,
		noticeUrl: `${COMMUNITY_EVENTS_NOTICE_URL}#:~:text=Event%201.%20New%20Character%20%5BIsabella%5D%20Arrival%20Celebration!%20Character%20Quiz%20Event`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:26:00.000Z",
		endAt: "2026-10-07T01:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
		participation: "discord",
	},
	{
		id: "638-new-region-sector-3-exploration-event",
		title: "1.4 Update Celebration! New Region [Sector 3] Exploration Event",
		noticeTitle: COMMUNITY_EVENTS_NOTICE_TITLE,
		noticeUrl: `${COMMUNITY_EVENTS_NOTICE_URL}#:~:text=Event%202.%201.4%20Update%20Celebration!%20New%20Region%20%5BSector%203%5D%20Exploration%20Event`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:26:00.000Z",
		endAt: "2026-10-12T01:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "638-ar-camera-update-celebration-a-snap-with-my-favorite",
		title: "AR Camera Update Celebration 「A Snap with My Favorite!」",
		noticeTitle: COMMUNITY_EVENTS_NOTICE_TITLE,
		noticeUrl: `${COMMUNITY_EVENTS_NOTICE_URL}#:~:text=Event%203.%20AR%20Camera%20Update%20Celebration%20%E3%80%8CA%20Snap%20with%20My%20Favorite!%E3%80%8D`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:26:00.000Z",
		endAt: "2026-10-21T01:00:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
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
		id: "637-wanderers-beyond-borders-event-stage-decrypt-the-code",
		title: "Wanderers Beyond Borders — Event Stage/Decrypt the Code",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%204.%20Wanderers%20Beyond%20Borders`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-10-20T23:59:00.000Z",
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
		id: "637-level-headed-engineers-research-grant",
		title: "Level-Headed Engineer's Research Grant",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%205.%20Level-Headed%20Engineer's%20Research%20Grant`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-10-20T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "637-isabellas-7-day-gifts",
		title: "Isabella’s 7-Day Gifts",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%206.%20Isabella%E2%80%99s%207-Day%20Gifts`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-10-20T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
	{
		id: "637-special-missions-with-isabella",
		title: "Special Missions with Isabella",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%207.%20Special%20Missions%20with%20Isabella`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-10-20T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.NONE,
	},
	{
		id: "637-equipment-crafting-mission",
		title: "Equipment Crafting Mission",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%208.%20Equipment%20Crafting%20Mission`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-09-30T03:30:00.000Z",
		endAt: "2026-10-06T23:59:00.000Z",
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
		id: "637-anomaly-avardans-mana",
		title: "Anomaly: Avardan’s Mana",
		noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
		noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=Event%2010.%20Anomaly%3A%20Avardan%E2%80%99s%20Mana`,
		kind: CHECKLIST_KINDS.EVENT,
		startAt: "2026-10-07T00:00:00.000Z",
		endAt: "2026-10-20T23:59:00.000Z",
		recurrence: CHECKLIST_RECURRENCES.DAILY,
	},
];
