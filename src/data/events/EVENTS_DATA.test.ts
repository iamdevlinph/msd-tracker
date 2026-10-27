import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/events/EVENTS_DATA";

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

const OCTOBER_28_NOTICE_TITLE = "10/28 (Wed) Event Notice";
const OCTOBER_28_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/734";

const ASHEN_CRADLE_EVENTS = [
	{
		id: "637-nyanners-special-check-in-pass",
		title: "Nyanners's Special Check-In Pass!",
		heading: "Event 1. Nyanners's Special Check-In Pass!",
		endAt: "2026-10-27T23:59:00.000Z",
		recurrence: "daily",
	},
	{
		id: "637-nyanners-special-missions",
		title: "Nyanners's Special Missions!",
		heading: "Event 2. Nyanners's Special Missions!",
		endAt: "2026-11-10T23:59:00.000Z",
	},
	{
		id: "637-mew-mew-gift-draw",
		title: "Mew-Mew Gift Draw",
		heading: "Event 3. Mew-Mew Gift Draw",
		endAt: "2026-11-10T23:59:00.000Z",
	},
	{
		id: "637-wanderers-beyond-borders-shop-story-missions",
		title: "Wanderers Beyond Borders — Shop/Story/Missions",
		heading: "Event 4. Wanderers Beyond Borders",
		endAt: "2026-10-27T23:59:00.000Z",
	},
	{
		id: "637-unknown-conquest-mission",
		title: "「Unknown」 Conquest Mission",
		heading: "Event 9. 「Unknown」 Conquest Mission",
	},
] as const;

describe("EVENTS_DATA", () => {
	it("removes expired records and retains active records", () => {
		expect(EVENTS_DATA).toHaveLength(17);
		const eventIds = EVENTS_DATA.map(({ id }) => id);
		for (const expiredId of [
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
		])
			expect(eventIds).not.toContain(expiredId);
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

	it("imports the October 20 in-game event schedules", () => {
		for (const event of [
			{
				id: "724-the-road-to-a-broken-heart-event-stage-intensive-training",
				title: "The Road to a Broken Heart — Event Stage/Intensive Training!",
				heading: "Event 1. The Road to a Broken Heart",
				endAt: "2026-11-10T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "724-the-road-to-a-broken-heart-shop-story-missions",
				title: "The Road to a Broken Heart — Shop/Story/Missions",
				heading: "Event 1. The Road to a Broken Heart",
				endAt: "2026-11-17T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "724-energetic-fighters-enthusiastic-cheer",
				title: "Energetic Fighter's Enthusiastic Cheer",
				heading: "Event 2. Energetic Fighter's Enthusiastic Cheer",
				endAt: "2026-11-10T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "724-chloes-7-day-gifts",
				title: "Chloe’s 7-Day Gifts",
				heading: "Event 3. Chloe’s 7-Day Gifts",
				endAt: "2026-11-10T23:59:00.000Z",
				recurrence: "daily",
			},
			{
				id: "724-special-missions-with-chloe",
				title: "Special Missions with Chloe",
				heading: "Event 4. Special Missions with Chloe",
				endAt: "2026-11-10T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "724-equipment-crafting-mission",
				title: "Equipment Crafting Mission",
				heading: "Event 5. Equipment Crafting Mission",
				endAt: "2026-10-27T23:59:00.000Z",
				recurrence: "none",
			},
		] as const) {
			const { heading, ...expected } = event;
			expect(EVENTS_DATA.find(({ id }) => id === event.id)).toMatchObject({
				...expected,
				noticeTitle: OCTOBER_20_NOTICE_TITLE,
				noticeUrl: `${OCTOBER_20_NOTICE_URL}#:~:text=${encodeURIComponent(heading)}`,
				startAt: "2026-10-21T02:00:00.000Z",
			});
		}
	});

	it("imports the Chloe Screenshot Discord event", () => {
		const heading = "「Full Speed Runaway Train Crash」Chloe Screenshot Event!";
		expect(
			EVENTS_DATA.find(({ id }) => id === "725-chloe-screenshot-event"),
		).toMatchObject({
			id: "725-chloe-screenshot-event",
			title: heading,
			noticeTitle: CHLOE_SCREENSHOT_NOTICE_TITLE,
			noticeUrl: `${CHLOE_SCREENSHOT_NOTICE_URL}#:~:text=${encodeURIComponent(heading)}`,
			kind: "event",
			startAt: "2026-10-21T09:51:00.000Z",
			endAt: "2026-10-28T01:00:00.000Z",
			recurrence: "none",
			participation: "discord",
		});
	});

	it("imports the October 28 event notice with independent claim windows", () => {
		for (const event of [
			{
				id: "734-nightmarch-midnight-commotion-trick-or-slash",
				title: "Nightmarch Midnight Commotion — Trick or Slash!!",
				heading: "🌠 Event 1. Nightmarch Midnight Commotion",
				endAt: "2026-11-10T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "734-nightmarch-midnight-commotion-story",
				title: "Nightmarch Midnight Commotion — Story",
				heading: "🌠 Event 1. Nightmarch Midnight Commotion",
				endAt: "2026-11-17T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "734-monsterling-combining-missions",
				title: "Monsterling Combining Missions",
				heading: "🌠 Event 2. Monsterling Combining Missions",
				endAt: "2026-11-03T23:59:00.000Z",
				recurrence: "none",
			},
			{
				id: "734-10-day-check-in-mission",
				title: "10-Day Check-In Mission",
				heading: "🌠 Event 3. 10-Day Check-In Mission",
				endAt: "2026-11-10T23:59:00.000Z",
				recurrence: "daily",
			},
			{
				id: "734-anomaly-fiend",
				title: "Anomaly: Fiend",
				heading: "🌠 Event 4. Anomaly: Fiend",
				endAt: "2026-11-10T23:59:00.000Z",
				recurrence: "daily",
			},
		] as const) {
			const { heading, ...expected } = event;
			expect(EVENTS_DATA.find(({ id }) => id === event.id)).toMatchObject({
				...expected,
				noticeTitle: OCTOBER_28_NOTICE_TITLE,
				noticeUrl: `${OCTOBER_28_NOTICE_URL}#:~:text=${encodeURIComponent(heading)}`,
				kind: "event",
				startAt: "2026-10-28T00:00:00.000Z",
			});
		}
	});

	it("uses default midnight resets for daily events", () => {
		const dailyEvents = EVENTS_DATA.filter(
			({ recurrence }) => recurrence === "daily",
		);
		expect(dailyEvents.map(({ id }) => id)).toEqual([
			"637-nyanners-special-check-in-pass",
			"724-chloes-7-day-gifts",
			"734-10-day-check-in-mission",
			"734-anomaly-fiend",
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
