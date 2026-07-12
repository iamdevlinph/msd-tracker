// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SyncConflictDialog } from "@/components/sync/sync-alert-dialog";
import { useAppStore } from "@/stores/app-store";

afterEach(cleanup);

describe("SyncConflictDialog tables", () => {
	it("renders both header rows as thead > tr > th", () => {
		const copy = {
			updatedAt: 1,
			size: 1,
			metadata: {
				charactersOwned: 1,
				monsterlingsOwned: 1,
				loadouts: 1,
				codexCompleted: 1,
			},
		};
		useAppStore.setState({ syncConflict: { local: copy, remote: copy } });
		render(<SyncConflictDialog />);
		const tables = document.querySelectorAll("table");

		expect(tables).toHaveLength(2);
		for (const table of tables) {
			expect(table.querySelectorAll(":scope > thead > tr > th")).toHaveLength(
				4,
			);
			expect(table.querySelectorAll(":scope > thead > th")).toHaveLength(0);
			for (const header of table.querySelectorAll("th")) {
				expect(header.getAttribute("scope")).toBe("col");
			}
		}
	});
});
