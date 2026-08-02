// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CharacterOwnedDetailsForm } from "@/components/characters/components/character-details-form";
import { CharacterSkillLevel } from "@/components/characters/components/character-skill-level";

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event: vi.fn() }),
}));

const character = {
	id: 1,
	awakening: 0,
	skills: { basic: 1, switch: 2, special: 3, ultimate: 4 },
};

describe("character skill order", () => {
	afterEach(cleanup);

	it("shows Special, Switch, Basic, and Ultimate on character cards", () => {
		render(<CharacterSkillLevel charOwned={character} />);

		expect(
			screen
				.getAllByAltText(/skill icon$/)
				.map((image) => image.getAttribute("alt")),
		).toEqual([
			"special skill icon",
			"switch skill icon",
			"basic skill icon",
			"ultimate skill icon",
		]);
	});

	it("uses the same order in the character details form", () => {
		render(<CharacterOwnedDetailsForm id={1} onClose={vi.fn()} />);

		const labels = ["Special", "Switch", "Basic", "Ultimate"];
		const fields = labels.map((label) => screen.getByText(label));
		expect(
			fields.every(
				(field, index) =>
					index === 0 ||
					Boolean(
						fields[index - 1].compareDocumentPosition(field) &
							Node.DOCUMENT_POSITION_FOLLOWING,
					),
			),
		).toBe(true);
	});

	it("prioritizes max-level green over awakening amber", () => {
		render(
			<CharacterSkillLevel
				charOwned={{
					...character,
					awakening: 5,
					skills: { basic: 12, switch: 11, special: 12, ultimate: 11 },
				}}
			/>,
		);

		const levels = Array.from(document.querySelectorAll("small"));
		expect(levels[0]?.classList.contains("text-green-300")).toBe(true);
		expect(levels[0]?.classList.contains("text-amber-400")).toBe(false);
		expect(levels[1]?.classList.contains("text-amber-400")).toBe(true);
		expect(levels[1]?.classList.contains("text-green-300")).toBe(false);
		expect(levels.map((level) => level.textContent)).toEqual([
			"16",
			"15",
			"16",
			"15",
		]);
	});

	it("keeps exported skill levels in four columns", () => {
		render(<CharacterSkillLevel charOwned={character} exportLayout />);
		const skills = screen.getAllByAltText(/skill icon$/);
		const grid = skills[0]?.parentElement;
		expect(grid?.className).toContain("w-[130px]");
		expect(grid?.getAttribute("style")).toContain(
			"grid-template-columns: repeat(4, minmax(0, 1fr))",
		);
		expect(screen.getAllByText(/^[1-4]$/)).toHaveLength(4);
	});
});
