import { describe, expect, it } from "vitest";
import {
	CHECKLIST_KINDS,
	CURRENT_SEASON_GAME_VERSION,
	PERMANENT_EVENTS,
} from "@/data/checklist/CHECKLIST_DATA";

describe("CHECKLIST_DATA", () => {
	it("defines unique permanent schedules", () => {
		expect(PERMANENT_EVENTS.length).toBeGreaterThan(0);
		expect(new Set(PERMANENT_EVENTS.map(({ id }) => id)).size).toBe(
			PERMANENT_EVENTS.length,
		);
		for (const event of PERMANENT_EVENTS) {
			expect(event.kind).toBe(CHECKLIST_KINDS.PERMANENT);
			expect(Date.parse(event.startAt)).not.toBeNaN();
		}
	});

	it("defines versioned permanent schedules", () => {
		const permanentById = Object.fromEntries(
			PERMANENT_EVENTS.map((event) => [event.id, event]),
		);
		expect(permanentById["dimensional-rift"]).toMatchObject({
			completionVersion: CURRENT_SEASON_GAME_VERSION,
			recurrence: "weekly",
		});
		expect(permanentById["monster-race"]).toMatchObject({
			startAt: "2026-07-29T01:30:00.000Z",
			completionVersion: CURRENT_SEASON_GAME_VERSION,
			seasonal: true,
		});
		expect(permanentById["dimensional-rift"]).not.toHaveProperty("seasonal");
		expect(permanentById["monster-race"]).not.toHaveProperty("recurrence");
		expect(PERMANENT_EVENTS.filter(({ seasonal }) => seasonal)).toEqual([
			permanentById["monster-race"],
		]);
	});
});
