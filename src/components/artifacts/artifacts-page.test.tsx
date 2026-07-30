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
import { ArtifactsPage } from "@/components/artifacts/artifacts-page";
import { ARTIFACTS_DATA } from "@/data/ARTIFACTS_DATA";
import { useAppStore } from "@/stores/app-store";

describe("ArtifactsPage", () => {
	afterEach(cleanup);

	beforeEach(() => {
		Element.prototype.scrollIntoView = vi.fn();
		useAppStore.setState({
			artifactsOwned: {
				owned: { artifact_id: 1, fusion_level: 2 },
			},
		});
	});

	it("renders artifact controls and clears all main-page filters", () => {
		render(<ArtifactsPage />);

		expect(screen.queryByRole("button", { name: "Delete" })).toBeNull();
		expect(
			screen.queryByRole("combobox", { name: /fusion level/i }),
		).toBeNull();
		expect(screen.queryByText(/Tier 5 ·/)).toBeNull();
		expect(screen.getByRole("button", { name: "Tier 3" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "Tier 4" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "Tier 5" })).toBeTruthy();
		expect(screen.queryByRole("combobox", { name: /sort/i })).toBeNull();

		fireEvent.click(screen.getByRole("button", { name: "Fire icon" }));
		fireEvent.click(screen.getByRole("button", { name: "Tier 5" }));
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search artifacts" }),
			{
				target: { value: "missing" },
			},
		);
		fireEvent.click(
			screen.getByRole("button", { name: "Clear artifact filters" }),
		);

		expect(screen.getByText("Fall from Grace")).toBeTruthy();
		expect(
			screen
				.getByRole("button", { name: "Tier 5" })
				.getAttribute("aria-pressed"),
		).toBe("false");
	});

	it("uses the shared empty states for collections and filter results", () => {
		useAppStore.setState({ artifactsOwned: {} });
		const { rerender } = render(<ArtifactsPage />);

		expect(screen.getByText("No artifacts yet")).toBeTruthy();
		expect(
			screen.getByText("Add an artifact to start building your collection."),
		).toBeTruthy();

		useAppStore.setState({
			artifactsOwned: { owned: { artifact_id: 1, fusion_level: 2 } },
		});
		rerender(<ArtifactsPage />);
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search artifacts" }),
			{
				target: { value: "missing" },
			},
		);

		expect(screen.getByText("No artifacts match these filters")).toBeTruthy();
		expect(
			screen.getByText(
				"Adjust or clear the filters to see your owned artifacts.",
			),
		).toBeTruthy();
	});

	it("edits and deletes only the selected owned copy from its card", async () => {
		useAppStore.setState({
			artifactsOwned: {
				first: { artifact_id: 1, fusion_level: 2 },
				second: { artifact_id: 1, fusion_level: 4 },
			},
		});
		render(<ArtifactsPage />);

		const secondCardButton = screen
			.getByAltText("Fusion level 4")
			.closest("button");
		expect(secondCardButton).toBeTruthy();
		fireEvent.click(secondCardButton as HTMLButtonElement);

		const dialog = screen.getByRole("dialog");
		expect(within(dialog).getByAltText("Fusion level 4")).toBeTruthy();
		const fusionLevel = within(dialog).getByRole("group", {
			name: "Fusion Level",
		});
		fireEvent.click(within(fusionLevel).getByRole("button", { name: "5" }));
		fireEvent.click(within(dialog).getByRole("button", { name: "Update" }));

		await waitFor(() => {
			expect(useAppStore.getState().artifactsOwned.first.fusion_level).toBe(2);
			expect(useAppStore.getState().artifactsOwned.second.fusion_level).toBe(5);
		});
		fireEvent.click(
			screen
				.getByAltText("Fusion level 5")
				.closest("button") as HTMLButtonElement,
		);
		fireEvent.click(
			within(screen.getByRole("dialog")).getByRole("button", {
				name: "Delete Fall from Grace",
			}),
		);

		await waitFor(() => {
			expect(useAppStore.getState().artifactsOwned.first).toEqual({
				artifact_id: 1,
				fusion_level: 2,
			});
			expect(useAppStore.getState().artifactsOwned.second).toBeUndefined();
		});
	});

	it("keeps dialog filters independent and clears search before Escape closes", () => {
		render(<ArtifactsPage />);
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search artifacts" }),
			{
				target: { value: "missing" },
			},
		);
		fireEvent.click(screen.getByRole("button", { name: "Add Artifact" }));

		const dialog = screen.getByRole("dialog");
		const dialogSearch = within(dialog).getByRole("textbox", {
			name: "Search artifacts",
		});
		expect(within(dialog).getByText("Fall from Grace")).toBeTruthy();

		fireEvent.change(dialogSearch, { target: { value: "hawk" } });
		expect(within(dialog).getByText("Hawk's Flight")).toBeTruthy();
		fireEvent.keyDown(dialogSearch, { key: "Escape" });
		expect((dialogSearch as HTMLInputElement).value).toBe("");
		expect(screen.getByRole("dialog")).toBeTruthy();
	});

	it("allows another owned copy and resets fusion after closing", async () => {
		render(<ArtifactsPage />);
		const open = () =>
			fireEvent.click(screen.getByRole("button", { name: "Add Artifact" }));

		open();
		fireEvent.click(
			within(screen.getByRole("dialog")).getByText("Fall from Grace"),
		);
		const fusionLevel = screen.getByRole("group", { name: "Fusion Level" });
		expect(within(fusionLevel).getByRole("button", { name: "1" })).toBeTruthy();
		expect(
			within(screen.getByRole("dialog")).getByAltText("Fusion level 1"),
		).toBeTruthy();
		fireEvent.click(within(fusionLevel).getByRole("button", { name: "5" }));
		expect(
			within(screen.getByRole("dialog")).getByAltText("Fusion level 5"),
		).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: "Add" }));

		await waitFor(() =>
			expect(
				Object.values(useAppStore.getState().artifactsOwned).filter(
					(artifact) => artifact.artifact_id === ARTIFACTS_DATA[1].id,
				),
			).toHaveLength(2),
		);

		open();
		fireEvent.click(
			within(screen.getByRole("dialog")).getByText("Fall from Grace"),
		);
		expect(
			within(screen.getByRole("dialog")).getByAltText("Fusion level 1"),
		).toBeTruthy();
	});
});
