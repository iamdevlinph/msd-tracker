import {
	type ChecklistDefinition,
	type ChecklistKind,
	PERMANENT_EVENTS,
} from "@/data/CHECKLIST_DATA";
import { EVENTS_DATA } from "@/data/EVENTS_DATA";
import {
	type ChecklistOccurrence,
	type ChecklistStatus,
	fullCompletionKey,
	getChecklistStatus,
	getOccurrence,
	latestCompletion,
	occurrenceKey,
	sortChecklistItems,
} from "@/lib/checklist";
import type { ChecklistPreferences } from "@/lib/checklist-persistence";
import type { ChecklistTask } from "@/lib/checklist-task";

export type ChecklistTab = ChecklistKind | "all";

export type ChecklistViewItem = {
	definition: ChecklistDefinition;
	occurrence: ChecklistOccurrence;
	completionKey: string;
	fullCompletionKey: string;
	occurrenceCompleted: boolean;
	fullyCompleted: boolean;
	status: ChecklistStatus;
};

type ChecklistViewInput = {
	tasks: Record<string, ChecklistTask>;
	completions: Record<string, number>;
	preferences: ChecklistPreferences;
	tab: ChecklistTab;
	now: number;
};

export const getChecklistView = ({
	tasks,
	completions,
	preferences,
	tab,
	now,
}: ChecklistViewInput): ChecklistViewItem[] =>
	sortChecklistItems(
		[...PERMANENT_EVENTS, ...EVENTS_DATA, ...Object.values(tasks)]
			.filter(
				(definition) =>
					preferences.categories[definition.kind] &&
					(tab === "all" || definition.kind === tab),
			)
			.map((definition) => {
				const latest = latestCompletion(definition, completions);
				const occurrence = getOccurrence(definition, now, latest?.[1]);
				const currentKey = occurrenceKey(definition, occurrence.startAt);
				const eventFullKey = fullCompletionKey(definition);
				const occurrenceCompleted = Boolean(completions[currentKey]);
				const fullyCompleted =
					definition.kind === "event" &&
					Boolean(completions[eventFullKey]) &&
					now >= occurrence.startAt &&
					!(occurrence.endAt !== undefined && now >= occurrence.endAt);
				const waitingForRollingReset =
					definition.kind === "custom" &&
					definition.mode === "after_completion" &&
					Boolean(latest) &&
					now < occurrence.startAt;
				const completed =
					fullyCompleted ||
					(waitingForRollingReset ? true : occurrenceCompleted);

				return {
					definition,
					occurrence,
					completionKey:
						waitingForRollingReset && latest ? latest[0] : currentKey,
					fullCompletionKey: eventFullKey,
					occurrenceCompleted,
					fullyCompleted,
					status: getChecklistStatus(
						definition,
						occurrence,
						now,
						completed,
						preferences.endingSoonHours,
					),
				};
			})
			.filter(
				({ status }) =>
					(status !== "upcoming" || preferences.showUpcoming) &&
					(status !== "completed" || preferences.showCompleted) &&
					(status !== "expired" || preferences.showExpired),
			),
	);
