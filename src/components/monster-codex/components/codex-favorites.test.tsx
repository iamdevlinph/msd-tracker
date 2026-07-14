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
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { useAppStore } from "@/stores/app-store";

const { event } = vi.hoisted(() => ({ event: vi.fn() }));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

const monsterlings = Object.values(MONSTERLINGS_DATA);
const favorite = monsterlings[0];

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

	it("shows favorites by default and removes them immediately", () => {
		render(<CodexList />);

		expect(screen.getByAltText(`${favorite.name} monsterling`)).toBeTruthy();
		expect(
			screen.queryByAltText(`${monsterlings[1].name} monsterling`),
		).toBeNull();

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
		const source = favorite.source_id.find(
			(id) => id !== SOURCE_ID_BY_SOURCE.ALL,
		);
		if (source === undefined)
			throw new Error("Favorite fixture needs a source");

		const excluded = monsterlings.find(
			(monsterling) =>
				monsterling.id !== favorite.id &&
				(monsterling.region_id !== favorite.region_id ||
					!monsterling.source_id.includes(source) ||
					!monsterling.name
						.toLowerCase()
						.includes(favorite.name.toLowerCase())),
		);
		if (!excluded) throw new Error("Favorite fixture needs an excluded entry");

		useAppStore.setState({
			monsterCodexFavorites: [favorite.id, excluded.id],
		});
		useCodexStore.setState({
			filters: {
				...initialCodexFilters,
				region: favorite.region_id,
				source,
				search: favorite.name,
			},
		});

		render(<CodexList />);

		expect(screen.getByAltText(`${favorite.name} monsterling`)).toBeTruthy();
		expect(screen.queryByAltText(`${excluded.name} monsterling`)).toBeNull();
	});

	it("selects the existing search when focused", () => {
		useCodexStore.setState({
			filters: { ...initialCodexFilters, search: favorite.name },
		});
		render(<CodexFilter />);
		const search = screen.getByPlaceholderText(
			"Monsterling name",
		) as HTMLInputElement;

		fireEvent.focus(search);

		expect(search.selectionStart).toBe(0);
		expect(search.selectionEnd).toBe(favorite.name.length);
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

	it("includes favorites in backups and clears them with codex data", () => {
		expect(select(useAppStore.getState()).monsterCodexFavorites).toEqual([
			favorite.id,
		]);

		useAppStore.getState().resetCodexStore();

		expect(useAppStore.getState().monsterCodexFavorites).toEqual([]);
		expect(useAppStore.getState().monsterCodexCompleted).toEqual([]);
	});
});
