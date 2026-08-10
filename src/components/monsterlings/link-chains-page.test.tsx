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
			linkChain: {
				unlock_level: 2,
				sort_order: 2,
				name: "Alpha Chain",
				tier_id: 3,
			},
		},
		68: {
			id: 68,
			name: "Beta Linker",
			image: "/beta.png",
			linkChain: { unlock_level: 1, name: "Beta Chain", tier_id: 2 },
		},
		69: {
			id: 69,
			name: "Zeta Linker",
			image: "/zeta.png",
			linkChain: {
				unlock_level: 2,
				sort_order: 1,
				name: "Zeta Chain",
				tier_id: 4,
			},
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
			monsterlingLinkChainPinnedIds: [],
		});
	});

	it("lists every capable species regardless of ownership", () => {
		useAppStore.setState({ monsterlingLinkChainLevels: { 68: 4, 69: 2 } });
		render(<LinkChainsPage />);
		expect(
			screen.getByRole("group", { name: "Link Chain levels" }),
		).toBeTruthy();
		expect(
			screen.getByRole("group", { name: "Clear Link Chain filters" }),
		).toBeTruthy();

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
		expect(screen.getByRole("heading", { name: "Level 1" })).toBeTruthy();
		expect(screen.getByRole("heading", { name: "Level 2" })).toBeTruthy();
		expect(
			screen
				.getAllByRole("heading", { level: 2 })
				.map((heading) => heading.textContent),
		).toEqual([
			"Pinned Link Chains",
			"No pinned Link Chains yet",
			"Level 1",
			"Level 2",
		]);
		const levelTwoSection = screen
			.getByRole("heading", { name: "Level 2" })
			.closest("section");
		expect(
			within(levelTwoSection as HTMLElement)
				.getAllByRole("button")
				.filter((button) =>
					button.getAttribute("aria-label")?.startsWith("Edit"),
				)
				.map((button) => button.getAttribute("aria-label")),
		).toEqual([
			"Edit Zeta Linker Link Chain Level",
			"Edit Alpha Linker Link Chain Level",
		]);
	});

	it("pins a filtered duplicate without removing the level card", () => {
		render(<LinkChainsPage />);
		expect(
			(
				screen.getByRole("button", {
					name: "Export Pinned Link Chain",
				}) as HTMLButtonElement
			).disabled,
		).toBe(true);
		fireEvent.click(
			screen.getByRole("button", { name: "Pin Beta Linker Link Chain" }),
		);
		expect(
			(
				screen.getByRole("button", {
					name: "Export Pinned Link Chain",
				}) as HTMLButtonElement
			).disabled,
		).toBe(false);
		expect(useAppStore.getState().monsterlingLinkChainPinnedIds).toEqual([68]);
		expect(screen.getAllByAltText("Beta Linker portrait")).toHaveLength(2);
		expect(event).toHaveBeenCalledWith("monsterling_link_chain_pin");
	});

	it("previews filtered pinned cards in sort order with levels and no controls", () => {
		useAppStore.setState({
			monsterlingLinkChainLevels: { 67: 5, 69: 2 },
			monsterlingLinkChainPinnedIds: [67, 69],
		});
		render(<LinkChainsPage />);
		fireEvent.click(
			screen.getByRole("button", { name: "Export Pinned Link Chain" }),
		);
		const dialog = screen.getByRole("dialog");
		expect(
			within(dialog).getAllByRole("heading", { name: "Pinned Link Chains" })[0],
		).toBeTruthy();
		expect(
			within(dialog).getByTestId("collection-export-surface").textContent,
		).toContain("Zeta LinkerAlpha Linker");
		expect(
			within(dialog).getByTestId("collection-export-surface").textContent,
		).not.toContain("Beta Linker");
		expect(within(dialog).getByAltText("Link Chain Level 2")).toBeTruthy();
		expect(within(dialog).getByAltText("Link Chain Level 5")).toBeTruthy();
		expect(
			within(dialog).queryByRole("button", { name: /Edit|Pin|Unpin/ }),
		).toBeNull();
	});

	it("searches names and filters with Link Chain level icons", () => {
		useAppStore.setState({ monsterlingLinkChainLevels: { 68: 4 } });
		render(<LinkChainsPage />);

		const levelFour = screen.getByRole("button", {
			name: "Link Chain Level 4",
		});
		expect(levelFour.querySelector("img")?.getAttribute("src")).toBe(
			"/images/MonsterLinkChain/link-4.webp",
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
		expect(screen.getByRole("heading", { name: "Level 2" })).toBeTruthy();
		expect(screen.queryByRole("heading", { name: "Level 1" })).toBeNull();
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
