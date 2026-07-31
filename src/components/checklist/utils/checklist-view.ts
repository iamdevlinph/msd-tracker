import {
	CHECKLIST_STATUSES,
	type ChecklistOccurrence,
	type ChecklistStatus,
	fullCompletionKey,
	getChecklistStatus,
	getOccurrence,
	isChecklistTask,
	latestCompletion,
	occurrenceKey,
	sortChecklistItems,
} from "@/components/checklist/utils/checklist";
import type { ChecklistPreferences } from "@/components/checklist/utils/checklist-persistence";
import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import {
	CHECKLIST_KINDS,
	CHECKLIST_MODES,
	type ChecklistDefinition,
	type ChecklistKind,
	PERMANENT_EVENTS,
} from "@/data/checklist/CHECKLIST_DATA";
import { EVENTS_DATA } from "@/data/events/EVENTS_DATA";

export type ChecklistTab = ChecklistKind | "all";

export type ChecklistViewItem = {
	definition: ChecklistDefinition;
	occurrence: ChecklistOccurrence;
	completionKey: string;
	fullCompletionKey: string;
	occurrenceCompleted: boolean;
	fullyCompleted: boolean;
	status: ChecklistStatus;
	notes?: string;
};

type ChecklistViewInput = {
	tasks: Record<string, ChecklistTask>;
	completions: Record<string, number>;
	preferences: ChecklistPreferences;
	permanentNotes?: Record<string, string>;
	tab: ChecklistTab;
	now: number;
};

export const getChecklistView = ({
	tasks,
	completions,
	preferences,
	permanentNotes = {},
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
					definition.kind === CHECKLIST_KINDS.EVENT &&
					Boolean(completions[eventFullKey]) &&
					now >= occurrence.startAt &&
					!(occurrence.endAt !== undefined && now >= occurrence.endAt);
				const waitingForRollingReset =
					definition.kind === CHECKLIST_KINDS.CUSTOM &&
					definition.mode === CHECKLIST_MODES.AFTER_COMPLETION &&
					Boolean(latest) &&
					now < occurrence.startAt;
				const completed =
					fullyCompleted ||
					(waitingForRollingReset ? true : occurrenceCompleted);

				return {
					definition,
					notes:
						definition.kind === CHECKLIST_KINDS.PERMANENT
							? permanentNotes[definition.id]
							: isChecklistTask(definition)
								? definition.notes
								: undefined,
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
					(status !== CHECKLIST_STATUSES.UPCOMING ||
						preferences.showUpcoming) &&
					(status !== CHECKLIST_STATUSES.COMPLETED ||
						preferences.showCompleted) &&
					(status !== CHECKLIST_STATUSES.EXPIRED || preferences.showExpired),
			),
	);
