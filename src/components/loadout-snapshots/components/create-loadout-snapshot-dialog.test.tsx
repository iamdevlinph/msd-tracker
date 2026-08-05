// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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

	it("provides the dated default name and creates an Others snapshot", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-08-05T02:00:00Z"));
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
		expect(name.value).toBe(`${new Date().toLocaleDateString()} Fire Team`);
		expect(
			screen.getByRole("combobox", { name: "Snapshot tag" }).textContent,
		).toContain("Others");
		fireEvent.change(name, { target: { value: "  Rift clear  " } });
		fireEvent.click(screen.getByRole("button", { name: "Create snapshot" }));
		expect(onCreate).toHaveBeenCalledWith("Rift clear", "others", "", null);
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
});
