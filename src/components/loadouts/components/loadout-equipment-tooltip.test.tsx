// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { EQUIPMENT_DATA } from "@/data/equipment/EQUIPMENT_DATA";
import { LoadoutEquipmentTooltip } from "./loadout-equipment-tooltip";

describe("LoadoutEquipmentTooltip", () => {
	beforeEach(() => {
		globalThis.ResizeObserver = class {
			observe() {}
			unobserve() {}
			disconnect() {}
		} as unknown as typeof ResizeObserver;
	});
	afterEach(cleanup);

	it("shows the set name and every published effect on focus", () => {
		const equipment = EQUIPMENT_DATA[7];
		render(
			<LoadoutEquipmentTooltip
				equipment={equipment}
				trigger={<button type="button">{equipment.name}</button>}
			/>,
		);

		const trigger = screen.getByRole("button", { name: equipment.name });
		fireEvent.focus(trigger);

		const tooltip = screen.getByRole("tooltip");
		expect(tooltip.textContent).toContain("Green Nightmare");
		expect(tooltip.textContent).toContain(
			"[2 set] - Ice DMG +3% for 2s upon using a Basic Attack.",
		);
		expect(tooltip.textContent).toContain(
			"[4 set] - Crit DMG +3% for 5s upon using a Switch Skill on an enemy with Ice Affliction.",
		);
		expect(trigger.contains(tooltip)).toBe(false);
	});
});
