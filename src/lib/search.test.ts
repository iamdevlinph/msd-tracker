import { describe, expect, it } from "vitest";
import { matchesSearchText } from "@/lib/search";

describe("matchesSearchText", () => {
	it.each([
		["M.A.D", "MAD"],
		["M.A.D", "MA"],
		["Out-of-Control Bomb Maniac", "out of control"],
		["Out-of-Control Bomb Maniac", "outofcontrol"],
	])("matches %s with %s without punctuation", (value, search) => {
		expect(matchesSearchText(value, search)).toBe(true);
	});
});
