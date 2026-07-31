import {
	CHECKLIST_EVENT_RECURRENCE_VALUES,
	CHECKLIST_KINDS,
	CHECKLIST_MODE_VALUES,
	CHECKLIST_RECURRENCE_VALUES,
	CHECKLIST_RECURRENCES,
	type ChecklistDefinition,
	type ChecklistKind,
} from "@/data/CHECKLIST_DATA";

export type ChecklistTask = ChecklistDefinition & {
	kind: Extract<ChecklistKind, (typeof CHECKLIST_KINDS)["CUSTOM" | "EVENT"]>;
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
	if (
		recurrence !== CHECKLIST_RECURRENCES.WEEKLY ||
		!Number.isFinite(selected.getTime())
	) {
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
			const kind =
				task.kind === CHECKLIST_KINDS.EVENT
					? CHECKLIST_KINDS.EVENT
					: CHECKLIST_KINDS.CUSTOM;
			if (
				typeof task.title !== "string" ||
				!task.title.trim() ||
				typeof task.startAt !== "string" ||
				!Number.isFinite(Date.parse(task.startAt)) ||
				(task.recurrence !== undefined &&
					(kind === CHECKLIST_KINDS.EVENT
						? !CHECKLIST_EVENT_RECURRENCE_VALUES.some(
								(recurrence) => recurrence === task.recurrence,
							)
						: !CHECKLIST_RECURRENCE_VALUES.includes(task.recurrence))) ||
				(task.mode !== undefined &&
					!CHECKLIST_MODE_VALUES.includes(task.mode)) ||
				(task.recurrence === CHECKLIST_RECURRENCES.INTERVAL_DAYS &&
					(!Number.isInteger(task.intervalDays) ||
						(task.intervalDays ?? 0) < 1))
			) {
				return [];
			}
			const startAt =
				kind === CHECKLIST_KINDS.EVENT || task.startAt.endsWith("Z")
					? toUtcISOString(task.startAt)
					: toResetAnchorDate(task.startAt);
			const endAt =
				typeof task.endAt === "string" &&
				Number.isFinite(Date.parse(task.endAt))
					? kind === CHECKLIST_KINDS.EVENT || task.endAt.endsWith("Z")
						? toUtcISOString(task.endAt)
						: toResetAnchorDate(task.endAt)
					: undefined;
			if (kind === CHECKLIST_KINDS.EVENT && !endAt) return [];
			if (
				kind === CHECKLIST_KINDS.EVENT &&
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
							kind === CHECKLIST_KINDS.EVENT &&
							typeof task.noticeTitle === "string"
								? task.noticeTitle.trim() || undefined
								: undefined,
						startAt,
						endAt,
						intervalDays:
							kind === CHECKLIST_KINDS.EVENT ? undefined : task.intervalDays,
						mode: kind === CHECKLIST_KINDS.EVENT ? undefined : task.mode,
						dueDurationMinutes:
							kind === CHECKLIST_KINDS.EVENT
								? undefined
								: task.dueDurationMinutes,
						scheduleVersion: scheduleVersion + Number(startAt !== task.startAt),
					} as ChecklistTask,
				],
			];
		}),
	) as Record<string, ChecklistTask>;
};
