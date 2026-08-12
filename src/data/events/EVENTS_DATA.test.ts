import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/events/EVENTS_DATA";

describe("EVENTS_DATA", () => {
	it("does not retain retired official event records", () => {
		expect(EVENTS_DATA.map(({ id }) => id)).not.toEqual(
			expect.arrayContaining([
				"100-day-launch-anniversary-check-in",
				"20260807-CAT-DAY",
			]),
		);
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
