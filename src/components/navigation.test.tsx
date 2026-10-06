// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Nav } from "@/components/navigation";
import { useAppStore } from "@/stores/app-store";
import { DEFAULT_NAVIGATION_PREFERENCES } from "@/stores/navigation-preferences-slice";

vi.mock("@tanstack/react-router", () => ({
	Link: ({ to, children, ...props }: ComponentProps<"a"> & { to: string }) => (
		<a href={to} {...props}>
			{children as ReactNode}
		</a>
	),
	useLocation: () => ({ pathname: "/" }),
}));

describe("Nav", () => {
	beforeEach(() => {
		useAppStore.setState({
			navigationPreferences: { ...DEFAULT_NAVIGATION_PREFERENCES },
		});
	});

	afterEach(() => {
		cleanup();
		vi.unstubAllEnvs();
	});

	it("hides Assets when its parent or only child is hidden", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		useAppStore.setState({
			navigationPreferences: { showAssets: true, showEquipment: false },
		});
		const { unmount } = render(<Nav />);

		expect(screen.queryByRole("link", { name: "Equipment" })).toBeNull();
		expect(screen.queryByText("Assets")).toBeNull();

		unmount();
		useAppStore.setState({
			navigationPreferences: { showAssets: false, showEquipment: true },
		});
		render(<Nav />);
		expect(screen.queryByRole("link", { name: "Equipment" })).toBeNull();
		expect(screen.queryByText("Assets")).toBeNull();
	});

	it("keeps hidden catalog counts out of production labels", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		render(<Nav />);

		expect(screen.getByRole("link", { name: "Characters" })).toBeTruthy();
		expect(screen.getByRole("link", { name: "Artifacts" })).toBeTruthy();
		expect(screen.getByRole("link", { name: "Equipment" })).toBeTruthy();
		const links = screen.getAllByRole("link").map((link) => link.textContent);
		expect(links.indexOf("Equipment")).toBeGreaterThan(
			links.indexOf("Link Chains"),
		);
		expect(links.indexOf("Equipment")).toBeLessThan(links.indexOf("Account"));
		expect(screen.queryByRole("link", { name: "Characters (1)" })).toBeNull();
		expect(screen.queryByRole("link", { name: "Artifacts (1)" })).toBeNull();
	});

	it("shows hidden catalog details on hover, not click, in local development", async () => {
		vi.stubEnv("VITE_NODE_ENV", "development");
		render(<Nav />);

		expect(screen.getByRole("link", { name: "Characters" })).toBeTruthy();
		const info = screen.getByRole("button", {
			name: "Hidden characters details",
		});
		expect(fireEvent.pointerDown(info, { pointerType: "mouse" })).toBe(false);
		fireEvent.click(info);
		expect(screen.queryByText("Costume: Mina — Costume 1")).toBeNull();
		fireEvent.pointerMove(info, { pointerType: "mouse" });
		expect(
			(await screen.findAllByText("Costume: Mina — Costume 1")).length,
		).toBeGreaterThan(0);
	});
});
