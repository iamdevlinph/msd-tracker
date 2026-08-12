import { describe, expect, it, vi } from "vitest";
import {
	fullCompletionKey,
	getOccurrence,
	occurrenceKey,
} from "@/components/checklist/utils/checklist";
import { defaultChecklistPreferences } from "@/components/checklist/utils/checklist-persistence";
import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import {
	getChecklistView,
	hasOngoingOrUpcomingChecklistItems,
} from "@/components/checklist/utils/checklist-view";
import type { ChecklistDefinition } from "@/data/checklist/CHECKLIST_DATA";

const now = Date.parse("2026-07-27T00:30:00.000Z");

const { fixtureEvent, fullEvent, permanentRecurring } = vi.hoisted(() => ({
	fixtureEvent: {
		id: "fixture-limited-event",
		title: "Fixture limited event",
		kind: "event",
		startAt: "2026-07-27T00:00:00.000Z",
		endAt: "2026-07-28T00:00:00.000Z",
		recurrence: "daily",
	} satisfies ChecklistDefinition,
	fullEvent: {
		id: "fixture-full-event",
		title: "Fixture full event",
		kind: "event",
		startAt: "2026-07-27T00:00:00.000Z",
		endAt: "2026-07-29T00:00:00.000Z",
		recurrence: "daily",
	} satisfies ChecklistDefinition,
	permanentRecurring: {
		id: "fixture-permanent-recurring",
		title: "Fixture permanent recurring",
		kind: "permanent",
		startAt: "2026-07-27T00:00:00.000Z",
		recurrence: "daily",
	} satisfies ChecklistDefinition,
}));

vi.mock("@/data/checklist/CHECKLIST_DATA", async (importOriginal) => ({
	...(await importOriginal<typeof import("@/data/checklist/CHECKLIST_DATA")>()),
	PERMANENT_EVENTS: [permanentRecurring],
}));

vi.mock("@/data/events/EVENTS_DATA", () => ({
	EVENTS_DATA: [fixtureEvent, fullEvent],
}));

const task: ChecklistTask = {
	id: "daily-task",
	title: "Daily task",
	kind: "custom",
	startAt: "2026-07-27T00:00:00.000Z",
	recurrence: "daily",
	mode: "after_completion",
	scheduleVersion: 1,
};

