// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "@/stores/app-store";
import { DEFAULT_NAVIGATION_PREFERENCES } from "@/stores/navigation-preferences-slice";
import { NavigationSettingsCard } from "./navigation-settings-card";

const { event } = vi.hoisted(() => ({ event: vi.fn() }));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

describe("NavigationSettingsCard", () => {
	afterEach(() => {
		cleanup();
		event.mockClear();
		useAppStore.setState({
			navigationPreferences: { ...DEFAULT_NAVIGATION_PREFERENCES },
		});
	});

	it("shows Assets and Equipment by default and records visibility changes", () => {
		render(<NavigationSettingsCard />);
		const assets = screen.getByRole("checkbox", { name: "Assets" });
		const equipment = screen.getByRole("checkbox", { name: "Equipment" });

		expect(assets.getAttribute("data-state")).toBe("checked");
		expect(equipment.getAttribute("data-state")).toBe("checked");

		fireEvent.click(equipment);
		fireEvent.click(assets);

		expect(screen.getByText("Assets").className).toContain("line-through");
		expect(screen.getByText("Equipment").className).toContain("line-through");
		expect(screen.getByText("Assets").parentElement?.className).toContain(
			"opacity-60",
		);
		expect(screen.getByText("Equipment").parentElement?.className).toContain(
			"opacity-60",
		);
		expect(useAppStore.getState().navigationPreferences).toEqual({
			showAssets: false,
			showEquipment: false,
		});
		expect(event).toHaveBeenNthCalledWith(1, "navigation_visibility_toggle", {
			item: "equipment",
			is_visible: false,
		});
		expect(event).toHaveBeenNthCalledWith(2, "navigation_visibility_toggle", {
			item: "assets",
			is_visible: false,
		});
	});
});
