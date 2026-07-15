// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MonsterlingsList } from "@/components/monsterlings/components/monsterlings-list";
import { MonsterlingsPage } from "@/components/monsterlings/monsterlings-page";
import {
	emptyMonsterlingFilters,
	useMonsterlingFilter,
} from "@/components/monsterlings/store/monsterlings-filter-store";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { useAppStore } from "@/stores/app-store";

const [first, second, third] = Object.values(MONSTERLINGS_DATA);

describe("MonsterlingsList", () => {
	afterEach(cleanup);
	beforeEach(() => {
		useAppStore.setState({ monsterlingsOwned: {} });
		useMonsterlingFilter.setState({ filters: emptyMonsterlingFilters() });
	});

	it("shows a consistent empty state", () => {
		useAppStore.setState({ monsterlingsOwned: {} });
		render(<MonsterlingsList filters={emptyMonsterlingFilters()} />);

		expect(screen.getByText("No monsterlings yet")).toBeTruthy();
		expect(
			screen.getByText("Add a monsterling to start building your collection."),
		).toBeTruthy();
	});

	it("renders owned monsterlings instead of the empty state", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				owned: { monsterling_id: first.id, tier_id: 5, traits: [] },
			},
		});
		render(<MonsterlingsList filters={emptyMonsterlingFilters()} />);

		expect(screen.getByText(first.name)).toBeTruthy();
		expect(screen.queryByText("No monsterlings yet")).toBeNull();
	});

	it("toggles multiple tiers and clears the filters", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				first: { monsterling_id: first.id, tier_id: 1, traits: [] },
				second: { monsterling_id: second.id, tier_id: 4, traits: [] },
				third: { monsterling_id: third.id, tier_id: 5, traits: [] },
			},
		});
		render(<MonsterlingsPage />);
		for (const { id, hex } of Object.values(TIERS_DATA)) {
			const star = screen
				.getByRole("button", { name: `Tier ${id}` })
				.querySelector("svg");
			const expectedColor = document.createElement("span").style;
			expectedColor.color = hex;
			expect(star?.getAttribute("fill")).toBe("currentColor");
			expect(star?.style.color).toBe(expectedColor.color);
			expect(star?.getAttribute("aria-hidden")).toBe("true");
		}

		fireEvent.click(screen.getByRole("button", { name: "Tier 4" }));
		expect(screen.queryByText(first.name)).toBeNull();
		expect(screen.getByText(second.name)).toBeTruthy();
		expect(screen.queryByText(third.name)).toBeNull();

		fireEvent.click(screen.getByRole("button", { name: "Tier 5" }));
		expect(screen.getByText(second.name)).toBeTruthy();
		expect(screen.getByText(third.name)).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Tier 4" }));
		expect(screen.queryByText(second.name)).toBeNull();
		expect(screen.getByText(third.name)).toBeTruthy();

		fireEvent.click(
			screen.getByRole("button", { name: "Clear monsterling filters" }),
		);
		expect(screen.getByText(first.name)).toBeTruthy();
		expect(screen.getByText(second.name)).toBeTruthy();
		expect(screen.getByText(third.name)).toBeTruthy();
		expect(
			screen
				.getByRole("button", { name: "Tier 5" })
				.getAttribute("aria-pressed"),
		).toBe("false");
	});

	it("combines case-insensitive search with tiers and shows filtered empty copy", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				first: { monsterling_id: first.id, tier_id: 1, traits: [] },
				second: { monsterling_id: second.id, tier_id: 4, traits: [] },
			},
		});
		render(<MonsterlingsPage />);

		const search = screen.getByRole("textbox", { name: "Search monsterlings" });
		fireEvent.change(search, {
			target: { value: second.name.toUpperCase() },
		});
		expect(screen.queryByText(first.name)).toBeNull();
		expect(screen.getByText(second.name)).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Tier 1" }));
		expect(
			screen.getByText("No monsterlings match these filters"),
		).toBeTruthy();
		expect(
			screen.getByText(
				"Adjust or clear the filters to see your owned monsterlings.",
			),
		).toBeTruthy();
		expect(screen.queryByText("No monsterlings yet")).toBeNull();

		fireEvent.click(
			screen.getByRole("button", { name: "Clear monsterling filters" }),
		);
		expect((search as HTMLInputElement).value).toBe("");
		expect(screen.getByText(first.name)).toBeTruthy();
		expect(screen.getByText(second.name)).toBeTruthy();
	});
});
