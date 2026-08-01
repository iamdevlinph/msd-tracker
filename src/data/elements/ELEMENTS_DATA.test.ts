import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	ELEMENT_ID_BY_ELEMENT,
	ELEMENTS_DATA,
} from "@/data/elements/ELEMENTS_DATA";

describe("ELEMENTS_DATA", () => {
	it("keeps ids aligned with records and local icons", () => {
		expect(new Set(Object.values(ELEMENTS_DATA).map(({ id }) => id))).toEqual(
			new Set(Object.values(ELEMENT_ID_BY_ELEMENT)),
		);
		for (const [key, element] of Object.entries(ELEMENTS_DATA)) {
			expect(element.image).toMatch(/^\/images\/.+\.webp$/);
			expect(element.id).toBe(Number(key));
			expect(existsSync(resolve("public", element.image.slice(1)))).toBe(true);
		}
	});
});
