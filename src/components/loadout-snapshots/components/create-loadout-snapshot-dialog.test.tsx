// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { emptyLoadoutCharacterSlot } from "@/stores/loadouts-slice";
import { CreateLoadoutSnapshotDialog } from "./create-loadout-snapshot-dialog";

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
				name: "Name your “Fire Team” snapshot",
			}),
		).toBeTruthy();
		const name = screen.getByLabelText("Name") as HTMLInputElement;
		expect(name.value).toBe(
			`${new Date().toLocaleDateString()} Fire Team Snapshot`,
		);
		expect(
			screen.getByRole("combobox", { name: "Snapshot tag" }).textContent,
		).toContain("Others");
		fireEvent.change(name, { target: { value: "  Rift clear  " } });
		fireEvent.click(screen.getByRole("button", { name: "Create snapshot" }));
		expect(onCreate).toHaveBeenCalledWith("Rift clear", "others");
	});
});
