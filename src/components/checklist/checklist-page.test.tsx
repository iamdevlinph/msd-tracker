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
		expect(completeButton.querySelector(".lucide-check")).toBeTruthy();
		fireEvent.click(completeButton);
		const undoButton = within(conquestRow as HTMLElement).getByRole("button", {
			name: "Mark Conquest incomplete",
		});
		expect(undoButton.querySelector(".lucide-undo-2")).toBeTruthy();
		expect(
			within(conquestRow as HTMLElement)
				.getByTitle("Completed")
				.querySelector(".lucide-check"),
		).toBeTruthy();
		expect(event).toHaveBeenLastCalledWith(ANALYTICS_EVENTS.CHECKLIST_COMPLETE);
		fireEvent.click(undoButton);
		expect(event).toHaveBeenLastCalledWith(ANALYTICS_EVENTS.CHECKLIST_UNDO);

		const anomalyRow = screen.getByText("Anomaly: Gulgak").closest("li");
		expect(anomalyRow).toBeTruthy();
		expect(within(anomalyRow as HTMLElement).getByText("Event")).toBeTruthy();
		expect(within(anomalyRow as HTMLElement).getByText("Daily")).toBeTruthy();

		const eventsFilter = screen.getByRole("button", { name: "Events" });
		expect(eventsFilter.getAttribute("aria-pressed")).toBe("false");
		fireEvent.click(eventsFilter);
		expect(eventsFilter.getAttribute("aria-pressed")).toBe("true");
		expect(screen.getByText("Anomaly: Gulgak")).toBeTruthy();
		expect(screen.queryByText("Dimensional Rift")).toBeNull();
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

	it("strikes through expired event names when expired items are visible", () => {
		render(<ChecklistPage />);

		const expiredName = screen.getByText(
			"Cool Summer Vacation! Login Reward Event",
		);
		expect(expiredName.className).toContain("line-through");
		expect(expiredName.closest("li")?.className).toContain("opacity-50");
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
