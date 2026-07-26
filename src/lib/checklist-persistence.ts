import {
	type ChecklistTask,
	normalizeChecklistTasks,
} from "@/lib/checklist-task";

export type ChecklistPreferences = {
	categories: Record<"event" | "permanent" | "custom", boolean>;
	showUpcoming: boolean;
	showCompleted: boolean;
	showExpired: boolean;
	endingSoonHours: 5 | 12 | 24 | 48 | 72;
};

export const defaultChecklistPreferences: ChecklistPreferences = {
	categories: { event: true, permanent: true, custom: true },
	showUpcoming: true,
	showCompleted: true,
	showExpired: true,
	endingSoonHours: 24,
};

type PersistedChecklistState = {
	checklistTasks?: unknown;
	checklistCompletions?: Record<string, number>;
	checklistPreferences?: Partial<Omit<ChecklistPreferences, "categories">> & {
		categories?: Partial<ChecklistPreferences["categories"]>;
	};
};

export const normalizeChecklistPersistedState = (
	state: PersistedChecklistState,
): {
	checklistTasks: Record<string, ChecklistTask>;
	checklistCompletions: Record<string, number>;
	checklistPreferences: ChecklistPreferences;
} => ({
	checklistTasks: normalizeChecklistTasks(state.checklistTasks),
	checklistCompletions: state.checklistCompletions ?? {},
	checklistPreferences: {
		...defaultChecklistPreferences,
		...state.checklistPreferences,
		categories: {
			...defaultChecklistPreferences.categories,
			...state.checklistPreferences?.categories,
		},
	},
});
