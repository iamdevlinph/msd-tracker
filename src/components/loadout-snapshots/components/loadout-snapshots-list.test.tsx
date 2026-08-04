// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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
				newer: snapshot("newer", "Beta clear", "rift", 2_000),
			},
		});
	});

	afterEach(cleanup);

	it("shows frozen snapshot metadata and filters by snapshot name", () => {
		render(<LoadoutSnapshotsList />);
		expect(
			screen.getByText(`Created ${new Date(2_000).toLocaleString()}`),
		).toBeTruthy();
		expect(screen.getByText("Rift")).toBeTruthy();
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search loadout snapshots" }),
			{
				target: { value: "alpha" },
			},
		);
		expect(screen.getByText("Alpha clear")).toBeTruthy();
		expect(screen.queryByText("Beta clear")).toBeNull();
	});

	it("shows frozen character tiers without enabling character editing", () => {
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
			screen.getByAltText(`${CHARACTERS_DATA[1].tier_id} background`),
		).toBeTruthy();
		expect(
			screen.queryByRole("button", {
				name: `Edit ${CHARACTERS_DATA[1].name} character`,
			}),
		).toBeNull();
	});

	it("previews and deletes a snapshot with snapshot-only actions", () => {
		render(<LoadoutSnapshotsList />);
		fireEvent.click(screen.getByRole("button", { name: "Preview Beta clear" }));
		expect(screen.getByText("Loadout Snapshot")).toBeTruthy();
		expect(
			screen.queryByRole("button", { name: "Edit Beta clear" }),
		).toBeNull();
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
