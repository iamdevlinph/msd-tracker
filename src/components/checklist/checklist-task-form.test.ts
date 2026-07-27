import { afterEach, describe, expect, it, vi } from "vitest";
import {
	taskDefaults,
	taskFormToChecklistTask,
	taskSchema,
} from "@/components/checklist/checklist-task-form";
import type { ChecklistTask } from "@/lib/checklist-task";

const formValues = {
	type: "task" as const,
	title: " Weekly task ",
	noticeTitle: "",
	startAt: "2026-07-27T03:15",
	dueAt: "2026-07-28T04:45",
	recurrence: "weekly" as const,
	intervalDays: "1",
	mode: "fixed" as const,
	notes: " Notes ",
};

describe("checklist task form", () => {
	afterEach(() => vi.restoreAllMocks());

	it("defaults new items to the current UTC day at midnight", () => {
		vi.spyOn(Date, "now").mockReturnValue(
			Date.parse("2026-07-28T07:30:00+08:00"),
		);

		expect(taskDefaults()).toMatchObject({
			type: "task",
			startAt: "2026-07-27T00:00",
			dueAt: "",
		});
	});

	it("maps task start and end times as exact UTC values", () => {
		expect(taskFormToChecklistTask(formValues)).toMatchObject({
			kind: "custom",
			title: "Weekly task",
			notes: "Notes",
			startAt: "2026-07-27T03:15:00.000Z",
			dueDurationMinutes: 1530,
			recurrence: "weekly",
			mode: "fixed",
		});
	});

	it("restores UTC date and time defaults", () => {
		const task: ChecklistTask = {
			...taskFormToChecklistTask(formValues),
			id: "weekly",
			kind: "custom",
			scheduleVersion: 1,
		};

		expect(taskDefaults(task)).toMatchObject({
			type: "task",
			startAt: "2026-07-27T03:15",
			dueAt: "2026-07-28T04:45",
		});
	});

	it("maps a recurring player event with an absolute UTC end time", () => {
		const event = taskFormToChecklistTask({
			...formValues,
			type: "event",
			title: "Anniversary check-in",
			noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
			startAt: "2026-07-22T00:00",
			dueAt: "2026-08-11T23:59",
			recurrence: "daily",
		});

		expect(event).toMatchObject({
			kind: "event",
			noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
			startAt: "2026-07-22T00:00:00.000Z",
			endAt: "2026-08-11T23:59:00.000Z",
			recurrence: "daily",
			mode: undefined,
			dueDurationMinutes: undefined,
		});

		expect(
			taskDefaults({ ...event, id: "event", scheduleVersion: 1 }),
		).toMatchObject({
			type: "event",
			noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
			startAt: "2026-07-22T00:00",
			dueAt: "2026-08-11T23:59",
		});
	});

	it("requires an event end time", () => {
		const parsed = taskSchema.safeParse({
			...formValues,
			type: "event",
			dueAt: "",
			recurrence: "daily",
		});

		expect(parsed.success).toBe(false);
		if (!parsed.success) {
			expect(parsed.error.flatten().fieldErrors.dueAt).toContain(
				"End date is required for events.",
			);
		}
	});

	it("rejects an end time that is not after the start", () => {
		const parsed = taskSchema.safeParse({
			...formValues,
			dueAt: "2026-07-27T03:15",
		});

		expect(parsed.success).toBe(false);
		if (!parsed.success) {
			expect(parsed.error.flatten().fieldErrors.dueAt).toContain(
				"End date must be after the start date.",
			);
		}
	});
});
