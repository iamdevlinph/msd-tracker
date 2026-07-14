// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CharactersPage } from "@/components/characters/characters-page";
import { AddCharacter } from "@/components/characters/components/add-character";
import {
	emptyCharacterFilters,
	useCharacterFilter,
} from "@/components/characters/store/characters-filter-store";
import { useAppStore } from "@/stores/app-store";

const owned = {
	1: {
		id: 1,
		awakening: 0,
		skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
	},
	2: {
		id: 2,
		awakening: 0,
		skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
	},
	3: {
		id: 3,
		awakening: 0,
		skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
	},
};

describe("character search", () => {
	afterEach(cleanup);

	beforeEach(() => {
		useAppStore.setState({ charactersOwned: owned });
		useCharacterFilter.setState({
			characterFilters: emptyCharacterFilters(),
		});
	});

	it("filters the owned-character screen", () => {
		render(<CharactersPage />);
		const search = screen.getByPlaceholderText(
			"Search characters",
		) as HTMLInputElement;

		fireEvent.change(search, {
			target: { value: "Benjamin" },
		});
		fireEvent.focus(search);

		expect(screen.getByText("Benjamin")).toBeTruthy();
		expect(screen.queryByText("Angel")).toBeNull();
		expect(screen.queryByText("Mina")).toBeNull();
		expect(search.selectionStart).toBe(0);
		expect(search.selectionEnd).toBe("Benjamin".length);
	});

	it("distinguishes an empty collection from empty filter results", () => {
		useAppStore.setState({ charactersOwned: {} });
		const { rerender } = render(<CharactersPage />);

		expect(screen.getByText("No characters yet")).toBeTruthy();
		expect(
			screen.getByText("Add a character to start building your roster."),
		).toBeTruthy();

		useAppStore.setState({ charactersOwned: owned });
		useCharacterFilter.setState({
			characterFilters: { ...emptyCharacterFilters(), search: "missing" },
		});
		rerender(<CharactersPage />);

		expect(screen.getByText("No characters match these filters")).toBeTruthy();
		expect(
			screen.getByText(
				"Adjust or clear the filters to see your owned characters.",
			),
		).toBeTruthy();
	});

	it("filters candidates inside Add Character independently", () => {
		useAppStore.setState({ charactersOwned: { 1: owned[1] } });
		render(<AddCharacter />);

		fireEvent.click(screen.getByRole("button", { name: "Add Character" }));
		fireEvent.change(screen.getByPlaceholderText("Search characters"), {
			target: { value: "Mina" },
		});

		expect(screen.getByText("Mina")).toBeTruthy();
		expect(screen.queryByText("Benjamin")).toBeNull();
		expect(useCharacterFilter.getState().characterFilters.search).toBe("");
	});
});
