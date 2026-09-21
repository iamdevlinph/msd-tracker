import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/events/EVENTS_DATA";

const NOTICE_600_EVENTS = {
	"600-moonlight-bunny-show-event-stage-chase-the-bunny": [
		"Moonlight Bunny Show — Event Stage/Chase the Bunny!",
		"2026-09-09T00:00:00.000Z",
		"2026-09-29T23:59:00.000Z",
		"none",
		"Event 1. Moonlight Bunny Show",
	],
	"600-moonlight-bunny-show-shop-story-missions": [
		"Moonlight Bunny Show — Shop/Story/Missions",
		"2026-09-09T00:00:00.000Z",
		"2026-10-06T23:59:00.000Z",
		"none",
		"Event 1. Moonlight Bunny Show",
	],
	"600-secret-fanservice-for-my-biggest-fans": [
		"Secret Fanservice for My Biggest Fans",
		"2026-09-09T00:00:00.000Z",
		"2026-09-29T23:59:00.000Z",
		"none",
		"Event 2. Secret Fanservice for My Biggest Fans",
	],
	"600-vivians-7-day-gifts": [
		"Vivian’s 7-Day Gifts",
		"2026-09-09T00:00:00.000Z",
		"2026-09-29T23:59:00.000Z",
		"daily",
		"Event 3. Vivian’s 7-Day Gifts",
	],
	"600-special-missions-with-vivian": [
		"Special Missions with Vivian",
		"2026-09-09T00:00:00.000Z",
		"2026-09-29T23:59:00.000Z",
		"none",
		"Event 4. Special Missions with Vivian",
	],
	"600-anomaly-amons-shadow": [
		"Anomaly: Amon's Shadow",
		"2026-09-16T00:00:00.000Z",
		"2026-09-29T23:59:00.000Z",
		"daily",
		"Event 6. Anomaly: Amon's Shadow",
	],
	"600-an-invitation-to-break-the-ice": [
		"An Invitation to Break the Ice",
		"2026-09-23T00:00:00.000Z",
		"2026-09-29T23:59:00.000Z",
		"none",
		"Event 7. An Invitation to Break the Ice",
	],
} as const;

const NOTICE_611_EVENTS = {
	"611-combine-monsterlings-missions": [
		"Combine Monsterlings Missions",
		"2026-09-16T00:00:00.000Z",
		"2026-09-22T23:59:00.000Z",
		"none",
		"Event 1. Combine Monsterlings Missions",
	],
	"611-10-day-check-in-mission": [
		"10-Day Check-In Mission",
		"2026-09-16T00:00:00.000Z",
		"2026-09-29T23:59:00.000Z",
		"daily",
		"Event 2. 10-Day Check-In Mission",
	],
} as const;

const NOTICE_626_EVENTS = {
	"626-moon-gazing-7-day-check-in-pass": [
		"Moon Gazing 7-Day Check-In Pass",
		"2026-09-22T00:00:00.000Z",
		"2026-10-05T23:59:00.000Z",
		"daily",
		"Event 1. Moon Gazing 7-Day Check-In Pass",
	],
	"626-bonus-time-event": [
		"Bonus Time Event",
		"2026-09-23T00:00:00.000Z",
		"2026-09-29T23:59:00.000Z",
		"daily",
		"Event 2. Bonus Time Event",
	],
} as const;

describe("EVENTS_DATA", () => {
	it("removes expired records", () => {
		expect(EVENTS_DATA).toHaveLength(11);
		expect(EVENTS_DATA.map(({ id }) => id)).not.toEqual(
			expect.arrayContaining([
				"girl-from-the-void-shop-story-missions",
				"600-equipment-crafting-mission",
				"601-vivian-arrival-celebration-spotlight-discord",
				"tons-of-recruitment-tickets-check-in-streak-gift",
				"girl-from-the-void-event-stage-brisshells-link-rush",
				"th-this-is-for-being-my-friend",
				"brisshells-7-day-gifts",
				"special-missions-with-brisshell",
				"anomaly-el-dorado-guardian",
				"brisshell-an-invitation-to-break-the-ice",
				"combine-monsterlings-missions",
				"10-day-check-in-mission",
				"571-bonus-time-event",
			]),
		);
	});

	it("imports notice 626 metadata", () => {
		for (const [
			id,
			[title, startAt, endAt, recurrence, heading],
		] of Object.entries(NOTICE_626_EVENTS)) {
			expect(EVENTS_DATA.find((event) => event.id === id)).toMatchObject({
				id,
				title,
				noticeTitle: "9/22 (Wed) Event Notice",
				noticeUrl: `https://forum.netmarble.com/stardive_gl/view/6/626#:~:text=${encodeURIComponent(heading)}`,
				startAt,
				endAt,
				recurrence,
			});
		}
	});

	it("imports notice 611 metadata", () => {
		for (const [
			id,
			[title, startAt, endAt, recurrence, heading],
		] of Object.entries(NOTICE_611_EVENTS)) {
			expect(EVENTS_DATA.find((event) => event.id === id)).toMatchObject({
				id,
				title,
				noticeTitle: "9/16 (Wed) Event Notice",
				noticeUrl: `https://forum.netmarble.com/stardive_gl/view/6/611#:~:text=${encodeURIComponent(heading)}`,
				startAt,
				endAt,
				recurrence,
			});
		}
	});

	it("imports notice 600 metadata", () => {
		for (const [
			id,
			[title, startAt, endAt, recurrence, heading],
		] of Object.entries(NOTICE_600_EVENTS)) {
			expect(EVENTS_DATA.find((event) => event.id === id)).toMatchObject({
				id,
				title,
				noticeTitle: "9/8 (Tue) Event Notice",
				noticeUrl: `https://forum.netmarble.com/stardive_gl/view/6/600#:~:text=${encodeURIComponent(heading)}`,
				startAt,
				endAt,
				recurrence,
			});
		}
	});

	it("uses default midnight resets for the five daily events", () => {
		const dailyEvents = EVENTS_DATA.filter(
			({ recurrence }) => recurrence === "daily",
		);
		expect(dailyEvents.map(({ id }) => id)).toEqual([
			"600-vivians-7-day-gifts",
			"600-anomaly-amons-shadow",
			"611-10-day-check-in-mission",
			"626-moon-gazing-7-day-check-in-pass",
			"626-bonus-time-event",
		]);
		for (const event of dailyEvents)
			expect(event).not.toHaveProperty("recurrenceStartAt");
	});

	it("defines unique, valid UTC event periods and optional reset anchors", () => {
		expect(new Set(EVENTS_DATA.map(({ id }) => id)).size).toBe(
			EVENTS_DATA.length,
		);
		for (const event of EVENTS_DATA) {
			expect(event.startAt).toMatch(/Z$/);
			expect(event.endAt).toMatch(/Z$/);
			expect(Date.parse(event.startAt)).toBeLessThan(Date.parse(event.endAt));
			if (event.recurrenceStartAt) {
				expect(event.recurrenceStartAt).toMatch(/Z$/);
				expect(Date.parse(event.recurrenceStartAt)).not.toBeNaN();
			}
		}
	});
});
