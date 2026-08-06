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

const { event, resolveSyncConflict } = vi.hoisted(() => ({
	event: vi.fn(),
	resolveSyncConflict: vi.fn(),
}));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));
vi.mock("@/components/account/google/utils/drive-sync", () => ({
	resolveSyncConflict,
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
	resolveSyncConflict.mockReset();
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
		resolveSyncConflict.mockResolvedValue(undefined);
		render(<SyncConflictDialog />);

		fireEvent.click(screen.getByRole("button", { name: "Keep Local" }));

		await waitFor(() =>
			expect(event.mock.calls.map(([name]) => name)).toEqual([
				"sync_conflict_keep_local_attempt",
				"sync_conflict_keep_local_success",
			]),
		);
		expect(resolveSyncConflict).toHaveBeenCalledWith("local");
	});

	it("tracks keeping the remote copy through success", async () => {
		resolveSyncConflict.mockResolvedValue(undefined);
		render(<SyncConflictDialog />);

		fireEvent.click(screen.getByRole("button", { name: "Keep Remote" }));

		await waitFor(() =>
			expect(event.mock.calls.map(([name]) => name)).toEqual([
				"sync_conflict_keep_remote_attempt",
				"sync_conflict_keep_remote_success",
			]),
		);
		expect(resolveSyncConflict).toHaveBeenCalledWith("remote");
	});

	it("tracks a remote resolution failure", async () => {
		resolveSyncConflict.mockRejectedValue(new Error("Remote unavailable"));
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
