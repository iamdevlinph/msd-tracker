// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Tooltip } from "radix-ui";
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

	it("hides Assets only when its parent or all three children are hidden", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		useAppStore.setState({
			navigationPreferences: {
				showAssets: true,
				showArtifactCatalog: true,
				showCharacterCatalog: false,
				showEquipment: false,
			},
		});
		const { unmount } = render(<Nav />);

		expect(screen.queryByRole("link", { name: "Equipment" })).toBeNull();
		expect(
			screen
				.getAllByRole("link", { name: "Artifacts" })
				.some((link) => link.getAttribute("href") === "/artifact-catalog"),
		).toBe(true);
		expect(screen.getByText("Assets")).toBeTruthy();

		unmount();
		useAppStore.setState({
			navigationPreferences: {
				showAssets: true,
				showArtifactCatalog: false,
				showCharacterCatalog: false,
				showEquipment: false,
			},
		});
		render(<Nav />);
		expect(screen.queryByRole("link", { name: "Equipment" })).toBeNull();
		expect(screen.queryByText("Assets")).toBeNull();

		cleanup();
		useAppStore.setState({
			navigationPreferences: {
				showAssets: false,
				showArtifactCatalog: true,
				showCharacterCatalog: true,
				showEquipment: true,
			},
		});
		render(<Nav />);
		expect(screen.queryByText("Assets")).toBeNull();
	});

	it("keeps hidden catalog counts out of production labels", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		render(<Nav />);

		expect(screen.getAllByRole("link", { name: "Characters" })).toHaveLength(2);
		expect(screen.getAllByRole("link", { name: "Artifacts" })).toHaveLength(2);
		expect(screen.getByRole("link", { name: "Equipment" })).toBeTruthy();
		expect(
			screen
				.getAllByRole("link", { name: "Characters" })
				.some((link) => link.getAttribute("href") === "/character-catalog"),
		).toBe(true);
		expect(
			screen
				.getAllByRole("link", { name: "Artifacts" })
				.some((link) => link.getAttribute("href") === "/artifact-catalog"),
		).toBe(true);
		const links = screen.getAllByRole("link").map((link) => link.textContent);
		const assetLinks = screen
			.getAllByRole("link")
			.filter((link) =>
				["/artifact-catalog", "/character-catalog", "/equipments"].includes(
					link.getAttribute("href") ?? "",
				),
			)
			.map((link) => link.textContent);
		expect(assetLinks).toEqual(["Artifacts", "Characters", "Equipment"]);
		expect(links.indexOf("Equipment")).toBeGreaterThan(
			links.indexOf("Link Chains"),
		);
		expect(links.indexOf("Equipment")).toBeLessThan(links.indexOf("Account"));
		expect(screen.queryByRole("link", { name: "Characters (1)" })).toBeNull();
		expect(screen.queryByRole("link", { name: "Artifacts (1)" })).toBeNull();
	});

	it("shows hidden catalog details on hover, not click, in local development", async () => {
		vi.stubEnv("VITE_NODE_ENV", "development");
		render(
			<Tooltip.Provider delayDuration={200}>
				<Nav />
			</Tooltip.Provider>,
		);

		expect(screen.getAllByRole("link", { name: "Characters" })).toHaveLength(2);
		const info = screen.getByRole("button", {
			name: "Hidden characters details",
		});
		expect(fireEvent.pointerDown(info, { pointerType: "mouse" })).toBe(false);
		fireEvent.click(info);
		expect(screen.queryByText("Costume: Esther — Costume 1")).toBeNull();
		fireEvent.pointerMove(info, { pointerType: "mouse" });
		expect(
			(await screen.findAllByText("Costume: Esther — Costume 1")).length,
		).toBeGreaterThan(0);
	});
});
