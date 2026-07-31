import { describe, expect, it } from "vitest";
import {
	CHECKLIST_KINDS,
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
});
