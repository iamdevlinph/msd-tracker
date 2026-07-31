import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	CHARACTER_CLASS_DATA,
	CLASS_ID_BY_CLASS,
} from "@/data/character-classes/CHARACTER_CLASS_DATA";

describe("CHARACTER_CLASS_DATA", () => {
	it("has unique ids and local icon paths", () => {
		const classes = Object.values(CHARACTER_CLASS_DATA);
		expect(new Set(classes.map(({ id }) => id)).size).toBe(classes.length);
		expect(new Set(classes.map(({ id }) => id))).toEqual(
			new Set(Object.values(CLASS_ID_BY_CLASS)),
		);
		for (const entry of classes)
			expect(existsSync(resolve("public", entry.image.slice(1)))).toBe(true);
	});
});
