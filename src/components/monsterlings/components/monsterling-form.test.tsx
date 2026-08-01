// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MonsterlingForm } from "@/components/monsterlings/components/monsterling-form";
import { useAppStore } from "@/stores/app-store";

const { monsterlingsData, monsterlingOptions } = vi.hoisted(() => ({
	monsterlingsData: {
		1: {
			id: 1,
			name: "Fixture Ineligible",
			image: "/fixture-ineligible.png",
		},
		67: {
			id: 67,
			name: "Fixture Linker",
			image: "/fixture-linker.png",
			linkChain: { unlock_level: 1, name: "Fixture Link Chain" },
		},
	},
	monsterlingOptions: [
		{ label: "Fixture Ineligible", value: "1" },
		{ label: "Fixture Linker", value: "67" },
	],
}));

vi.mock("@/data/monsterlings/MONSTERLINGS_DATA", () => ({
	MONSTERLINGS_DATA: monsterlingsData,
}));
vi.mock("@/components/monsterlings/store/monsterlings-options-store", () => ({
	useMonsterOptionStore: (
		selector: (state: {
			getMonsterlingOptions: () => typeof monsterlingOptions;
		}) => unknown,
	) => selector({ getMonsterlingOptions: () => monsterlingOptions }),
}));
vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event: vi.fn() }),
}));

describe("MonsterlingForm", () => {
	afterEach(() => {
		cleanup();
		useAppStore.setState({
			monsterlingsOwned: {},
			monsterlingLinkChainLevels: {},
		});
	});

	it("shows the live shared Link Chain badge only for eligible species", async () => {
		useAppStore.setState({
			monsterlingsOwned: {
				current: { monsterling_id: 67, tier_id: 5, traits: [] },
			},
			monsterlingLinkChainLevels: { 67: 4 },
		});

		render(<MonsterlingForm id="current" onClose={vi.fn()} />);

		expect(screen.queryByText("Link Chain Level")).toBeNull();
		expect(screen.getByAltText("Link Chain Level 4")).toBeTruthy();
		useAppStore.setState({ monsterlingLinkChainLevels: {} });
		await waitFor(() =>
			expect(screen.getByAltText("Link Chain Level 1")).toBeTruthy(),
		);
		useAppStore.setState({ monsterlingLinkChainLevels: { 67: 5 } });
		await waitFor(() =>
			expect(screen.getByAltText("Link Chain Level 5")).toBeTruthy(),
		);

		useAppStore.setState({
			monsterlingsOwned: {
				current: { monsterling_id: 1, tier_id: 5, traits: [] },
			},
		});
		cleanup();
		render(<MonsterlingForm id="current" onClose={vi.fn()} />);
		expect(screen.queryByAltText(/Link Chain Level/)).toBeNull();
	});

	it("does not change a shared Link Chain level when editing an owned copy", async () => {
		useAppStore.setState({
			monsterlingsOwned: {
				current: { monsterling_id: 67, tier_id: 5, traits: [] },
			},
			monsterlingLinkChainLevels: { 67: 4 },
		});

		render(<MonsterlingForm id="current" onClose={vi.fn()} />);
		fireEvent.click(screen.getByRole("button", { name: "Add" }));

		await waitFor(() =>
			expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
				67: 4,
			}),
		);
	});
});
