// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConquestDifficultySelect } from "./conquest-difficulty-select";

describe("ConquestDifficultySelect", () => {
	afterEach(cleanup);
	beforeEach(() => {
		Element.prototype.scrollIntoView = vi.fn();
	});

	it("shows the accessible initial value and maps every banner option", () => {
		render(
			<ConquestDifficultySelect
				ariaLabel="Conquest difficulty"
				value="normal"
				onValueChange={vi.fn()}
			/>,
		);
		const select = screen.getByRole("combobox", {
			name: "Conquest difficulty",
		});
		expect(select.textContent).toContain("Normal");
		fireEvent.keyDown(select, { key: "ArrowDown" });
		const expectedImages = {
			Normal: "normal",
			Raging: "raging",
			Awakened: "awakened",
			Void: "void",
			Abyss: "abyss",
		};
		for (const [name, image] of Object.entries(expectedImages)) {
			const option = screen.getByRole("option", { name });
			expect(option.style.backgroundImage).toBe(
				`url("/images/UI/widget/Boss/Sprite/Boss/${image}.webp")`,
			);
			expect(option.className).toContain("focus:ring-inset");
		}
		expect(select.style.backgroundImage).toBe(
			'url("/images/UI/widget/Boss/Sprite/Boss/normal.webp")',
		);
	});

	it("updates selection and supports the plain all state", () => {
		const onValueChange = vi.fn();
		render(
			<ConquestDifficultySelect
				ariaLabel="Filter Conquest difficulty"
				allowAll
				value={null}
				onValueChange={onValueChange}
			/>,
		);
		const select = screen.getByRole("combobox", {
			name: "Filter Conquest difficulty",
		});
		expect(select.textContent).toContain("All difficulties");
		expect(select.style.backgroundImage).toBe("");
		fireEvent.keyDown(select, { key: "ArrowDown" });
		expect(
			screen.getByRole("option", { name: "All difficulties" }).style
				.backgroundImage,
		).toBe("");
		fireEvent.click(screen.getByRole("option", { name: "Abyss" }));
		expect(onValueChange).toHaveBeenCalledWith("abyss");
	});
});
