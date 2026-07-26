import { describe, expect, it } from "vitest";
import {
	taskDefaults,
	taskFormToChecklistTask,
	taskSchema,
} from "@/components/checklist/checklist-task-form";
import type { ChecklistTask } from "@/lib/checklist-task";

const formValues = {
	title: " Weekly task ",
	startAt: "2026-07-26",
	dueAt: "2026-07-28",
	recurrence: "weekly" as const,
	intervalDays: "1",
	mode: "fixed" as const,
	notes: " Notes ",
};

describe("checklist task form", () => {
	it("maps weekly dates to Monday reset anchors", () => {
		expect(taskFormToChecklistTask(formValues)).toMatchObject({
			title: "Weekly task",
			notes: "Notes",
			startAt: "2026-07-27T00:00:00.000Z",
			dueDurationMinutes: 1440,
			recurrence: "weekly",
			mode: "fixed",
		});
	});

	it("restores date-only defaults from reset-anchored tasks", () => {
		const task: ChecklistTask = {
			...taskFormToChecklistTask(formValues),
			id: "weekly",
			kind: "custom",
			scheduleVersion: 1,
		};

		expect(taskDefaults(task)).toMatchObject({
			startAt: "2026-07-27",
			dueAt: "2026-07-28",
		});
	});

	it("rejects an end date that is not after the anchored start", () => {
		const parsed = taskSchema.safeParse({
			...formValues,
			dueAt: "2026-07-27",
		});

		expect(parsed.success).toBe(false);
		if (!parsed.success) {
			expect(parsed.error.flatten().fieldErrors.dueAt).toContain(
				"End date must be after the start date.",
			);
		}
	});
});
