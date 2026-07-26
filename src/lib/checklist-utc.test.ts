import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/EVENTS_DATA";
import {
	formatCountdown,
	getChecklistStatus,
	getOccurrence,
	occurrenceKey,
} from "@/lib/checklist";

const [checkInEvent, bonusTimeEvent] = EVENTS_DATA;

describe("checklist UTC scheduling", () => {
	it("records the published anniversary events with exact UTC timestamps", () => {
		expect(EVENTS_DATA).toEqual([
			{
				id: "100-day-launch-anniversary-check-in",
				title: "100 Day Launch Anniversary 14-Day Check-In Pass",
				noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
				kind: "event",
				startAt: "2026-07-22T00:00:00.000Z",
				endAt: "2026-08-11T23:59:00.000Z",
				recurrence: "daily",
			},
			{
				id: "100-day-anniversary-bonus-time",
				title: "Bonus Time Event",
				noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
				kind: "event",
				startAt: "2026-07-22T00:00:00.000Z",
				endAt: "2026-07-28T23:59:00.000Z",
				recurrence: "daily",
			},
		]);
	});

	it.each(
		EVENTS_DATA,
	)("refreshes $title completion keys at 00:00 UTC", (event) => {
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
			...checkInEvent,
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
		for (const event of [checkInEvent, bonusTimeEvent]) {
			const end = Date.parse(event.endAt);
			expect(getChecklistStatus(event, getOccurrence(event, end), end)).toBe(
				"expired",
			);
		}
	});
});
