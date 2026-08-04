// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
