// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
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

	it("shows catalog hidden counts in local development labels", () => {
		vi.stubEnv("VITE_NODE_ENV", "development");
		render(<Nav />);

		expect(screen.getByRole("link", { name: "Characters (1)" })).toBeTruthy();
		expect(screen.getByRole("link", { name: "Artifacts (1)" })).toBeTruthy();
	});
});
