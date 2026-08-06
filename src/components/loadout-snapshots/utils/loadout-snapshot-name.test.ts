import { describe, expect, it } from "vitest";
import {
	formatLoadoutSnapshotNameForTag,
	formatNewLoadoutSnapshotName,
} from "./loadout-snapshot-name";

describe("loadout snapshot names", () => {
	it("starts new snapshots with the Others prefix", () => {
		expect(formatNewLoadoutSnapshotName("  Fire Team ")).toBe(
			"Others - Fire Team",
		);
	});

	it("replaces each exact canonical prefix when changing tags", () => {
		expect(formatLoadoutSnapshotNameForTag("Conquest - Clear", "rift")).toBe(
			"Rift - Clear",
		);
		expect(
			formatLoadoutSnapshotNameForTag("Legendary Conquest - Clear", "others"),
		).toBe("Others - Clear");
	});

	it("prefixes unprefixed names and leaves unknown prefixes editable", () => {
		expect(formatLoadoutSnapshotNameForTag("Clear", "conquest")).toBe(
			"Conquest - Clear",
		);
		expect(formatLoadoutSnapshotNameForTag("custom - Clear", "rift")).toBe(
			"Rift - custom - Clear",
		);
	});
});
