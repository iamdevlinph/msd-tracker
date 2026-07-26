import { z } from "zod";
import type { ChecklistMode, ChecklistRecurrence } from "@/data/CHECKLIST_DATA";
import {
	type ChecklistTask,
	getChecklistStartAnchor,
	toResetAnchorDate,
} from "@/lib/checklist-task";

export const taskSchema = z
	.object({
		title: z.string().trim().min(1, "Task name is required."),
		startAt: z.string().min(1, "Start date is required."),
		dueAt: z.string(),
		recurrence: z.enum(["none", "daily", "weekly", "interval_days"]),
		intervalDays: z
			.string()
			.regex(/^[1-9]\d*$/, "Interval must be a positive whole number."),
		mode: z.enum(["fixed", "after_completion"]),
		notes: z.string().trim().max(500, "Notes must be 500 characters or less."),
	})
	.superRefine(({ startAt, dueAt, recurrence }, context) => {
		const start = Date.parse(getChecklistStartAnchor(startAt, recurrence));
		if (!Number.isFinite(start))
			context.addIssue({
				code: "custom",
				path: ["startAt"],
				message: "Enter a valid start date.",
			});
		if (
			dueAt &&
			(!Number.isFinite(new Date(`${dueAt}T00:00:00.000Z`).getTime()) ||
				new Date(`${dueAt}T00:00:00.000Z`).getTime() <= start)
		) {
			context.addIssue({
				code: "custom",
				path: ["dueAt"],
				message: "End date must be after the start date.",
			});
		}
	});

export type TaskForm = z.infer<typeof taskSchema>;
const toResetCalendarDate = (iso: string) =>
	toResetAnchorDate(iso).slice(0, 10);

export const taskDefaults = (task?: ChecklistTask): TaskForm => {
	const startAt = task ? toResetCalendarDate(task.startAt) : "";
	const dueAt =
		task?.dueDurationMinutes && startAt
			? toResetCalendarDate(
					new Date(
						Date.parse(task.startAt) + task.dueDurationMinutes * 60_000,
					).toISOString(),
				)
			: "";
	return {
		title: task?.title ?? "",
		startAt,
		dueAt,
		recurrence: task?.recurrence ?? "none",
		intervalDays: String(task?.intervalDays ?? 1),
		mode: task?.mode ?? "fixed",
		notes: task?.notes ?? "",
	};
};

export const taskFormToChecklistTask = (values: TaskForm) => {
	const startAt = getChecklistStartAnchor(values.startAt, values.recurrence);
	const start = new Date(startAt);
	const dueDurationMinutes = values.dueAt
		? Math.round(
				(new Date(`${values.dueAt}T00:00:00.000Z`).getTime() -
					start.getTime()) /
					60_000,
			)
		: undefined;
	return {
		title: values.title.trim(),
		description: undefined,
		notes: values.notes.trim() || undefined,
		startAt,
		endAt: undefined,
		recurrence: values.recurrence as ChecklistRecurrence,
		intervalDays:
			values.recurrence === "interval_days"
				? Number(values.intervalDays)
				: undefined,
		mode:
			values.recurrence === "none" ? undefined : (values.mode as ChecklistMode),
		dueDurationMinutes,
	};
};
