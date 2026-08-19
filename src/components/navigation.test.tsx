// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Nav } from "@/components/navigation";

vi.mock("@tanstack/react-router", () => ({
	Link: ({ to, children, ...props }: ComponentProps<"a"> & { to: string }) => (
		<a href={to} {...props}>
			{children as ReactNode}
		</a>
	),
	useLocation: () => ({ pathname: "/" }),
}));

describe("Nav", () => {
	afterEach(() => {
		cleanup();
		vi.unstubAllEnvs();
	});

	it("keeps hidden catalog counts out of production labels", () => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		render(<Nav />);

		expect(screen.getByRole("link", { name: "Characters" })).toBeTruthy();
		expect(screen.getByRole("link", { name: "Artifacts" })).toBeTruthy();
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
