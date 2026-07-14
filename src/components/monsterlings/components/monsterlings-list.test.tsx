// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MonsterlingsList } from "@/components/monsterlings/components/monsterlings-list";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { useAppStore } from "@/stores/app-store";

describe("MonsterlingsList", () => {
	afterEach(cleanup);

	it("shows a consistent empty state", () => {
		useAppStore.setState({ monsterlingsOwned: {} });
		render(<MonsterlingsList />);

		expect(screen.getByText("No monsterlings yet")).toBeTruthy();
		expect(
			screen.getByText("Add a monsterling to start building your collection."),
		).toBeTruthy();
	});

	it("renders owned monsterlings instead of the empty state", () => {
		useAppStore.setState({
			monsterlingsOwned: {
				owned: { monsterling_id: 1, tier_id: 5, traits: [] },
			},
		});
		render(<MonsterlingsList />);

		expect(screen.getByText(MONSTERLINGS_DATA[1].name)).toBeTruthy();
		expect(screen.queryByText("No monsterlings yet")).toBeNull();
	});
});
