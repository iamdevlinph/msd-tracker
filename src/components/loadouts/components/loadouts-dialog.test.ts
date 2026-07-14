import { describe, expect, it } from "vitest";
import {
	nextDuplicateLoadoutName,
	nextLoadoutName,
	showFutureLoadoutSlots,
} from "@/components/loadouts/components/loadout-utils";

describe("nextLoadoutName", () => {
	it("increments generated loadout names", () => {
		expect(nextLoadoutName([])).toBe("New Loadout");
		expect(nextLoadoutName(["New Loadout"])).toBe("New Loadout #2");
		expect(nextLoadoutName(["New Loadout", "New Loadout #2"])).toBe(
			"New Loadout #3",
		);
	});
});

describe("nextDuplicateLoadoutName", () => {
	it("uses the first available suffix in the loadout name family", () => {
		expect(nextDuplicateLoadoutName("Team", ["Team"])).toBe("Team #2");
		expect(
			nextDuplicateLoadoutName("Team #2", ["Team", "Team #2", "Team #4"]),
		).toBe("Team #3");
		expect(nextDuplicateLoadoutName("Team #4", ["Team #4"])).toBe("Team #2");
	});
});

describe("showFutureLoadoutSlots", () => {
	it("shows unfinished slots only during development", () => {
		expect(showFutureLoadoutSlots("development")).toBe(true);
		expect(showFutureLoadoutSlots("production")).toBe(false);
		expect(showFutureLoadoutSlots()).toBe(false);
	});
});
