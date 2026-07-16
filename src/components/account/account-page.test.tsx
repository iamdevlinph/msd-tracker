// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AccountPage } from "@/components/account/account-page";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

const { event, resets } = vi.hoisted(() => ({
	event: vi.fn(),
	resets: {
		resetCodexStore: vi.fn(),
		resetCharacterSlice: vi.fn(),
		resetMonsterlingSlice: vi.fn(),
		resetLoadoutsSlice: vi.fn(),
	},
}));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));
vi.mock("@/components/account/google/google-section", () => ({
	GoogleSection: () => null,
}));
vi.mock("@/stores/app-store", () => ({
	useAppStore: (selector: (state: typeof resets) => unknown) =>
		selector(resets),
}));

beforeEach(() => {
	vi.stubEnv("VITE_NODE_ENV", "development");
	event.mockClear();
	Object.values(resets).forEach((reset) => {
		reset.mockClear();
	});
	localStorage.clear();
});

afterEach(() => {
	cleanup();
	vi.unstubAllEnvs();
});

describe("AccountPage clear confirmations", () => {
	it.each([
		["Clear Monster Codex", "Clear Monster Codex?"],
		["Clear Characters Owned", "Clear Characters Owned?"],
		["Clear Monsterlings Owned", "Clear Monsterlings Owned?"],
		["Clear Loadouts", "Clear Loadouts?"],
		["Clear Monsterlings Options", "Clear Monsterlings Options?"],
		["Clear Stat Options", "Clear Stat Options?"],
	])("shows an accessible confirmation for %s", (button, title) => {
		render(<AccountPage />);

		fireEvent.click(screen.getByRole("button", { name: button }));

		const dialog = screen.getByRole("alertdialog", { name: title });
		expect(dialog.getAttribute("aria-describedby")).toBeTruthy();
		screen.getByRole("button", { name: "Cancel" });
		screen.getByRole("button", { name: "Clear" });
	});

	it("does nothing when clearing is cancelled", () => {
		render(<AccountPage />);
		fireEvent.click(
			screen.getByRole("button", { name: "Clear Monster Codex" }),
		);
		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

		expect(resets.resetCodexStore).not.toHaveBeenCalled();
		expect(event).not.toHaveBeenCalled();
	});

	it.each([
		["Clear Monster Codex", "resetCodexStore", ANALYTICS_EVENTS.CODEX_RESET],
		[
			"Clear Characters Owned",
			"resetCharacterSlice",
			ANALYTICS_EVENTS.CHARACTERS_RESET,
		],
		[
			"Clear Monsterlings Owned",
			"resetMonsterlingSlice",
			ANALYTICS_EVENTS.MONSTERLINGS_RESET,
		],
		["Clear Loadouts", "resetLoadoutsSlice", ANALYTICS_EVENTS.LOADOUTS_RESET],
	] as const)("confirms %s against only its reset and analytics event", (button, resetName, analyticsEvent) => {
		render(<AccountPage />);
		fireEvent.click(screen.getByRole("button", { name: button }));
		fireEvent.click(screen.getByRole("button", { name: "Clear" }));

		expect(resets[resetName]).toHaveBeenCalledOnce();
		for (const [name, reset] of Object.entries(resets)) {
			if (name !== resetName) expect(reset).not.toHaveBeenCalled();
		}
		expect(event).toHaveBeenCalledOnce();
		expect(event).toHaveBeenCalledWith(analyticsEvent);
	});

	it("clears confirmed browser-only option caches without analytics", () => {
		localStorage.setItem("monster-options-cache", "monsterlings");
		localStorage.setItem("stat-options-cache", "stats");
		render(<AccountPage />);

		fireEvent.click(
			screen.getByRole("button", { name: "Clear Monsterlings Options" }),
		);
		fireEvent.click(screen.getByRole("button", { name: "Clear" }));

		expect(localStorage.getItem("monster-options-cache")).toBeNull();
		expect(localStorage.getItem("stat-options-cache")).toBe("stats");
		expect(event).not.toHaveBeenCalled();
	});

	it("retains browser-only option caches when clearing is cancelled", () => {
		localStorage.setItem("stat-options-cache", "stats");
		render(<AccountPage />);
		fireEvent.click(screen.getByRole("button", { name: "Clear Stat Options" }));
		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

		expect(localStorage.getItem("stat-options-cache")).toBe("stats");
		expect(event).not.toHaveBeenCalled();
	});
});
