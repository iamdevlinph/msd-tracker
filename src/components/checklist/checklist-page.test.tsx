// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChecklistPage } from "@/components/checklist/checklist-page";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import { defaultChecklistPreferences } from "@/stores/checklist-slice";

const event = vi.fn();

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

		expect(screen.getByText("Dimensional Rift")).toBeTruthy();
		expect(screen.getByText("Legendary Conquest")).toBeTruthy();
		expect(screen.getByText("Conquest")).toBeTruthy();
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

		const conquestRow = screen.getByText("Conquest").closest("li");
		expect(conquestRow).toBeTruthy();
		expect(within(conquestRow as HTMLElement).getByText("Daily")).toBeTruthy();
		const requestBoardRow = screen.getByText("Request Board").closest("li");
		expect(requestBoardRow).toBeTruthy();
		expect(
			within(requestBoardRow as HTMLElement).getByText("Daily"),
		).toBeTruthy();
		const completeButton = within(conquestRow as HTMLElement).getByRole(
			"button",
			{ name: "Mark Conquest complete" },
		);
		expect(
			within(conquestRow as HTMLElement).queryByRole("button", {
				name: "Mark Conquest fully complete",
			}),
		).toBeNull();
		expect(completeButton.querySelector(".lucide-check")).toBeTruthy();
		fireEvent.click(completeButton);
		expect(conquestRow?.parentElement?.lastElementChild).toBe(conquestRow);
		const undoButton = within(conquestRow as HTMLElement).getByRole("button", {
			name: "Mark Conquest incomplete",
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

		const anomalyRow = screen.getByText("Anomaly: Gulgak").closest("li");
		expect(anomalyRow).toBeTruthy();
		expect(within(anomalyRow as HTMLElement).getByText("Event")).toBeTruthy();
		expect(within(anomalyRow as HTMLElement).getByText("Daily")).toBeTruthy();
		expect(
			within(anomalyRow as HTMLElement)
				.getByRole("group", {
					name: "Anomaly: Gulgak completion controls",
				})
				.getAttribute("data-slot"),
		).toBe("button-group");
		expect(
			within(anomalyRow as HTMLElement)
				.getByRole("button", {
					name: "Mark Anomaly: Gulgak fully complete",
				})
				.querySelector(".lucide-check-check"),
		).toBeTruthy();

		const oneTimeEventRow = screen
			.getByText("An Invitation to Break the Ice")
			.closest("li");
		expect(
			within(oneTimeEventRow as HTMLElement).getByRole("group", {
				name: "An Invitation to Break the Ice completion controls",
			}),
		).toBeTruthy();

		const eventsFilter = screen.getByRole("button", { name: "Events" });
		expect(eventsFilter.getAttribute("aria-pressed")).toBe("false");
		fireEvent.click(eventsFilter);
		expect(eventsFilter.getAttribute("aria-pressed")).toBe("true");
		expect(screen.getByText("Anomaly: Gulgak")).toBeTruthy();
		expect(screen.queryByText("Dimensional Rift")).toBeNull();
	});

	it("fully completes an event without losing its occurrence completion", () => {
		render(<ChecklistPage />);

		const anomalyRow = screen.getByText("Anomaly: Gulgak").closest("li");
		const row = within(anomalyRow as HTMLElement);
		fireEvent.click(
			row.getByRole("button", {
				name: "Mark Anomaly: Gulgak complete",
			}),
		);
		fireEvent.click(
			row.getByRole("button", {
				name: "Mark Anomaly: Gulgak fully complete",
			}),
		);

		const occurrenceButton = row.getByRole("button", {
			name: "Mark Anomaly: Gulgak incomplete",
		});
		expect(occurrenceButton.hasAttribute("disabled")).toBe(true);
		expect(occurrenceButton.getAttribute("aria-pressed")).toBe("true");
		expect(
			row
				.getByRole("button", {
					name: "Mark Anomaly: Gulgak not fully complete",
				})
				.querySelector(".lucide-undo-2"),
		).toBeTruthy();
		expect(
			row.getByTitle("Fully completed").querySelector(".lucide-check-check"),
		).toBeTruthy();
		expect(row.getByTitle("Ends in 1d 23h")).toBeTruthy();
		expect(useAppStore.getState().checklistCompletions).toMatchObject({
			"anomaly-gulgak:2026-07-27T00:00:00.000Z": expect.any(Number),
			"anomaly-gulgak:full": expect.any(Number),
		});
		expect(event).toHaveBeenLastCalledWith(
			ANALYTICS_EVENTS.CHECKLIST_FULL_COMPLETE,
		);

		fireEvent.click(
			row.getByRole("button", {
				name: "Mark Anomaly: Gulgak not fully complete",
			}),
		);

		expect(
			row
				.getByRole("button", {
					name: "Mark Anomaly: Gulgak incomplete",
				})
				.hasAttribute("disabled"),
		).toBe(false);
		expect(row.getByTitle("Completed")).toBeTruthy();
		expect(
			useAppStore.getState().checklistCompletions["anomaly-gulgak:full"],
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
				"conquest-daily:2026-07-28T00:00:00.000Z": Date.parse(
					"2026-07-28T01:00:00.000Z",
				),
				"anomaly-gulgak:2026-07-28T00:00:00.000Z": Date.parse(
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
				screen.getByText("Conquest").closest("li") as HTMLElement,
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
		expect(
			within(
				screen.getByText("Anomaly: Gulgak").closest("li") as HTMLElement,
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
				within(row as HTMLElement)
					.getByRole("button", { name: `Mark ${title} complete` })
					.hasAttribute("disabled"),
			).toBe(true);
			expect(
				within(row as HTMLElement)
					.getByRole("button", { name: `Mark ${title} fully complete` })
					.hasAttribute("disabled"),
			).toBe(true);
		}
		expect(expiredName.className).toContain("line-through");
		expect(expiredRow?.className).toContain("opacity-50");
	});

	it("shows inline validation in the accessible add-task dialog", async () => {
		render(<ChecklistPage />);
		fireEvent.click(screen.getByRole("button", { name: "Add item" }));
		expect(screen.getByLabelText("Start (UTC)").getAttribute("type")).toBe(
			"datetime-local",
		);
		expect(
			screen.getByLabelText("End (optional, UTC)").getAttribute("type"),
		).toBe("datetime-local");
		fireEvent.click(
			within(screen.getByRole("dialog")).getByRole("button", {
				name: "Add item",
			}),
		);

		expect(await screen.findByText("Name is required.")).toBeTruthy();
		expect(screen.getByText("Start date and time are required.")).toBeTruthy();
		expect(
			screen.getByLabelText("Task name").getAttribute("aria-describedby"),
		).toBe("checklist-task-name-error");
		expect(
			screen.getByLabelText("Start (UTC)").getAttribute("aria-describedby"),
		).toBe("checklist-task-start-error");
	});
});
