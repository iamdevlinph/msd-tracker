// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { readableBytes } from "common-utils-pkg";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SyncConflictDialog } from "@/components/sync/sync-alert-dialog";
import { useAppStore } from "@/stores/app-store";
import { defaultChecklistPreferences } from "@/stores/checklist-slice";

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
		linkChainsUpgraded: 1,
	},
};

beforeEach(() => {
	event.mockClear();
	upload.mockReset();
	download.mockReset();
	select.mockReset();
	select.mockReturnValue({ monsterlingLinkChainLevels: { 67: 4 } });
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
			expect(table.className).toContain("min-w-[30rem]");
			expect(table.parentElement?.className).toContain("overflow-x-auto");
			expect(table.querySelectorAll(":scope > thead > tr > th")).toHaveLength(
				7,
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
	])("highlights the newer %s copy date", (copyName, localAt, remoteAt) => {
		useAppStore.setState({
			syncConflict: {
				local: { ...copy, updatedAt: localAt },
				remote: { ...copy, updatedAt: remoteAt },
			},
		});
		render(<SyncConflictDialog />);

		const newerAt = copyName === "local" ? localAt : remoteAt;
		const olderAt = copyName === "local" ? remoteAt : localAt;
		expect(
			screen.getByText(new Date(newerAt).toLocaleString()).className,
		).toContain("text-green");
		expect(
			screen.getByText(new Date(olderAt).toLocaleString()).className,
		).not.toContain("text-green");
	});

	it("does not highlight equal copy dates", () => {
		render(<SyncConflictDialog />);

		const equalDate = new Date(copy.updatedAt).toLocaleString();
		expect(
			screen
				.getAllByText(equalDate)
				.every((element) => !element.className.includes("text-green")),
		).toBe(true);
	});

	it.each([
		["local", 2_000, 1_000],
		["remote", 1_000, 2_000],
	])("highlights the larger %s copy size", (copyName, localSize, remoteSize) => {
		useAppStore.setState({
			syncConflict: {
				local: { ...copy, size: localSize },
				remote: { ...copy, size: remoteSize },
			},
		});
		render(<SyncConflictDialog />);

		const formatSize = (size: number) =>
			readableBytes(size, { decimals: 2, minUnit: "kB" });
		const largerSize = formatSize(
			copyName === "local" ? localSize : remoteSize,
		);
		const smallerSize = formatSize(
			copyName === "local" ? remoteSize : localSize,
		);
		expect(screen.getByText(largerSize).className).toContain("text-green");
		expect(
			screen
				.getAllByText(smallerSize)
				.every((element) => !element.className.includes("text-green")),
		).toBe(true);
	});

	it("does not highlight equal copy sizes", () => {
		render(<SyncConflictDialog />);

		const equalSize = readableBytes(1, { decimals: 2, minUnit: "kB" });
		expect(
			screen
				.getAllByText(equalSize)
				.every((element) => !element.className.includes("text-green")),
		).toBe(true);
	});

	it("highlights a newer local date and larger remote size independently", () => {
		useAppStore.setState({
			syncConflict: {
				local: { ...copy, updatedAt: 2_000, size: 1_000 },
				remote: { ...copy, updatedAt: 1_000, size: 2_000 },
			},
		});
		render(<SyncConflictDialog />);

		expect(
			screen.getByText(new Date(2_000).toLocaleString()).className,
		).toContain("text-green");
		expect(
			screen.getByText(new Date(1_000).toLocaleString()).className,
		).not.toContain("text-green");
		expect(
			screen.getByText(readableBytes(2_000, { decimals: 2, minUnit: "kB" }))
				.className,
		).toContain("text-green");
		expect(
			screen
				.getAllByText(readableBytes(1_000, { decimals: 2, minUnit: "kB" }))
				.every((element) => !element.className.includes("text-green")),
		).toBe(true);
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
		expect(upload).toHaveBeenCalledWith({
			monsterlingLinkChainLevels: { 67: 4 },
		});
	});

	it("restores shared levels and checklist data from the remote copy", async () => {
		download.mockResolvedValue({
			monsterlingLinkChainLevels: { 67: 5 },
			checklistTasks: {
				task: {
					id: "task",
					title: "Remote task",
					kind: "custom",
					startAt: "2026-07-27T00:00:00.000Z",
					scheduleVersion: 1,
				},
			},
			checklistCompletions: { "task:v1:occurrence": 123 },
			checklistPermanentNotes: { permanent: "Remote note" },
			checklistPreferences: {
				...defaultChecklistPreferences,
				showExpired: true,
			},
		});
		render(<SyncConflictDialog />);

		fireEvent.click(screen.getByRole("button", { name: "Keep Remote" }));

		await waitFor(() =>
			expect(useAppStore.getState().monsterlingLinkChainLevels).toEqual({
				67: 5,
			}),
		);
		expect(useAppStore.getState().checklistTasks.task.title).toBe(
			"Remote task",
		);
		expect(useAppStore.getState().checklistCompletions).toEqual({
			"task:v1:occurrence": 123,
		});
		expect(useAppStore.getState().checklistPermanentNotes).toEqual({
			permanent: "Remote note",
		});
		expect(useAppStore.getState().checklistPreferences.showExpired).toBe(true);
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
