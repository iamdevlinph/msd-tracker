// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MonsterlingForm } from "@/components/monsterlings/components/monsterling-form";
import { useAppStore } from "@/stores/app-store";

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event: vi.fn() }),
}));

describe("MonsterlingForm", () => {
	afterEach(() => {
		cleanup();
		useAppStore.setState({ monsterlingsOwned: {} });
	});

	it("selects a link-chain level in its own field group", () => {
		render(<MonsterlingForm onClose={vi.fn()} />);

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
	});

	it("uses level one when editing an invalid legacy value", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				legacy: {
					monsterling_id: 1,
					tier_id: 5,
					link_chain_level: 8,
					traits: [],
				} as never,
			},
		});

		render(<MonsterlingForm id="legacy" onClose={vi.fn()} />);

		expect(screen.getByAltText("Link Chain Level 1")).toBeTruthy();
	});
});
