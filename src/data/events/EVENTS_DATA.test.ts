import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/events/EVENTS_DATA";

const COMMUNITY_NOTICE_TITLE =
	"9/29 (Tue) 1.4 Version Update Celebration! 3 Community Events Notice";
const COMMUNITY_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/638";
const ASHEN_CRADLE_NOTICE_TITLE =
	"9/29 (Tue)「Ashen Cradle Lullaby」Event Notice";
const ASHEN_CRADLE_NOTICE_URL =
	"https://forum.netmarble.com/stardive_gl/view/6/637";

const COMMUNITY_EVENTS = [
	{
		id: "638-isabella-arrival-celebration-character-quiz-event",
		title: "New Character [Isabella] Arrival Celebration! Character Quiz Event",
		heading:
			"Event 1. New Character [Isabella] Arrival Celebration! Character Quiz Event",
		endAt: "2026-10-07T01:00:00.000Z",
		participation: "discord",
	},
	{
		id: "638-new-region-sector-3-exploration-event",
		title: "1.4 Update Celebration! New Region [Sector 3] Exploration Event",
		heading:
			"Event 2. 1.4 Update Celebration! New Region [Sector 3] Exploration Event",
		endAt: "2026-10-12T01:00:00.000Z",
	},
	{
		id: "638-ar-camera-update-celebration-a-snap-with-my-favorite",
		title: "AR Camera Update Celebration 「A Snap with My Favorite!」",
		heading:
			"Event 3. AR Camera Update Celebration 「A Snap with My Favorite!」",
		endAt: "2026-10-21T01:00:00.000Z",
	},
] as const;

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
		id: "637-wanderers-beyond-borders-event-stage-decrypt-the-code",
		title: "Wanderers Beyond Borders — Event Stage/Decrypt the Code",
		heading: "Event 4. Wanderers Beyond Borders",
		endAt: "2026-10-20T23:59:00.000Z",
	},
	{
		id: "637-wanderers-beyond-borders-shop-story-missions",
		title: "Wanderers Beyond Borders — Shop/Story/Missions",
		heading: "Event 4. Wanderers Beyond Borders",
		endAt: "2026-10-27T23:59:00.000Z",
	},
	{
		id: "637-level-headed-engineers-research-grant",
		title: "Level-Headed Engineer's Research Grant",
		heading: "Event 5. Level-Headed Engineer's Research Grant",
		endAt: "2026-10-20T23:59:00.000Z",
	},
	{
		id: "637-isabellas-7-day-gifts",
		title: "Isabella’s 7-Day Gifts",
		heading: "Event 6. Isabella’s 7-Day Gifts",
		endAt: "2026-10-20T23:59:00.000Z",
		recurrence: "daily",
	},
	{
		id: "637-special-missions-with-isabella",
		title: "Special Missions with Isabella",
		heading: "Event 7. Special Missions with Isabella",
		endAt: "2026-10-20T23:59:00.000Z",
	},
	{
		id: "637-equipment-crafting-mission",
		title: "Equipment Crafting Mission",
		heading: "Event 8. Equipment Crafting Mission",
		endAt: "2026-10-06T23:59:00.000Z",
	},
	{
		id: "637-unknown-conquest-mission",
		title: "「Unknown」 Conquest Mission",
		heading: "Event 9. 「Unknown」 Conquest Mission",
	},
	{
		id: "637-anomaly-avardans-mana",
		title: "Anomaly: Avardan’s Mana",
		heading: "Event 10. Anomaly: Avardan’s Mana",
		startAt: "2026-10-07T00:00:00.000Z",
		endAt: "2026-10-20T23:59:00.000Z",
		recurrence: "daily",
	},
] as const;

describe("EVENTS_DATA", () => {
	it("removes expired records and retains active records", () => {
		expect(EVENTS_DATA).toHaveLength(16);
		expect(EVENTS_DATA.map(({ id }) => id)).toEqual(
			expect.arrayContaining([
				"600-moonlight-bunny-show-shop-story-missions",
				"626-moon-gazing-7-day-check-in-pass",
			]),
		);
		const eventIds = EVENTS_DATA.map(({ id }) => id);
		for (const expiredId of [
			"600-moonlight-bunny-show-event-stage-chase-the-bunny",
			"600-secret-fanservice-for-my-biggest-fans",
			"600-vivians-7-day-gifts",
			"600-special-missions-with-vivian",
			"600-anomaly-amons-shadow",
			"600-an-invitation-to-break-the-ice",
			"611-combine-monsterlings-missions",
			"611-10-day-check-in-mission",
			"626-bonus-time-event",
		])
			expect(eventIds).not.toContain(expiredId);
	});

	it("imports the community event notice", () => {
		for (const { heading, ...expected } of COMMUNITY_EVENTS) {
			expect(EVENTS_DATA.find(({ id }) => id === expected.id)).toMatchObject({
				...expected,
				noticeTitle: COMMUNITY_NOTICE_TITLE,
				noticeUrl: `${COMMUNITY_NOTICE_URL}#:~:text=${encodeURIComponent(heading)}`,
				startAt: "2026-09-30T03:26:00.000Z",
				recurrence: "none",
			});
		}
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
			"626-moon-gazing-7-day-check-in-pass",
			"637-nyanners-special-check-in-pass",
			"637-isabellas-7-day-gifts",
			"637-anomaly-avardans-mana",
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