describe("getChecklistView", () => {
	it("uses computed status and completion state for the current-filter state", () => {
		const completedEvent: ChecklistTask = {
			id: "completed-event",
			title: "Completed event",
			kind: "custom",
			source: "user",
			startAt: "2026-07-27T00:00:00.000Z",
			endAt: undefined,
			recurrence: "none",
			scheduleVersion: 1,
		};
		const completion = occurrenceKey(
			completedEvent,
			Date.parse(completedEvent.startAt),
		);
		const input = {
			tasks: { [completedEvent.id]: completedEvent },
			completions: { [completion]: now },
			preferences: defaultChecklistPreferences,
			tab: "custom" as const,
			now,
		};

		expect(hasOngoingOrUpcomingChecklistItems(input)).toBe(false);
		expect(
			hasOngoingOrUpcomingChecklistItems({
				...input,
				preferences: { ...input.preferences, showCompleted: false },
			}),
		).toBe(false);

		const states: ChecklistTask[] = [
			{
				...completedEvent,
				id: "active-task",
				kind: "custom",
				startAt: "2026-07-26T00:00:00.000Z",
				endAt: undefined,
			},
			{
				...completedEvent,
				id: "upcoming-task",
				kind: "custom",
				startAt: "2026-07-28T00:00:00.000Z",
				endAt: undefined,
			},
			{
				...completedEvent,
				id: "overdue-task",
				kind: "custom",
				startAt: "2026-07-26T00:00:00.000Z",
				endAt: undefined,
				dueDurationMinutes: 1,
			},
		];
		for (const state of states) {
			expect(
				hasOngoingOrUpcomingChecklistItems({
					tasks: { [state.id]: state },
					completions: {},
					preferences: defaultChecklistPreferences,
					tab: "custom",
					now,
				}),
			).toBe(true);
		}
	});

	it("treats an event as expired at its exact end boundary", () => {
		const event: ChecklistTask = {
			id: "boundary-event",
			title: "Boundary event",
			kind: "event",
			source: "user",
			startAt: "2026-09-01T00:00:00.000Z",
			endAt: "2026-09-10T00:00:00.000Z",
			recurrence: "none",
			scheduleVersion: 1,
		};
		const at = Date.parse(event.endAt as string);
		const base = {
			tasks: { [event.id]: event },
			completions: {},
			preferences: defaultChecklistPreferences,
			tab: "event" as const,
		};
		expect(hasOngoingOrUpcomingChecklistItems({ ...base, now: at - 1 })).toBe(
			true,
		);
		expect(hasOngoingOrUpcomingChecklistItems({ ...base, now: at })).toBe(
			false,
		);
	});

	it("keeps ending-soon events from showing the history-only state", () => {
		const endingSoonEvent: ChecklistTask = {
			id: "ending-soon-event",
			title: "Ending soon event",
			kind: "event",
			source: "user",
			startAt: "2026-07-30T00:00:00.000Z",
			endAt: "2026-07-30T02:00:00.000Z",
			recurrence: "none",
			scheduleVersion: 1,
		};
		const endingSoonNow = Date.parse("2026-07-30T01:00:00.000Z");
		const input = {
			tasks: { [endingSoonEvent.id]: endingSoonEvent },
			completions: {},
			preferences: {
				...defaultChecklistPreferences,
				endingSoonHours: 5 as const,
			},
			tab: "event" as const,
			now: endingSoonNow,
		};

		expect(
			getChecklistView(input).find(
				({ definition }) => definition.id === endingSoonEvent.id,
			)?.status,
		).toBe("ending-soon");
		expect(hasOngoingOrUpcomingChecklistItems(input)).toBe(true);
	});

	it("keeps recurring completed items eligible after their next reset", () => {
		const recurringTask: ChecklistTask = {
			id: "recurring-task",
			title: "Recurring task",
			kind: "custom",
			source: "user",
			startAt: "2026-07-27T00:00:00.000Z",
			recurrence: "daily",
			mode: "fixed",
			scheduleVersion: 1,
		};
		const completion = occurrenceKey(
			recurringTask,
			Date.parse(recurringTask.startAt),
		);
		const input = {
			tasks: { [recurringTask.id]: recurringTask },
			completions: { [completion]: now },
			preferences: defaultChecklistPreferences,
			tab: "custom" as const,
		};
		expect(hasOngoingOrUpcomingChecklistItems({ ...input, now })).toBe(false);
		expect(
			hasOngoingOrUpcomingChecklistItems({
				...input,
				now: Date.parse("2026-07-28T00:00:00.000Z"),
			}),
		).toBe(true);
	});

	it("allows a completed permanent recurrence after its next reset", () => {
		const permanentNow = Date.parse("2026-07-30T00:30:00.000Z");
		const occurrence = getOccurrence(permanentRecurring, permanentNow);
		const completions = {
			[occurrenceKey(permanentRecurring, occurrence.startAt)]: permanentNow,
		};
		const input = {
			tasks: {},
			completions,
			preferences: defaultChecklistPreferences,
			tab: "permanent" as const,
		};

		expect(
			hasOngoingOrUpcomingChecklistItems({ ...input, now: permanentNow }),
		).toBe(false);
		expect(
			hasOngoingOrUpcomingChecklistItems({
				...input,
				now: Date.parse("2026-07-31T00:30:00.000Z"),
			}),
		).toBe(true);
	});

	it("filters custom tasks by category, tab, and visibility preferences", () => {
		const tasks = {
			[task.id]: {
				...task,
				startAt: "2026-07-28T00:00:00.000Z",
			},
		};

		expect(
			getChecklistView({
				tasks,
				completions: {},
				preferences: defaultChecklistPreferences,
				tab: "custom",
				now,
			}),
		).toHaveLength(1);
		expect(
			getChecklistView({
				tasks,
				completions: {},
				preferences: {
					...defaultChecklistPreferences,
					showUpcoming: false,
				},
				tab: "custom",
				now,
			}),
		).toEqual([]);
	});

	it("keeps a rolling task completed until its next occurrence starts", () => {
		const completionKey = occurrenceKey(task, Date.parse(task.startAt));
		const completedAt = now - 15 * 60_000;
		const [item] = getChecklistView({
			tasks: { [task.id]: task },
			completions: { [completionKey]: completedAt },
			preferences: defaultChecklistPreferences,
			tab: "custom",
			now,
		});

		expect(item.status).toBe("completed");
		expect(item.completionKey).toBe(completionKey);
		expect(item.occurrence.startAt).toBe(completedAt + 86_400_000);
	});

	it("projects official events in the Events tab", () => {
		const item = getChecklistView({
			tasks: {},
			completions: {},
			preferences: defaultChecklistPreferences,
			tab: "event",
			now,
		}).find(({ definition }) => definition.id === fixtureEvent.id);
		expect(item?.definition).toEqual(fixtureEvent);
	});

	it("keeps full-event completion across resets until expiry", () => {
		const completions = {
			[fullCompletionKey(fullEvent)]: Date.parse("2026-07-27T01:00:00.000Z"),
		};
		const getEvent = (at: number) =>
			getChecklistView({
				tasks: {},
				completions,
				preferences: defaultChecklistPreferences,
				tab: "event",
				now: at,
			}).find(({ definition }) => definition.id === fullEvent.id);
		const first = getEvent(Date.parse("2026-07-27T12:00:00.000Z"));
		const second = getEvent(Date.parse("2026-07-28T12:00:00.000Z"));
		const expired = getEvent(Date.parse(fullEvent.endAt));

		expect(first).toMatchObject({
			fullyCompleted: true,
			status: "completed",
		});
		expect(second).toMatchObject({
			fullyCompleted: true,
			status: "completed",
		});
		expect(second?.occurrence.startAt).not.toBe(first?.occurrence.startAt);
		expect(expired).toMatchObject({
			fullyCompleted: false,
			status: "expired",
		});
	});

	it.each([
		[true, true, [fixtureEvent.id, fullEvent.id]],
		[true, false, [fixtureEvent.id]],
		[false, true, [fullEvent.id]],
		[false, false, []],
	])("filters ordinary and fully completed events independently (%s, %s)", (showCompleted, showFullyCompleted, expectedIds) => {
		const completions = {
			[occurrenceKey(fixtureEvent, Date.parse(fixtureEvent.startAt))]: now,
			[fullCompletionKey(fullEvent)]: now,
		};
		const items = getChecklistView({
			tasks: {},
			completions,
			preferences: {
				...defaultChecklistPreferences,
				showCompleted,
				showFullyCompleted,
			},
			tab: "event",
			now,
		});

		expect(new Set(items.map(({ definition }) => definition.id))).toEqual(
			new Set(expectedIds),
		);
	});

	it("projects player-created events in the Events tab", () => {
		const playerEvent: ChecklistTask = {
			id: "player-event",
			title: "Player event",
			kind: "event",
			source: "user",
			startAt: "2026-07-22T00:00:00.000Z",
			endAt: "2026-08-11T23:59:00.000Z",
			recurrence: "daily",
			scheduleVersion: 1,
		};
		const item = getChecklistView({
			tasks: { [playerEvent.id]: playerEvent },
			completions: {},
			preferences: defaultChecklistPreferences,
			tab: "event",
			now,
		}).find(({ definition }) => definition.id === playerEvent.id);

		expect(item?.definition).toEqual(playerEvent);
		expect(item?.occurrence.endAt).toBe(
			Date.parse(playerEvent.endAt as string),
		);
	});

	it("sorts expired events into the completed section", () => {
		const expiredEvent: ChecklistTask = {
			id: "expired-event",
			title: "Expired event",
			kind: "event",
			source: "user",
			startAt: "2026-07-25T00:00:00.000Z",
			endAt: "2026-07-26T00:00:00.000Z",
			recurrence: "none",
			scheduleVersion: 1,
		};
		const items = getChecklistView({
			tasks: { [expiredEvent.id]: expiredEvent },
			completions: {},
			preferences: defaultChecklistPreferences,
			tab: "all",
			now,
		});
		const expiredIndex = items.findIndex(
			({ definition }) => definition.id === expiredEvent.id,
		);

		expect(expiredIndex).toBeGreaterThan(0);
		expect(items[expiredIndex]).toMatchObject({
			definition: { id: expiredEvent.id },
			status: "expired",
		});
		expect(
			items
				.slice(expiredIndex)
				.every(({ status }) => ["completed", "expired"].includes(status)),
		).toBe(true);
		const hiddenCompletedPreferences = {
			...defaultChecklistPreferences,
			showCompleted: false,
			showFullyCompleted: false,
		};
		expect(
			getChecklistView({
				tasks: { [expiredEvent.id]: expiredEvent },
				completions: {},
				preferences: hiddenCompletedPreferences,
				tab: "all",
				now,
			}).some(({ definition }) => definition.id === expiredEvent.id),
		).toBe(true);
		expect(
			getChecklistView({
				tasks: { [expiredEvent.id]: expiredEvent },
				completions: {},
				preferences: { ...hiddenCompletedPreferences, showExpired: false },
				tab: "all",
				now,
			}).some(({ definition }) => definition.id === expiredEvent.id),
		).toBe(false);
	});
});
