import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import {
	type ChecklistPreferences,
	defaultChecklistPreferences,
} from "@/lib/checklist-persistence";
import type { ChecklistTask } from "@/lib/checklist-task";
import type { StoreState } from "@/stores/app-store";

export {
	type ChecklistPreferences,
	defaultChecklistPreferences,
} from "@/lib/checklist-persistence";
export type { ChecklistTask } from "@/lib/checklist-task";
export {
	getChecklistStartAnchor,
	normalizeChecklistTasks,
	toResetAnchorDate,
} from "@/lib/checklist-task";

const scheduleFields = [
	"startAt",
	"endAt",
	"recurrence",
	"intervalDays",
	"mode",
	"dueDurationMinutes",
] as const satisfies ReadonlyArray<keyof ChecklistTask>;

export type ChecklistSlice = {
	checklistTasks: Record<string, ChecklistTask>;
	checklistCompletions: Record<string, number>;
	checklistPreferences: ChecklistPreferences;
	recordChecklistTask: (
		task: Omit<ChecklistTask, "id" | "scheduleVersion" | "kind"> & {
			id?: string;
		},
	) => string;
	updateChecklistTask: (
		id: string,
		task: Omit<ChecklistTask, "id" | "kind" | "scheduleVersion">,
	) => void;
	deleteChecklistTask: (id: string) => void;
	completeChecklist: (key: string) => void;
	undoChecklist: (key: string) => void;
	setChecklistPreferences: (preferences: Partial<ChecklistPreferences>) => void;
	resetChecklist: () => void;
};

export const createChecklistSlice: StateCreator<
	StoreState,
	[],
	[],
	ChecklistSlice
> = (set) => ({
	checklistTasks: {},
	checklistCompletions: {},
	checklistPreferences: defaultChecklistPreferences,
	recordChecklistTask: (task) => {
		const id = task.id ?? nanoid();
		set((state) => ({
			checklistTasks: {
				...state.checklistTasks,
				[id]: { ...task, id, kind: "custom", scheduleVersion: 1 },
			},
			backupUpdatedAt: Date.now(),
		}));
		return id;
	},
	updateChecklistTask: (id, task) =>
		set((state) => {
			const currentTask = state.checklistTasks[id];
			if (!currentTask) return state;
			const scheduleChanged = scheduleFields.some(
				(field) => currentTask[field] !== task[field],
			);
			return {
				checklistTasks: {
					...state.checklistTasks,
					[id]: {
						...currentTask,
						...task,
						scheduleVersion:
							currentTask.scheduleVersion + Number(scheduleChanged),
					},
				},
				backupUpdatedAt: Date.now(),
			};
		}),
	deleteChecklistTask: (id) =>
		set((state) => ({
			checklistTasks: Object.fromEntries(
				Object.entries(state.checklistTasks).filter(([key]) => key !== id),
			),
			checklistCompletions: Object.fromEntries(
				Object.entries(state.checklistCompletions).filter(
					([key]) => !key.startsWith(`${id}:`),
				),
			),
			backupUpdatedAt: Date.now(),
		})),
	completeChecklist: (key) =>
		set((state) =>
			state.checklistCompletions[key]
				? state
				: {
						checklistCompletions: {
							...state.checklistCompletions,
							[key]: Date.now(),
						},
						backupUpdatedAt: Date.now(),
					},
		),
	undoChecklist: (key) =>
		set((state) => {
			if (!state.checklistCompletions[key]) return state;
			const { [key]: _removed, ...checklistCompletions } =
				state.checklistCompletions;
			return { checklistCompletions, backupUpdatedAt: Date.now() };
		}),
	setChecklistPreferences: (preferences) =>
		set((state) => ({
			checklistPreferences: {
				...state.checklistPreferences,
				...preferences,
				categories: {
					...state.checklistPreferences.categories,
					...preferences.categories,
				},
			},
			backupUpdatedAt: Date.now(),
		})),
	resetChecklist: () =>
		set({
			checklistTasks: {},
			checklistCompletions: {},
			checklistPreferences: defaultChecklistPreferences,
			backupUpdatedAt: Date.now(),
		}),
});
