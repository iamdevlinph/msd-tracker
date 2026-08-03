// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoadoutCharacterStatsFields } from "@/components/loadouts/components/loadout-character-stats-fields";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";

const createSlot = (
	overrides: Partial<LoadoutCharacterSlot> = {},
): LoadoutCharacterSlot => ({
	characterId: 1,
	monsterlingIds: [null, null, null],
	artifactInstanceId: null,
	stat_values: {},
	pinned_stat_ids: [],
	...overrides,
});

describe("LoadoutCharacterStatsFields", () => {
	afterEach(cleanup);

	it("uses compact editor labels and the four-plus-three responsive grid", () => {
		const { container } = render(
			<LoadoutCharacterStatsFields slot={createSlot()} onChange={vi.fn()} />,
		);

		for (const label of [
			"ATK",
			"HP",
			"Crit Rate",
			"Crit DMG",
			"Special Skill CD",
			"Elemental Boost",
			"DMG Boost Boss",
		])
			expect(screen.getByText(label)).toBeTruthy();

		const fields = container.querySelectorAll("label");
		expect(fields).toHaveLength(7);
		expect(fields[0]?.classList.contains("sm:col-span-3")).toBe(true);
		expect(fields[3]?.classList.contains("sm:col-span-3")).toBe(true);
		expect(fields[4]?.classList.contains("sm:col-span-4")).toBe(true);
		expect(fields[6]?.classList.contains("sm:col-span-4")).toBe(true);
	});

	it("fills pinned icons, overlays their order, and limits pins to five", () => {
		const onChange = vi.fn();
		const { rerender } = render(
			<LoadoutCharacterStatsFields slot={createSlot()} onChange={onChange} />,
		);

		fireEvent.click(screen.getByRole("button", { name: "Pin ATK" }));
		rerender(
			<LoadoutCharacterStatsFields
				slot={onChange.mock.calls[0][0]}
				onChange={onChange}
			/>,
		);
		const pinnedAtk = screen.getByRole("button", { name: "Unpin ATK" });
		expect(pinnedAtk.querySelector("svg")?.getAttribute("fill")).toBe(
			"currentColor",
		);
		expect(pinnedAtk.querySelector("sup")?.textContent).toBe("1");

		rerender(
			<LoadoutCharacterStatsFields
				slot={createSlot({
					pinned_stat_ids: [
						"atk",
						"hp",
						"crit_rate",
						"crit_dmg",
						"special_skill_cd",
					],
				})}
				onChange={onChange}
			/>,
		);

		expect(
			(
				screen.getByRole("button", {
					name: "Pin Elemental Boost",
				}) as HTMLButtonElement
			).disabled,
		).toBe(true);
		expect(
			(
				screen.getByRole("button", {
					name: "Pin DMG Boost Boss",
				}) as HTMLButtonElement
			).disabled,
		).toBe(true);
		expect(
			(screen.getByRole("button", { name: "Unpin ATK" }) as HTMLButtonElement)
				.disabled,
		).toBe(false);
	});
});
