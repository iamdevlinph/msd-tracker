// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChecklistPage } from "@/components/checklist/components/checklist-page";
import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";
import type { ChecklistEvent } from "@/data/EVENTS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import { defaultChecklistPreferences } from "@/stores/checklist-slice";

const event = vi.fn();

const { permanentEvents, eventsData } = vi.hoisted(() => ({
	permanentEvents: [
		{
			id: "fixture-rift",
			title: "Fixture Rift",
			kind: "permanent",
			startAt: "2024-01-01T00:00:00.000Z",
			recurrence: "weekly",
		},
		{
			id: "fixture-monster-race",
			title: "Fixture Monster Race",
			kind: "permanent",
			startAt: "2026-07-20T00:00:00.000Z",
			seasonal: true,
		},
		{
			id: "fixture-conquest-weekly",
			title: "Fixture Conquest Weekly",
			kind: "permanent",
			startAt: "2024-01-01T00:00:00.000Z",
			recurrence: "weekly",
		},
		{
			id: "fixture-conquest",
			title: "Fixture Conquest",
			kind: "permanent",
			startAt: "2024-01-01T00:00:00.000Z",
			recurrence: "daily",
		},
		{
			id: "fixture-dispatch",
			title: "Fixture Dispatch",
			kind: "permanent",
			startAt: "2024-01-01T00:00:00.000Z",
			recurrence: "daily",
		},
		{
			id: "fixture-request-board",
			title: "Fixture Request Board",
			kind: "permanent",
			startAt: "2024-01-01T00:00:00.000Z",
			recurrence: "daily",
		},
	] satisfies ChecklistDefinition[],
	eventsData: [
		{
			id: "fixture-gulgak",
			title: "Fixture Gulgak",
			kind: "event",
			startAt: "2026-07-15T00:00:00.000Z",
			endAt: "2026-07-28T23:59:00.000Z",
			recurrence: "daily",
			participation: "discord",
		},
		{
			id: "fixture-ice",
			title: "Fixture Ice",
			kind: "event",
			startAt: "2026-07-22T00:00:00.000Z",
			endAt: "2026-07-28T23:59:00.000Z",
			recurrence: "none",
		},
		{
			id: "fixture-daily-event",
			title: "Fixture Daily Event",
			kind: "event",
			startAt: "2026-07-22T00:00:00.000Z",
			endAt: "2026-08-28T23:59:00.000Z",
			recurrence: "daily",
		},
		{
			id: "fixture-weekly-event",
			title: "Fixture Weekly Event",
			kind: "event",
			startAt: "2026-07-22T00:00:00.000Z",
			endAt: "2026-08-28T23:59:00.000Z",
			recurrence: "weekly",
		},
	] satisfies ChecklistEvent[],
}));

vi.mock("@/data/CHECKLIST_DATA", async (importOriginal) => ({
	...(await importOriginal<typeof import("@/data/CHECKLIST_DATA")>()),
	PERMANENT_EVENTS: permanentEvents,
}));
vi.mock("@/data/EVENTS_DATA", () => ({ EVENTS_DATA: eventsData }));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

