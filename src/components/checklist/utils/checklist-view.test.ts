import { describe, expect, it, vi } from "vitest";
import {
	fullCompletionKey,
	occurrenceKey,
} from "@/components/checklist/utils/checklist";
import { defaultChecklistPreferences } from "@/components/checklist/utils/checklist-persistence";
import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import { getChecklistView } from "@/components/checklist/utils/checklist-view";
import type { ChecklistEvent } from "@/data/events/EVENTS_DATA";

const now = Date.parse("2026-07-27T00:30:00.000Z");

const { fixtureEvent, fullEvent } = vi.hoisted(() => ({
	fixtureEvent: {
		id: "fixture-limited-event",
		title: "Fixture limited event",
		kind: "event",
		startAt: "2026-07-27T00:00:00.000Z",
		endAt: "2026-07-28T00:00:00.000Z",
		recurrence: "daily",
	} satisfies ChecklistEvent,
	fullEvent: {
		id: "fixture-full-event",
		title: "Fixture full event",
		kind: "event",
		startAt: "2026-07-27T00:00:00.000Z",
		endAt: "2026-07-29T00:00:00.000Z",
		recurrence: "daily",
	} satisfies ChecklistEvent,
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
