// @vitest-environment jsdom
import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CharactersPage } from "@/components/characters/characters-page";
import { AddCharacter } from "@/components/characters/components/add-character";
import {
	emptyCharacterFilters,
	useCharacterFilter,
} from "@/components/characters/store/characters-filter-store";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";
import { useAppStore } from "@/stores/app-store";

const owned = {
	1: {
		id: 1,
		awakening: 2,
		skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
	},
	2: {
		id: 2,
		awakening: 5,
		skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
	},
	3: {
		id: 3,
		awakening: 2,
		skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
	},
};

const ownedCharacterNames = () =>
	screen
		.getAllByText(/^(Angel|Benjamin|Mina)$/)
		.map((element) => element.textContent);

describe("character search", () => {
	afterEach(cleanup);

	beforeEach(() => {
		Element.prototype.scrollIntoView = vi.fn();
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

	it("shows roster progress and disables adding when every character is owned", () => {
		const total = Object.keys(CHARACTERS_DATA).length;
		render(<AddCharacter />);

		expect(screen.getByText(`3/${total}`)).toBeTruthy();
		expect(
			screen
				.getByRole("button", { name: "Add Character" })
				.hasAttribute("disabled"),
		).toBe(false);

		act(() => {
			useAppStore.setState({
				charactersOwned: Object.fromEntries(
					Object.values(CHARACTERS_DATA).map(({ id }) => [
						id,
						{ ...owned[1], id },
					]),
				),
			});
		});

		const disabledButton = screen.getByRole("button", {
			name: "No available characters",
		});
		expect(screen.getByText(`${total}/${total}`)).toBeTruthy();
		expect(disabledButton.hasAttribute("disabled")).toBe(true);

		fireEvent.click(disabledButton);
		expect(screen.queryByRole("dialog")).toBeNull();
	});

	it("filters candidates locally and clears before closing Add Character", () => {
		useAppStore.setState({ charactersOwned: { 1: owned[1] } });
		render(<AddCharacter />);

		fireEvent.click(screen.getByRole("button", { name: "Add Character" }));
		const search = screen.getByPlaceholderText(
			"Search characters",
		) as HTMLInputElement;
		fireEvent.change(search, {
			target: { value: "Mina" },
		});

		expect(screen.getByText("Mina")).toBeTruthy();
		expect(screen.queryByText("Benjamin")).toBeNull();
		expect(useCharacterFilter.getState().characterFilters.search).toBe("");

		fireEvent.keyDown(search, { key: "Escape" });
		expect(search.value).toBe("");
		expect(screen.getByRole("dialog")).toBeTruthy();
	});

	it("toggles Tier 4 and Tier 5 and clears every character filter", () => {
		render(<CharactersPage />);
		const tier4 = screen.getByRole("button", { name: "Tier 4" });
		const tier5 = screen.getByRole("button", { name: "Tier 5" });
		const star = tier4.querySelector("svg");
		const expectedColor = document.createElement("span").style;
		expectedColor.color = TIERS_DATA[4].hex;
		expect(star?.getAttribute("fill")).toBe("currentColor");
		expect(star?.style.color).toBe(expectedColor.color);
		expect(star?.getAttribute("aria-hidden")).toBe("true");

		fireEvent.click(tier4);
		expect(screen.getByText("Angel")).toBeTruthy();
		expect(screen.getByText("Benjamin")).toBeTruthy();
		expect(screen.queryByText("Mina")).toBeNull();

		fireEvent.click(tier5);
		expect(screen.getByText("Mina")).toBeTruthy();

		fireEvent.click(tier4);
		expect(screen.queryByText("Angel")).toBeNull();
		expect(screen.queryByText("Benjamin")).toBeNull();
		expect(screen.getByText("Mina")).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Fire icon" }));
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search characters" }),
			{
				target: { value: "Mina" },
			},
		);
		act(() => {
			useCharacterFilter.setState({
				characterFilters: {
					...useCharacterFilter.getState().characterFilters,
					sort: "awakening-desc",
				},
			});
		});
		fireEvent.click(
			screen.getByRole("button", { name: "Clear character filters" }),
		);
		expect(screen.getByText("Angel")).toBeTruthy();
		expect(screen.getByText("Benjamin")).toBeTruthy();
		expect(screen.getByText("Mina")).toBeTruthy();
		expect(tier5.getAttribute("aria-pressed")).toBe("false");
		expect(useCharacterFilter.getState().characterFilters.sort).toBe(
			"name-asc",
		);
	});

	it("sorts owned characters by name and awakening level", () => {
		render(<CharactersPage />);

		const sortSelect = screen.getByRole("combobox", {
			name: "Sort owned characters",
		});
		expect(sortSelect.textContent).toContain("Name: A–Z");
		expect(ownedCharacterNames()).toEqual(["Angel", "Benjamin", "Mina"]);

		fireEvent.keyDown(sortSelect, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: "Name: Z–A" }));
		expect(ownedCharacterNames()).toEqual(["Mina", "Benjamin", "Angel"]);

		for (const [sort, expected] of [
			["awakening-asc", ["Angel", "Mina", "Benjamin"]],
			["awakening-desc", ["Benjamin", "Angel", "Mina"]],
		] as const) {
			act(() => {
				useCharacterFilter.setState({
					characterFilters: {
						...useCharacterFilter.getState().characterFilters,
						sort,
					},
				});
			});
			expect(ownedCharacterNames()).toEqual(expected);
		}
	});

	it("preserves sorting when clearing search", () => {
		useCharacterFilter.setState({
			characterFilters: {
				...emptyCharacterFilters(),
				search: "missing",
				sort: "name-desc",
			},
		});
		render(<CharactersPage />);

		fireEvent.click(screen.getByRole("button", { name: "Clear search" }));

		expect(ownedCharacterNames()).toEqual(["Mina", "Benjamin", "Angel"]);
		expect(useCharacterFilter.getState().characterFilters.sort).toBe(
			"name-desc",
		);
	});

	it("clears only search from the search button", () => {
		render(<CharactersPage />);
		fireEvent.click(screen.getByRole("button", { name: "Tier 5" }));
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search characters" }),
			{
				target: { value: "missing" },
			},
		);

		fireEvent.click(screen.getByRole("button", { name: "Clear search" }));

		expect(screen.getByText("Mina")).toBeTruthy();
		expect(screen.queryByText("Angel")).toBeNull();
		expect(
			useCharacterFilter.getState().characterFilters.selectedTiers,
		).toEqual([5]);
	});
});
