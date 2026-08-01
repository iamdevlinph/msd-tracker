import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import {
	CHECKLIST_KINDS,
	CHECKLIST_MODES,
	CHECKLIST_RECURRENCES,
	type ChecklistDefinition,
	type ChecklistRecurrence,
} from "@/data/checklist/CHECKLIST_DATA";

export const CHECKLIST_STATUSES = {
	UPCOMING: "upcoming",
	ACTIVE: "active",
	ENDING_SOON: "ending-soon",
	COMPLETED: "completed",
	EXPIRED: "expired",
	OVERDUE: "overdue",
} as const;
export type ChecklistStatus =
	(typeof CHECKLIST_STATUSES)[keyof typeof CHECKLIST_STATUSES];

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
	if (recurrence === CHECKLIST_RECURRENCES.WEEKLY) return WEEK;
	if (recurrence === CHECKLIST_RECURRENCES.INTERVAL_DAYS)
		return intervalDays * DAY;
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
	const recurrence = definition.recurrence ?? CHECKLIST_RECURRENCES.NONE;
	if (recurrence === CHECKLIST_RECURRENCES.NONE) {
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
	let nextResetAt: number | undefined;
	const recurrenceStart = definition.recurrenceStartAt
		? Date.parse(definition.recurrenceStartAt)
		: start;
	if (definition.mode === CHECKLIST_MODES.AFTER_COMPLETION) {
		occurrenceStart = completedAt ? completedAt + interval : start;
	} else if (now >= start) {
		const cycle = Math.floor((now - recurrenceStart) / interval);
		occurrenceStart = Math.max(start, recurrenceStart + cycle * interval);
		nextResetAt = recurrenceStart + (cycle + 1) * interval;
	}

	return {
		startAt: occurrenceStart,
		endAt:
			definition.kind === CHECKLIST_KINDS.EVENT && definition.endAt
				? Date.parse(definition.endAt)
				: definition.dueDurationMinutes
					? occurrenceStart + definition.dueDurationMinutes * 60_000
					: undefined,
		nextResetAt: nextResetAt ?? occurrenceStart + interval,
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
		definition.kind === CHECKLIST_KINDS.EVENT &&
		occurrence.endAt !== undefined &&
		now >= occurrence.endAt
	) {
		return CHECKLIST_STATUSES.EXPIRED;
	}
	if (completed) return CHECKLIST_STATUSES.COMPLETED;
	if (now < occurrence.startAt) return CHECKLIST_STATUSES.UPCOMING;
	if (occurrence.endAt !== undefined && now >= occurrence.endAt) {
		return definition.kind === CHECKLIST_KINDS.CUSTOM
			? CHECKLIST_STATUSES.OVERDUE
			: CHECKLIST_STATUSES.EXPIRED;
	}
	if (
		definition.kind === CHECKLIST_KINDS.EVENT &&
		occurrence.endAt !== undefined &&
		occurrence.endAt - now <= thresholdHours * 3_600_000
	) {
		return CHECKLIST_STATUSES.ENDING_SOON;
	}
	return CHECKLIST_STATUSES.ACTIVE;
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
		[CHECKLIST_KINDS.EVENT]: 0,
		[CHECKLIST_KINDS.PERMANENT]: 1,
		[CHECKLIST_KINDS.CUSTOM]: 2,
	};
	const recurrenceRank: Record<ChecklistRecurrence, number> = {
		[CHECKLIST_RECURRENCES.WEEKLY]: 0,
		[CHECKLIST_RECURRENCES.DAILY]: 1,
		[CHECKLIST_RECURRENCES.NONE]: 2,
		[CHECKLIST_RECURRENCES.INTERVAL_DAYS]: 2,
	};
	const eventTimingRank = (item: T) =>
		item.status === CHECKLIST_STATUSES.UPCOMING
			? 0
			: (item.status === CHECKLIST_STATUSES.ACTIVE ||
						item.status === CHECKLIST_STATUSES.ENDING_SOON) &&
					item.occurrence.endAt !== undefined
				? 1
				: 2;
	return [...items].sort((a, b) => {
		const completionOrder =
			Number(a.status === CHECKLIST_STATUSES.COMPLETED) -
			Number(b.status === CHECKLIST_STATUSES.COMPLETED);
		if (completionOrder) return completionOrder;
		const kindOrder = kindRank[a.definition.kind] - kindRank[b.definition.kind];
		if (kindOrder) return kindOrder;
		const recurrenceOrder =
			recurrenceRank[a.definition.recurrence ?? CHECKLIST_RECURRENCES.NONE] -
			recurrenceRank[b.definition.recurrence ?? CHECKLIST_RECURRENCES.NONE];
		if (recurrenceOrder) return recurrenceOrder;
		if (
			a.definition.kind === CHECKLIST_KINDS.EVENT &&
			b.definition.kind === CHECKLIST_KINDS.EVENT
		) {
			const statusOrder = eventTimingRank(a) - eventTimingRank(b);
			if (statusOrder) return statusOrder;
			if (a.status === CHECKLIST_STATUSES.UPCOMING) {
				const startOrder = a.occurrence.startAt - b.occurrence.startAt;
				if (startOrder) return startOrder;
			}
			if (
				(a.status === CHECKLIST_STATUSES.ACTIVE ||
					a.status === CHECKLIST_STATUSES.ENDING_SOON) &&
				(b.status === CHECKLIST_STATUSES.ACTIVE ||
					b.status === CHECKLIST_STATUSES.ENDING_SOON) &&
				a.occurrence.endAt !== undefined &&
				b.occurrence.endAt !== undefined
			) {
				const endOrder = a.occurrence.endAt - b.occurrence.endAt;
				if (endOrder) return endOrder;
			}
		}
		return a.definition.title.localeCompare(b.definition.title);
	});
}

export const isChecklistTask = (
	definition: ChecklistDefinition,
): definition is ChecklistTask =>
	("scheduleVersion" in definition &&
		typeof definition.scheduleVersion === "number") ||
	("source" in definition && definition.source === "user");
