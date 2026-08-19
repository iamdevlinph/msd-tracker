// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS } from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutSnapshot } from "@/stores/loadout-snapshots-slice";
import { emptyLoadoutCharacterSlot } from "@/stores/loadouts-slice";
import { LoadoutSnapshotsList } from "./loadout-snapshots-list";

const { event } = vi.hoisted(() => ({ event: vi.fn() }));
vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

const snapshot = (
	id: string,
	name: string,
	tag: LoadoutSnapshot["tag"],
	created_at: number,
): LoadoutSnapshot => ({
	id,
	name,
	tag,
	created_at,
	loadout: {
		id: "source",
		name: "Source",
		characters: [
			emptyLoadoutCharacterSlot(),
			emptyLoadoutCharacterSlot(),
			emptyLoadoutCharacterSlot(),
		],
	},
	characters_owned: {},
	monsterlings_owned: {},
	monsterling_link_chain_levels: {},
	artifacts_owned: {},
});

describe("LoadoutSnapshotsList", () => {
	beforeEach(() => {
		Element.prototype.scrollIntoView = vi.fn();
		event.mockClear();
		useAppStore.setState({
			loadoutSnapshots: {
				older: {
					...snapshot("older", "Alpha clear", "conquest", 1_000),
					details: {
						boss_id: 38,
						difficulty: "normal",
						level: 1,
						clear_time: "00:12.34",
					},
				},
				newer: {
					...snapshot("newer", "Beta clear", "rift", 2_000),
					details: { level: 50, clear_time: "01:02.03", score: 12_345_678 },
					notes: "Bring fire resistance",
				},
			},
		});
	});

	it("shows the Conquest boss icon after the tag in rows and previews", () => {
		render(<LoadoutSnapshotsList />);
		const tag = screen.getByText("Conquest", { selector: "span" });
		expect(tag.nextElementSibling?.textContent).toBe("Custos");
		expect(
			tag.nextElementSibling?.querySelector("img")?.getAttribute("alt"),
		).toBe("Custos icon");
		expect(tag.parentElement?.textContent).toContain("Difficulty Normal");

		fireEvent.click(
			screen.getByRole("button", { name: "Preview Alpha clear snapshot row" }),
		);
		const preview = within(screen.getByRole("dialog", { name: "Alpha clear" }));
		expect(preview.getByText("Custos")).toBeTruthy();
		expect(preview.getByAltText("Custos icon")).toBeTruthy();
	});

	afterEach(cleanup);

	it("shows frozen snapshot metadata and filters by snapshot name", () => {
		render(<LoadoutSnapshotsList />);
		expect(
			screen.getByText(`Created ${new Date(2_000).toLocaleString()}`),
		).toBeTruthy();
		const tag = screen.getByText("Rift", { selector: "span" });
		expect(tag.parentElement?.textContent).toContain(
			"Level 50 · Clear time 01:02.03 · Score 12,345,678",
		);
		expect(tag.parentElement?.nextElementSibling?.textContent).toBe(
			`Created ${new Date(2_000).toLocaleString()}`,
		);
		expect(screen.getByText(/Note:/).closest("p")?.textContent).toBe(
			"Note: Bring fire resistance",
		);
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search loadout snapshots" }),
			{
				target: { value: "alpha" },
			},
		);
		expect(screen.getByText("Alpha clear")).toBeTruthy();
		expect(screen.queryByText("Beta clear")).toBeNull();
	});

	it("uses exclusive ordered tag buttons and resets every toolbar control", () => {
		useAppStore.setState({
			loadoutSnapshots: {
				conquest: snapshot("conquest", "Conquest clear", "conquest", 1),
				rift: snapshot("rift", "Rift clear", "rift", 2),
				legendary: snapshot(
					"legendary",
					"Legendary clear",
					"legendary_conquest",
					3,
				),
				others: snapshot("others", "Other clear", "others", 4),
			},
		});
		render(<LoadoutSnapshotsList />);

		const tagGroup = screen.getByRole("group", {
			name: "Filter loadout snapshots by tag",
		});
		const tagButtons = within(tagGroup).getAllByRole("button");
		expect(tagGroup.className).toContain("max-w-full");
		expect(tagGroup.className).toContain("flex-wrap");
		expect(tagButtons.map((button) => button.textContent)).toEqual([
			"All tags",
			"Conquest",
			"Rift",
			"Legendary Conquest",
			"Others",
		]);
		expect(screen.getAllByRole("combobox")).toHaveLength(1);

		for (const [label, visibleName] of [
			["Conquest", "Conquest clear"],
			["Rift", "Rift clear"],
			["Legendary Conquest", "Legendary clear"],
			["Others", "Other clear"],
		] as const) {
			fireEvent.click(within(tagGroup).getByRole("button", { name: label }));
			expect(screen.getByText(visibleName)).toBeTruthy();
			expect(
				tagButtons.filter(
					(button) => button.getAttribute("aria-pressed") === "true",
				),
			).toEqual([within(tagGroup).getByRole("button", { name: label })]);
		}

		fireEvent.change(
			screen.getByRole("textbox", { name: "Search loadout snapshots" }),
			{ target: { value: "Other" } },
		);
		const sort = screen.getByRole("combobox", {
			name: "Sort loadout snapshots",
		});
		fireEvent.keyDown(sort, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: "Created: Oldest" }));
		fireEvent.click(
			screen.getByRole("button", { name: "Clear loadout snapshot filters" }),
		);

		expect(
			(
				screen.getByRole("textbox", {
					name: "Search loadout snapshots",
				}) as HTMLInputElement
			).value,
		).toBe("");
		expect(
			within(tagGroup)
				.getByRole("button", { name: "All tags" })
				.getAttribute("aria-pressed"),
		).toBe("true");
		expect(sort.textContent).toContain("Created: Newest");
		expect(
			screen.getByRole("group", { name: "Sort loadout snapshots" }),
		).toBeTruthy();
		expect(
			screen.getByRole("group", { name: "Clear loadout snapshot filters" }),
		).toBeTruthy();
	});

	it("uses the tag-specific badge colors in rows and previews", () => {
		useAppStore.setState({
			loadoutSnapshots: {
				conquest: snapshot("conquest", "Conquest", "conquest", 1),
				rift: snapshot("rift", "Rift", "rift", 2),
				legendary: snapshot("legendary", "Legendary", "legendary_conquest", 3),
				others: snapshot("others", "Others", "others", 4),
			},
		});
		render(<LoadoutSnapshotsList />);
		expect(
			screen
				.getAllByText("Conquest")
				.find((element) => element.tagName === "SPAN")?.className,
		).toContain("bg-rose-100");
		expect(
			screen.getAllByText("Rift").find((element) => element.tagName === "SPAN")
				?.className,
		).toContain("bg-violet-100");
		expect(
			screen
				.getAllByText("Legendary Conquest")
				.find((element) => element.tagName === "SPAN")?.className,
		).toContain("bg-amber-100");
		expect(
			screen
				.getAllByText("Others")
				.find((element) => element.tagName === "SPAN")?.className,
		).toContain("bg-slate-100");
	});

	it("shows conditional metadata filters with multi-select OR behavior", () => {
		useAppStore.setState({
			loadoutSnapshots: {
				fire: {
					...snapshot("fire", "Fire run", "legendary_conquest", 1),
					details: { element_id: 2, score: 1 },
				},
				earth: {
					...snapshot("earth", "Earth run", "legendary_conquest", 2),
					details: { element_id: 1, score: 1 },
				},
				missing: snapshot(
					"missing",
					"Missing element",
					"legendary_conquest",
					3,
				),
			},
		});
		render(<LoadoutSnapshotsList />);

		const tagGroup = screen.getByRole("group", {
			name: "Filter loadout snapshots by tag",
		});
		fireEvent.click(
			within(tagGroup).getByRole("button", { name: "Legendary Conquest" }),
		);
		const elementGroup = screen.getByRole("group", {
			name: "Filter loadout snapshots by element",
		});
		expect(within(elementGroup).getAllByRole("button")).toHaveLength(5);
		fireEvent.click(within(elementGroup).getByRole("button", { name: "Fire" }));
		fireEvent.click(
			within(elementGroup).getByRole("button", { name: "Earth" }),
		);
		expect(screen.getByText("Fire run")).toBeTruthy();
		expect(screen.getByText("Earth run")).toBeTruthy();
		expect(screen.queryByText("Missing element")).toBeNull();

		fireEvent.click(within(tagGroup).getByRole("button", { name: "Conquest" }));
		expect(
			screen.queryByRole("group", {
				name: "Filter loadout snapshots by element",
			}),
		).toBeNull();
		const bossGroup = screen.getByRole("group", {
			name: "Filter loadout snapshots by boss",
		});
		expect(within(bossGroup).getAllByRole("button")).toHaveLength(
			LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS.length,
		);
		fireEvent.click(
			within(tagGroup).getByRole("button", { name: "Legendary Conquest" }),
		);
		const resetElementGroup = screen.getByRole("group", {
			name: "Filter loadout snapshots by element",
		});
		expect(
			within(resetElementGroup)
				.getAllByRole("button")
				.every((button) => button.getAttribute("aria-pressed") === "false"),
		).toBe(true);
		expect(screen.getByText("Missing element")).toBeTruthy();

		fireEvent.click(
			within(resetElementGroup).getByRole("button", { name: "Fire" }),
		);
		fireEvent.click(
			screen.getByRole("button", { name: "Clear loadout snapshot filters" }),
		);
		expect(
			screen.queryByRole("group", {
				name: "Filter loadout snapshots by element",
			}),
		).toBeNull();
		fireEvent.click(
			within(tagGroup).getByRole("button", { name: "Legendary Conquest" }),
		);
		expect(
			within(
				screen.getByRole("group", {
					name: "Filter loadout snapshots by element",
				}),
			)
				.getAllByRole("button")
				.every((button) => button.getAttribute("aria-pressed") === "false"),
		).toBe(true);
		expect(screen.getByText("Missing element")).toBeTruthy();
	});

	it("keeps frozen build images out of compact snapshot rows", () => {
		const frozenSnapshot = snapshot("frozen", "Frozen team", "others", 3_000);
		frozenSnapshot.loadout.characters[0] = {
			...emptyLoadoutCharacterSlot(),
			characterId: 1,
		};
		frozenSnapshot.characters_owned = {
			1: {
				id: 1,
				awakening: 5,
				skills: { basic: 1, switch: 2, special: 3, ultimate: 4 },
			},
		};
		useAppStore.setState({ loadoutSnapshots: { frozen: frozenSnapshot } });

		render(<LoadoutSnapshotsList />);

		expect(
			screen.queryByAltText(`${CHARACTERS_DATA[1].tier_id} background`),
		).toBeNull();
		expect(screen.queryByRole("img")).toBeNull();
		expect(
			screen.queryByRole("button", {
				name: `Edit ${CHARACTERS_DATA[1].name} character`,
			}),
		).toBeNull();
	});

	it("opens preview from the row and exposes direct snapshot actions", () => {
		render(<LoadoutSnapshotsList />);
		for (const name of [
			"Preview Beta clear",
			"Edit Beta clear",
			"Copy Beta clear image",
			"Delete Beta clear",
		])
			expect(screen.getByRole("button", { name })).toBeTruthy();
		fireEvent.click(
			screen.getByRole("button", { name: "Preview Beta clear snapshot row" }),
		);
		expect(screen.getByText("Loadout Snapshot")).toBeTruthy();
		const previewDialog = within(
			screen.getByRole("dialog", { name: "Beta clear" }),
		);
		expect(
			previewDialog.getByRole("button", { name: "Edit Beta clear" }),
		).toBeTruthy();
		expect(
			previewDialog.getByRole("button", { name: "Copy Beta clear image" }),
		).toBeTruthy();
		expect(
			previewDialog.getByRole("button", { name: "Delete Beta clear" }),
		).toBeTruthy();
		expect(
			previewDialog.queryByRole("button", { name: "Preview Beta clear" }),
		).toBeNull();
		const previewSurface = within(screen.getByTestId("loadout-share-surface"));
		expect(previewSurface.queryByText(/Note:/)).toBeNull();
		const showNotes = screen.getByRole("checkbox", { name: "Show notes" });
		expect(showNotes.getAttribute("data-state")).toBe("unchecked");
		fireEvent.click(showNotes);
		expect(previewSurface.getByText(/Note:/).closest("p")?.textContent).toBe(
			"Note: Bring fire resistance",
		);
		fireEvent.click(
			previewDialog.getByRole("button", { name: "Edit Beta clear" }),
		);
		expect(
			screen.getByRole("heading", { name: "Edit loadout snapshot" }),
		).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
		fireEvent.click(
			screen.getAllByRole("button", { name: "Delete Beta clear" })[0],
		);
		expect(
			screen.getByRole("heading", { name: "Delete loadout snapshot?" }),
		).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: "Delete" }));
		expect(useAppStore.getState().loadoutSnapshots.newer).toBeUndefined();
	});
});
