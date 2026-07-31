import { describe, expect, it } from "vitest";
import {
	formatCountdown,
	getChecklistStatus,
	getOccurrence,
	occurrenceKey,
} from "@/components/checklist/utils/checklist";
import type { ChecklistEvent } from "@/data/EVENTS_DATA";

const DAY = 86_400_000;
const dailyEvent = {
	id: "fixture-daily-event",
	title: "Fixture daily event",
	kind: "event",
	startAt: "2026-07-27T00:00:00.000Z",
	endAt: "2026-08-03T23:59:00.000Z",
	recurrence: "daily",
} satisfies ChecklistEvent;

const weeklyEvent = {
	id: "fixture-weekly-event",
	title: "Fixture weekly event",
	kind: "event",
	startAt: "2026-07-27T00:00:00.000Z",
	endAt: "2026-08-31T23:59:00.000Z",
	recurrence: "weekly",
} satisfies ChecklistEvent;

const expiringEvent = {
	id: "fixture-expiring-event",
	title: "Fixture expiring event",
	kind: "event",
	startAt: "2026-07-27T00:00:00.000Z",
	endAt: "2026-07-28T23:59:00.000Z",
	recurrence: "none",
} satisfies ChecklistEvent;

describe("checklist UTC scheduling", () => {
	it("refreshes daily completion keys at 00:00 UTC", () => {
		const start = Date.parse(dailyEvent.startAt);
		const before = getOccurrence(dailyEvent, start + DAY - 60_000);
		const after = getOccurrence(dailyEvent, start + DAY + 60_000);

		expect(before.startAt).toBe(start);
		expect(after.startAt).toBe(start + DAY);
		expect(occurrenceKey(dailyEvent, before.startAt)).not.toBe(
			occurrenceKey(dailyEvent, after.startAt),
		);
	});

	it("preserves launch time while anchoring later resets", () => {
		const event = {
			...dailyEvent,
			startAt: "2026-07-29T01:30:00.000Z",
			recurrenceStartAt: "2026-07-29T00:00:00.000Z",
		};
		const occurrence = getOccurrence(event, Date.parse(event.startAt));
		expect(occurrence.startAt).toBe(Date.parse(event.startAt));
		expect(occurrence.nextResetAt).toBe(Date.parse("2026-07-30T00:00:00.000Z"));
	});

	it("refreshes weekly completion keys on Monday at 00:00 UTC", () => {
		const weekly = weeklyEvent;
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
		for (const event of [dailyEvent, weeklyEvent, expiringEvent]) {
			const end = Date.parse(event.endAt);
			expect(getChecklistStatus(event, getOccurrence(event, end), end)).toBe(
				"expired",
			);
		}
	});
});
