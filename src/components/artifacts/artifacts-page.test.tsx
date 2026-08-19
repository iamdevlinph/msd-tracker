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
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { useAppStore } from "@/stores/app-store";

describe("ArtifactsPage", () => {
	afterEach(() => {
		cleanup();
		vi.unstubAllEnvs();
	});

	beforeEach(() => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		Element.prototype.scrollIntoView = vi.fn();
		useAppStore.setState({
			artifactsOwned: {
				owned: { artifact_id: 1, fusion_level: 2 },
			},
		});
	});

	it("renders artifact controls and clears all main-page filters", () => {
		render(<ArtifactsPage />);
		for (const groupName of [
			"Elements",
			"Character classes",
			"Tiers",
			"Clear artifact filters",
		]) {
			expect(screen.getByRole("group", { name: groupName })).toBeTruthy();
		}

		expect(screen.queryByRole("button", { name: "Delete" })).toBeNull();
		expect(
			screen.queryByRole("combobox", { name: /fusion level/i }),
		).toBeNull();
		expect(screen.queryByText(/Tier 5 ·/)).toBeNull();
		expect(screen.getByRole("button", { name: "Tier 3" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "Tier 4" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "Tier 5" })).toBeTruthy();
		expect(screen.queryByRole("combobox", { name: /sort/i })).toBeNull();
		expect(screen.getByText("Fall from Grace").className).toContain("z-20");
		const artifactPortrait = screen.getByAltText("Fall from Grace portrait");
		expect(artifactPortrait.className).toContain("p-1");
		expect(artifactPortrait.closest("button")?.className).toContain(
			"w-[120px]",
		);

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
		fireEvent.click(screen.getByRole("button", { name: "Delete" }));

		await waitFor(() => {
			expect(useAppStore.getState().artifactsOwned.first).toEqual({
				artifact_id: 1,
				fusion_level: 2,
			});
			expect(useAppStore.getState().artifactsOwned.second).toBeUndefined();
		});
	});

	it("uses the owned-card button as the equipped-character tooltip trigger", () => {
		useAppStore.setState({
			loadouts: {
				team: {
					id: "team",
					name: "Team",
					characters: [
						{
							characterId: 1,
							monsterlingIds: [null, null, null],
							artifactInstanceId: "owned",
						},
						{
							characterId: null,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
						{
							characterId: null,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
					],
				},
			},
		});
		render(<ArtifactsPage />);

		const badge = screen.getByRole("img", { name: /equipped by/i });
		const editButton = badge.closest("button");
		expect(editButton?.className).toContain("group");
		expect(editButton?.querySelectorAll("button")).toHaveLength(0);
		fireEvent.mouseEnter(badge);
		const tooltip = screen.getByRole("tooltip");
		expect(tooltip.parentElement).toBe(document.body);
		expect(editButton?.contains(tooltip)).toBe(false);
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

	it("keeps Vivian's hidden artifact out of the add dialog", () => {
		render(<ArtifactsPage />);
		fireEvent.click(screen.getByRole("button", { name: "Add Artifact" }));

		expect(screen.queryByText("Vivian's Artifact")).toBeNull();
	});

	it("shows Vivian's hidden artifact in local development", () => {
		vi.stubEnv("VITE_NODE_ENV", "development");
		render(<ArtifactsPage />);
		fireEvent.click(screen.getByRole("button", { name: "Add Artifact" }));

		expect(screen.getByText("Vivian's Artifact")).toBeTruthy();
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