describe("ChecklistPage", () => {
	beforeEach(() => {
		vi.spyOn(Date, "now").mockReturnValue(
			Date.parse("2026-07-27T00:30:00.000Z"),
		);
		useAppStore.setState({
			checklistTasks: {},
			checklistCompletions: {},
			checklistPermanentNotes: {},
			checklistPreferences: defaultChecklistPreferences,
			isHydrated: true,
		});
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
		event.mockReset();
	});

	it("filters categories and toggles the current occurrence", () => {
		render(<ChecklistPage />);

		expect(screen.getByText("Fixture Rift")).toBeTruthy();
		expect(screen.getByText("Fixture Conquest Weekly")).toBeTruthy();
		expect(screen.getByText("Fixture Conquest")).toBeTruthy();
		const allFilter = screen.getByRole("button", { name: "All" });
		expect(allFilter.getAttribute("data-size")).toBe("default");
		expect(allFilter.parentElement?.className).toContain("flex-wrap");
		const toolbar = allFilter.parentElement?.parentElement?.parentElement;
		expect(toolbar?.className).toContain("flex-col");
		expect(toolbar?.className).toContain("sm:flex-row");
		expect(
			screen
				.getByRole("button", { name: "Checklist settings" })
				.getAttribute("data-size"),
		).toBe("default");
		expect(
			screen
				.getByRole("button", { name: "Add item" })
				.getAttribute("data-size"),
		).toBe("default");
		expect(
			screen.getByRole("button", { name: "Checklist settings" }).className,
		).toContain("flex-1");
		expect(
			screen.getByRole("button", { name: "Add item" }).className,
		).toContain("sm:flex-none");

		const conquestRow = screen.getByText("Fixture Conquest").closest("li");
		expect(conquestRow).toBeTruthy();
		expect(within(conquestRow as HTMLElement).getByText("Daily")).toBeTruthy();
		const requestBoardRow = screen
			.getByText("Fixture Request Board")
			.closest("li");
		expect(requestBoardRow).toBeTruthy();
		expect(
			within(requestBoardRow as HTMLElement).getByText("Daily"),
		).toBeTruthy();
		const completeButton = within(conquestRow as HTMLElement).getByRole(
			"button",
			{ name: "Mark Fixture Conquest complete" },
		);
		expect(
			within(conquestRow as HTMLElement).queryByRole("button", {
				name: "Mark Fixture Conquest fully complete",
			}),
		).toBeNull();
		expect(completeButton.querySelector(".lucide-check")).toBeTruthy();
		fireEvent.click(completeButton);
		expect(conquestRow?.parentElement?.lastElementChild).toBe(conquestRow);
		const undoButton = within(conquestRow as HTMLElement).getByRole("button", {
			name: "Mark Fixture Conquest incomplete",
		});
		expect(undoButton.querySelector(".lucide-undo-2")).toBeTruthy();
		const completedBadge = within(conquestRow as HTMLElement).getByTitle(
			"Completed",
		);
		const countdownBadge = within(conquestRow as HTMLElement).getByTitle(
			"Resets in 23h 30m",
		);
		expect(completedBadge.querySelector(".lucide-check")).toBeTruthy();
		expect(countdownBadge.nextElementSibling).toBe(completedBadge);
		expect(
			within(conquestRow as HTMLElement).getByText("23h 30m"),
		).toBeTruthy();
		expect(event).toHaveBeenLastCalledWith(ANALYTICS_EVENTS.CHECKLIST_COMPLETE);
		fireEvent.click(undoButton);
		expect(event).toHaveBeenLastCalledWith(ANALYTICS_EVENTS.CHECKLIST_UNDO);

		const anomalyRow = screen.getByText("Fixture Gulgak").closest("li");
		expect(anomalyRow).toBeTruthy();
		expect(within(anomalyRow as HTMLElement).getByText("Event")).toBeTruthy();
		expect(within(anomalyRow as HTMLElement).getByText("Daily")).toBeTruthy();
		expect(
			within(anomalyRow as HTMLElement)
				.getByRole("group", {
					name: "Fixture Gulgak completion controls",
				})
				.getAttribute("data-slot"),
		).toBe("button-group");
		expect(
			within(anomalyRow as HTMLElement)
				.getByRole("button", {
					name: "Mark Fixture Gulgak fully complete",
				})
				.querySelector(".lucide-check-check"),
		).toBeTruthy();

		const oneTimeEventRow = screen.getByText("Fixture Ice").closest("li");
		expect(
			within(oneTimeEventRow as HTMLElement).queryByRole("group", {
				name: "Fixture Ice completion controls",
			}),
		).toBeNull();
		expect(
			within(oneTimeEventRow as HTMLElement).queryByRole("button", {
				name: "Mark Fixture Ice complete",
			}),
		).toBeNull();
		expect(
			within(oneTimeEventRow as HTMLElement)
				.getByRole("button", {
					name: "Mark Fixture Ice fully complete",
				})
				.querySelector(".lucide-check-check"),
		).toBeTruthy();

		const eventsFilter = screen.getByRole("button", { name: "Events" });
		expect(eventsFilter.getAttribute("aria-pressed")).toBe("false");
		fireEvent.click(eventsFilter);
		expect(eventsFilter.getAttribute("aria-pressed")).toBe("true");
		expect(screen.getByText("Fixture Gulgak")).toBeTruthy();
		expect(screen.queryByText("Fixture Rift")).toBeNull();
	});

	it("fully completes an event without losing its occurrence completion", () => {
		render(<ChecklistPage />);

		const anomalyRow = screen.getByText("Fixture Gulgak").closest("li");
		const row = within(anomalyRow as HTMLElement);
		fireEvent.click(
			row.getByRole("button", {
				name: "Mark Fixture Gulgak complete",
			}),
		);
		fireEvent.click(
			row.getByRole("button", {
				name: "Mark Fixture Gulgak fully complete",
			}),
		);

		const occurrenceButton = row.getByRole("button", {
			name: "Mark Fixture Gulgak incomplete",
		});
		expect(occurrenceButton.hasAttribute("disabled")).toBe(true);
		expect(occurrenceButton.getAttribute("aria-pressed")).toBe("true");
		expect(
			row
				.getByRole("button", {
					name: "Mark Fixture Gulgak not fully complete",
				})
				.querySelector(".lucide-undo-2"),
		).toBeTruthy();
		expect(
			row.getByTitle("Fully completed").querySelector(".lucide-check-check"),
		).toBeTruthy();
		expect(row.getByTitle("Ends in 1d 23h")).toBeTruthy();
		expect(useAppStore.getState().checklistCompletions).toMatchObject({
			"fixture-gulgak:2026-07-27T00:00:00.000Z": expect.any(Number),
			"fixture-gulgak:full": expect.any(Number),
		});
		expect(event).toHaveBeenLastCalledWith(
			ANALYTICS_EVENTS.CHECKLIST_FULL_COMPLETE,
		);

		fireEvent.click(
			row.getByRole("button", {
				name: "Mark Fixture Gulgak not fully complete",
			}),
		);

		expect(
			row
				.getByRole("button", {
					name: "Mark Fixture Gulgak incomplete",
				})
				.hasAttribute("disabled"),
		).toBe(false);
		expect(row.getByTitle("Completed")).toBeTruthy();
		expect(
			useAppStore.getState().checklistCompletions["fixture-gulgak:full"],
		).toBeUndefined();
		expect(event).toHaveBeenLastCalledWith(
			ANALYTICS_EVENTS.CHECKLIST_FULL_UNDO,
		);
	});

	it("fully completes and undoes a non-daily event", () => {
		render(<ChecklistPage />);

		const row = within(
			screen.getByText("Fixture Ice").closest("li") as HTMLElement,
		);
		fireEvent.click(
			row.getByRole("button", {
				name: "Mark Fixture Ice fully complete",
			}),
		);

		expect(useAppStore.getState().checklistCompletions).toMatchObject({
			"fixture-ice:full": expect.any(Number),
		});
		expect(event).toHaveBeenLastCalledWith(
			ANALYTICS_EVENTS.CHECKLIST_FULL_COMPLETE,
		);

		fireEvent.click(
			row.getByRole("button", {
				name: "Mark Fixture Ice not fully complete",
			}),
		);
		expect(
			useAppStore.getState().checklistCompletions["fixture-ice:full"],
		).toBeUndefined();
		expect(event).toHaveBeenLastCalledWith(
			ANALYTICS_EVENTS.CHECKLIST_FULL_UNDO,
		);
	});

	it("shows the next reset or end beside completed status", () => {
		vi.mocked(Date.now).mockReturnValue(Date.parse("2026-07-28T23:58:00.000Z"));
		useAppStore.setState({
			checklistTasks: {
				rolling: {
					id: "rolling",
					title: "Rolling task",
					kind: "custom",
					startAt: "2026-07-27T00:00:00.000Z",
					recurrence: "daily",
					mode: "after_completion",
					scheduleVersion: 1,
				},
				"one-time-event": {
					id: "one-time-event",
					title: "One-time player event",
					kind: "event",
					source: "user",
					startAt: "2026-07-27T00:00:00.000Z",
					endAt: "2026-07-29T00:58:00.000Z",
					recurrence: "none",
					scheduleVersion: 1,
				},
				"one-time-task": {
					id: "one-time-task",
					title: "One-time task",
					kind: "custom",
					startAt: "2026-07-27T00:00:00.000Z",
					recurrence: "none",
					scheduleVersion: 1,
				},
			},
			checklistCompletions: {
				"fixture-conquest:2026-07-28T00:00:00.000Z": Date.parse(
					"2026-07-28T01:00:00.000Z",
				),
				"fixture-gulgak:2026-07-28T00:00:00.000Z": Date.parse(
					"2026-07-28T01:00:00.000Z",
				),
				"rolling:v1:2026-07-27T00:00:00.000Z": Date.parse(
					"2026-07-28T00:00:00.000Z",
				),
				"one-time-event:v1:2026-07-27T00:00:00.000Z": Date.parse(
					"2026-07-28T01:00:00.000Z",
				),
				"one-time-task:v1:2026-07-27T00:00:00.000Z": Date.parse(
					"2026-07-28T01:00:00.000Z",
				),
			},
		});

		render(<ChecklistPage />);

		expect(
			within(
				screen.getByText("Fixture Conquest").closest("li") as HTMLElement,
			).getByTitle("Resets in 2m"),
		).toBeTruthy();
		expect(
			within(
				screen.getByText("Rolling task").closest("li") as HTMLElement,
			).getByTitle("Resets in 2m"),
		).toBeTruthy();
		expect(
			within(
				screen.getByText("One-time player event").closest("li") as HTMLElement,
			).getByTitle("Ends in 1h 0m"),
		).toBeTruthy();
		const playerEventRow = within(
			screen.getByText("One-time player event").closest("li") as HTMLElement,
		);
		expect(
			playerEventRow.queryByRole("group", {
				name: "One-time player event completion controls",
			}),
		).toBeNull();
		expect(
			playerEventRow.queryByRole("button", {
				name: "Mark One-time player event complete",
			}),
		).toBeNull();
		expect(
			playerEventRow.getByRole("button", {
				name: "Mark One-time player event fully complete",
			}),
		).toBeTruthy();
		expect(
			within(
				screen.getByText("Fixture Gulgak").closest("li") as HTMLElement,
			).getByTitle("Ends in 1m"),
		).toBeTruthy();
		expect(
			within(
				screen.getByText("One-time task").closest("li") as HTMLElement,
			).getByTitle("Completed"),
		).toBeTruthy();
	});

	it("hides disabled category filters and returns an active filter to All", () => {
		render(<ChecklistPage />);

		fireEvent.click(screen.getByRole("button", { name: "Permanent" }));
		expect(
			screen
				.getByRole("button", { name: "Permanent" })
				.getAttribute("aria-pressed"),
		).toBe("true");
		fireEvent.click(screen.getByRole("button", { name: "Checklist settings" }));
		fireEvent.click(screen.getByLabelText("Permanent"));
		fireEvent.click(screen.getByLabelText("Events"));
		fireEvent.click(screen.getByLabelText("Custom"));
		fireEvent.click(screen.getByRole("button", { name: "Done" }));

		expect(screen.queryByRole("button", { name: "Permanent" })).toBeNull();
		expect(screen.queryByRole("button", { name: "Events" })).toBeNull();
		expect(screen.queryByRole("button", { name: "Custom" })).toBeNull();
		expect(
			screen.getByRole("button", { name: "All" }).getAttribute("aria-pressed"),
		).toBe("true");
		expect(screen.getByText("Nothing to show here")).toBeTruthy();
	});

	it("shows compact upcoming rows and inline custom-task actions", () => {
		useAppStore.setState({
			checklistTasks: {
				future: {
					id: "future",
					title: "Future task",
					notes: "Bring the strongest team.\nCheck equipment first.",
					kind: "custom",
					startAt: "2026-07-28T00:30:00.000Z",
					recurrence: "none",
					scheduleVersion: 1,
				},
				"player-event": {
					id: "player-event",
					title: "Player event",
					notes: "Claim rewards before the event ends.",
					kind: "event",
					source: "user",
					startAt: "2026-07-26T00:00:00.000Z",
					endAt: "2026-08-01T00:00:00.000Z",
					recurrence: "none",
					scheduleVersion: 1,
				},
			},
		});

		render(<ChecklistPage />);

		const seasonalBadge = within(
			screen.getByText("Fixture Monster Race").closest("li") as HTMLElement,
		).getByText("Seasonal");
		expect(seasonalBadge.style.backgroundColor).toBe("rgb(22, 163, 74)");
		expect(seasonalBadge.style.color).toBe("rgb(255, 255, 255)");
		expect(
			within(
				screen.getByText("Fixture Rift").closest("li") as HTMLElement,
			).queryByText("Seasonal"),
		).toBeNull();
		expect(
			within(
				screen.getByText("Fixture Gulgak").closest("li") as HTMLElement,
			).getByText("Discord", { selector: "span" }),
		).toBeTruthy();
		expect(seasonalBadge.className).not.toContain("amber");

		const discordRow = screen.getByText("Fixture Gulgak").closest("li");
		expect(discordRow?.className).toContain("from-[#5865F2]/15");
		expect(discordRow?.className).not.toContain("from-teal-500/15");
		expect(
			within(discordRow as HTMLElement).getByText("Event").className,
		).toContain("bg-fuchsia-700/80");
		expect(
			within(discordRow as HTMLElement).getByText("Daily").className,
		).toContain("bg-teal-700/70");

		const dailyEventRow = screen.getByText("Fixture Daily Event").closest("li");
		expect(dailyEventRow?.className).toContain("from-teal-500/15");
		const weeklyEventRow = screen
			.getByText("Fixture Weekly Event")
			.closest("li");
		expect(weeklyEventRow?.className).toContain("from-violet-500/15");
		expect(
			within(weeklyEventRow as HTMLElement).getByText("Weekly").className,
		).toContain("bg-violet-700/70");
		const oneTimeEventRow = screen.getByText("Fixture Ice").closest("li");
		expect(oneTimeEventRow?.className).toContain("from-fuchsia-500/15");

		const futureRow = screen.getByText("Future task").closest("li");
		expect(futureRow).toBeTruthy();
		expect(futureRow?.className).toContain("flex-col");
		expect(futureRow?.className).toContain("sm:flex-row");
		expect(futureRow?.lastElementChild?.className).toContain("self-end");
		expect(futureRow?.lastElementChild?.className).toContain("sm:mt-0");
		expect(within(futureRow as HTMLElement).getByText("Custom")).toBeTruthy();
		expect(
			within(futureRow as HTMLElement).getByText(
				"Bring the strongest team. Check equipment first.",
			).className,
		).toContain("line-clamp-2");
		expect(within(futureRow as HTMLElement).getByText("in 1d 0h")).toBeTruthy();
		expect(
			within(futureRow as HTMLElement).getByRole("button", {
				name: "Edit Future task",
			}),
		).toBeTruthy();
		expect(
			within(futureRow as HTMLElement).getByRole("button", {
				name: "Delete Future task",
			}),
		).toBeTruthy();

		const playerEventRow = screen.getByText("Player event").closest("li");
		expect(playerEventRow).toBeTruthy();
		expect(
			within(playerEventRow as HTMLElement).getByText(
				"Claim rewards before the event ends.",
			).className,
		).toContain("line-clamp-2");
		expect(
			within(playerEventRow as HTMLElement)
				.getByRole("button", { name: "Delete Player event" })
				.querySelector(".lucide-trash-2")?.classList,
		).toContain("text-destructive");
		expect(
			within(futureRow as HTMLElement)
				.getByRole("button", { name: "Delete Future task" })
				.querySelector(".lucide-trash-2")?.classList,
		).toContain("text-destructive");
		expect(
			screen.queryByRole("button", { name: "Delete Fixture Gulgak" }),
		).toBeNull();

		fireEvent.click(
			within(playerEventRow as HTMLElement).getByRole("button", {
				name: "Delete Player event",
			}),
		);
		expect(
			screen.getByRole("heading", { name: "Delete “Player event”?" }),
		).toBeTruthy();
		expect(
			screen.getByText(
				"This removes the event and all of its completion records. This cannot be undone.",
			),
		).toBeTruthy();
		expect(screen.getByRole("button", { name: "Delete event" })).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
		fireEvent.click(
			within(futureRow as HTMLElement).getByRole("button", {
				name: "Delete Future task",
			}),
		);
		expect(
			screen.getByRole("heading", { name: "Delete “Future task”?" }),
		).toBeTruthy();
		expect(
			screen.getByText(
				"This removes the task and all of its completion records. This cannot be undone.",
			),
		).toBeTruthy();
		expect(screen.getByRole("button", { name: "Delete task" })).toBeTruthy();
	});

	it("prioritizes ending-soon and overdue row treatments", () => {
		useAppStore.setState({
			checklistPreferences: {
				...defaultChecklistPreferences,
				endingSoonHours: 48,
			},
			checklistTasks: {
				overdue: {
					id: "overdue",
					title: "Overdue task",
					kind: "custom",
					startAt: "2026-07-25T00:00:00.000Z",
					endAt: "2026-07-26T00:00:00.000Z",
					recurrence: "none",
					scheduleVersion: 1,
				},
			},
		});

		render(<ChecklistPage />);

		const endingSoonRow = screen.getByText("Fixture Gulgak").closest("li");
		expect(endingSoonRow?.className).toContain("from-amber-500/15");
		expect(endingSoonRow?.className).not.toContain("from-[#5865F2]/15");
		expect(endingSoonRow?.className).toContain("hover:border-amber-500/40");

		const overdueRow = screen.getByText("Overdue task").closest("li");
		expect(overdueRow?.className).toContain("from-destructive/10");
		expect(overdueRow?.className).toContain("hover:border-destructive/40");
	});

	it("adds, limits, displays, and clears permanent notes", async () => {
		render(<ChecklistPage />);

		fireEvent.click(
			screen.getByRole("button", {
				name: "Edit notes for Fixture Conquest",
			}),
		);
		expect(
			screen.getByRole("heading", { name: "Notes for Fixture Conquest" }),
		).toBeTruthy();
		const notes = screen.getByLabelText("Notes");
		fireEvent.change(notes, { target: { value: "Unsaved draft" } });
		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
		fireEvent.click(
			screen.getByRole("button", {
				name: "Edit notes for Fixture Conquest",
			}),
		);
		const reopenedNotes = screen.getByLabelText("Notes");
		expect(reopenedNotes).toHaveProperty("value", "");
		expect(reopenedNotes.getAttribute("maxLength")).toBe("500");
		fireEvent.change(reopenedNotes, {
			target: { value: "  Bring support.\nCheck gear.  " },
		});
		expect(reopenedNotes).toHaveProperty(
			"value",
			"  Bring support.\nCheck gear.  ",
		);
		fireEvent.click(screen.getByRole("button", { name: "Save notes" }));

		await waitFor(() =>
			expect(useAppStore.getState().checklistPermanentNotes).toEqual({
				"fixture-conquest": "Bring support.\nCheck gear.",
			}),
		);
		expect(screen.getByText(/^Bring support\./).className).toContain(
			"line-clamp-2",
		);
		expect(event).toHaveBeenLastCalledWith(ANALYTICS_EVENTS.CHECKLIST_UPDATE);

		fireEvent.click(
			screen.getByRole("button", {
				name: "Edit notes for Fixture Conquest",
			}),
		);
		expect(screen.getByLabelText("Notes")).toHaveProperty(
			"value",
			"Bring support.\nCheck gear.",
		);
		fireEvent.change(screen.getByLabelText("Notes"), {
			target: { value: "   " },
		});
		fireEvent.click(screen.getByRole("button", { name: "Save notes" }));
		await waitFor(() =>
			expect(useAppStore.getState().checklistPermanentNotes).toEqual({}),
		);
		expect(screen.queryByText(/^Bring support\./)).toBeNull();
	});

	it("disables completion controls outside an event's active period", () => {
		useAppStore.setState({
			checklistTasks: {
				upcoming: {
					id: "upcoming",
					title: "Upcoming player event",
					kind: "event",
					source: "user",
					startAt: "2026-07-28T00:00:00.000Z",
					endAt: "2026-07-29T00:00:00.000Z",
					recurrence: "none",
					scheduleVersion: 1,
				},
				expired: {
					id: "expired",
					title: "Expired player event",
					kind: "event",
					source: "user",
					startAt: "2026-07-25T00:00:00.000Z",
					endAt: "2026-07-26T00:00:00.000Z",
					recurrence: "none",
					scheduleVersion: 1,
				},
			},
		});
		render(<ChecklistPage />);

		const upcomingRow = screen.getByText("Upcoming player event").closest("li");
		const expiredName = screen.getByText("Expired player event");
		const expiredRow = expiredName.closest("li");
		for (const [row, title] of [
			[upcomingRow, "Upcoming player event"],
			[expiredRow, "Expired player event"],
		] as const) {
			expect(
				within(row as HTMLElement).queryByRole("button", {
					name: `Mark ${title} complete`,
				}),
			).toBeNull();
			expect(
				within(row as HTMLElement).queryByRole("group", {
					name: `${title} completion controls`,
				}),
			).toBeNull();
			expect(
				within(row as HTMLElement)
					.getByRole("button", { name: `Mark ${title} fully complete` })
					.hasAttribute("disabled"),
			).toBe(true);
		}
		expect(expiredName.className).toContain("line-through");
		expect(expiredRow?.className).toContain("opacity-50");
	});

	it("defaults new items to UTC midnight and shows inline validation", async () => {
		render(<ChecklistPage />);
		fireEvent.click(screen.getByRole("button", { name: "Add item" }));
		const startInput = screen.getByLabelText(
			"Start (Game Time - UTC)",
		) as HTMLInputElement;
		expect(startInput.getAttribute("type")).toBe("datetime-local");
		expect(startInput.value).toBe("2026-07-27T00:00");
		expect(
			screen
				.getByLabelText("End (optional, Game Time - UTC)")
				.getAttribute("type"),
		).toBe("datetime-local");
		const typeInput = screen.getByLabelText("Type");
		fireEvent.change(typeInput, { target: { value: "event" } });
		expect(startInput.value).toBe("2026-07-27T00:00");
		fireEvent.change(typeInput, { target: { value: "task" } });
		fireEvent.click(
			within(screen.getByRole("dialog")).getByRole("button", {
				name: "Add item",
			}),
		);

		expect(await screen.findByText("Name is required.")).toBeTruthy();
		expect(screen.queryByText("Start date and time are required.")).toBeNull();
		expect(
			screen.getByLabelText("Task name").getAttribute("aria-describedby"),
		).toBe("checklist-task-name-error");
		expect(startInput.getAttribute("aria-describedby")).toBeNull();
	});
});
