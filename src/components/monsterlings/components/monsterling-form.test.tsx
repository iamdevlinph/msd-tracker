// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
	within,
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
			linkChain: { name: "Fixture Link Chain" },
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

	it("hides link-chain controls for ineligible monsterlings", () => {
		render(<MonsterlingForm onClose={vi.fn()} />);

		expect(screen.queryByText("Link Chain Level")).toBeNull();
		expect(screen.queryByAltText("Link Chain Level 1")).toBeNull();
	});

	it("selects a link-chain level for eligible monsterlings", async () => {
		useAppStore.setState({
			monsterlingsOwned: {
				current: {
					monsterling_id: 67,
					tier_id: 5,
					traits: [],
				},
			},
		});
		render(<MonsterlingForm id="current" onClose={vi.fn()} />);

		const tierLabel = screen.getByText("Tier");
		const linkChainLabel = screen.getByText("Link Chain Level");
		expect(tierLabel.closest('[data-slot="field-group"]')).not.toBe(
			linkChainLabel.closest('[data-slot="field-group"]'),
		);
		expect(screen.getByAltText("Link Chain Level 1")).toBeTruthy();

		fireEvent.click(
			within(screen.getByRole("group", { name: "Link Chain Level" })).getByRole(
				"button",
				{ name: "4" },
			),
		);

		const badge = screen.getByAltText("Link Chain Level 4") as HTMLImageElement;
		expect(badge.getAttribute("src")).toBe(
			"/images/MonsterLinkChain/link-4.png",
		);
		expect(badge.className).toContain("left-0.5");
		expect(badge.className).not.toContain("right-0.5");

		fireEvent.click(screen.getByRole("button", { name: "Add" }));
		await waitFor(() =>
			expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
				67: 4,
			}),
		);
		expect(useAppStore.getState().monsterlingsOwned.current).not.toHaveProperty(
			"link_chain_level",
		);
	});

	it("updates link-chain controls when changing monsterlings", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				current: {
					monsterling_id: 67,
					tier_id: 5,
					traits: [],
				},
			},
			monsterlingLinkChainLevels: { 67: 3 },
		});
		render(<MonsterlingForm id="current" onClose={vi.fn()} />);

		expect(screen.getByText("Link Chain Level")).toBeTruthy();

		const monsterlingInput = screen.getByRole("combobox");
		const monsterlingTrigger = monsterlingInput
			.closest('[data-slot="input-group"]')
			?.querySelector("button") as HTMLElement;
		fireEvent.click(monsterlingTrigger);
		fireEvent.click(screen.getByText("Fixture Ineligible"));
		expect(screen.queryByText("Link Chain Level")).toBeNull();
		expect(screen.queryByAltText("Link Chain Level 3")).toBeNull();

		fireEvent.click(monsterlingTrigger);
		fireEvent.click(screen.getByText("Fixture Linker"));
		expect(screen.getByText("Link Chain Level")).toBeTruthy();
		expect(screen.getByAltText("Link Chain Level 3")).toBeTruthy();
	});

	it("saves an edited species at a lower shared link-chain level", async () => {
		useAppStore.setState({
			monsterlingsOwned: {
				current: {
					monsterling_id: 67,
					tier_id: 5,
					traits: [],
				},
			},
			monsterlingLinkChainLevels: { 67: 5 },
		});
		render(<MonsterlingForm id="current" onClose={vi.fn()} />);

		fireEvent.click(
			within(screen.getByRole("group", { name: "Link Chain Level" })).getByRole(
				"button",
				{ name: "3" },
			),
		);
		fireEvent.click(screen.getByRole("button", { name: "Add" }));

		await waitFor(() =>
			expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
				67: 3,
			}),
		);
	});

	it("restores a retained level when re-adding a deleted species", () => {
		useAppStore.setState({
			monsterlingsOwned: {},
			monsterlingLinkChainLevels: { 67: 4 },
		});
		render(<MonsterlingForm onClose={vi.fn()} />);

		const monsterlingInput = screen
			.getAllByDisplayValue("Fixture Ineligible")
			.find((input) => input.getAttribute("aria-hidden") !== "true");
		const monsterlingTrigger = monsterlingInput
			?.closest('[data-slot="input-group"]')
			?.querySelector("button") as HTMLElement;
		fireEvent.click(monsterlingTrigger);
		fireEvent.click(screen.getByText("Fixture Linker"));

		expect(screen.getByAltText("Link Chain Level 4")).toBeTruthy();
	});

	it("uses level one when editing an invalid shared value", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				legacy: {
					monsterling_id: 67,
					tier_id: 5,
					traits: [],
				},
			},
			monsterlingLinkChainLevels: { 67: 8 } as never,
		});

		render(<MonsterlingForm id="legacy" onClose={vi.fn()} />);

		expect(screen.getByAltText("Link Chain Level 1")).toBeTruthy();
	});
});
