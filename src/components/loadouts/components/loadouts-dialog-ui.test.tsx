// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { showFutureLoadoutSlots } from "@/components/loadouts/components/loadout-utils";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import { LoadoutsList } from "@/components/loadouts/components/loadouts-list";
import { ELEMENT_ID_BY_ELEMENT } from "@/data/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { useAppStore } from "@/stores/app-store";

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

describe("LoadoutsDialog character picker", () => {
	afterEach(cleanup);

	beforeEach(() => {
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
		expect((create as HTMLButtonElement).disabled).toBe(true);
	});

	it("prevents selecting the same character for two slots", () => {
		useAppStore.setState({
			loadouts: {
				team: {
					id: "team",
					name: "Team",
					characters: [
						{ characterId: 1, monsterlingIds: [null, null, null] },
						{ characterId: 2, monsterlingIds: [null, null, null] },
						{ characterId: 3, monsterlingIds: [null, null, null] },
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
	});

	it("prefills and selects an assigned monsterling name", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				regular: { monsterling_id: 1, tier_id: 5, traits: [] },
			},
			loadouts: {
				team: {
					id: "team",
					name: "Team",
					characters: [
						{
							characterId: 1,
							monsterlingIds: ["regular", null, null],
						},
						{ characterId: 2, monsterlingIds: [null, null, null] },
						{ characterId: 3, monsterlingIds: [null, null, null] },
					],
				},
			},
		});
		render(<LoadoutsDialog open setOpen={vi.fn()} loadoutToEdit="team" />);
		const monsterlingName = MONSTERLINGS_DATA[1].name;

		fireEvent.click(screen.getByRole("button", { name: monsterlingName }));
		const search = screen.getByPlaceholderText(
			"Search name",
		) as HTMLInputElement;

		expect(search.value).toBe(monsterlingName);
		expect(document.activeElement).toBe(search);
		expect(search.selectionStart).toBe(0);
		expect(search.selectionEnd).toBe(monsterlingName.length);
	});
});

describe("LoadoutsList", () => {
	afterEach(cleanup);

	it("renders the shared centered empty-state treatment", () => {
		useAppStore.setState({ loadouts: {} });

		render(<LoadoutsList />);

		expect(
			screen.getByRole("heading", { name: "No loadouts yet" }),
		).toBeTruthy();
		expect(
			screen.getByText(
				"Create a loadout to organize your team and monsterlings.",
			),
		).toBeTruthy();
	});

	it("uses the environment gate for future slots", () => {
		useAppStore.setState({
			charactersOwned,
			monsterlingsOwned: {},
			loadouts: {
				team: {
					id: "team",
					name: "Team",
					characters: [
						{ characterId: 1, monsterlingIds: [null, null, null] },
						{ characterId: 2, monsterlingIds: [null, null, null] },
						{ characterId: 3, monsterlingIds: [null, null, null] },
					],
				},
			},
		});

		render(<LoadoutsList />);

		const futureSlotCount = showFutureLoadoutSlots(
			import.meta.env.VITE_NODE_ENV,
		)
			? 3
			: 0;
		expect(screen.queryAllByText("Artifact")).toHaveLength(futureSlotCount);
		expect(screen.queryAllByText("Equipment 1")).toHaveLength(futureSlotCount);
		expect(screen.getAllByText("Monsterling 1")).toHaveLength(3);

		fireEvent.click(
			screen.getByRole("button", { name: "Preview Team loadout card" }),
		);
		expect(screen.getByRole("dialog", { name: "Team" })).toBeTruthy();
	});
});
