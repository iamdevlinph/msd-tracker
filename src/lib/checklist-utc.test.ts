import { describe, expect, it } from "vitest";
import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";
import {
	formatCountdown,
	getChecklistStatus,
	getOccurrence,
	occurrenceKey,
} from "@/lib/checklist";

const event = {
	id: "100-day-launch-anniversary-check-in",
	title: "100 Day Launch Anniversary 14-Day Check-In Pass",
	kind: "event",
	startAt: "2026-07-22T00:00:00.000Z",
	endAt: "2026-08-11T23:59:00.000Z",
	recurrence: "daily",
} satisfies ChecklistDefinition;

describe("checklist UTC scheduling", () => {
	it("uses published UTC event timestamps without player-timezone conversion", () => {
		expect(Date.parse(event.startAt)).toBe(Date.UTC(2026, 6, 22, 0, 0));
		expect(Date.parse(event.endAt)).toBe(Date.UTC(2026, 7, 11, 23, 59));
		expect(
			getOccurrence(event, Date.parse("2026-07-22T12:00:00.000Z")).endAt,
		).toBe(Date.parse(event.endAt));
	});

	it("refreshes daily completion keys at 00:00 UTC", () => {
		const before = getOccurrence(event, Date.parse("2026-07-22T23:59:00.000Z"));
		const after = getOccurrence(event, Date.parse("2026-07-23T00:01:00.000Z"));

		expect(before.startAt).toBe(Date.parse("2026-07-22T00:00:00.000Z"));
		expect(after.startAt).toBe(Date.parse("2026-07-23T00:00:00.000Z"));
		expect(occurrenceKey(event, before.startAt)).not.toBe(
			occurrenceKey(event, after.startAt),
		);
	});

	it("refreshes weekly completion keys on Monday at 00:00 UTC", () => {
		const weekly = {
			...event,
			id: "weekly-shop",
			recurrence: "weekly" as const,
			startAt: "2026-07-27T00:00:00.000Z",
		};
		const before = getOccurrence(
			weekly,
			Date.parse("2026-08-02T23:59:00.000Z"),
		);
		const after = getOccurrence(weekly, Date.parse("2026-08-03T00:01:00.000Z"));

		expect(before.startAt).toBe(Date.parse("2026-07-27T00:00:00.000Z"));
		expect(after.startAt).toBe(Date.parse("2026-08-03T00:00:00.000Z"));
		expect(occurrenceKey(weekly, before.startAt)).not.toBe(
			occurrenceKey(weekly, after.startAt),
		);
	});

	it("keeps elapsed time and expiry independent of display timezone", () => {
		expect(formatCountdown(8 * 60 * 60_000)).toBe("8h 0m");
		const end = Date.parse(event.endAt);
		expect(getChecklistStatus(event, getOccurrence(event, end), end)).toBe(
			"expired",
		);
	});
});
