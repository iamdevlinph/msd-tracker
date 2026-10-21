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

	it("shows Assets children by default and records visibility changes", () => {
		render(<NavigationSettingsCard />);
		const assets = screen.getByRole("checkbox", { name: "Assets" });
		const artifacts = screen.getByRole("checkbox", { name: "Artifacts" });
		const characters = screen.getByRole("checkbox", { name: "Characters" });
		const equipment = screen.getByRole("checkbox", { name: "Equipment" });

		expect(
			screen
				.getAllByRole("checkbox")
				.map((checkbox) => checkbox.getAttribute("id")),
		).toEqual([
			"show-assets-navigation",
			"show-artifact-catalog-navigation",
			"show-character-catalog-navigation",
			"show-equipment-navigation",
		]);
		expect(assets.getAttribute("data-state")).toBe("checked");
		expect(artifacts.getAttribute("data-state")).toBe("checked");
		expect(characters.getAttribute("data-state")).toBe("checked");
		expect(equipment.getAttribute("data-state")).toBe("checked");

		fireEvent.click(artifacts);
		fireEvent.click(characters);
		fireEvent.click(equipment);
		fireEvent.click(assets);

		expect(screen.getByText("Assets").className).toContain("line-through");
		expect(screen.getByText("Artifacts").className).toContain("line-through");
		expect(screen.getByText("Characters").className).toContain("line-through");
		expect(screen.getByText("Equipment").className).toContain("line-through");
		expect(screen.getByText("Assets").parentElement?.className).toContain(
			"opacity-60",
		);
		expect(screen.getByText("Artifacts").parentElement?.className).toContain(
			"opacity-60",
		);
		expect(screen.getByText("Characters").parentElement?.className).toContain(
			"opacity-60",
		);
		expect(screen.getByText("Equipment").parentElement?.className).toContain(
			"opacity-60",
		);
		expect(useAppStore.getState().navigationPreferences).toEqual({
			showAssets: false,
			showArtifactCatalog: false,
			showCharacterCatalog: false,
			showEquipment: false,
		});
		expect(event).toHaveBeenNthCalledWith(1, "navigation_visibility_toggle", {
			item: "artifact_catalog",
			is_visible: false,
		});
		expect(event).toHaveBeenNthCalledWith(2, "navigation_visibility_toggle", {
			item: "character_catalog",
			is_visible: false,
		});
		expect(event).toHaveBeenNthCalledWith(3, "navigation_visibility_toggle", {
			item: "equipment",
			is_visible: false,
		});
		expect(event).toHaveBeenNthCalledWith(4, "navigation_visibility_toggle", {
			item: "assets",
			is_visible: false,
		});
	});
});
