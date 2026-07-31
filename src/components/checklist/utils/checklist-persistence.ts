import {
	type ChecklistTask,
	normalizeChecklistTasks,
} from "@/components/checklist/utils/checklist-task";
import { CHECKLIST_KINDS, type ChecklistKind } from "@/data/CHECKLIST_DATA";

export type ChecklistPreferences = {
	categories: Record<ChecklistKind, boolean>;
	showUpcoming: boolean;
	showCompleted: boolean;
	showExpired: boolean;
	endingSoonHours: 5 | 12 | 24 | 48 | 72;
};

export const defaultChecklistPreferences: ChecklistPreferences = {
	categories: {
		[CHECKLIST_KINDS.EVENT]: true,
		[CHECKLIST_KINDS.PERMANENT]: true,
		[CHECKLIST_KINDS.CUSTOM]: true,
	},
	showUpcoming: true,
	showCompleted: true,
	showExpired: true,
	endingSoonHours: 24,
};

type PersistedChecklistState = {
	checklistTasks?: unknown;
	checklistCompletions?: Record<string, number>;
	checklistPermanentNotes?: unknown;
	checklistPreferences?: Partial<Omit<ChecklistPreferences, "categories">> & {
		categories?: Partial<ChecklistPreferences["categories"]>;
	};
};

export const normalizeChecklistPermanentNotes = (
	notes: unknown,
): Record<string, string> => {
	if (!notes || typeof notes !== "object") return {};
	return Object.fromEntries(
		Object.entries(notes).flatMap(([id, value]): [string, string][] => {
			if (typeof value !== "string") return [];
			const trimmed = value.trim();
			return trimmed && trimmed.length <= 500 ? [[id, trimmed]] : [];
		}),
	);
};

export const normalizeChecklistPersistedState = (
	state: PersistedChecklistState,
): {
	checklistTasks: Record<string, ChecklistTask>;
	checklistCompletions: Record<string, number>;
	checklistPermanentNotes: Record<string, string>;
	checklistPreferences: ChecklistPreferences;
} => ({
	checklistTasks: normalizeChecklistTasks(state.checklistTasks),
	checklistCompletions: state.checklistCompletions ?? {},
	checklistPermanentNotes: normalizeChecklistPermanentNotes(
		state.checklistPermanentNotes,
	),
	checklistPreferences: {
		...defaultChecklistPreferences,
		...state.checklistPreferences,
		categories: {
			...defaultChecklistPreferences.categories,
			...state.checklistPreferences?.categories,
		},
	},
});
