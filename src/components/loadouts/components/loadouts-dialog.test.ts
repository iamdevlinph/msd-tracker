import { describe, expect, it } from "vitest";
import { nextLoadoutName } from "@/components/loadouts/components/loadout-utils";

describe("nextLoadoutName", () => {
	it("increments generated loadout names", () => {
		expect(nextLoadoutName([])).toBe("New Loadout");
		expect(nextLoadoutName(["New Loadout"])).toBe("New Loadout #2");
		expect(nextLoadoutName(["New Loadout", "New Loadout #2"])).toBe(
			"New Loadout #3",
		);
	});
});
