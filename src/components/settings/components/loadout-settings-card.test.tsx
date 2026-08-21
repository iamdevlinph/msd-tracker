// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "@/stores/app-store";
import { LoadoutSettingsCard } from "./loadout-settings-card";

const { event } = vi.hoisted(() => ({ event: vi.fn() }));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

describe("LoadoutSettingsCard", () => {
	afterEach(() => {
		cleanup();
		event.mockClear();
		useAppStore.setState({
			showEquipmentSetNames: false,
			loadoutPreviewPreferences: {
				hideEquipment: true,
				compactMonsterlings: true,
			},
		});
	});

	it("renders accessible defaults and records normalized setting changes", () => {
		render(<LoadoutSettingsCard />);
		expect(
			screen.getByText(
				/Choose how loadouts and loadout snapshots appear in previews and exports/,
			),
		).toBeTruthy();
		const hide = screen.getByRole("checkbox", {
			name: "Hide equipment by default",
		});
		const compact = screen.getByRole("checkbox", {
			name: "Compact monsterlings by default",
		});
		expect(hide.getAttribute("data-state")).toBe("checked");
		expect(compact.getAttribute("data-state")).toBe("checked");

		fireEvent.click(hide);
		fireEvent.click(compact);
		expect(useAppStore.getState().loadoutPreviewPreferences).toEqual({
			hideEquipment: false,
			compactMonsterlings: false,
		});
		expect(event).toHaveBeenNthCalledWith(
			1,
			"loadout_preview_equipment_toggle",
			{ hide_equipment: false, control_location: "settings" },
		);
		expect(event).toHaveBeenNthCalledWith(2, "loadout_preview_compact_toggle", {
			compact_monsterlings: false,
			control_location: "settings",
		});
	});
});
