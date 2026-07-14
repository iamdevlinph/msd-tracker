// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoadoutPreviewDialog } from "@/components/loadouts/components/loadout-preview-dialog";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const { toBlob, success, error, event } = vi.hoisted(() => ({
	toBlob: vi.fn(),
	success: vi.fn(),
	error: vi.fn(),
	event: vi.fn(),
}));

vi.mock("html-to-image", () => ({ toBlob }));
vi.mock("react-hot-toast", () => ({ default: { success, error } }));
vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));

const loadout: LoadoutOwned = {
	id: "team-1",
	name: "Boss / Team",
	characters: [
		{
			characterId: 1,
			monsterlingIds: ["regular", "deleted", null],
			legendaryMonsterlingId: "legendary",
		},
		{
			characterId: 2,
			monsterlingIds: [null, null, null],
			legendaryMonsterlingId: "legendary",
		},
		{
			characterId: 3,
			monsterlingIds: [null, null, null],
		},
	],
};

describe("LoadoutPreviewDialog", () => {
	beforeEach(() => {
		Object.defineProperty(document, "fonts", {
			configurable: true,
			value: { ready: Promise.resolve() },
		});
		Object.defineProperty(HTMLImageElement.prototype, "complete", {
			configurable: true,
			get: () => true,
		});
		HTMLImageElement.prototype.decode = vi.fn().mockResolvedValue(undefined);
		useAppStore.setState({
			charactersOwned: {
				1: {
					id: 1,
					awakening: 5,
					skills: { basic: 1, switch: 2, special: 3, ultimate: 4 },
				},
				2: {
					id: 2,
					awakening: 0,
					skills: { basic: 5, switch: 6, special: 7, ultimate: 8 },
				},
			},
			monsterlingsOwned: {
				regular: { monsterling_id: 1, tier_id: 5, traits: [] },
				legendary: { monsterling_id: 100_001, tier_id: 5, traits: [] },
			},
		});
	});

	afterEach(() => vi.clearAllMocks());

	it("renders three read-only character rows and fixed missing-record slots", () => {
		render(<LoadoutPreviewDialog loadout={loadout} onOpenChange={vi.fn()} />);

		expect(screen.getByTestId("loadout-share-surface").className).toContain(
			"w-[1600px]",
		);
		expect(screen.getByAltText("Angel portrait")).toBeTruthy();
		expect(screen.getAllByTitle("Basic level 5")).toHaveLength(2);
		expect(screen.getAllByText("Monsterling 2 unavailable")).toHaveLength(3);
		expect(screen.getByText("Character unavailable")).toBeTruthy();
		expect(screen.getAllByText("Reginula")).toHaveLength(2);
		expect(screen.getAllByText("Legendary unavailable")).toHaveLength(1);
		expect(screen.getByRole("button", { name: "Copy image" })).not.toBe(
			screen.getByTestId("loadout-share-surface"),
		);
	});

	it("copies the rendered PNG and reports success", async () => {
		const blob = new Blob(["png"], { type: "image/png" });
		toBlob.mockResolvedValue(blob);
		const write = vi.fn().mockResolvedValue(undefined);
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { write },
		});
		class ClipboardItemMock {
			constructor(public data: Record<string, Promise<Blob>>) {}
		}
		vi.stubGlobal("ClipboardItem", ClipboardItemMock);
		render(<LoadoutPreviewDialog loadout={loadout} onOpenChange={vi.fn()} />);

		fireEvent.click(screen.getByRole("button", { name: "Copy image" }));
		await waitFor(() => expect(write).toHaveBeenCalledOnce());
		expect(toBlob).toHaveBeenCalledWith(
			expect.any(HTMLElement),
			expect.objectContaining({ pixelRatio: 2 }),
		);
		expect(success).toHaveBeenCalledWith("Loadout image copied");
		expect(event.mock.calls.map(([name]) => name)).toEqual([
			"loadout_copy_attempt",
			"loadout_copy_success",
		]);
	});

	it("reports copy failures without sending the raw error", async () => {
		toBlob.mockResolvedValue(new Blob(["png"], { type: "image/png" }));
		const write = vi
			.fn()
			.mockRejectedValue(new Error("private failure details"));
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { write },
		});
		class ClipboardItemMock {
			constructor(public data: Record<string, Promise<Blob>>) {}
		}
		vi.stubGlobal("ClipboardItem", ClipboardItemMock);
		render(<LoadoutPreviewDialog loadout={loadout} onOpenChange={vi.fn()} />);

		fireEvent.click(screen.getByRole("button", { name: "Copy image" }));

		await waitFor(() =>
			expect(error).toHaveBeenCalledWith("private failure details"),
		);
		expect(event.mock.calls).toEqual([
			["loadout_copy_attempt"],
			["loadout_copy_failure"],
		]);
	});
});
