// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HomePage } from "@/components/home/home-page";
import {
	initialCodexFilters,
	useCodexStore,
} from "@/components/monster-codex/store/codex-store";
import { useAppStore } from "@/stores/app-store";

vi.mock("@tanstack/react-router", () => ({
	Link: ({ to, onClick, ...props }: ComponentProps<"a"> & { to: string }) => (
		<a
			href={to}
			onClick={(event) => {
				event.preventDefault();
				onClick?.(event);
			}}
			{...props}
		/>
	),
}));

describe("HomePage", () => {
	afterEach(cleanup);

	beforeEach(() => {
		useAppStore.setState({
			charactersOwned: { 1: {} as never, 2: {} as never },
			monsterlingsOwned: { first: {} as never, second: {} as never },
			monsterCodexCompleted: [1, 2, 3],
			loadouts: { first: {} as never },
			artifactsOwned: { first: {} as never, second: {} as never },
			isHydrated: true,
		});
		useCodexStore.setState({ filters: { ...initialCodexFilters } });
	});

	it("shows progress and links to each available feature", () => {
		render(<HomePage />);

		expect(
			screen.getByText("Mongil: Star Dive Tracker for Players"),
		).toBeTruthy();
		expect(screen.getByText(/Keep your roster/)).toBeTruthy();
		expect(screen.getAllByText("2")).toHaveLength(3);
		expect(screen.getByText("3")).toBeTruthy();
		expect(screen.getByText("1")).toBeTruthy();

		for (const [name, href] of [
			["Characters", "/characters"],
			["Checklist", "/checklist"],
			["Monsterlings", "/monsterlings"],
			["Link Chains", "/link-chains"],
			["Monster Codex", "/monster-codex"],
			["Loadouts", "/loadouts"],
			["Artifacts", "/artifacts"],
		]) {
			expect(
				screen
					.getByRole("link", { name: `Explore ${name}` })
					.getAttribute("href"),
			).toBe(href);
		}

		for (const [label, href] of [
			["Characters owned", "/characters"],
			["Monsterlings owned", "/monsterlings"],
			["Codex cleared", "/monster-codex"],
			["Loadouts created", "/loadouts"],
			["Artifacts owned", "/artifacts"],
		]) {
			expect(
				screen
					.getByRole("link", { name: `View ${label}` })
					.getAttribute("href"),
			).toBe(href);
		}

		fireEvent.click(screen.getByRole("link", { name: "View Codex cleared" }));
		expect(useCodexStore.getState().filters.view).toBe("completed");
	});

	it("shows placeholders before persisted progress hydrates", () => {
		useAppStore.setState({ isHydrated: false });

		render(<HomePage />);

		expect(screen.getAllByText("—")).toHaveLength(5);
	});

	it("presents upcoming features without linking to unfinished pages", () => {
		render(<HomePage />);

		expect(screen.getByText("Equipment")).toBeTruthy();
		expect(
			screen.getByRole("link", { name: "Explore Checklist" }),
		).toBeTruthy();
	});
});
