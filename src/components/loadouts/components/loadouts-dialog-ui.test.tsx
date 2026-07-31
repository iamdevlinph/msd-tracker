// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import { useMonsterlingFilter } from "@/components/monsterlings/store/monsterlings-filter-store";
import { ELEMENT_ID_BY_ELEMENT } from "@/data/elements/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const { event } = vi.hoisted(() => ({ event: vi.fn() }));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

const charactersOwned = {
	1: {
		id: 1,
		awakening: 5,
		skills: { basic: 1, switch: 2, special: 3, ultimate: 4 },
	},
	2: {
		id: 2,
		awakening: 0,
		skills: { basic: 5, switch: 6, special: 7, ultimate: 8 },
	},
	3: {
		id: 3,
		awakening: 0,
		skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
	},
};

const teamLoadout: LoadoutOwned = {
	id: "team",
	name: "Team",
	characters: [
		{
			characterId: 1,
			monsterlingIds: [null, null, null],
			artifactInstanceId: null,
		},
		{
			characterId: 2,
			monsterlingIds: [null, null, null],
			artifactInstanceId: null,
		},
		{
			characterId: 3,
			monsterlingIds: [null, null, null],
			artifactInstanceId: null,
		},
	],
};

const setMonsterlingSwapFixture = () =>
	useAppStore.setState({
		monsterlingsOwned: {
			first: { monsterling_id: 1, tier_id: 5, traits: [] },
			second: {
				monsterling_id: 2,
				tier_id: 5,
				traits: [],
			},
			other: { monsterling_id: 3, tier_id: 5, traits: [] },
		},
		loadouts: {
			team: {
				...teamLoadout,
				characters: [
					{
						characterId: 1,
						monsterlingIds: ["first", "second", null],
						artifactInstanceId: null,
					},
					{
						characterId: 2,
						monsterlingIds: ["other", null, null],
						artifactInstanceId: null,
					},
					{
						characterId: 3,
						monsterlingIds: [null, null, null],
						artifactInstanceId: null,
					},
				],
			},
		},
	});

