// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { select } from "@/components/account/google/utils/drive-sync";
import { CodexCard } from "@/components/monster-codex/components/codex-card";
import { CodexFilter } from "@/components/monster-codex/components/codex-filter";
import { CodexList } from "@/components/monster-codex/components/codex-list";
import {
	initialCodexFilters,
	useCodexStore,
} from "@/components/monster-codex/store/codex-store";
import { SOURCE_ID_BY_SOURCE } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import type { MonsterCodexData } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { useAppStore } from "@/stores/app-store";

const { event } = vi.hoisted(() => ({ event: vi.fn() }));

const { monsterlingData } = vi.hoisted(() => ({
	monsterlingData: {
		1: {
			id: 1,
			display_id: 1,
			name: "Fixture Favorite",
			region_id: 1,
			source_id: [1],
			image: "/images/fixture-favorite.png",
			element_id: 1,
			ability: "Fixture ability",
		},
		2: {
			id: 2,
			display_id: 2,
			name: "Fixture Other",
			region_id: 2,
			source_id: [2],
			image: "/images/fixture-other.png",
			element_id: 2,
			ability: "Fixture ability",
		},
		3: {
			id: 3,
			display_id: 3,
			name: "Fixture Ingredient",
			region_id: 1,
			source_id: [1, 2],
			image: "/images/fixture-ingredient.png",
			element_id: 1,
			ability: "Fixture ability",
		},
		4: {
			id: 4,
			display_id: 4,
			name: "Fixture Isolated",
			region_id: 1,
			source_id: [1],
			image: "/images/fixture-isolated.png",
			element_id: 1,
			ability: "Fixture ability",
		},
	} satisfies MonsterCodexData,
}));

vi.mock("@/data/monsterlings/MONSTERLINGS_DATA", () => ({
	MONSTERLINGS_DATA: monsterlingData,
}));

vi.mock("@/data/monsterling-mutations/MONSTERLING_MUTATIONS_DATA", () => ({
	MONSTERLING_MUTATIONS_DATA: [{ result_id: 2, ingredient_ids: [1, 3] }],
}));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

const favorite = monsterlingData[1];
const other = monsterlingData[2];
const isolated = monsterlingData[4];

