import type {
	ChecklistDefinition,
	ChecklistRecurrence,
} from "@/data/CHECKLIST_DATA";
import type { ChecklistTask } from "@/lib/checklist-task";

export type ChecklistStatus =
	| "upcoming"
	| "active"
	| "ending-soon"
	| "completed"
	| "expired"
	| "overdue";

const DAY = 86_400_000;
const WEEK = 7 * DAY;

export type ChecklistOccurrence = {
	startAt: number;
	endAt?: number;
	nextResetAt?: number;
};

const getInterval = (recurrence: ChecklistRecurrence, intervalDays = 1) => {
	if (recurrence === "weekly") return WEEK;
	if (recurrence === "interval_days") return intervalDays * DAY;
	return DAY;
};

export function occurrenceKey(
	definition: ChecklistDefinition,
	startAt: number,
) {
	const version =
		"scheduleVersion" in definition ? `v${definition.scheduleVersion}:` : "";
	return `${definition.id}:${version}${new Date(startAt).toISOString()}`;
}

export function latestCompletion(
	definition: ChecklistDefinition,
	completions: Record<string, number>,
) {
	const version =
		"scheduleVersion" in definition ? `v${definition.scheduleVersion}:` : "";
	const prefix = `${definition.id}:${version}`;
	return Object.entries(completions)
		.filter(([key]) => key.startsWith(prefix))
		.sort(([, a], [, b]) => b - a)[0];
}

export function getOccurrence(
	definition: ChecklistDefinition,
	now = Date.now(),
	completedAt?: number,
) {
	const start = Date.parse(definition.startAt);
	const recurrence = definition.recurrence ?? "none";
	if (recurrence === "none") {
		return {
			startAt: start,
			endAt: definition.endAt
				? Date.parse(definition.endAt)
				: definition.dueDurationMinutes
					? start + definition.dueDurationMinutes * 60_000
					: undefined,
		};
	}

	const interval = getInterval(recurrence, definition.intervalDays);
	let occurrenceStart = start;
	if (definition.mode === "after_completion") {
		occurrenceStart = completedAt ? completedAt + interval : start;
	} else if (now > start) {
		occurrenceStart = start + Math.floor((now - start) / interval) * interval;
	}

	return {
		startAt: occurrenceStart,
		endAt:
			definition.kind === "event" && definition.endAt
				? Date.parse(definition.endAt)
				: definition.dueDurationMinutes
					? occurrenceStart + definition.dueDurationMinutes * 60_000
					: undefined,
		nextResetAt: occurrenceStart + interval,
	};
}

export function getChecklistStatus(
	definition: ChecklistDefinition,
	occurrence: ChecklistOccurrence,
	now = Date.now(),
	completed = false,
	thresholdHours = 24,
): ChecklistStatus {
	if (
		definition.kind === "event" &&
		occurrence.endAt !== undefined &&
		now >= occurrence.endAt
	) {
		return "expired";
	}
	if (completed) return "completed";
	if (now < occurrence.startAt) return "upcoming";
	if (occurrence.endAt !== undefined && now >= occurrence.endAt) {
		return definition.kind === "custom" ? "overdue" : "expired";
	}
	if (
		definition.kind === "event" &&
		occurrence.endAt !== undefined &&
		occurrence.endAt - now <= thresholdHours * 3_600_000
	) {
		return "ending-soon";
	}
	return "active";
}

export function formatCountdown(milliseconds: number) {
	const seconds = Math.max(0, Math.floor(milliseconds / 1000));
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor((seconds % 86400) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	if (days) return `${days}d ${hours}h`;
	if (hours) return `${hours}h ${minutes}m`;
	return `${minutes}m`;
}

export function sortChecklistItems<
	T extends {
		status: ChecklistStatus;
		definition: ChecklistDefinition;
		occurrence: ChecklistOccurrence;
	},
>(items: T[]) {
	const rank: Record<ChecklistStatus, number> = {
		"ending-soon": 0,
		active: 1,
		overdue: 2,
		upcoming: 3,
		completed: 4,
		expired: 5,
	};
	return [...items].sort((a, b) => {
		const statusOrder = rank[a.status] - rank[b.status];
		if (statusOrder) return statusOrder;
		const priorityOrder =
			(b.definition.kind === "event" ? 1 : 0) -
			(a.definition.kind === "event" ? 1 : 0);
		return (
			priorityOrder ||
			a.occurrence.startAt - b.occurrence.startAt ||
			a.definition.title.localeCompare(b.definition.title)
		);
	});
}

export const isChecklistTask = (
	definition: ChecklistDefinition,
): definition is ChecklistTask =>
	("scheduleVersion" in definition &&
		typeof definition.scheduleVersion === "number") ||
	("source" in definition && definition.source === "user");
