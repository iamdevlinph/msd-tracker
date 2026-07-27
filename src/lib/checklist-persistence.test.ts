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
			checklistPermanentNotes: {},
			checklistPreferences: defaultChecklistPreferences,
		});
	});

	it("keeps valid orphan permanent notes and removes invalid values", () => {
		expect(
			normalizeChecklistPersistedState({
				checklistPermanentNotes: {
					"missing-definition": "  Keep for later  ",
					blank: " ",
					long: "a".repeat(501),
					invalid: 1,
				},
			}).checklistPermanentNotes,
		).toEqual({ "missing-definition": "Keep for later" });
	});

	it("preserves full-event completion keys", () => {
		const checklistCompletions = {
			"official-event:full": 1,
			"player-event:v2:full": 2,
		};

		expect(
			normalizeChecklistPersistedState({ checklistCompletions })
				.checklistCompletions,
		).toEqual(checklistCompletions);
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
				showExpired: false,
				categories: { event: false },
			},
		});

		expect(state.checklistTasks.legacy).toMatchObject({
			startAt: "2026-07-27T00:00:00.000Z",
			scheduleVersion: 2,
		});
		expect(state.checklistPreferences).toEqual({
			...defaultChecklistPreferences,
			showExpired: false,
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

	it("preserves player event UTC boundaries and marks them as user-created", () => {
		const state = normalizeChecklistPersistedState({
			checklistTasks: {
				anniversary: {
					id: "anniversary",
					title: "Anniversary check-in",
					noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
					kind: "event",
					startAt: "2026-07-22T00:00:00.000Z",
					endAt: "2026-08-11T23:59:00.000Z",
					recurrence: "daily",
					mode: "fixed",
					dueDurationMinutes: 60,
					scheduleVersion: 1,
				},
			},
		});

		expect(state.checklistTasks.anniversary).toMatchObject({
			kind: "event",
			source: "user",
			noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
			startAt: "2026-07-22T00:00:00.000Z",
			endAt: "2026-08-11T23:59:00.000Z",
			recurrence: "daily",
			mode: undefined,
			dueDurationMinutes: undefined,
			scheduleVersion: 1,
		});
	});
});
