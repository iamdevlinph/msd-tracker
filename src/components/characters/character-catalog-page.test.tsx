// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CharacterCatalogPage } from "@/components/characters/character-catalog-page";

vi.mock("@/data/characters/CHARACTERS_DATA", () => ({
	CHARACTERS_DATA: {
		1: {
			id: 1,
			name: "Zeta",
			class_id: 1,
			element_id: 2,
			portraitImage: "/zeta.webp",
			fullImage: "/zeta-full.webp",
			tier_id: 4,
		},
		2: {
			id: 2,
			name: "Alpha",
			class_id: 2,
			element_id: 1,
			portraitImage: "/alpha.webp",
			fullImage: "/alpha-full.webp",
			tier_id: 5,
		},
		3: {
			id: 3,
			name: "Hidden",
			class_id: 3,
			element_id: 3,
			portraitImage: "/hidden.webp",
			fullImage: "/hidden-full.webp",
			tier_id: 5,
			is_hidden: true,
		},
		4: {
			id: 4,
			name: "Alpha",
			class_id: 4,
			element_id: 4,
			portraitImage: "/alpha-variant.webp",
			fullImage: "/alpha-variant-full.webp",
			tier_id: 4,
			variant: "Summer Dive!",
			costumes: [
				{
					id: 1,
					name: "Costume Portrait",
					portraitImage: "/costume.webp",
				},
			],
		},
	},
}));

const cardNames = () =>
	screen
		.getAllByRole("img", { name: /portrait$/ })
		.map((image) => image.getAttribute("alt")?.replace(" portrait", ""));

const cardPortraits = () =>
	screen
		.getAllByRole("img", { name: /portrait$/ })
		.map((image) => image.getAttribute("src"));

describe("CharacterCatalogPage", () => {
	beforeEach(() => {
		vi.stubEnv("VITE_NODE_ENV", "production");
		Element.prototype.scrollIntoView = vi.fn();
	});

	afterEach(() => {
		cleanup();
		vi.unstubAllEnvs();
	});

	it("shows every published character and standalone variant without ownership controls", () => {
		render(<CharacterCatalogPage />);

		expect(
			screen.getByRole("heading", { level: 1, name: "Character Catalog" }),
		).toBeTruthy();
		expect(cardNames()).toEqual(["Alpha", "Alpha", "Zeta"]);
		expect(cardPortraits()).toEqual([
			"/alpha.webp",
			"/alpha-variant.webp",
			"/zeta.webp",
		]);
		expect(screen.getByText("Summer Dive!")).toBeTruthy();
		expect(screen.queryByText("Hidden")).toBeNull();
		expect(screen.queryByText("Costume Portrait")).toBeNull();
		expect(screen.queryByRole("button", { name: "Add Character" })).toBeNull();
		expect(screen.queryByRole("img", { name: "awakening icon" })).toBeNull();
	});

	it("filters, sorts, and resets the catalog", () => {
		render(<CharacterCatalogPage />);
		const sort = screen.getByRole("combobox", {
			name: "Sort catalog characters",
		});

		fireEvent.keyDown(sort, { key: "ArrowDown" });
		expect(
			screen.queryByRole("option", { name: "Awakening: Low–High" }),
		).toBeNull();
		fireEvent.click(screen.getByRole("option", { name: "Name: Z–A" }));
		expect(cardPortraits()).toEqual([
			"/zeta.webp",
			"/alpha.webp",
			"/alpha-variant.webp",
		]);

		fireEvent.keyDown(sort, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: /Tier: 4–5/ }));
		expect(cardNames()).toEqual(["Alpha", "Zeta", "Alpha"]);
		expect(cardPortraits()).toEqual([
			"/alpha-variant.webp",
			"/zeta.webp",
			"/alpha.webp",
		]);

		fireEvent.keyDown(sort, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: /Tier: 5–4/ }));
		expect(cardPortraits()).toEqual([
			"/alpha.webp",
			"/alpha-variant.webp",
			"/zeta.webp",
		]);

		fireEvent.click(screen.getByRole("button", { name: "Fire icon" }));
		expect(cardNames()).toEqual(["Zeta"]);
		fireEvent.click(
			screen.getByRole("button", { name: "Clear character filters" }),
		);
		expect(sort.textContent).toContain("Name: A–Z");
		expect(cardNames()).toEqual(["Alpha", "Alpha", "Zeta"]);

		fireEvent.click(screen.getByRole("button", { name: "Assassin icon" }));
		expect(cardPortraits()).toEqual(["/alpha.webp"]);
		fireEvent.click(
			screen.getByRole("button", { name: "Clear character filters" }),
		);
		fireEvent.click(screen.getByRole("button", { name: "Tier 5" }));
		expect(cardNames()).toEqual(["Alpha"]);
	});

	it("shows the shared empty state when filters have no matches", () => {
		render(<CharacterCatalogPage />);
		fireEvent.change(
			screen.getByRole("textbox", { name: "Search characters" }),
			{ target: { value: "missing" } },
		);

		expect(screen.getByText("No characters found")).toBeTruthy();
		expect(
			screen.getByText("Adjust or clear the filters to see characters."),
		).toBeTruthy();
	});
});
