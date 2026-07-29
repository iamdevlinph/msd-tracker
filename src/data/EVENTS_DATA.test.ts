import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/EVENTS_DATA";

const EXPIRED_EVENT_IDS = [
	"100-day-anniversary-bonus-time",
	"grand-summer-festival-missions",
	"unforgettable-first-summer-dive-event-stage",
	"slicing-through-the-summer-days",
	"embracing-even-the-summer-heat",
	"summer-special-7-day-gifts",
	"invitation-to-break-the-ice",
	"anomaly-gulgak",
];

describe("EVENTS_DATA", () => {
	it("defines unique, valid UTC event periods", () => {
		expect(new Set(EVENTS_DATA.map(({ id }) => id)).size).toBe(
			EVENTS_DATA.length,
		);

		for (const event of EVENTS_DATA) {
			expect(event.startAt).toMatch(/Z$/);
			expect(event.endAt).toMatch(/Z$/);
			expect(Date.parse(event.startAt)).toBeLessThan(Date.parse(event.endAt));
		}
	});

	it("removes events that expired on July 28", () => {
		const eventIds = EVENTS_DATA.map(({ id }) => id);

		for (const expiredEventId of EXPIRED_EVENT_IDS) {
			expect(eventIds).not.toContain(expiredEventId);
		}
	});

	it("uses the completed maintenance time and published Mabel schedules", () => {
		const eventsById = Object.fromEntries(
			EVENTS_DATA.map((event) => [event.id, event]),
		);

		expect(
			eventsById["inquisitors-day-off-event-stage-inquisition"],
		).toMatchObject({
			startAt: "2026-07-29T01:30:00.000Z",
			endAt: "2026-08-18T23:59:00.000Z",
		});
		expect(eventsById["inquisitors-day-off-shop-story-missions"]).toMatchObject(
			{
				startAt: "2026-07-29T01:30:00.000Z",
				endAt: "2026-08-25T23:59:00.000Z",
			},
		);
		expect(eventsById["inquisitor-mabel-7-day-gifts"].recurrence).toBe("daily");
		expect(eventsById["anomaly-blue-shadow"].recurrence).toBe("daily");
	});

	it("uses the published Discord deadlines", () => {
		const eventsById = Object.fromEntries(
			EVENTS_DATA.map((event) => [event.id, event]),
		);

		expect(eventsById["mabel-update-check-in-discord"].endAt).toBe(
			"2026-08-06T01:00:00.000Z",
		);
		expect(eventsById["mabel-character-trivia-discord"].endAt).toBe(
			"2026-08-19T01:00:00.000Z",
		);
		expect(
			EVENTS_DATA.filter(({ participation }) => participation === "discord"),
		).toHaveLength(2);
	});

	it("defines versioned permanent schedules", async () => {
		const { PERMANENT_EVENTS } = await import("@/data/CHECKLIST_DATA");
		const permanentById = Object.fromEntries(
			PERMANENT_EVENTS.map((event) => [event.id, event]),
		);
		expect(permanentById["dimensional-rift"]).toMatchObject({
			completionVersion: 2,
			recurrence: "weekly",
		});
		expect(permanentById["monster-race"]).toMatchObject({
			startAt: "2026-07-29T01:30:00.000Z",
			completionVersion: 1,
			seasonal: true,
		});
		expect(permanentById["monster-race"]).not.toHaveProperty("recurrence");
	});
});
