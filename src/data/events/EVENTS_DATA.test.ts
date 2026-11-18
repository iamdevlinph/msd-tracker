import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/events/EVENTS_DATA";

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

const ASHEN_CRADLE_EVENTS = [
	{
		id: "637-unknown-conquest-mission",
		title: "「Unknown」 Conquest Mission",
		heading: "Event 9. 「Unknown」 Conquest Mission",
	},
] as const;

describe("EVENTS_DATA", () => {
	it("removes expired records and retains active records", () => {
		expect(EVENTS_DATA).toHaveLength(10);
		const eventIds = EVENTS_DATA.map(({ id }) => id);
		for (const expiredId of [
			"637-nyanners-special-missions",
			"637-mew-mew-gift-draw",
			"724-the-road-to-a-broken-heart-event-stage-intensive-training",
			"724-energetic-fighters-enthusiastic-cheer",
			"724-chloes-7-day-gifts",
			"724-special-missions-with-chloe",
			"734-nightmarch-midnight-commotion-trick-or-slash",
			"734-10-day-check-in-mission",
			"734-anomaly-fiend",
			"737-bonus-time-event",
			"737-an-invitation-to-break-the-ice",
			"637-nyanners-special-check-in-pass",
			"637-wanderers-beyond-borders-shop-story-missions",
			"724-equipment-crafting-mission",
			"725-chloe-screenshot-event",
			"734-monsterling-combining-missions",
			"638-ar-camera-update-celebration-a-snap-with-my-favorite",
			"637-wanderers-beyond-borders-event-stage-decrypt-the-code",
			"637-level-headed-engineers-research-grant",
			"637-isabellas-7-day-gifts",
			"637-special-missions-with-isabella",
			"637-anomaly-avardans-mana",
			"676-combine-monsterlings-missions",
			"676-10-day-check-in-mission",
			"707-bonus-time-event",
			"707-an-invitation-to-break-the-ice",
			"600-moonlight-bunny-show-shop-story-missions",
			"600-moonlight-bunny-show-event-stage-chase-the-bunny",
			"600-secret-fanservice-for-my-biggest-fans",
			"600-vivians-7-day-gifts",
			"600-special-missions-with-vivian",
			"600-anomaly-amons-shadow",
			"600-an-invitation-to-break-the-ice",
			"611-combine-monsterlings-missions",
			"611-10-day-check-in-mission",
			"626-moon-gazing-7-day-check-in-pass",
			"626-bonus-time-event",
			"638-isabella-arrival-celebration-character-quiz-event",
			"638-new-region-sector-3-exploration-event",
			"637-equipment-crafting-mission",
			"724-the-road-to-a-broken-heart-shop-story-missions",
			"734-nightmarch-midnight-commotion-story",
			"770-equipment-crafting-mission",
			"771-mad-arrival-in-search-of-the-perfect-blast",
		])
			expect(eventIds).not.toContain(expiredId);
		for (const event of EVENTS_DATA)
			if (event.endAt)
				expect(Date.parse(event.endAt)).toBeGreaterThan(
					Date.parse("2026-11-18T03:14:00.000Z"),
				);
	});

	it("imports the Ashen Cradle notice", () => {
		for (const event of ASHEN_CRADLE_EVENTS) {
			const { heading, ...expected } = event;
			expect(EVENTS_DATA.find(({ id }) => id === event.id)).toMatchObject({
				...expected,
				noticeTitle: ASHEN_CRADLE_NOTICE_TITLE,
				noticeUrl: `${ASHEN_CRADLE_NOTICE_URL}#:~:text=${encodeURIComponent(heading)}`,
				startAt:
					"startAt" in event ? event.startAt : "2026-09-30T03:30:00.000Z",
				recurrence: "recurrence" in event ? event.recurrence : "none",
			});
		}

		expect(
			EVENTS_DATA.find(({ id }) => id === "637-unknown-conquest-mission"),
		).not.toHaveProperty("endAt");
	});

	it("imports the November 10 in-game event and mission windows", () => {
		for (const event of [
			{
				id: "770-a-flame-chasing-freedom-event-stages-mini-game",
				title:
					"A Flame Chasing Freedom — Event Stages/Duckie Duckie? Boing Boing!",
				heading: "🌠 Event 1. A Flame Chasing Freedom",
				endAt: "2026-12-01T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "770-a-flame-chasing-freedom-shop-story-missions",
				title: "A Flame Chasing Freedom — Shop/Story/Missions",
				heading: "🌠 Event 1. A Flame Chasing Freedom",
				endAt: "2026-12-08T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "770-boom-take-whatevers-left-after-the-explosion",
				title: "Boom! Take whatever's left after the explosion!",
				heading: "🌠 Event 2. Boom! Take whatever's left after the explosion!",
				endAt: "2026-12-01T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "770-mads-7-day-gifts",
				title: "M.A.D.'s 7-Day Gifts",
				heading: "🌠 Event 3. M.A.D.'s 7-Day Gifts",
				endAt: "2026-12-01T23:59:00.000Z",
				recurrence: "daily",
			},
			{
				id: "770-special-missions-with-mad",
				title: "Special Missions with M.A.D.",
				heading: "🌠 Event 4. Special Missions with M.A.D.",
				endAt: "2026-12-01T23:59:00.000Z",
				recurrence: "none",
			},
		] as const) {
			const { heading, ...expected } = event;
			expect(EVENTS_DATA.find(({ id }) => id === event.id)).toMatchObject({
				...expected,
				noticeTitle: NOVEMBER_10_NOTICE_TITLE,
				noticeUrl: `${NOVEMBER_10_NOTICE_URL}#:~:text=${encodeURIComponent(heading)}`,
				kind: "event",
				startAt: "2026-11-11T03:00:00.000Z",
			});
		}
	});

	it("imports the Discord and X community contests with distinct deadlines", () => {
		for (const event of [
			{
				id: "771-a-flame-chasing-freedom-record-screenshot-event",
				title: "[A Flame Chasing Freedom] Celebration! Record Screenshot Event",
				heading:
					"🌠 Event 2. [A Flame Chasing Freedom] Celebration! Record Screenshot Event",
				endAt: "2026-12-02T01:00:00.000Z",
				participation: "x",
			},
		] as const) {
			const { heading, ...expected } = event;
			expect(EVENTS_DATA.find(({ id }) => id === event.id)).toMatchObject({
				...expected,
				noticeTitle: NOVEMBER_10_COMMUNITY_NOTICE_TITLE,
				noticeUrl: `${NOVEMBER_10_COMMUNITY_NOTICE_URL}#:~:text=${encodeURIComponent(heading)}`,
				kind: "event",
				startAt: "2026-11-11T02:51:00.000Z",
				recurrence: "none",
			});
		}
	});

	it("imports the November 18 combining, daily check-in, and daily conquest missions", () => {
		for (const event of [
			{
				id: "793-monsterling-combining-missions",
				title: "Monsterling Combining Missions",
				heading: "🌠 Event 1. Monsterling Combining Missions",
				endAt: "2026-11-24T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "793-10-day-check-in-mission",
				title: "10-Day Check-In Mission",
				heading: "🌠 Event 2. 10-Day Check-In Mission",
				endAt: "2026-12-01T23:59:00.000Z",
				recurrence: "daily",
			},
			{
				id: "793-anomaly-gulgak",
				title: "Anomaly: Gulgak",
				heading: "🌠 Event 3. Anomaly: Gulgak",
				endAt: "2026-12-01T23:59:00.000Z",
				recurrence: "daily",
			},
		] as const) {
			const { heading, ...expected } = event;
			const imported = EVENTS_DATA.find(({ id }) => id === event.id);
			expect(imported).toMatchObject({
				...expected,
				kind: "event",
				noticeTitle: NOVEMBER_18_NOTICE_TITLE,
				noticeUrl: `${NOVEMBER_18_NOTICE_URL}#:~:text=${encodeURIComponent(heading)}`,
				startAt: "2026-11-18T00:00:00.000Z",
			});
			if (event.recurrence === "daily")
				expect(imported).not.toHaveProperty("recurrenceStartAt");
		}
	});

	it("uses default midnight resets for daily events", () => {
		const dailyEvents = EVENTS_DATA.filter(
			({ recurrence }) => recurrence === "daily",
		);
		expect(dailyEvents.map(({ id }) => id)).toEqual([
			"770-mads-7-day-gifts",
			"793-10-day-check-in-mission",
			"793-anomaly-gulgak",
		]);
		for (const event of dailyEvents)
			expect(event).not.toHaveProperty("recurrenceStartAt");
	});

	it("defines unique, valid UTC event periods", () => {
		expect(new Set(EVENTS_DATA.map(({ id }) => id)).size).toBe(
			EVENTS_DATA.length,
		);
		for (const event of EVENTS_DATA) {
			expect(event.startAt).toMatch(/Z$/);
			expect(Date.parse(event.startAt)).not.toBeNaN();
			if (event.endAt) {
				expect(event.endAt).toMatch(/Z$/);
				expect(Date.parse(event.startAt)).toBeLessThan(Date.parse(event.endAt));
			}
		}
	});
});
