import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	IMAGE_MAPPING,
	IMAGE_MAPPING_ID,
} from "@/data/image-mapping/IMAGE_MAPPING_DATA";

describe("IMAGE_MAPPING_DATA", () => {
	it("contains unique ids and local image paths", () => {
		const entries = Object.values(IMAGE_MAPPING);
		expect(new Set(entries.map(({ id }) => id)).size).toBe(entries.length);
		expect(new Set(entries.map(({ id }) => id))).toEqual(
			new Set(Object.values(IMAGE_MAPPING_ID)),
		);
		for (const entry of entries) {
			expect(entry.image).toMatch(/^\/images\/.+\.webp$/);
			expect(existsSync(resolve("public", entry.image.slice(1)))).toBe(true);
		}
	});
});
