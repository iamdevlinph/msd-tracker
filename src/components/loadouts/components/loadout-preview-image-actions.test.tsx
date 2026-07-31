// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoadoutPreviewDialog } from "@/components/loadouts/components/loadout-preview-dialog";
import { STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
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

class ClipboardItemMock {
	constructor(public data: Record<string, Promise<Blob>>) {}
}

const setClipboard = (write: ReturnType<typeof vi.fn>) => {
	Object.defineProperty(navigator, "clipboard", {
		configurable: true,
		value: { write },
	});
	vi.stubGlobal("ClipboardItem", ClipboardItemMock);
};

const loadout: LoadoutOwned = {
	id: "team-1",
	name: "Boss / Team",
	characters: [
		{
			characterId: 1,
			monsterlingIds: ["regular", "deleted", null],
			artifactInstanceId: "artifact",
			legendaryMonsterlingId: "legendary",
		},
		{
			characterId: 200_005,
			monsterlingIds: [null, null, null],
			artifactInstanceId: null,
			legendaryMonsterlingId: "legendary",
		},
		{
			characterId: 3,
			monsterlingIds: [null, null, null],
			artifactInstanceId: null,
		},
	],
};

const renderPreview = () => {
	const callbacks = {
		onOpenChange: vi.fn(),
		onEdit: vi.fn(),
		onDuplicate: vi.fn(),
		onDelete: vi.fn(),
	};
	render(<LoadoutPreviewDialog loadout={loadout} {...callbacks} />);
	return callbacks;
};

describe("LoadoutPreviewDialog image export", () => {
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
				200005: {
					id: 200_005,
					awakening: 0,
					skills: { basic: 5, switch: 6, special: 7, ultimate: 8 },
				},
			},
			monsterlingsOwned: {
				regular: {
					monsterling_id: 67,
					tier_id: 5,
					traits: [
						{ stat_id: STAT_ID_BY_STAT.ATK, tier_id: 5 },
						{ stat_id: STAT_ID_BY_STAT.DEF, tier_id: 4 },
						{ stat_id: STAT_ID_BY_STAT.HP, tier_id: 3 },
						{ stat_id: STAT_ID_BY_STAT.CRIT_RATE, tier_id: 2 },
					],
				},
				legendary: {
					monsterling_id: 100_001,
					tier_id: 5,
					traits: [],
				},
			},
			artifactsOwned: {
				artifact: { artifact_id: 1, fusion_level: 2 },
			},
			monsterlingLinkChainLevels: { 67: 5 },
		});
	});

	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});
	it("captures and tracks the compact layout", async () => {
		let exportBackgroundDuringCapture = "";
		toBlob.mockImplementation((node: HTMLElement) => {
			exportBackgroundDuringCapture = node.style.getPropertyValue(
				"--loadout-export-variant-background",
			);
			return Promise.resolve(new Blob(["png"], { type: "image/png" }));
		});
		const write = vi.fn().mockResolvedValue(undefined);
		setClipboard(write);
		renderPreview();

		fireEvent.click(
			screen.getByRole("button", { name: "Copy Boss / Team image" }),
		);

		await waitFor(() => expect(write).toHaveBeenCalledOnce());
		const capturedSurface = toBlob.mock.calls[0][0] as HTMLElement;
		expect(capturedSurface.style.width).toBe("1050px");
		expect(exportBackgroundDuringCapture).toBe("#18181b");
		expect(
			capturedSurface.style.getPropertyValue(
				"--loadout-export-variant-background",
			),
		).toBe("");
		expect(event.mock.calls).toEqual([
			[
				"loadout_copy_attempt",
				{ compact_monsterlings: true, source: "preview" },
			],
			[
				"loadout_copy_success",
				{ compact_monsterlings: true, source: "preview" },
			],
		]);
	});

	it("copies the rendered PNG and reports success", async () => {
		const blob = new Blob(["png"], { type: "image/png" });
		toBlob.mockResolvedValue(blob);
		const write = vi.fn().mockResolvedValue(undefined);
		setClipboard(write);
		renderPreview();

		fireEvent.click(
			screen.getByRole("button", { name: "Copy Boss / Team image" }),
		);
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
		expect(
			event.mock.calls.every(
				([, params]) =>
					params.compact_monsterlings && params.source === "preview",
			),
		).toBe(true);
	});

	it("reports copy failures without sending the raw error", async () => {
		toBlob.mockResolvedValue(new Blob(["png"], { type: "image/png" }));
		const write = vi
			.fn()
			.mockRejectedValue(new Error("private failure details"));
		setClipboard(write);
		renderPreview();

		fireEvent.click(
			screen.getByRole("button", { name: "Copy Boss / Team image" }),
		);

		await waitFor(() =>
			expect(error).toHaveBeenCalledWith("private failure details"),
		);
		expect(event.mock.calls).toEqual([
			[
				"loadout_copy_attempt",
				{ compact_monsterlings: true, source: "preview" },
			],
			[
				"loadout_copy_failure",
				{ compact_monsterlings: true, source: "preview" },
			],
		]);
	});

	it("restores export styles after image conversion fails", async () => {
		let capturedSurface: HTMLElement | undefined;
		toBlob.mockImplementation((node: HTMLElement) => {
			capturedSurface = node;
			expect(
				node.style.getPropertyValue("--loadout-export-variant-background"),
			).toBe("#18181b");
			return Promise.reject(new Error("conversion failed"));
		});
		setClipboard(vi.fn());
		renderPreview();

		fireEvent.click(
			screen.getByRole("button", { name: "Copy Boss / Team image" }),
		);

		await waitFor(() =>
			expect(error).toHaveBeenCalledWith("conversion failed"),
		);
		expect(
			capturedSurface?.style.getPropertyValue(
				"--loadout-export-variant-background",
			),
		).toBe("");
	});
});
