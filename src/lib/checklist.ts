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

const getCompletionVersion = (definition: ChecklistDefinition) =>
	"scheduleVersion" in definition &&
	typeof definition.scheduleVersion === "number"
		? definition.scheduleVersion
		: definition.completionVersion;

const getInterval = (recurrence: ChecklistRecurrence, intervalDays = 1) => {
	if (recurrence === "weekly") return WEEK;
	if (recurrence === "interval_days") return intervalDays * DAY;
	return DAY;
};

export function occurrenceKey(
	definition: ChecklistDefinition,
	startAt: number,
) {
	const version = getCompletionVersion(definition);
	const versionPrefix = version === undefined ? "" : `v${version}:`;
	return `${definition.id}:${versionPrefix}${new Date(startAt).toISOString()}`;
}

export function fullCompletionKey(definition: ChecklistDefinition) {
	const version = getCompletionVersion(definition);
	const versionPrefix = version === undefined ? "" : `v${version}:`;
	return `${definition.id}:${versionPrefix}full`;
}

export function latestCompletion(
	definition: ChecklistDefinition,
	completions: Record<string, number>,
) {
	const version = getCompletionVersion(definition);
	const versionPrefix = version === undefined ? "" : `v${version}:`;
	const prefix = `${definition.id}:${versionPrefix}`;
	return Object.entries(completions)
		.filter(([key]) => key.startsWith(prefix) && !key.endsWith(":full"))
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
	const kindRank: Record<ChecklistDefinition["kind"], number> = {
		event: 0,
		permanent: 1,
		custom: 2,
	};
	const recurrenceRank: Record<ChecklistRecurrence, number> = {
		weekly: 0,
		daily: 1,
		none: 2,
		interval_days: 2,
	};
	return [...items].sort((a, b) => {
		const completionOrder =
			Number(a.status === "completed") - Number(b.status === "completed");
		if (completionOrder) return completionOrder;
		const kindOrder = kindRank[a.definition.kind] - kindRank[b.definition.kind];
		if (kindOrder) return kindOrder;
		const recurrenceOrder =
			recurrenceRank[a.definition.recurrence ?? "none"] -
			recurrenceRank[b.definition.recurrence ?? "none"];
		return (
			recurrenceOrder || a.definition.title.localeCompare(b.definition.title)
		);
	});
}

export const isChecklistTask = (
	definition: ChecklistDefinition,
): definition is ChecklistTask =>
	("scheduleVersion" in definition &&
		typeof definition.scheduleVersion === "number") ||
	("source" in definition && definition.source === "user");
