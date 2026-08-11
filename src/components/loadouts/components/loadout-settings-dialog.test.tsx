// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LoadoutSettingsDialog } from "@/components/loadouts/components/loadout-settings-dialog";
import { useAppStore } from "@/stores/app-store";

afterEach(() => {
	useAppStore.setState({
		loadoutCardPreferences: { showArtifactsAndEquipment: true },
	});
});

describe("LoadoutSettingsDialog", () => {
	it("shows and updates the saved-card visibility preference", () => {
		useAppStore.setState({
			loadoutCardPreferences: { showArtifactsAndEquipment: false },
		});
		render(<LoadoutSettingsDialog />);

		fireEvent.click(screen.getByRole("button", { name: "Loadout settings" }));
		const checkbox = screen.getByRole("checkbox", {
			name: "Show artifacts and equipment",
		});
		expect(checkbox.getAttribute("aria-checked")).toBe("false");

		fireEvent.click(checkbox);
		expect(useAppStore.getState().loadoutCardPreferences).toEqual({
			showArtifactsAndEquipment: true,
		});
	});
});