describe("monster codex favorites", () => {
	beforeEach(() => {
		event.mockClear();
		useAppStore.setState({
			monsterCodexCompleted: [],
			monsterCodexFavorites: [favorite.id],
		});
		useCodexStore.setState({ filters: { ...initialCodexFilters } });
	});

	afterEach(cleanup);

	it("shows only favorites and removes them immediately", () => {
		useCodexStore.setState({
			filters: { ...initialCodexFilters, view: "favorite" },
		});
		render(<CodexList />);

		expect(screen.getByAltText(`${favorite.name} monsterling`)).toBeTruthy();
		expect(screen.queryByAltText(`${other.name} monsterling`)).toBeNull();

		fireEvent.click(
			screen.getByRole("button", {
				name: `Remove ${favorite.name} from favorites`,
			}),
		);

		expect(useAppStore.getState().monsterCodexFavorites).toEqual([]);
		expect(screen.getByText("No favorite monsterlings yet")).toBeTruthy();
		expect(event).toHaveBeenCalledWith("codex_remove_favorite", {
			monsterling_id: favorite.id,
			monsterling_name: favorite.name,
		});
	});

	it("combines favorite, region, source, and search filters", () => {
		const source = SOURCE_ID_BY_SOURCE.CAPTURE;
		const excluded = other;

		useAppStore.setState({
			monsterCodexFavorites: [favorite.id, excluded.id],
		});
		useCodexStore.setState({
			filters: {
				...initialCodexFilters,
				region: favorite.region_id,
				selectedSources: [source],
				search: favorite.name,
			},
		});

		render(<CodexList />);

		expect(screen.getByAltText(`${favorite.name} monsterling`)).toBeTruthy();
		expect(screen.queryByAltText(`${excluded.name} monsterling`)).toBeNull();
	});

	it("selects the existing search when focused", () => {
		useCodexStore.setState({
			filters: {
				...initialCodexFilters,
				view: "favorite",
				search: favorite.name,
			},
		});
		render(<CodexFilter />);
		const search = screen.getByPlaceholderText(
			/Monsterling name$/,
		) as HTMLInputElement;
		expect(screen.getByRole("textbox", { name: "Search" })).toBe(search);

		fireEvent.focus(search);

		expect(search.selectionStart).toBe(0);
		expect(search.selectionEnd).toBe(favorite.name.length);

		fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
		expect(useCodexStore.getState().filters).toEqual({
			...initialCodexFilters,
			view: "favorite",
			search: "",
		});
	});

	it("toggles favorites independently from completion", () => {
		useAppStore.setState({ monsterCodexFavorites: [] });
		render(<CodexCard monsterling_id={favorite.id} />);

		const favoriteButton = screen.getByRole("button", {
			name: `Add ${favorite.name} to favorites`,
		});
		expect(favoriteButton.getAttribute("aria-pressed")).toBe("false");
		expect(favoriteButton.className).toContain("bg-chart-5");
		expect(favoriteButton.className).toContain("text-black");
		fireEvent.click(favoriteButton);

		expect(useAppStore.getState().monsterCodexFavorites).toEqual([favorite.id]);
		expect(useAppStore.getState().monsterCodexCompleted).toEqual([]);

		fireEvent.click(
			screen.getByRole("button", {
				name: `Mark ${favorite.name} completed`,
			}),
		);
		expect(useAppStore.getState().monsterCodexFavorites).toEqual([favorite.id]);
		expect(useAppStore.getState().monsterCodexCompleted).toEqual([favorite.id]);
		expect(event).toHaveBeenCalledWith("codex_add_favorite", {
			monsterling_id: favorite.id,
			monsterling_name: favorite.name,
		});
		expect(event).toHaveBeenCalledWith("codex_mark_complete", {
			monsterling_id: favorite.id,
			monsterling_name: favorite.name,
		});
	});

	it("selects multiple source filters with OR semantics", () => {
		render(
			<>
				<CodexFilter />
				<CodexList />
			</>,
		);

		const sourceTrigger = screen.getByRole("button", { name: "Source" });
		fireEvent.pointerDown(sourceTrigger, {
			button: 0,
			ctrlKey: false,
		});
		fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "Capture" }));
		fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "Conquest" }));

		expect(useCodexStore.getState().filters.selectedSources).toEqual([1, 2]);
		expect(sourceTrigger.textContent).toBe("2 sources");
		expect(screen.getByAltText(`${favorite.name} monsterling`)).toBeTruthy();
		expect(screen.getByAltText(`${other.name} monsterling`)).toBeTruthy();

		fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "Capture" }));
		expect(useCodexStore.getState().filters.selectedSources).toEqual([2]);
		expect(screen.queryByAltText(`${favorite.name} monsterling`)).toBeNull();
	});

	it("opens details and unwinds mutation-node dialogs one level at a time", () => {
		render(<CodexList />);

		fireEvent.click(
			screen.getByRole("button", { name: `View ${favorite.name} details` }),
		);
		expect(screen.getByRole("heading", { name: favorite.name })).toBeTruthy();
		expect(screen.getByText(favorite.ability)).toBeTruthy();
		expect(
			screen
				.getByRole("tab", { name: "Mutation Combination" })
				.getAttribute("aria-selected"),
		).toBe("true");
		const diagram = screen.getByRole("region", {
			name: "Mutation family diagram",
		});
		expect(screen.getByRole("dialog").className).toContain("overflow-x-hidden");
		expect(diagram.className).toContain("w-full");
		expect(diagram.className).toContain("overflow-auto");
		diagram.scrollLeft = 40;
		diagram.scrollTop = 30;
		fireEvent.pointerDown(diagram, {
			button: 0,
			pointerId: 7,
			clientX: 100,
			clientY: 100,
		});
		fireEvent.pointerMove(diagram, {
			pointerId: 7,
			clientX: 60,
			clientY: 70,
		});
		expect(diagram.scrollLeft).toBe(80);
		expect(diagram.scrollTop).toBe(60);
		fireEvent.pointerUp(diagram, { pointerId: 7 });
		fireEvent.click(screen.getByRole("button", { name: other.name }));
		expect(screen.getByRole("heading", { name: other.name })).toBeTruthy();
		expect(
			screen
				.getByRole("tab", { name: "Mutation Combination" })
				.getAttribute("aria-selected"),
		).toBe("true");

		fireEvent.click(screen.getByRole("button", { name: "Close" }));
		expect(screen.getByRole("heading", { name: favorite.name })).toBeTruthy();
		expect(
			screen
				.getByRole("tab", { name: "Mutation Combination" })
				.getAttribute("aria-selected"),
		).toBe("true");

		fireEvent.click(screen.getByRole("button", { name: "Close" }));
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(event).toHaveBeenCalledWith("codex_details_open", {
			monsterling_id: favorite.id,
		});
		expect(event).toHaveBeenCalledWith("codex_mutation_tree_open", {
			monsterling_id: other.id,
		});
	});

	it("falls back to Source when a Monsterling has no mutation family", () => {
		render(<CodexList />);

		fireEvent.click(
			screen.getByRole("button", { name: `View ${isolated.name} details` }),
		);

		expect(screen.getByRole("heading", { name: isolated.name })).toBeTruthy();
		expect(
			screen.getByRole("tab", { name: "Source" }).getAttribute("aria-selected"),
		).toBe("true");
		expect(
			screen.queryByRole("tab", { name: "Mutation Combination" }),
		).toBeNull();
		expect(screen.getByText("Capture")).toBeTruthy();
	});

	it("includes favorites in backups and clears them with codex data", () => {
		expect(select(useAppStore.getState()).monsterCodexFavorites).toEqual([
			favorite.id,
		]);

		useAppStore.getState().resetCodexStore();

		expect(useAppStore.getState().monsterCodexFavorites).toEqual([]);
		expect(useAppStore.getState().monsterCodexCompleted).toEqual([]);
	});
});
