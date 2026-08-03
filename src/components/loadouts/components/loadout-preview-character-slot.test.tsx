// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LoadoutPreviewCharacter } from "@/components/loadouts/components/loadout-preview-character-slot";

const character = {
	id: 1,
	name: "Test Character",
	class_id: 1,
	element_id: 2,
	portraitImage: "/test-character.png",
	fullImage: "/test-character-full.png",
	tier_id: 4,
} as const;

describe("LoadoutPreviewCharacter skill levels", () => {
	afterEach(cleanup);

	it("keeps awakening totals while prioritizing max-level green", () => {
		const { container } = render(
			<LoadoutPreviewCharacter
				character={character}
				owned={{
					awakening: 5,
					skills: { basic: 12, switch: 11, special: 12, ultimate: 11 },
				}}
			/>,
		);

		const levels = Array.from(
			container.querySelectorAll("span.whitespace-nowrap"),
		);
		expect(levels.map((level) => level.textContent)).toEqual([
			"16",
			"15",
			"16",
			"15",
		]);
		expect(levels[0]?.classList.contains("text-green-300")).toBe(true);
		expect(levels[0]?.classList.contains("text-amber-400")).toBe(false);
		expect(levels[1]?.classList.contains("text-amber-400")).toBe(true);
		expect(levels[1]?.classList.contains("text-green-300")).toBe(false);
		expect(
			(container.querySelector('img[alt="4 background"]') as HTMLImageElement)
				.style.background,
		).toBe("");
	});

	it("formats pinned stat values with grouping and percentage suffixes", () => {
		render(
			<LoadoutPreviewCharacter
				character={character}
				owned={{
					awakening: 0,
					skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
				}}
				statValues={{ atk: 12345, hp: 98765.5, crit_rate: 25.5 }}
				pinnedStatIds={["atk", "hp", "crit_rate", "crit_dmg"]}
			/>,
		);

		expect(screen.getByText("12,345")).toBeTruthy();
		expect(screen.getByText("98,765.5")).toBeTruthy();
		expect(screen.getByText("25.5%")).toBeTruthy();
		expect(screen.getByText("—")).toBeTruthy();
		const statsColumn =
			screen.getByAltText("ATK icon").parentElement?.parentElement;
		expect(statsColumn?.classList.contains("border-l")).toBe(true);
		expect(statsColumn?.classList.contains("border-primary/60")).toBe(true);
		expect(statsColumn?.classList.contains("pl-2")).toBe(true);
	});
});
