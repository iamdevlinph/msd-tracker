import { describe, expect, it } from "vitest";
import { CURRENT_GAME_VERSION } from "@/constants";
import {
	CHECKLIST_KINDS,
	CHECKLIST_RECURRENCES,
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
			completionVersion: CURRENT_GAME_VERSION,
			recurrence: "weekly",
		});
		expect(permanentById["monster-race"]).toMatchObject({
			startAt: "2026-07-29T01:30:00.000Z",
			completionVersion: CURRENT_GAME_VERSION,
			seasonal: true,
		});
		expect(permanentById["dimensional-rift"]).not.toHaveProperty("seasonal");
		expect(permanentById["monster-race"]).not.toHaveProperty("recurrence");
		expect(PERMANENT_EVENTS.filter(({ seasonal }) => seasonal)).toEqual([
			permanentById["monster-race"],
		]);
	});

	it("defines Elemental Sanctum weekly and daily schedules", () => {
		const permanentById = Object.fromEntries(
			PERMANENT_EVENTS.map((event) => [event.id, event]),
		);
		const sharedSchedule = {
			noticeUrl: "https://forum.netmarble.com/stardive_gl/view/8/635",
			kind: CHECKLIST_KINDS.PERMANENT,
			startAt: "2026-09-30T03:30:00.000Z",
		};

		expect(permanentById["elemental-sanctum"]).toEqual({
			id: "elemental-sanctum",
			title: "Elemental Sanctum",
			...sharedSchedule,
			recurrenceStartAt: "2026-09-28T00:00:00.000Z",
			recurrence: CHECKLIST_RECURRENCES.WEEKLY,
		});
		expect(permanentById["elemental-sanctum-daily-bonus"]).toEqual({
			id: "elemental-sanctum-daily-bonus",
			title: "Elemental Sanctum Daily Bonus",
			...sharedSchedule,
			recurrence: CHECKLIST_RECURRENCES.DAILY,
		});
	});
});
