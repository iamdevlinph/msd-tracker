import { describe, expect, it } from "vitest";
import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";
import {
	formatCountdown,
	getChecklistStatus,
	getOccurrence,
	occurrenceKey,
} from "@/lib/checklist";
import type { ChecklistTask } from "@/stores/checklist-slice";

const daily: ChecklistDefinition = {
	id: "daily",
	title: "Daily",
	kind: "permanent",
	startAt: "2024-01-01T00:00:00.000Z",
	recurrence: "daily",
};

describe("checklist schedule utilities", () => {
	it("moves daily and weekly activities at exact UTC reset boundaries", () => {
		const dailyOccurrence = getOccurrence(
			daily,
			Date.parse("2024-01-02T00:00:00.000Z"),
		);
		expect(dailyOccurrence).toEqual({
			startAt: Date.parse("2024-01-02T00:00:00.000Z"),
			endAt: undefined,
			nextResetAt: Date.parse("2024-01-03T00:00:00.000Z"),
		});

		const weeklyOccurrence = getOccurrence(
			{ ...daily, recurrence: "weekly" },
			Date.parse("2024-01-08T00:00:00.000Z"),
		);
		expect(weeklyOccurrence.startAt).toBe(
			Date.parse("2024-01-08T00:00:00.000Z"),
		);
	});

	it("advances recurring event keys while preserving expiry", () => {
		const event: ChecklistDefinition = {
			id: "limited-event",
			title: "Limited event",
			kind: "event",
			startAt: "2024-01-01T00:00:00.000Z",
			endAt: "2024-01-03T00:00:00.000Z",
			recurrence: "daily",
		};
		const first = getOccurrence(event, Date.parse("2024-01-01T12:00:00.000Z"));
		const second = getOccurrence(event, Date.parse("2024-01-02T00:00:00.000Z"));

		expect(second.startAt).toBe(Date.parse("2024-01-02T00:00:00.000Z"));
		expect(second.endAt).toBe(Date.parse("2024-01-03T00:00:00.000Z"));
		expect(second.nextResetAt).toBe(Date.parse("2024-01-03T00:00:00.000Z"));
		expect(occurrenceKey(event, first.startAt)).not.toBe(
			occurrenceKey(event, second.startAt),
		);
		expect(
			getChecklistStatus(
				event,
				getOccurrence(event, Date.parse("2024-01-03T00:00:00.000Z")),
				Date.parse("2024-01-03T00:00:00.000Z"),
				true,
			),
		).toBe("expired");
	});

	it("advances weekly event occurrences without producing invalid resets", () => {
		const event: ChecklistDefinition = {
			id: "weekly-event",
			title: "Weekly event",
			kind: "event",
			startAt: "2024-01-01T00:00:00.000Z",
			endAt: "2024-01-22T00:00:00.000Z",
			recurrence: "weekly",
		};
		const occurrence = getOccurrence(
			event,
			Date.parse("2024-01-15T00:00:00.000Z"),
		);

		expect(occurrence.startAt).toBe(Date.parse("2024-01-15T00:00:00.000Z"));
		expect(occurrence.endAt).toBe(Date.parse("2024-01-22T00:00:00.000Z"));
		expect(occurrence.nextResetAt).toBe(Date.parse("2024-01-22T00:00:00.000Z"));
		expect(Number.isNaN(occurrence.nextResetAt)).toBe(false);
	});

	it("supports fixed N-day and rolling recurrence", () => {
		const intervalTask: ChecklistDefinition = {
			...daily,
			recurrence: "interval_days",
			intervalDays: 3,
		};
		expect(
			getOccurrence(intervalTask, Date.parse("2024-01-08T12:00:00.000Z"))
				.startAt,
		).toBe(Date.parse("2024-01-07T00:00:00.000Z"));

		expect(
			getOccurrence(
				{ ...intervalTask, mode: "after_completion" },
				Date.parse("2024-01-06T00:00:00.000Z"),
				Date.parse("2024-01-05T12:00:00.000Z"),
			).startAt,
		).toBe(Date.parse("2024-01-08T12:00:00.000Z"));
		expect(
			getOccurrence(
				{ ...intervalTask, mode: "after_completion" },
				Date.parse("2024-01-20T00:00:00.000Z"),
			).startAt,
		).toBe(Date.parse("2024-01-01T00:00:00.000Z"));
	});

	it("applies due durations to one-off custom tasks", () => {
		const task: ChecklistDefinition = {
			...daily,
			kind: "custom",
			recurrence: "none",
			dueDurationMinutes: 120,
		};

		expect(getOccurrence(task).endAt).toBe(
			Date.parse(task.startAt) + 120 * 60_000,
		);
	});

	it("derives boundary statuses without stored status strings", () => {
		const event: ChecklistDefinition = {
			id: "event",
			title: "Event",
			kind: "event",
			startAt: "2024-01-01T00:00:00.000Z",
			endAt: "2024-01-02T00:00:00.000Z",
		};
		const occurrence = getOccurrence(event);
		expect(
			getChecklistStatus(
				event,
				occurrence,
				Date.parse("2023-12-31T23:59:00.000Z"),
			),
		).toBe("upcoming");
		expect(
			getChecklistStatus(
				event,
				occurrence,
				Date.parse("2024-01-01T00:00:00.000Z"),
				false,
				1,
			),
		).toBe("active");
		expect(
			getChecklistStatus(
				event,
				occurrence,
				Date.parse("2024-01-01T23:30:00.000Z"),
				false,
				1,
			),
		).toBe("ending-soon");
		expect(
			getChecklistStatus(
				event,
				occurrence,
				Date.parse("2024-01-02T00:00:00.000Z"),
			),
		).toBe("expired");

		const custom = { ...event, kind: "custom" as const };
		expect(
			getChecklistStatus(
				custom,
				occurrence,
				Date.parse("2024-01-02T00:00:00.000Z"),
			),
		).toBe("overdue");
	});

	it("formats minute, hour, and day countdown boundaries", () => {
		expect(formatCountdown(59 * 60_000)).toBe("59m");
		expect(formatCountdown(60 * 60_000)).toBe("1h 0m");
		expect(formatCountdown(24 * 60 * 60_000)).toBe("1d 0h");
		expect(formatCountdown(7 * 24 * 60 * 60_000 + 13 * 60 * 60_000)).toBe(
			"7d 13h",
		);
	});

	it("isolates custom completions after a schedule version changes", () => {
		const task = {
			...daily,
			kind: "custom",
			scheduleVersion: 1,
		} as ChecklistTask;
		const first = occurrenceKey(task, Date.parse(task.startAt));
		const revisedTask: ChecklistTask = { ...task, scheduleVersion: 2 };
		const next = occurrenceKey(revisedTask, Date.parse(task.startAt));
		expect(first).not.toBe(next);
	});
});
