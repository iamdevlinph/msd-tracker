// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EquipmentsPage } from "./equipments-page";

vi.mock("@/data/equipment/EQUIPMENT_DATA", () => ({
	EQUIPMENT_PART_TYPES: ["headgear", "chestpiece", "gloves", "footwear"],
	EQUIPMENT_DATA: {
		1: {
			id: 1,
			name: "Gooey Shoes",
			image: "/shoes.webp",
			tier_id: 4,
			part_type: "footwear",
			set_name: "Sticky Gorger",
		},
		2: {
			id: 2,
			name: "Gooey Gloves",
			image: "/gloves.webp",
			tier_id: 4,
			part_type: "gloves",
			set_name: "Sticky Gorger",
		},
		3: {
			id: 3,
			name: "Abyss Crown",
			image: "/crown.webp",
			tier_id: 5,
			part_type: "headgear",
			set_name: "Abyss",
		},
		4: {
			id: 4,
			name: "Abyss Boots",
			image: "/boots.webp",
			tier_id: 5,
			part_type: "footwear",
			set_name: "Abyss",
		},
	},
}));

vi.mock("@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA", () => ({
	EQUIPMENT_SET_EFFECTS_DATA: {
		Abyss: [{ pieces: 2, effect: "Wind DMG +10%" }],
		"Sticky Gorger": [{ pieces: 2, effect: "ATK +3%" }],
	},
}));

describe("EquipmentsPage", () => {
	afterEach(cleanup);

	it("renders complete set rows with effects and Tier 4 first", () => {
		render(<EquipmentsPage />);

		expect(
			screen.getByRole("heading", { level: 1, name: "Equipment" }),
		).toBeTruthy();
		expect(
			screen
				.getAllByRole("button", { name: /Tier [45]/ })
				.map((button) => button.getAttribute("aria-label")),
		).toEqual(["Tier 4", "Tier 5"]);
		expect(
			screen
				.getAllByRole("heading", { level: 2 })
				.map((heading) => heading.textContent),
		).toEqual(["Abyss", "Sticky Gorger"]);

		const stickyRow = screen
			.getByRole("heading", { name: "Sticky Gorger" })
			.closest("section");
		expect(stickyRow).toBeTruthy();
		expect(
			within(stickyRow as HTMLElement)
				.getAllByRole("img", { name: /portrait/ })
				.map((image) => image.getAttribute("alt")),
		).toEqual(["Gooey Gloves portrait", "Gooey Shoes portrait"]);
		expect(within(stickyRow as HTMLElement).getByText("ATK +3%")).toBeTruthy();
	});

	it("keeps full sets for piece matches and supports tier filtering and reset", () => {
		render(<EquipmentsPage />);
		const search = screen.getByRole("textbox", {
			name: "Search equipment sets or pieces",
		});

		fireEvent.change(search, { target: { value: "Abyss Boots" } });
		expect(screen.getByText("Abyss Crown")).toBeTruthy();
		expect(screen.getByText("Abyss Boots")).toBeTruthy();
		expect(screen.queryByText("Sticky Gorger")).toBeNull();

		fireEvent.change(search, { target: { value: "footwear" } });
		expect(screen.getByText("No equipment sets found")).toBeTruthy();

		fireEvent.click(
			screen.getByRole("button", { name: "Clear equipment filters" }),
		);
		fireEvent.click(screen.getByRole("button", { name: "Tier 4" }));
		expect(screen.getByText("Sticky Gorger")).toBeTruthy();
		expect(screen.queryByText("Abyss")).toBeNull();
	});
});
