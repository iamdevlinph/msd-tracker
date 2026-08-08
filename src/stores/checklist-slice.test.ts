// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	formatCountdown,
	getOccurrence,
} from "@/components/checklist/utils/checklist";
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
		checklistPermanentNotes: {},
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
		expect(migrated.checklistPermanentNotes).toEqual({});
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
			source: "user",
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

	it("stores player events with their absolute UTC end and invalidates completions when their type changes", () => {
		const id = useAppStore.getState().recordChecklistTask({
			...task,
			kind: "event",
			endAt: "2026-08-11T23:59:00.000Z",
		});

		expect(useAppStore.getState().checklistTasks[id]).toMatchObject({
			kind: "event",
			source: "user",
			endAt: "2026-08-11T23:59:00.000Z",
			scheduleVersion: 1,
		});

		useAppStore.getState().updateChecklistTask(id, {
			...task,
			kind: "custom",
		});
		expect(useAppStore.getState().checklistTasks[id]).toMatchObject({
			kind: "custom",
			source: "user",
			scheduleVersion: 2,
		});
	});

	it("persists preference changes and resets the complete slice", () => {
		vi.spyOn(Date, "now").mockReturnValue(456);
		useAppStore
			.getState()
			.setChecklistPreferences({ showFullyCompleted: false });
		expect(useAppStore.getState().checklistPreferences.showFullyCompleted).toBe(
			false,
		);
		expect(useAppStore.getState().backupUpdatedAt).toBe(456);

		useAppStore.getState().resetChecklist();
		expect(useAppStore.getState().checklistPreferences).toEqual(
			defaultChecklistPreferences,
		);
	});

	it("stores permanent notes only on effective changes and clears them on reset", () => {
		vi.spyOn(Date, "now").mockReturnValue(100);
		useAppStore
			.getState()
			.setChecklistPermanentNote("fixture-permanent", "  Remember this  ");
		expect(useAppStore.getState().checklistPermanentNotes).toEqual({
			"fixture-permanent": "Remember this",
		});
		expect(useAppStore.getState().backupUpdatedAt).toBe(100);

		vi.mocked(Date.now).mockReturnValue(200);
		useAppStore
			.getState()
			.setChecklistPermanentNote("fixture-permanent", "Remember this");
		expect(useAppStore.getState().backupUpdatedAt).toBe(100);

		useAppStore.setState({
			checklistTasks: {
				custom: {
					id: "custom",
					...task,
					kind: "custom",
					source: "user",
					scheduleVersion: 1,
				},
			},
		});
		useAppStore.getState().deleteChecklistTask("custom");
		expect(useAppStore.getState().checklistPermanentNotes).toEqual({
			"fixture-permanent": "Remember this",
		});

		useAppStore.getState().setChecklistPermanentNote("fixture-permanent", " ");
		expect(useAppStore.getState().checklistPermanentNotes).toEqual({});
		expect(useAppStore.getState().backupUpdatedAt).toBe(200);

		useAppStore
			.getState()
			.setChecklistPermanentNote("fixture-permanent", "Restore");
		useAppStore.getState().resetChecklist();
		expect(useAppStore.getState().checklistPermanentNotes).toEqual({});
	});
});
