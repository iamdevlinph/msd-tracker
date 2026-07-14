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
});
