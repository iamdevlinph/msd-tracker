import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";

export type ChecklistTask = ChecklistDefinition & {
	kind: "custom";
	notes?: string;
	scheduleVersion: number;
};

/** The server reset is 08:00 at GMT+8, represented as 00:00 UTC. */
export const RESET_TIME_ZONE_OFFSET_MINUTES = 8 * 60;

export const toResetAnchorDate = (value: string) => {
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return value;
	const resetCalendarDate = new Date(
		timestamp + RESET_TIME_ZONE_OFFSET_MINUTES * 60_000,
	);
	return new Date(
		Date.UTC(
			resetCalendarDate.getUTCFullYear(),
			resetCalendarDate.getUTCMonth(),
			resetCalendarDate.getUTCDate(),
		),
	).toISOString();
};

export const getChecklistStartAnchor = (
	calendarDate: string,
	recurrence: ChecklistTask["recurrence"],
) => {
	const selected = new Date(`${calendarDate}T00:00:00.000Z`);
	if (recurrence !== "weekly" || !Number.isFinite(selected.getTime())) {
		return Number.isFinite(selected.getTime())
			? selected.toISOString()
			: calendarDate;
	}
	const daysUntilMonday = (8 - selected.getUTCDay()) % 7;
	selected.setUTCDate(selected.getUTCDate() + daysUntilMonday);
	return selected.toISOString();
};

export const normalizeChecklistTasks = (tasks: unknown) => {
	if (!tasks || typeof tasks !== "object") return {};
	return Object.fromEntries(
		Object.entries(tasks).flatMap(([id, value]) => {
			if (!value || typeof value !== "object") return [];
			const task = value as Partial<ChecklistTask>;
			if (
				typeof task.title !== "string" ||
				!task.title.trim() ||
				typeof task.startAt !== "string" ||
				!Number.isFinite(Date.parse(task.startAt)) ||
				(task.recurrence !== undefined &&
					!["none", "daily", "weekly", "interval_days"].includes(
						task.recurrence,
					)) ||
				(task.mode !== undefined &&
					!["fixed", "after_completion"].includes(task.mode)) ||
				(task.recurrence === "interval_days" &&
					(!Number.isInteger(task.intervalDays) ||
						(task.intervalDays ?? 0) < 1))
			) {
				return [];
			}
			const startAt = toResetAnchorDate(task.startAt);
			const endAt =
				typeof task.endAt === "string" &&
				Number.isFinite(Date.parse(task.endAt))
					? toResetAnchorDate(task.endAt)
					: undefined;
			const scheduleVersion =
				typeof task.scheduleVersion === "number" &&
				Number.isInteger(task.scheduleVersion) &&
				task.scheduleVersion > 0
					? task.scheduleVersion
					: 1;
			return [
				[
					id,
					{
						...task,
						id,
						kind: "custom",
						startAt,
						endAt,
						scheduleVersion: scheduleVersion + Number(startAt !== task.startAt),
					} as ChecklistTask,
				],
			];
		}),
	) as Record<string, ChecklistTask>;
};
