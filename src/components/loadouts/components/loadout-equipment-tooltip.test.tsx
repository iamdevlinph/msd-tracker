// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Tooltip } from "radix-ui";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoadoutEquipmentTooltip } from "./loadout-equipment-tooltip";

vi.mock("@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA", () => ({
	EQUIPMENT_SET_EFFECTS_DATA: {
		"Ironblood Enforcer": [
			{
				pieces: 2,
				effect:
					"All teammates' Lightning DMG +5% for 10s upon using Tag-out Skill",
			},
			{
				pieces: 2,
				effect: "Crit Rate +5% for 10s upon using Support Skill",
			},
		],
	},
}));

const renderWithTooltip = (ui: React.ReactElement) =>
	render(<Tooltip.Provider delayDuration={200}>{ui}</Tooltip.Provider>);

describe("LoadoutEquipmentTooltip", () => {
	beforeEach(() => {
		globalThis.ResizeObserver = class {
			observe() {}
			unobserve() {}
			disconnect() {}
		} as unknown as typeof ResizeObserver;
	});
	afterEach(cleanup);

	it("shows effects sharing the same piece threshold on focus", () => {
		const equipment = {
			id: 119,
			name: "Ironblood Enforcer's Cuirass",
			image: "/cuirass.webp",
			tier_id: 5,
			part_type: "chestpiece",
			set_name: "Ironblood Enforcer",
		} as const;
		renderWithTooltip(
			<LoadoutEquipmentTooltip
				equipment={equipment}
				trigger={<button type="button">{equipment.name}</button>}
			/>,
		);

		const trigger = screen.getByRole("button", { name: equipment.name });
		fireEvent.focus(trigger);

		const tooltip = screen.getByRole("tooltip");
		expect(tooltip.textContent).toContain("Ironblood Enforcer");
		expect(tooltip.textContent).toContain(
			"[2 set] - All teammates' Lightning DMG +5% for 10s upon using Tag-out Skill",
		);
		expect(tooltip.textContent).toContain(
			"[2 set] - Crit Rate +5% for 10s upon using Support Skill",
		);
		expect(trigger.contains(tooltip)).toBe(false);
	});
});
