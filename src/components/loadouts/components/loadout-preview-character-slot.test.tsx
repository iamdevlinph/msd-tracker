// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
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
	});
});
