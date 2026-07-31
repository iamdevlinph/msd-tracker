import { z } from "zod";
import {
	type ChecklistTask,
	getChecklistStartAnchor,
	parseUtcDateTime,
	toUtcISOString,
} from "@/components/checklist/utils/checklist-task";
import {
	CHECKLIST_EVENT_RECURRENCE_VALUES,
	CHECKLIST_KINDS,
	CHECKLIST_MODE_VALUES,
	CHECKLIST_MODES,
	CHECKLIST_RECURRENCE_VALUES,
	CHECKLIST_RECURRENCES,
	type ChecklistMode,
	type ChecklistRecurrence,
} from "@/data/checklist/CHECKLIST_DATA";

const dateTime = (value: string) => parseUtcDateTime(value);

export const taskSchema = z
	.object({
		type: z.enum(["task", "event"]),
		title: z.string().trim().min(1, "Name is required."),
		noticeTitle: z
			.string()
			.trim()
			.max(200, "Event notice must be 200 characters or less."),
		startAt: z.string().min(1, "Start date and time are required."),
		dueAt: z.string(),
		recurrence: z.enum(CHECKLIST_RECURRENCE_VALUES),
		intervalDays: z
			.string()
			.regex(/^[1-9]\d*$/, "Interval must be a positive whole number."),
		mode: z.enum(CHECKLIST_MODE_VALUES),
		notes: z.string().trim().max(500, "Notes must be 500 characters or less."),
	})
	.superRefine(({ type, startAt, dueAt, recurrence, mode }, context) => {
		const start = dateTime(startAt);
		if (!Number.isFinite(start))
			context.addIssue({
				code: "custom",
				path: ["startAt"],
				message: "Enter a valid start date.",
			});
		if (
			type === CHECKLIST_KINDS.EVENT &&
			(!dueAt || !Number.isFinite(dateTime(dueAt)))
		) {
			context.addIssue({
				code: "custom",
				path: ["dueAt"],
				message: "End date is required for events.",
			});
		}
		if (
			type === CHECKLIST_KINDS.EVENT &&
			(!CHECKLIST_EVENT_RECURRENCE_VALUES.some(
				(eventRecurrence) => eventRecurrence === recurrence,
			) ||
				mode !== CHECKLIST_MODES.FIXED)
		) {
			context.addIssue({
				code: "custom",
				path: ["recurrence"],
				message: "Events use a fixed daily or weekly schedule.",
			});
		}
		if (
			dueAt &&
			Number.isFinite(start) &&
			(!Number.isFinite(dateTime(dueAt)) || dateTime(dueAt) <= start)
		) {
			context.addIssue({
				code: "custom",
				path: ["dueAt"],
				message: "End date must be after the start date.",
			});
		}
	});

export type TaskForm = z.infer<typeof taskSchema>;

const toUtcInput = (iso: string) => {
	const parsed = Date.parse(iso);
	return Number.isFinite(parsed)
		? new Date(parsed).toISOString().slice(0, 16)
		: "";
};

export const taskDefaults = (task?: ChecklistTask): TaskForm => {
	const startAt = task
		? toUtcInput(task.startAt)
		: `${new Date(Date.now()).toISOString().slice(0, 10)}T00:00`;
	const dueAt =
		task?.kind === CHECKLIST_KINDS.EVENT && task.endAt
			? toUtcInput(task.endAt)
			: task?.dueDurationMinutes && startAt
				? toUtcInput(
						new Date(
							Date.parse(task.startAt) + task.dueDurationMinutes * 60_000,
						).toISOString(),
					)
				: "";
	return {
		type: task?.kind === CHECKLIST_KINDS.EVENT ? "event" : "task",
		title: task?.title ?? "",
		noticeTitle: task?.noticeTitle ?? "",
		startAt,
		dueAt,
		recurrence: task?.recurrence ?? CHECKLIST_RECURRENCES.NONE,
		intervalDays: String(task?.intervalDays ?? 1),
		mode: task?.mode ?? CHECKLIST_MODES.FIXED,
		notes: task?.notes ?? "",
	};
};
export const taskFormToChecklistTask = (values: TaskForm) => {
	const startAt = getChecklistStartAnchor(values.startAt, values.recurrence);
	const start = dateTime(startAt);
	const endAt = values.dueAt ? toUtcISOString(values.dueAt) : undefined;
	return {
		title: values.title.trim(),
		description: undefined,
		noticeTitle:
			values.type === CHECKLIST_KINDS.EVENT
				? values.noticeTitle.trim() || undefined
				: undefined,
		notes: values.notes.trim() || undefined,
		kind:
			values.type === CHECKLIST_KINDS.EVENT
				? CHECKLIST_KINDS.EVENT
				: CHECKLIST_KINDS.CUSTOM,
		startAt,
		endAt: values.type === CHECKLIST_KINDS.EVENT ? endAt : undefined,
		recurrence: values.recurrence as ChecklistRecurrence,
		intervalDays:
			values.type === "task" &&
			values.recurrence === CHECKLIST_RECURRENCES.INTERVAL_DAYS
				? Number(values.intervalDays)
				: undefined,
		mode:
			values.type === CHECKLIST_KINDS.EVENT ||
			values.recurrence === CHECKLIST_RECURRENCES.NONE
				? undefined
				: (values.mode as ChecklistMode),
		dueDurationMinutes:
			values.type === "task" && values.dueAt
				? Math.round((dateTime(values.dueAt) - start) / 60_000)
				: undefined,
	};
};
