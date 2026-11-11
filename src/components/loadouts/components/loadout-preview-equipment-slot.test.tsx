// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Tooltip } from "radix-ui";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoadoutPreviewEquipment } from "./loadout-preview-equipment-slot";

const renderWithTooltip = (ui: React.ReactElement) =>
	render(<Tooltip.Provider delayDuration={200}>{ui}</Tooltip.Provider>);

vi.mock("@/data/equipment/EQUIPMENT_DATA", () => ({
	EQUIPMENT_DATA: {
		1: {
			id: 1,
			name: "Glutton's Hat",
			image: "/hat.webp",
			tier_id: 4,
			part_type: "headgear",
			set_name: "Glutton's Visage",
		},
		2: {
			id: 2,
			name: "Loose Boots",
			image: "/boots.webp",
			tier_id: 4,
			part_type: "footwear",
			set_name: "Sticky Gorger",
		},
		3: {
			id: 3,
			name: "Ironblood Enforcer's Cuirass",
			image: "/cuirass.webp",
			tier_id: 5,
			part_type: "chestpiece",
			set_name: "Ironblood Enforcer",
		},
	},
}));

vi.mock("@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA", () => ({
	EQUIPMENT_SET_EFFECTS_DATA: {
		"Glutton's Visage": [
			{ pieces: 2, effect: "Basic Attack DMG +3% upon using a Fire attack." },
		],
		"Sticky Gorger": [{ pieces: 2, effect: "ATK +3%" }],
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

const activeSets = [
	{
		name: "Glutton's Visage" as const,
		pieces: 2,
		colorClass: "outline-sky-400" as const,
		equipmentIds: [1],
	},
	{
		name: "Sticky Gorger" as const,
		pieces: 2,
		colorClass: "outline-amber-400" as const,
		equipmentIds: [2],
	},
];

describe("LoadoutPreviewEquipment", () => {
	beforeEach(() => {
		globalThis.ResizeObserver = class {
			observe() {}
			unobserve() {}
			disconnect() {}
		} as unknown as typeof ResizeObserver;
	});
	afterEach(cleanup);

	it("shows every active set on focus and preserves item accessible labels", () => {
		renderWithTooltip(
			<LoadoutPreviewEquipment id={1} activeSets={activeSets} showSetName />,
		);
		const trigger = screen.getByRole("button", {
			name: "Glutton's Hat, Glutton's Visage set",
		});
		fireEvent.focus(trigger);
		expect(screen.getAllByText("Glutton's Visage").length).toBeGreaterThan(1);
		expect(screen.getAllByText("Sticky Gorger").length).toBeGreaterThan(1);
		expect(
			screen.getAllByText(/\[2 set\] - Basic Attack DMG/).length,
		).toBeGreaterThan(0);
		const badge = trigger.querySelector(".size-3.bg-sky-400");
		expect(badge).toBeTruthy();
		expect(badge?.className).toContain("bottom-[17px]");
		expect(trigger.className).toContain("size-[120px]");
		expect(trigger.querySelector(".bg-amber-400")).toBeNull();
		expect(
			screen.getByRole("tooltip").querySelector(".grid.gap-3"),
		).toBeTruthy();
	});

	it("does not make inactive pieces interactive or show a tooltip without active sets", () => {
		const { rerender } = renderWithTooltip(
			<LoadoutPreviewEquipment id={2} activeSets={[activeSets[0]]} />,
		);
		expect(screen.queryByRole("button", { name: /Loose Boots/ })).toBeNull();
		expect(screen.queryByText("S1")).toBeNull();
		rerender(<LoadoutPreviewEquipment id={1} />);
		expect(screen.queryByRole("button", { name: /Glutton's Hat/ })).toBeNull();
		expect(screen.queryByRole("tooltip")).toBeNull();
	});

	it("shows every active effect sharing the same piece threshold", () => {
		renderWithTooltip(
			<LoadoutPreviewEquipment
				id={3}
				activeSets={[
					{
						name: "Ironblood Enforcer",
						pieces: 2,
						colorClass: "outline-sky-400",
						equipmentIds: [3],
					},
				]}
			/>,
		);
		fireEvent.focus(
			screen.getByRole("button", {
				name: "Ironblood Enforcer's Cuirass, Ironblood Enforcer set",
			}),
		);
		const tooltip = screen.getByRole("tooltip");
		expect(tooltip.textContent).toContain(
			"[2 set] - All teammates' Lightning DMG +5% for 10s upon using Tag-out Skill",
		);
		expect(tooltip.textContent).toContain(
			"[2 set] - Crit Rate +5% for 10s upon using Support Skill",
		);
	});
});
