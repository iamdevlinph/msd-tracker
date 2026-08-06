// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { emptyLoadoutCharacterSlot } from "@/stores/loadouts-slice";
import {
	CreateLoadoutSnapshotDialog,
	LoadoutSnapshotDialog,
} from "./create-loadout-snapshot-dialog";

describe("CreateLoadoutSnapshotDialog", () => {
	afterEach(() => {
		cleanup();
		vi.useRealTimers();
	});

	it("uses the loadout name by default and creates an Others snapshot", () => {
		const onCreate = vi.fn();
		render(
			<CreateLoadoutSnapshotDialog
				loadout={{
					id: "team",
					name: "Fire Team",
					characters: [
						emptyLoadoutCharacterSlot(),
						emptyLoadoutCharacterSlot(),
						emptyLoadoutCharacterSlot(),
					],
				}}
				onOpenChange={vi.fn()}
				onCreate={onCreate}
			/>,
		);

		expect(
			screen.getByRole("heading", {
				name: "Fire Team Snapshot",
			}),
		).toBeTruthy();
		const name = screen.getByLabelText("Name") as HTMLInputElement;
		expect(name.value).toBe("Others - Fire Team");
		expect(
			screen.getByRole("combobox", { name: "Snapshot tag" }).textContent,
		).toContain("Others");
		fireEvent.change(name, { target: { value: "  Rift clear  " } });
		fireEvent.click(screen.getByRole("button", { name: "Create snapshot" }));
		expect(onCreate).toHaveBeenCalledWith(
			"Others - Rift clear",
			"others",
			"",
			null,
		);
	});

	it("requires a Conquest boss and masks clear-time segment entry", async () => {
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
		const onSubmit = vi.fn();
		render(
			<LoadoutSnapshotDialog
				loadout={null}
				snapshot={{
					id: "conquest",
					name: "Conquest clear",
					tag: "conquest",
					created_at: 1,
					loadout: {
						id: "team",
						name: "Team",
						characters: [
							emptyLoadoutCharacterSlot(),
							emptyLoadoutCharacterSlot(),
							emptyLoadoutCharacterSlot(),
						],
					},
					characters_owned: {},
					monsterlings_owned: {},
					monsterling_link_chain_levels: {},
					artifacts_owned: {},
					details: {
						difficulty: "normal",
						level: 1,
						clear_time: "00:00.00",
					},
				}}
				onOpenChange={vi.fn()}
				onSubmit={onSubmit}
			/>,
		);

		const save = screen.getByRole("button", { name: "Save changes" });
		expect(save.hasAttribute("disabled")).toBe(true);
		const boss = screen.getByRole("combobox", { name: "Boss" });
		expect(boss.textContent).toContain("Select a boss");
		fireEvent.keyDown(boss, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: /Custos/ }));
		expect(boss.textContent).toContain("Custos");
		expect(screen.getAllByAltText("Custos icon").length).toBeGreaterThan(0);

		const clearTime = screen.getByLabelText("Clear time") as HTMLInputElement;
		fireEvent.focus(clearTime);
		expect(clearTime.selectionStart).toBe(0);
		expect(clearTime.selectionEnd).toBe(2);
		fireEvent.paste(clearTime, {
			clipboardData: { getData: () => "07:08.09" },
		});
		expect(clearTime.value).toBe("07:08.09");

		fireEvent.click(clearTime);
		for (const digit of ["1", "2", "9", "9", "5", "6"])
			fireEvent.keyDown(clearTime, { key: digit });
		expect(clearTime.value).toBe("12:99.56");
		expect(save.hasAttribute("disabled")).toBe(true);

		fireEvent.click(clearTime);
		for (const digit of ["1", "2", "3", "4"])
			fireEvent.keyDown(clearTime, { key: digit });
		await waitFor(() => {
			expect(clearTime.selectionStart).toBe(6);
			expect(clearTime.selectionEnd).toBe(8);
		});
		for (const digit of ["5", "6"])
			fireEvent.keyDown(clearTime, { key: digit });
		expect(clearTime.value).toBe("12:34.56");

		fireEvent.click(save);
		expect(onSubmit).toHaveBeenCalledWith(
			expect.objectContaining({
				details: expect.objectContaining({
					boss_id: 38,
					clear_time: "12:34.56",
				}),
			}),
		);
	});

	it("clamps Rift numeric inputs to whole-number boundaries", () => {
		render(
			<LoadoutSnapshotDialog
				loadout={null}
				snapshot={{
					id: "rift",
					name: "Rift clear",
					tag: "rift",
					created_at: 1,
					loadout: {
						id: "team",
						name: "Team",
						characters: [
							emptyLoadoutCharacterSlot(),
							emptyLoadoutCharacterSlot(),
							emptyLoadoutCharacterSlot(),
						],
					},
					characters_owned: {},
					monsterlings_owned: {},
					monsterling_link_chain_levels: {},
					artifacts_owned: {},
					details: { level: 25 },
				}}
				onOpenChange={vi.fn()}
				onSubmit={vi.fn()}
			/>,
		);

		const level = screen.getByLabelText("Level") as HTMLInputElement;
		fireEvent.change(level, { target: { value: "99" } });
		expect(level.value).toBe("50");
		fireEvent.change(level, { target: { value: "-4" } });
		expect(level.value).toBe("1");
		fireEvent.change(level, { target: { value: "10.8" } });
		expect(level.value).toBe("10");

		const score = screen.getByLabelText("Score (optional)") as HTMLInputElement;
		fireEvent.change(score, { target: { value: "-5" } });
		expect(score.value).toBe("0");
		fireEvent.change(score, { target: { value: "abc" } });
		expect(score.value).toBe("");
	});

	it("selects multiple RES Elements without shifting selected buttons", () => {
		const onSubmit = vi.fn();
		render(
			<LoadoutSnapshotDialog
				loadout={null}
				snapshot={{
					id: "legendary",
					name: "Legendary clear",
					tag: "legendary_conquest",
					created_at: 1,
					loadout: {
						id: "team",
						name: "Team",
						characters: [
							emptyLoadoutCharacterSlot(),
							emptyLoadoutCharacterSlot(),
							emptyLoadoutCharacterSlot(),
						],
					},
					characters_owned: {},
					monsterlings_owned: {},
					monsterling_link_chain_levels: {},
					artifacts_owned: {},
					details: { element_id: 1, score: 0, res_element_ids: [1] },
				}}
				onOpenChange={vi.fn()}
				onSubmit={onSubmit}
			/>,
		);

		const earth = screen.getByRole("button", { name: "Earth RES Element" });
		const fire = screen.getByRole("button", { name: "Fire RES Element" });
		expect(earth.getAttribute("aria-pressed")).toBe("true");
		expect(earth.className).toContain("border");
		fireEvent.click(fire);
		expect(fire.getAttribute("aria-pressed")).toBe("true");
		expect(fire.className).toContain("border");
		fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
		expect(onSubmit).toHaveBeenCalledWith(
			expect.objectContaining({
				details: expect.objectContaining({ res_element_ids: [1, 2] }),
			}),
		);
	});
});
