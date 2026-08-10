// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	FilterButtonGroup,
	FilterToggleButton,
} from "@/components/ui/filter-button-group";

describe("filter button group", () => {
	it("forwards group labels and responsive wrapping classes", () => {
		render(
			<FilterButtonGroup aria-label="Elements" data-testid="elements-group">
				<FilterToggleButton isSelected={false}>Fire</FilterToggleButton>
			</FilterButtonGroup>,
		);

		const group = screen.getByRole("group", { name: "Elements" });
		expect(group.getAttribute("data-testid")).toBe("elements-group");
		expect(group.classList).toContain("flex");
		expect(group.classList).toContain("max-w-full");
		expect(group.classList).toContain("flex-wrap");
		expect(group.className).not.toContain("[&>*]:rounded-md!");
		expect(group.className).not.toContain("[&>*]:border!");
	});

	it("exposes selected state, variants, and a stable border", () => {
		render(
			<FilterButtonGroup aria-label="Tiers">
				<FilterToggleButton isSelected>Tier 5</FilterToggleButton>
				<FilterToggleButton isSelected={false}>Tier 4</FilterToggleButton>
			</FilterButtonGroup>,
		);

		const selected = screen.getByRole("button", { name: "Tier 5" });
		const unselected = screen.getByRole("button", { name: "Tier 4" });
		expect(selected.getAttribute("aria-pressed")).toBe("true");
		expect(selected.getAttribute("data-variant")).toBe("default");
		expect(selected.classList).toContain("border");
		expect(unselected.getAttribute("aria-pressed")).toBe("false");
		expect(unselected.getAttribute("data-variant")).toBe("outline");
		expect(unselected.classList).toContain("border");
	});

	it("styles only selected icons for contrast while preserving text", () => {
		render(
			<FilterButtonGroup aria-label="Icon filters">
				<FilterToggleButton isSelected>
					<span>Selected</span>
					<svg aria-label="Selected vector" />
					<img src="icon.webp" alt="Selected raster" />
				</FilterToggleButton>
				<FilterToggleButton isSelected={false}>
					<span>Available</span>
					<svg aria-label="Available vector" />
					<img src="icon.webp" alt="Available raster" />
				</FilterToggleButton>
			</FilterButtonGroup>,
		);

		const selected = screen.getByRole("button", { name: /Selected/ });
		const unselected = screen.getByRole("button", { name: /Available/ });
		expect(selected.textContent).toContain("Selected");
		expect(selected.classList).toContain("[&_svg]:stroke-white");
		expect(selected.classList).toContain(
			"[&_img]:drop-shadow-[0_0_1px_rgb(255_255_255_/_0.8)]",
		);
		expect(unselected.classList).not.toContain("[&_svg]:stroke-white");
		expect(unselected.classList).not.toContain(
			"[&_img]:drop-shadow-[0_0_1px_rgb(255_255_255_/_0.8)]",
		);
	});
});
