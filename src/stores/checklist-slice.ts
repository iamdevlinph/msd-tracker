import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import {
	type ChecklistPreferences,
	defaultChecklistPreferences,
} from "@/components/checklist/utils/checklist-persistence";
import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import type { StoreState } from "@/stores/app-store";

export {
	type ChecklistPreferences,
	defaultChecklistPreferences,
} from "@/components/checklist/utils/checklist-persistence";
export type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
export {
	getChecklistStartAnchor,
	normalizeChecklistTasks,
	toResetAnchorDate,
} from "@/components/checklist/utils/checklist-task";

const scheduleFields = [
	"kind",
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
	checklistPermanentNotes: Record<string, string>;
	checklistPreferences: ChecklistPreferences;
	recordChecklistTask: (
		task: Omit<ChecklistTask, "id" | "scheduleVersion" | "source" | "kind"> & {
			id?: string;
			kind?: ChecklistTask["kind"];
		},
	) => string;
	updateChecklistTask: (
		id: string,
		task: Omit<ChecklistTask, "id" | "scheduleVersion" | "source" | "kind"> & {
			kind?: ChecklistTask["kind"];
		},
	) => void;
	deleteChecklistTask: (id: string) => void;
	completeChecklist: (key: string) => void;
	undoChecklist: (key: string) => void;
	setChecklistPreferences: (preferences: Partial<ChecklistPreferences>) => void;
	setChecklistPermanentNote: (id: string, note: string) => void;
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
	checklistPermanentNotes: {},
	checklistPreferences: defaultChecklistPreferences,
	recordChecklistTask: (task) => {
		const id = task.id ?? nanoid();
		set((state) => ({
			checklistTasks: {
				...state.checklistTasks,
				[id]: {
					...task,
					id,
					kind: task.kind ?? "custom",
					source: "user",
					scheduleVersion: 1,
				},
			},
			backupUpdatedAt: Date.now(),
		}));
		return id;
	},
	updateChecklistTask: (id, task) =>
		set((state) => {
			const currentTask = state.checklistTasks[id];
			if (!currentTask) return state;
			const nextTask = {
				...task,
				kind: task.kind ?? currentTask.kind,
			};
			const scheduleChanged = scheduleFields.some(
				(field) => currentTask[field] !== nextTask[field],
			);
			return {
				checklistTasks: {
					...state.checklistTasks,
					[id]: {
						...currentTask,
						...nextTask,
						source: "user",
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
	setChecklistPermanentNote: (id, note) =>
		set((state) => {
			const trimmed = note.trim().slice(0, 500);
			const current = state.checklistPermanentNotes[id] ?? "";
			if (trimmed === current) return state;
			const checklistPermanentNotes = { ...state.checklistPermanentNotes };
			if (trimmed) checklistPermanentNotes[id] = trimmed;
			else delete checklistPermanentNotes[id];
			return { checklistPermanentNotes, backupUpdatedAt: Date.now() };
		}),
	resetChecklist: () =>
		set({
			checklistTasks: {},
			checklistCompletions: {},
			checklistPermanentNotes: {},
			checklistPreferences: defaultChecklistPreferences,
			backupUpdatedAt: Date.now(),
		}),
});
