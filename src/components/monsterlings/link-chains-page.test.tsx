// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LinkChainsPage } from "@/components/monsterlings/link-chains-page";
import {
	emptyLinkChainsFilters,
	useLinkChainsFilter,
} from "@/components/monsterlings/store/link-chains-filter-store";
import { useAppStore } from "@/stores/app-store";

const { event, monsterlingsData } = vi.hoisted(() => ({
	event: vi.fn(),
	monsterlingsData: {
		1: {
			id: 1,
			name: "No Chain",
			image: "/no-chain.png",
		},
		67: {
			id: 67,
			name: "Alpha Linker",
			image: "/alpha.png",
			linkChain: { name: "Alpha Chain", tier_id: 3 },
		},
		68: {
			id: 68,
			name: "Beta Linker",
			image: "/beta.png",
			linkChain: { name: "Beta Chain", tier_id: 2 },
		},
	},
}));

vi.mock("@/data/monsterlings/MONSTERLINGS_DATA", () => ({
	MONSTERLINGS_DATA: monsterlingsData,
}));
vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

describe("LinkChainsPage", () => {
	afterEach(() => {
		cleanup();
		event.mockReset();
		useLinkChainsFilter.setState({ filters: emptyLinkChainsFilters() });
		useAppStore.setState({
			monsterlingsOwned: {},
			monsterlingLinkChainLevels: {},
		});
	});

	it("lists every capable species regardless of ownership", () => {
		useAppStore.setState({ monsterlingLinkChainLevels: { 68: 4 } });
		render(<LinkChainsPage />);

		expect(screen.getByAltText("Alpha Linker portrait")).toBeTruthy();
		expect(screen.getByAltText("Beta Linker portrait")).toBeTruthy();
		expect(screen.getByText("Alpha Linker")).toBeTruthy();
		expect(screen.getByText("Beta Linker")).toBeTruthy();
		expect(screen.queryByAltText("No Chain portrait")).toBeNull();
		expect(screen.getByAltText("Link Chain Level 1")).toBeTruthy();
		expect(screen.getByAltText("Link Chain Level 4")).toBeTruthy();
		expect(
			(screen.getByAltText("2 background") as HTMLImageElement).style
				.background,
		).not.toBe("");
		expect(screen.getByAltText("3 background")).toBeTruthy();
	});

	it("searches names and filters with Link Chain level icons", () => {
		useAppStore.setState({ monsterlingLinkChainLevels: { 68: 4 } });
		render(<LinkChainsPage />);

		const levelFour = screen.getByRole("button", {
			name: "Link Chain Level 4",
		});
		expect(levelFour.querySelector("img")?.getAttribute("src")).toBe(
			"/images/MonsterLinkChain/link-4.png",
		);
		fireEvent.click(levelFour);
		expect(screen.queryByAltText("Alpha Linker portrait")).toBeNull();
		expect(screen.getByAltText("Beta Linker portrait")).toBeTruthy();

		fireEvent.click(
			screen.getByRole("button", { name: "Clear Link Chain filters" }),
		);
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search Monsterling names" }),
			{ target: { value: "alpha" } },
		);
		expect(screen.getByAltText("Alpha Linker portrait")).toBeTruthy();
		expect(screen.queryByAltText("Beta Linker portrait")).toBeNull();
	});

	it("edits exact levels with the previous selector UI", () => {
		useAppStore.setState({ monsterlingLinkChainLevels: { 67: 5 } });
		render(<LinkChainsPage />);

		fireEvent.click(
			screen.getByRole("button", {
				name: "Edit Alpha Linker Link Chain Level",
			}),
		);
		const dialog = screen.getByRole("dialog", {
			name: "Alpha Linker Link Chain",
		});
		const selector = within(dialog).getByRole("group", {
			name: "Link Chain Level",
		});
		fireEvent.click(within(selector).getByRole("button", { name: "3" }));
		fireEvent.click(within(dialog).getByRole("button", { name: "Save" }));

		expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
			67: 3,
		});
		expect(event).toHaveBeenCalledWith("monsterling_link_chain_update", {
			monsterling_id: 67,
			monsterling_name: "Alpha Linker",
			level: 3,
		});
	});
});