describe("LoadoutsDialog character picker", () => {
	afterEach(cleanup);

	beforeEach(() => {
		event.mockClear();
		useAppStore.setState({
			charactersOwned,
			loadouts: {},
			monsterlingsOwned: {},
		});
		useCharacterFilter.setState({
			characterFilters: {
				search: "",
				selectedCharacterClass: [],
				selectedElements: [ELEMENT_ID_BY_ELEMENT.LIGHTNING],
				selectedTiers: [],
				sort: "name-asc",
			},
		});
	});

	it("selects owned character cards and keeps filters local", () => {
		render(<LoadoutsDialog open setOpen={vi.fn()} />);

		const create = screen.getByRole("button", { name: "Create" });
		expect((create as HTMLButtonElement).disabled).toBe(true);

		fireEvent.click(screen.getByRole("button", { name: "Select character" }));
		const emptySearch = screen.getByPlaceholderText(
			"Search characters",
		) as HTMLInputElement;
		expect(emptySearch.value).toBe("");
		expect(document.activeElement).toBe(emptySearch);
		expect(screen.getByRole("button", { name: "Select Angel" })).toBeTruthy();
		expect(
			screen.getByRole("button", { name: "Select Benjamin" }),
		).toBeTruthy();
		expect(screen.getByRole("button", { name: "Select Mina" })).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Fire icon" }));
		expect(
			screen.queryByRole("button", { name: "Select Benjamin" }),
		).toBeNull();
		expect(
			useCharacterFilter.getState().characterFilters.selectedElements,
		).toEqual([ELEMENT_ID_BY_ELEMENT.LIGHTNING]);

		fireEvent.change(screen.getByPlaceholderText("Search characters"), {
			target: { value: "Mina" },
		});
		expect(screen.queryByRole("button", { name: "Select Angel" })).toBeNull();
		fireEvent.click(screen.getByRole("button", { name: "Select Mina" }));

		expect(screen.getByRole("tab", { name: "Mina" })).toBeTruthy();
		expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe(
			"Mina",
		);
		expect((create as HTMLButtonElement).disabled).toBe(true);
	});

	it("clears picker search before Escape closes the dialog", async () => {
		const setOpen = vi.fn();
		render(<LoadoutsDialog open setOpen={setOpen} />);
		fireEvent.click(screen.getByRole("button", { name: "Select character" }));
		const search = screen.getByRole("textbox", {
			name: "Search characters",
		}) as HTMLInputElement;
		fireEvent.change(search, { target: { value: "Mina" } });

		fireEvent.keyDown(search, { key: "Escape" });
		expect(search.value).toBe("");
		expect(setOpen).not.toHaveBeenCalled();

		fireEvent.keyDown(search, { key: "Escape" });
		await waitFor(() => expect(setOpen).toHaveBeenCalledWith(false));
	});

	it("auto-names from the first character selected in any slot", () => {
		useAppStore.setState({
			loadouts: { mina: { ...teamLoadout, id: "mina", name: "Mina" } },
		});
		render(<LoadoutsDialog open setOpen={vi.fn()} />);

		fireEvent.click(screen.getByRole("tab", { name: "Character 2" }));
		fireEvent.click(screen.getByRole("button", { name: "Select character" }));
		fireEvent.click(screen.getByRole("button", { name: "Select Mina" }));

		expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe(
			"Mina #2",
		);
	});

	it("preserves a manually edited name after character selection", () => {
		render(<LoadoutsDialog open setOpen={vi.fn()} />);

		fireEvent.change(screen.getByLabelText("Name"), {
			target: { value: "Custom Team" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Select character" }));
		fireEvent.click(screen.getByRole("button", { name: "Select Angel" }));

		expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe(
			"Custom Team",
		);
	});

	it("prevents selecting the same character for two slots", () => {
		useAppStore.setState({
			loadouts: {
				team: {
					id: "team",
					name: "Team",
					characters: [
						{
							characterId: 1,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
						{
							characterId: 2,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
						{
							characterId: 3,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
					],
				},
			},
		});
		render(<LoadoutsDialog open setOpen={vi.fn()} loadoutToEdit="team" />);

		fireEvent.click(screen.getByRole("button", { name: "Angel" }));
		const search = screen.getByPlaceholderText(
			"Search characters",
		) as HTMLInputElement;

		expect(search.value).toBe("Angel");
		expect(document.activeElement).toBe(search);
		expect(search.selectionStart).toBe(0);
		expect(search.selectionEnd).toBe("Angel".length);
		fireEvent.change(search, { target: { value: "" } });
		expect(
			(
				screen.getByRole("button", {
					name: "Select Benjamin",
				}) as HTMLButtonElement
			).disabled,
		).toBe(true);
		expect(
			(
				screen.getByRole("button", {
					name: "Select Angel",
				}) as HTMLButtonElement
			).disabled,
		).toBe(false);
		fireEvent.click(screen.getByRole("button", { name: "Select Angel" }));
		expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe(
			"Team",
		);
	});

	it("prefills and selects an assigned monsterling name", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				regular: {
					monsterling_id: 1,
					tier_id: 5,
					traits: [],
				},
			},
			loadouts: {
				team: {
					id: "team",
					name: "Team",
					characters: [
						{
							characterId: 1,
							monsterlingIds: ["regular", null, null],
							artifactInstanceId: null,
						},
						{
							characterId: 2,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
						{
							characterId: 3,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
					],
				},
			},
		});
		render(<LoadoutsDialog open setOpen={vi.fn()} loadoutToEdit="team" />);
		const monsterlingName = MONSTERLINGS_DATA[1].name;

		fireEvent.click(screen.getByRole("button", { name: monsterlingName }));
		const search = screen.getByRole("textbox", {
			name: "Search monsterlings",
		}) as HTMLInputElement;

		expect(search.value).toBe(monsterlingName);
		expect(document.activeElement).toBe(search);
		expect(search.selectionStart).toBe(0);
		expect(search.selectionEnd).toBe(monsterlingName.length);
	});

	it("clears an assigned character that is no longer available", () => {
		useAppStore.setState({
			loadouts: {
				team: {
					id: "team",
					name: "Team",
					characters: [
						{
							characterId: 999,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
						{
							characterId: 2,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
						{
							characterId: 3,
							monsterlingIds: [null, null, null],
							artifactInstanceId: null,
						},
					],
				},
			},
		});
		render(<LoadoutsDialog open setOpen={vi.fn()} loadoutToEdit="team" />);

		fireEvent.click(screen.getByRole("button", { name: "Clear character 1" }));

		expect(
			screen.queryByRole("button", { name: "Clear character 1" }),
		).toBeNull();
	});

	it("swaps regular monsterlings within a character", () => {
		setMonsterlingSwapFixture();
		render(<LoadoutsDialog open setOpen={vi.fn()} loadoutToEdit="team" />);

		fireEvent.click(
			screen.getByRole("button", { name: MONSTERLINGS_DATA[1].name }),
		);
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search monsterlings" }),
			{ target: { value: "" } },
		);
		const sameCharacterOption = screen
			.getByText(MONSTERLINGS_DATA[2].name)
			.closest("button") as HTMLButtonElement;
		const otherCharacterOption = screen
			.getByText(MONSTERLINGS_DATA[3].name)
			.closest("button") as HTMLButtonElement;

		expect(sameCharacterOption.disabled).toBe(false);
		expect(otherCharacterOption.disabled).toBe(true);
		fireEvent.click(sameCharacterOption);
		fireEvent.click(screen.getByRole("button", { name: "Update" }));

		expect(
			useAppStore.getState().loadouts.team.characters[0].monsterlingIds,
		).toEqual(["second", "first", null]);
	});

	it("moves an equipped regular monsterling into an empty slot", () => {
		setMonsterlingSwapFixture();
		render(<LoadoutsDialog open setOpen={vi.fn()} loadoutToEdit="team" />);

		fireEvent.click(screen.getByRole("button", { name: "Monsterling 3" }));
		const option = screen
			.getByText(MONSTERLINGS_DATA[1].name)
			.closest("button") as HTMLButtonElement;

		expect(option.disabled).toBe(false);
		fireEvent.click(option);
		fireEvent.click(screen.getByRole("button", { name: "Update" }));

		expect(
			useAppStore.getState().loadouts.team.characters[0].monsterlingIds,
		).toEqual([null, "second", "first"]);
	});

	it("filters monsterlings by multiple tiers without changing page filters", () => {
		const [first, second, third] = Object.values(MONSTERLINGS_DATA);
		useAppStore.setState({
			monsterlingsOwned: {
				first: {
					monsterling_id: first.id,
					tier_id: 1,
					traits: [],
				},
				second: {
					monsterling_id: second.id,
					tier_id: 4,
					traits: [],
				},
				third: {
					monsterling_id: third.id,
					tier_id: 5,
					traits: [],
				},
			},
		});
		useMonsterlingFilter.setState({
			filters: { search: "page search", selectedTiers: [1] },
		});
		render(<LoadoutsDialog open setOpen={vi.fn()} />);

		fireEvent.click(screen.getByRole("button", { name: "Monsterling 1" }));
		const search = screen.getByRole("textbox", {
			name: "Search monsterlings",
		});
		expect(document.activeElement).toBe(search);
		expect(screen.getByText(first.name)).toBeTruthy();
		expect(screen.getByText(second.name)).toBeTruthy();
		expect(screen.getByText(third.name)).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Tier 4" }));
		expect(screen.queryByText(first.name)).toBeNull();
		expect(screen.getByText(second.name)).toBeTruthy();
		expect(screen.queryByText(third.name)).toBeNull();

		fireEvent.click(screen.getByRole("button", { name: "Tier 5" }));
		expect(screen.getByText(second.name)).toBeTruthy();
		expect(screen.getByText(third.name)).toBeTruthy();

		fireEvent.click(
			screen.getByRole("button", { name: "Clear monsterling filters" }),
		);
		expect(screen.getByText(first.name)).toBeTruthy();
		expect(useMonsterlingFilter.getState().filters).toEqual({
			search: "page search",
			selectedTiers: [1],
		});
	});

	it("assigns independent artifact copies and disables a copy used by another slot", () => {
		useAppStore.setState({
			loadouts: { team: teamLoadout },
			artifactsOwned: {
				"copy-a": { artifact_id: 1, fusion_level: 2 },
				"copy-b": { artifact_id: 1, fusion_level: 4 },
			},
		});
		render(<LoadoutsDialog open setOpen={vi.fn()} loadoutToEdit="team" />);

		const artifactSelector = screen.getByRole("button", {
			name: "Select artifact",
		});
		expect(artifactSelector.parentElement?.parentElement?.className).toContain(
			"col-span-4",
		);
		expect(
			artifactSelector.compareDocumentPosition(
				screen.getByRole("button", { name: "Monsterling 1" }),
			),
		).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
		fireEvent.click(artifactSelector);
		fireEvent.click(
			screen.getAllByRole("button", { name: "Select Fall from Grace" })[0],
		);
		expect(screen.getByAltText("Fall from Grace").className).toContain(
			"object-contain",
		);
		expect(screen.getByAltText("Fusion level 2")).toBeTruthy();
		expect(screen.getByText("Fall from Grace").className).toContain("truncate");
		fireEvent.mouseDown(screen.getAllByRole("tab")[1], {
			button: 0,
			ctrlKey: false,
		});
		fireEvent.click(screen.getByRole("button", { name: "Select artifact" }));

		const copies = screen.getAllByRole("button", {
			name: "Select Fall from Grace",
		});
		expect((copies[0] as HTMLButtonElement).disabled).toBe(true);
		expect((copies[1] as HTMLButtonElement).disabled).toBe(false);
		fireEvent.click(copies[1]);
		fireEvent.click(screen.getByRole("button", { name: "Update" }));

		expect(
			useAppStore
				.getState()
				.loadouts.team.characters.map(
					({ artifactInstanceId }) => artifactInstanceId,
				),
		).toEqual(["copy-a", "copy-b", null]);
		expect(event).toHaveBeenCalledWith("loadout_update", {
			character_count: 3,
			monsterling_count: 0,
			legendary_monsterling_count: 0,
			artifact_count: 2,
		});
	});
});
