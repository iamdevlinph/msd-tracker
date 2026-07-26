import { describe, expect, it } from "vitest";
import { type ChecklistEvent, EVENTS_DATA } from "@/data/EVENTS_DATA";
import { occurrenceKey } from "@/lib/checklist";
import { defaultChecklistPreferences } from "@/lib/checklist-persistence";
import type { ChecklistTask } from "@/lib/checklist-task";
import { getChecklistView } from "@/lib/checklist-view";

const now = Date.parse("2026-07-27T00:30:00.000Z");

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
		const event = {
			id: "limited-event",
			title: "Limited event",
			kind: "event",
			startAt: "2026-07-27T00:00:00.000Z",
			endAt: "2026-07-28T00:00:00.000Z",
			recurrence: "daily",
		} satisfies ChecklistEvent;
		EVENTS_DATA.push(event);
		try {
			const [item] = getChecklistView({
				tasks: {},
				completions: {},
				preferences: defaultChecklistPreferences,
				tab: "event",
				now,
			});
			expect(item.definition).toEqual(event);
		} finally {
			EVENTS_DATA.pop();
		}
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
		const [item] = getChecklistView({
			tasks: { [playerEvent.id]: playerEvent },
			completions: {},
			preferences: defaultChecklistPreferences,
			tab: "event",
			now,
		});

		expect(item.definition).toEqual(playerEvent);
		expect(item.occurrence.endAt).toBe(Date.parse(playerEvent.endAt as string));
	});
});
