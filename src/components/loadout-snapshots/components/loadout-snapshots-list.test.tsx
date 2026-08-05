// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
		event.mockClear();
		useAppStore.setState({
			loadoutSnapshots: {
				older: snapshot("older", "Alpha clear", "conquest", 1_000),
				newer: {
					...snapshot("newer", "Beta clear", "rift", 2_000),
					details: { level: 50, score: 12_345_678 },
					notes: "Bring fire resistance",
				},
			},
		});
	});

	afterEach(cleanup);

	it("shows frozen snapshot metadata and filters by snapshot name", () => {
		render(<LoadoutSnapshotsList />);
		expect(
			screen.getByText(`Created ${new Date(2_000).toLocaleString()}`),
		).toBeTruthy();
		const tag = screen.getByText("Rift");
		expect(tag.parentElement?.textContent).toContain(
			"Level 50 · Score 12,345,678",
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
