import { describe, expect, it } from "vitest";
import {
	defaultChecklistPreferences,
	normalizeChecklistPersistedState,
} from "@/lib/checklist-persistence";

describe("normalizeChecklistPersistedState", () => {
	it("supplies safe checklist defaults for legacy state", () => {
		expect(normalizeChecklistPersistedState({})).toEqual({
			checklistTasks: {},
			checklistCompletions: {},
			checklistPreferences: defaultChecklistPreferences,
		});
	});

	it("merges partial preferences and migrates legacy reset dates", () => {
		const state = normalizeChecklistPersistedState({
			checklistTasks: {
				legacy: {
					id: "legacy",
					title: "Legacy",
					kind: "custom",
					startAt: "2026-07-27T00:00:00+08:00",
					recurrence: "daily",
					scheduleVersion: 1,
				},
			},
			checklistPreferences: {
				showExpired: true,
				categories: { event: false },
			},
		});

		expect(state.checklistTasks.legacy).toMatchObject({
			startAt: "2026-07-27T00:00:00.000Z",
			scheduleVersion: 2,
		});
		expect(state.checklistPreferences).toEqual({
			...defaultChecklistPreferences,
			showExpired: true,
			categories: {
				...defaultChecklistPreferences.categories,
				event: false,
			},
		});
	});

	it("drops malformed restored tasks and uses the record key as the id", () => {
		const state = normalizeChecklistPersistedState({
			checklistTasks: {
				valid: {
					id: "mismatch",
					title: "Valid",
					kind: "custom",
					startAt: "2026-07-27T00:00:00.000Z",
					recurrence: "daily",
					scheduleVersion: 1,
				},
				invalid: {
					title: "Invalid",
					kind: "custom",
					startAt: "not-a-date",
					recurrence: "interval_days",
					intervalDays: 0,
				},
			},
		});

		expect(Object.keys(state.checklistTasks)).toEqual(["valid"]);
		expect(state.checklistTasks.valid.id).toBe("valid");
	});
});
