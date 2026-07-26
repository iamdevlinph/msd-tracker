import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";

export type ChecklistTask = ChecklistDefinition & {
	kind: "custom" | "event";
	notes?: string;
	scheduleVersion: number;
	source?: "user";
};

/** Offset used only to migrate legacy GMT+8 calendar dates to UTC midnight. */
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

/** Parse a datetime-local value as UTC, never as the browser's local timezone. */
export const parseUtcDateTime = (value: string) => {
	if (!value) return Number.NaN;
	if (!value.includes("T")) value = `${value}T00:00:00`;
	const withZone =
		value.endsWith("Z") || /[+-]\d\d:?\d\d$/.test(value) ? value : `${value}Z`;
	return Date.parse(withZone);
};

export const toUtcISOString = (value: string) => {
	const timestamp = parseUtcDateTime(value);
	return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : value;
};

export const getChecklistStartAnchor = (
	calendarDate: string,
	recurrence: ChecklistTask["recurrence"],
) => {
	// New datetime-local values are exact UTC instants. Keep date-only values on
	// the legacy reset-calendar migration path for backwards compatibility.
	if (calendarDate.includes("T")) return toUtcISOString(calendarDate);
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
			const kind = task.kind === "event" ? "event" : "custom";
			if (
				typeof task.title !== "string" ||
				!task.title.trim() ||
				typeof task.startAt !== "string" ||
				!Number.isFinite(Date.parse(task.startAt)) ||
				(task.recurrence !== undefined &&
					(kind === "event"
						? !["none", "daily", "weekly"].includes(task.recurrence)
						: !["none", "daily", "weekly", "interval_days"].includes(
								task.recurrence,
							))) ||
				(task.mode !== undefined &&
					!["fixed", "after_completion"].includes(task.mode)) ||
				(task.recurrence === "interval_days" &&
					(!Number.isInteger(task.intervalDays) ||
						(task.intervalDays ?? 0) < 1))
			) {
				return [];
			}
			const startAt =
				kind === "event" || task.startAt.endsWith("Z")
					? toUtcISOString(task.startAt)
					: toResetAnchorDate(task.startAt);
			const endAt =
				typeof task.endAt === "string" &&
				Number.isFinite(Date.parse(task.endAt))
					? kind === "event" || task.endAt.endsWith("Z")
						? toUtcISOString(task.endAt)
						: toResetAnchorDate(task.endAt)
					: undefined;
			if (kind === "event" && !endAt) return [];
			if (
				kind === "event" &&
				endAt &&
				Date.parse(endAt) <= Date.parse(startAt)
			) {
				return [];
			}
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
						kind,
						source: "user",
						noticeTitle:
							kind === "event" && typeof task.noticeTitle === "string"
								? task.noticeTitle.trim() || undefined
								: undefined,
						startAt,
						endAt,
						intervalDays: kind === "event" ? undefined : task.intervalDays,
						mode: kind === "event" ? undefined : task.mode,
						dueDurationMinutes:
							kind === "event" ? undefined : task.dueDurationMinutes,
						scheduleVersion: scheduleVersion + Number(startAt !== task.startAt),
					} as ChecklistTask,
				],
			];
		}),
	) as Record<string, ChecklistTask>;
};
