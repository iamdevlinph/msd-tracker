// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { formatCountdown, getOccurrence } from "@/lib/checklist";
import { migrateAppStore, useAppStore } from "@/stores/app-store";
import {
	defaultChecklistPreferences,
	getChecklistStartAnchor,
} from "@/stores/checklist-slice";

const task = {
	title: "Farm materials",
	description: undefined,
	notes: "Before reset",
	startAt: "2026-07-27T00:00:00.000Z",
	endAt: undefined,
	recurrence: "daily" as const,
	intervalDays: undefined,
	mode: "fixed" as const,
	dueDurationMinutes: undefined,
};

afterEach(() => {
	vi.restoreAllMocks();
	useAppStore.setState({
		checklistTasks: {},
		checklistCompletions: {},
		checklistPreferences: defaultChecklistPreferences,
	});
});

describe("Checklist store", () => {
	it("anchors recurring starts to the server reset calendar", () => {
		expect(getChecklistStartAnchor("2026-07-26", "daily")).toBe(
			"2026-07-26T00:00:00.000Z",
		);
		expect(getChecklistStartAnchor("2026-07-26", "weekly")).toBe(
			"2026-07-27T00:00:00.000Z",
		);
	});

	it("counts down daily and weekly starts from UTC reset anchors", () => {
		const now = Date.parse("2026-07-25T17:42:00.000Z");
		const dailyStart = getChecklistStartAnchor("2026-07-26", "daily");
		const weeklyStart = getChecklistStartAnchor("2026-07-26", "weekly");
		expect(formatCountdown(Date.parse(dailyStart) - now)).toBe("6h 18m");
		expect(formatCountdown(Date.parse(weeklyStart) - now)).toBe("1d 6h");
		expect(
			getOccurrence(
				{
					id: "weekly",
					title: "Weekly",
					kind: "custom",
					startAt: weeklyStart,
					recurrence: "weekly",
				},
				now,
			).startAt,
		).toBe(Date.parse(weeklyStart));
	});

	it("migrates legacy persisted state with safe checklist defaults", () => {
		const migrated = migrateAppStore({});
		expect(migrated.checklistTasks).toEqual({});
		expect(migrated.checklistCompletions).toEqual({});
		expect(migrated.checklistPreferences).toEqual(defaultChecklistPreferences);
	});

	it("anchors legacy local-midnight dates at the reset and advances the schedule", () => {
		const migrated = migrateAppStore({
			checklistTasks: {
				legacy: {
					...task,
					startAt: "2026-07-27T00:00:00+08:00",
					scheduleVersion: 1,
				},
			},
		});
		expect(migrated.checklistTasks.legacy.startAt).toBe(
			"2026-07-27T00:00:00.000Z",
		);
		expect(migrated.checklistTasks.legacy.scheduleVersion).toBe(2);
	});

	it("creates, edits, completes, undoes, and deletes durable task data", () => {
		vi.spyOn(Date, "now").mockReturnValue(123);
		const id = useAppStore.getState().recordChecklistTask(task);
		expect(useAppStore.getState().checklistTasks[id]).toMatchObject({
			...task,
			id,
			kind: "custom",
			scheduleVersion: 1,
		});
		expect(useAppStore.getState().backupUpdatedAt).toBe(123);

		useAppStore
			.getState()
			.updateChecklistTask(id, { ...task, title: "Farm gear" });
		expect(useAppStore.getState().checklistTasks[id].scheduleVersion).toBe(1);

		useAppStore.getState().updateChecklistTask(id, {
			...task,
			startAt: "2026-07-28T00:00:00.000Z",
		});
		expect(useAppStore.getState().checklistTasks[id].scheduleVersion).toBe(2);

		const completionKey = `${id}:v2:occurrence`;
		useAppStore.getState().completeChecklist(completionKey);
		expect(useAppStore.getState().checklistCompletions[completionKey]).toBe(
			123,
		);
		useAppStore.getState().undoChecklist(completionKey);
		expect(useAppStore.getState().checklistCompletions).toEqual({});

		useAppStore.getState().completeChecklist(completionKey);
		useAppStore.getState().deleteChecklistTask(id);
		expect(useAppStore.getState().checklistTasks).toEqual({});
		expect(useAppStore.getState().checklistCompletions).toEqual({});
	});

	it("persists preference changes and resets the complete slice", () => {
		vi.spyOn(Date, "now").mockReturnValue(456);
		useAppStore.getState().setChecklistPreferences({ showExpired: true });
		expect(useAppStore.getState().checklistPreferences.showExpired).toBe(true);
		expect(useAppStore.getState().backupUpdatedAt).toBe(456);

		useAppStore.getState().resetChecklist();
		expect(useAppStore.getState().checklistPreferences).toEqual(
			defaultChecklistPreferences,
		);
	});
});
