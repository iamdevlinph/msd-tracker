import { describe, expect, it } from "vitest";
import {
	formatCountdown,
	getChecklistStatus,
	getOccurrence,
	occurrenceKey,
} from "@/components/checklist/utils/checklist";
import type { ChecklistDefinition } from "@/data/checklist/CHECKLIST_DATA";

const DAY = 86_400_000;
const dailyEvent = {
	id: "fixture-daily-event",
	title: "Fixture daily event",
	kind: "event",
	startAt: "2026-07-27T00:00:00.000Z",
	endAt: "2026-08-03T23:59:00.000Z",
	recurrence: "daily",
} satisfies ChecklistDefinition;

const lateLaunchDailyEvent = {
	id: "fixture-late-launch-daily-event",
	title: "Fixture late-launch daily event",
	kind: "event",
	startAt: "2026-08-08T10:00:00.000Z",
	endAt: "2026-08-12T09:59:00.000Z",
	recurrence: "daily",
} satisfies ChecklistDefinition;

const publishedBoundaryDailyEvent = {
	...lateLaunchDailyEvent,
	id: "fixture-published-boundary-daily-event",
	title: "Fixture published-boundary daily event",
	recurrenceStartAt: "2026-08-08T10:00:00.000Z",
} satisfies ChecklistDefinition;

const weeklyEvent = {
	id: "fixture-weekly-event",
	title: "Fixture weekly event",
	kind: "event",
	startAt: "2026-07-27T00:00:00.000Z",
	endAt: "2026-08-31T23:59:00.000Z",
	recurrence: "weekly",
} satisfies ChecklistDefinition;

const expiringEvent = {
	id: "fixture-expiring-event",
	title: "Fixture expiring event",
	kind: "event",
	startAt: "2026-07-27T00:00:00.000Z",
	endAt: "2026-07-28T23:59:00.000Z",
	recurrence: "none",
} satisfies ChecklistDefinition;

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

	it("anchors an unconfigured late-launch daily event at UTC midnight", () => {
		const launch = Date.parse(lateLaunchDailyEvent.startAt);
		const beforeLaunch = getOccurrence(
			lateLaunchDailyEvent,
			Date.parse("2026-08-08T09:59:00.000Z"),
		);
		const atLaunch = getOccurrence(lateLaunchDailyEvent, launch);
		const beforeReset = getOccurrence(
			lateLaunchDailyEvent,
			Date.parse("2026-08-08T23:59:59.999Z"),
		);
		const atReset = getOccurrence(
			lateLaunchDailyEvent,
			Date.parse("2026-08-09T00:00:00.000Z"),
		);

		expect(
			getChecklistStatus(
				lateLaunchDailyEvent,
				beforeLaunch,
				Date.parse("2026-08-08T09:59:00.000Z"),
			),
		).toBe("upcoming");
		expect(atLaunch.startAt).toBe(launch);
		expect(atLaunch.nextResetAt).toBe(Date.parse("2026-08-09T00:00:00.000Z"));
		expect(occurrenceKey(lateLaunchDailyEvent, beforeReset.startAt)).toBe(
			occurrenceKey(lateLaunchDailyEvent, launch),
		);
		expect(occurrenceKey(lateLaunchDailyEvent, atReset.startAt)).not.toBe(
			occurrenceKey(lateLaunchDailyEvent, beforeReset.startAt),
		);
		expect(
			getChecklistStatus(
				lateLaunchDailyEvent,
				getOccurrence(
					lateLaunchDailyEvent,
					Date.parse("2026-08-12T09:59:00.000Z"),
				),
				Date.parse("2026-08-12T09:59:00.000Z"),
			),
		).toBe("expired");
	});

	it("uses a published non-midnight daily boundary through expiry", () => {
		const beforeMidnight = getOccurrence(
			publishedBoundaryDailyEvent,
			Date.parse("2026-08-08T23:59:59.999Z"),
		);
		const atMidnight = getOccurrence(
			publishedBoundaryDailyEvent,
			Date.parse("2026-08-09T00:00:00.000Z"),
		);
		const beforeBoundary = getOccurrence(
			publishedBoundaryDailyEvent,
			Date.parse("2026-08-09T09:59:59.999Z"),
		);
		const atBoundary = getOccurrence(
			publishedBoundaryDailyEvent,
			Date.parse("2026-08-09T10:00:00.000Z"),
		);

		expect(atMidnight.startAt).toBe(beforeMidnight.startAt);
		expect(beforeBoundary.startAt).toBe(beforeMidnight.startAt);
		expect(atBoundary.startAt).toBe(Date.parse("2026-08-09T10:00:00.000Z"));
		expect(
			occurrenceKey(publishedBoundaryDailyEvent, beforeBoundary.startAt),
		).not.toBe(occurrenceKey(publishedBoundaryDailyEvent, atBoundary.startAt));
		const end = Date.parse(publishedBoundaryDailyEvent.endAt);
		expect(
			getChecklistStatus(
				publishedBoundaryDailyEvent,
				getOccurrence(publishedBoundaryDailyEvent, end),
				end,
			),
		).toBe("expired");
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
