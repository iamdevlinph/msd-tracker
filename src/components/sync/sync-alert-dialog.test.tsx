// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SyncConflictDialog } from "@/components/sync/sync-alert-dialog";
import { useAppStore } from "@/stores/app-store";

const { event, upload, download, select } = vi.hoisted(() => ({
	event: vi.fn(),
	upload: vi.fn(),
	download: vi.fn(),
	select: vi.fn(() => ({})),
}));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));
vi.mock("@/components/account/google/utils/drive-sync", () => ({
	upload,
	download,
	select,
}));

const copy = {
	updatedAt: 1,
	size: 1,
	metadata: {
		charactersOwned: 1,
		monsterlingsOwned: 1,
		loadouts: 1,
		codexCompleted: 1,
		codexFavorites: 1,
	},
};

beforeEach(() => {
	event.mockClear();
	upload.mockReset();
	download.mockReset();
	useAppStore.setState({
		syncConflict: { local: copy, remote: copy },
		syncInProgress: false,
	});
});

afterEach(cleanup);

describe("SyncConflictDialog tables", () => {
	it("renders both header rows as thead > tr > th", () => {
		render(<SyncConflictDialog />);
		const tables = document.querySelectorAll("table");

		expect(tables).toHaveLength(2);
		expect(screen.getByRole("alertdialog").className).toContain("min-w-0");
		expect(screen.getByText("Local copy").parentElement?.className).toContain(
			"min-w-0",
		);
		for (const table of tables) {
			expect(table.className).toContain("min-w-[32rem]");
			expect(table.parentElement?.className).toContain("overflow-x-auto");
			expect(table.querySelectorAll(":scope > thead > tr > th")).toHaveLength(
				5,
			);
			expect(table.querySelectorAll(":scope > thead > th")).toHaveLength(0);
			for (const header of table.querySelectorAll("th")) {
				expect(header.getAttribute("scope")).toBe("col");
			}
		}
	});

	it.each([
		["local", 2_000, 1_000],
		["remote", 1_000, 2_000],
	])("highlights the newer %s copy date", (_copyName, localAt, remoteAt) => {
		useAppStore.setState({
			syncConflict: {
				local: { ...copy, updatedAt: localAt },
				remote: { ...copy, updatedAt: remoteAt },
			},
		});
		render(<SyncConflictDialog />);

		const newerAt = Math.max(localAt, remoteAt);
		const olderAt = Math.min(localAt, remoteAt);
		expect(
			screen.getByText(new Date(newerAt).toLocaleString()).className,
		).toContain("text-green-600 dark:text-green-400");
		expect(
			screen.getByText(new Date(olderAt).toLocaleString()).className,
		).not.toContain("text-green");
	});

	it("tracks keeping the local copy through success", async () => {
		upload.mockResolvedValue(undefined);
		render(<SyncConflictDialog />);

		fireEvent.click(screen.getByRole("button", { name: "Keep Local" }));

		await waitFor(() =>
			expect(event.mock.calls.map(([name]) => name)).toEqual([
				"sync_conflict_keep_local_attempt",
				"sync_conflict_keep_local_success",
			]),
		);
	});

	it("tracks a missing remote copy as a failure", async () => {
		download.mockResolvedValue(null);
		render(<SyncConflictDialog />);

		fireEvent.click(screen.getByRole("button", { name: "Keep Remote" }));

		await waitFor(() =>
			expect(event.mock.calls).toEqual([
				["sync_conflict_keep_remote_attempt"],
				["sync_conflict_keep_remote_failure"],
			]),
		);
	});
});
