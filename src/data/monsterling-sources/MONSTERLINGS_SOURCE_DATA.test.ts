import { describe, expect, it } from "vitest";
import {
	MONSTERLINGS_SOURCE_DATA,
	SOURCE_ID_BY_SOURCE,
} from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";

describe("MONSTERLINGS_SOURCE_DATA", () => {
	it("keeps ids aligned with source records", () => {
		expect(
			new Set(Object.values(MONSTERLINGS_SOURCE_DATA).map(({ id }) => id)),
		).toEqual(new Set(Object.values(SOURCE_ID_BY_SOURCE)));
		for (const [key, source] of Object.entries(MONSTERLINGS_SOURCE_DATA)) {
			expect(source.id).toBe(Number(key));
			expect(source.label.length).toBeGreaterThan(0);
		}
	});
});
