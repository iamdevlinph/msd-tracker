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

	it("uses the trimmed loadout name by default and keeps it separate from the tag", () => {
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
		expect(name.value).toBe("Fire Team");
		expect(
			screen.getByRole("combobox", { name: "Snapshot tag" }).textContent,
		).toContain("Others");
		expect(
			screen.getByText("Others", {
				selector: '[data-slot="dialog-description"] span',
			}),
		).toBeTruthy();
		fireEvent.change(name, { target: { value: "  Rift clear  " } });
		fireEvent.click(screen.getByRole("button", { name: "Create snapshot" }));
		expect(onCreate).toHaveBeenCalledWith("Rift clear", "others", "", null);
	});

	it("shows the current edit tag in the header and updates it with the Tag select", () => {
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
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
					details: { level: 25, clear_time: "01:02.03" },
				}}
				onOpenChange={vi.fn()}
				onSubmit={vi.fn()}
			/>,
		);

		const headerBadge = () =>
			screen.getByText(/Rift|Conquest/, {
				selector: '[data-slot="dialog-description"] span',
			});
		expect(headerBadge().textContent).toBe("Rift");

		const tagSelect = screen.getByRole("combobox", { name: "Snapshot tag" });
		fireEvent.keyDown(tagSelect, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: /^Conquest$/ }));

		expect(headerBadge().textContent).toBe("Conquest");
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
		const bossOptions = screen.getAllByRole("option");
		const redShadowIndex = bossOptions.findIndex(
			(option) => option.textContent === "Red Shadow",
		);
		const greatUnknownOption = screen.getByRole("option", {
			name: /The Great Unknown/,
		});
		expect(bossOptions.indexOf(greatUnknownOption)).toBe(redShadowIndex + 1);
		expect(greatUnknownOption.querySelector("img")?.getAttribute("src")).toBe(
			"/images/Monsterling_Icons/MonsterlingUnknown.webp",
		);
		fireEvent.click(greatUnknownOption);
		expect(boss.textContent).toContain("The Great Unknown");
		expect(
			screen.getAllByAltText("The Great Unknown icon").length,
		).toBeGreaterThan(0);
		const level = screen.getByRole("combobox", { name: "Level" });
		fireEvent.keyDown(level, { key: "ArrowDown" });
		expect(screen.getByRole("option", { name: "15" })).toBeTruthy();
		fireEvent.click(screen.getByRole("option", { name: "15" }));
		const difficulty = screen.getByRole("combobox", {
			name: "Difficulty",
		});
		fireEvent.keyDown(difficulty, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: "Raging" }));
		expect(level.textContent).toContain("10");

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
					boss_id: 192,
					clear_time: "12:34.56",
				}),
			}),
		);
	});

	it("clamps Rift numeric inputs to whole-number boundaries", () => {
		const onSubmit = vi.fn();
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
					details: { level: 25, clear_time: "01:02.03" },
				}}
				onOpenChange={vi.fn()}
				onSubmit={onSubmit}
			/>,
		);

		const level = screen.getByLabelText("Level") as HTMLInputElement;
		fireEvent.change(level, { target: { value: "99" } });
		expect(level.value).toBe("50");
		fireEvent.change(level, { target: { value: "-4" } });
		expect(level.value).toBe("1");
		fireEvent.change(level, { target: { value: "10.8" } });
		expect(level.value).toBe("10");

		const clearTime = screen.getByLabelText("Clear time") as HTMLInputElement;
		expect(clearTime.value).toBe("01:02.03");
		fireEvent.paste(clearTime, {
			clipboardData: { getData: () => "07:08.09" },
		});
		expect(clearTime.value).toBe("07:08.09");

		const score = screen.getByLabelText("Score (optional)") as HTMLInputElement;
		fireEvent.change(score, { target: { value: "-5" } });
		expect(score.value).toBe("0");
		fireEvent.change(score, { target: { value: "abc" } });
		expect(score.value).toBe("");
		fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
		expect(onSubmit).toHaveBeenCalledWith(
			expect.objectContaining({
				details: { level: 10, clear_time: "07:08.09" },
			}),
		);
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
					details: {
						monsterling_id: 100_001,
						element_id: 1,
						score: 0,
						res_element_ids: [1],
					},
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

	it("shows only Legendary Monsterlings and submits Sorin", () => {
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
		const onCreate = vi.fn();
		render(
			<CreateLoadoutSnapshotDialog
				loadout={{
					id: "team",
					name: "Team",
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

		expect(screen.queryByRole("combobox", { name: "Monsterling" })).toBeNull();
		const tag = screen.getByRole("combobox", { name: "Snapshot tag" });
		fireEvent.keyDown(tag, { key: "ArrowDown" });
		fireEvent.click(screen.getByRole("option", { name: "Legendary Conquest" }));
		const monsterling = screen.getByRole("combobox", { name: "Monsterling" });
		expect(monsterling.textContent).toContain("Reginula");
		expect(screen.getByAltText("Reginula icon")).toBeTruthy();
		fireEvent.keyDown(monsterling, { key: "ArrowDown" });
		const options = screen.getAllByRole("option");
		expect(options.map((option) => option.textContent)).toEqual([
			"Reginula",
			"Sorin",
		]);
		expect(screen.getAllByAltText("Reginula icon")).toHaveLength(2);
		expect(screen.getByAltText("Sorin icon")).toBeTruthy();
		fireEvent.click(screen.getByRole("option", { name: /Sorin/ }));
		fireEvent.change(screen.getByLabelText("Score"), {
			target: { value: "0" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Create snapshot" }));
		expect(onCreate).toHaveBeenCalledWith(
			"Team",
			"legendary_conquest",
			"",
			expect.objectContaining({ monsterling_id: 100_002 }),
		);
	});

	it("defaults a legacy Legendary snapshot to Reginula", () => {
		render(
			<LoadoutSnapshotDialog
				loadout={null}
				snapshot={{
					id: "legacy",
					name: "Legacy clear",
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
					details: { element_id: 1, score: 0 } as never,
				}}
				onOpenChange={vi.fn()}
				onSubmit={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole("combobox", { name: "Monsterling" }).textContent,
		).toContain("Reginula");
	});
});
