// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ArtifactCatalogPage } from "@/components/artifacts/artifact-catalog-page";

vi.mock("@/data/artifacts/ARTIFACTS_DATA", () => ({
	ARTIFACTS_DATA: {
		1: {
			id: 1,
			name: "Celestial Halo of Protection",
			image: "/protection.webp",
			tier_id: 4,
			class_id: 4,
		},
		2: {
			id: 2,
			name: "Zeta Blade",
			image: "/zeta.webp",
			tier_id: 5,
			class_id: 1,
			element_effect_id: 2,
		},
		3: {
			id: 3,
			name: "Alpha Charm",
			image: "/alpha.webp",
			tier_id: 3,
			class_id: 4,
			element_effect_id: 1,
		},
	},
}));

const cardNames = () =>
	screen
		.getAllByRole("img", { name: /portrait$/ })
		.map((image) => image.getAttribute("alt")?.replace(" portrait", ""));

describe("ArtifactCatalogPage", () => {
	beforeEach(() => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		Element.prototype.scrollIntoView = vi.fn();
	});

	afterEach(() => {
		cleanup();
		vi.unstubAllEnvs();
	});

	it("shows available artifacts with catalog sorting and reset", () => {
		render(<ArtifactCatalogPage />);

		expect(
			screen.getByRole("heading", { level: 1, name: "Artifact Catalog" }),
		).toBeTruthy();
		expect(cardNames()).toEqual([
			"Zeta Blade",
			"Celestial Halo of Protection",
			"Alpha Charm",
		]);
		expect(screen.queryByRole("button", { name: "Add Artifact" })).toBeNull();

		const sort = screen.getByRole("combobox", { name: "Sort artifacts" });
		fireEvent.keyDown(sort, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: "Name: A–Z" }));
		expect(cardNames()).toEqual([
			"Alpha Charm",
			"Celestial Halo of Protection",
			"Zeta Blade",
		]);

		fireEvent.change(
			screen.getByRole("textbox", { name: "Search artifacts" }),
			{
				target: { value: "protection" },
			},
		);
		expect(cardNames()).toEqual(["Celestial Halo of Protection"]);

		fireEvent.click(
			screen.getByRole("button", { name: "Clear artifact filters" }),
		);
		expect(sort.textContent).toContain("Tier: 5–3");
		expect(cardNames()[0]).toBe("Zeta Blade");
	});

	it("shows the shared empty state when filters have no matches", () => {
		render(<ArtifactCatalogPage />);
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search artifacts" }),
			{
				target: { value: "missing" },
			},
		);

		expect(screen.getByText("No artifacts found")).toBeTruthy();
		expect(
			screen.getByText("Adjust or clear the filters to see artifacts."),
		).toBeTruthy();
	});
});
