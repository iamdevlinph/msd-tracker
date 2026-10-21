import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/events/EVENTS_DATA";

const ASHEN_CRADLE_NOTICE_TITLE =
	"9/29 (Tue)「Ashen Cradle Lullaby」Event Notice";
const ASHEN_CRADLE_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/637";
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
		expect(EVENTS_DATA).toHaveLength(5);
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

	it("uses default midnight resets for daily events", () => {
		const dailyEvents = EVENTS_DATA.filter(
			({ recurrence }) => recurrence === "daily",
		);
		expect(dailyEvents.map(({ id }) => id)).toEqual([
			"637-nyanners-special-check-in-pass",
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
