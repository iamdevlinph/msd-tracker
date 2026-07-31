import { describe, expect, it } from "vitest";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";

describe("TIERS_DATA", () => {
	it("defines the extracted color for every tier", () => {
		expect(Object.values(TIERS_DATA).map(({ hex }) => hex)).toEqual([
			"#9D9DA5",
			"#69A99D",
			"#6789BE",
			"#AA81D5",
			"#CDAD87",
		]);
	});
});
