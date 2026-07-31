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
import { STAT_ID_BY_STAT } from "@/data/STAT_DATA";
import { SITE_URL } from "@/lib/seo";
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

	it("renders three read-only character rows and fixed missing-record slots", () => {
		renderPreview();

		const surface = screen.getByTestId("loadout-share-surface");
		expect(surface.className).toContain("w-[1116px]");
		const title = surface.querySelector("h2") as HTMLHeadingElement;
		expect(title.className).toContain("min-w-0");
		expect(title.className).toContain("flex-1");
		expect(title.className).toContain("truncate");
		expect(title.title).toBe(loadout.name);
		expect(screen.getByText("Team Loadout").className).toContain("shrink-0");
		const siteLink = screen.getByRole("link", { name: SITE_URL });
		expect(siteLink.getAttribute("href")).toBe(SITE_URL);
		expect(siteLink.parentElement?.className).toContain("justify-end");
		expect(siteLink.parentElement?.className).toContain("pb-1");
		expect(siteLink.parentElement?.className).toContain("pt-2");
		expect(screen.getByRole("dialog").className).toContain("sm:max-w-max");
		expect(
			(
				screen.getByRole("checkbox", {
					name: "Compact monsterlings",
				}) as HTMLButtonElement
			).dataset.state,
		).toBe("checked");
		expect(screen.getByAltText("Stat ATK img")).toBeTruthy();
		expect(screen.getByAltText("Link Chain Level 5")).toBeTruthy();
		expect(screen.getByText("Fall from Grace")).toBeTruthy();
		const artifactImage = screen.getByAltText("Fall from Grace portrait");
		expect(artifactImage.className).not.toContain("scale-");
		expect(artifactImage.parentElement?.className).toContain("size-[120px]");
		expect(
			screen
				.getAllByAltText("4 background")
				.some((background) => background.getAttribute("width") === "120"),
		).toBe(true);
		expect(
			artifactImage.compareDocumentPosition(
				screen.getByAltText("Stat ATK img"),
			),
		).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
		expect(screen.getByAltText("Fusion level 2")).toBeTruthy();
		expect(screen.getAllByText("Artifact unavailable")[0].className).toContain(
			"text-center",
		);
		expect(screen.queryByText("ATK")).toBeNull();
		expect(
			screen
				.getAllByAltText(/Tier [2-5] trait img/)
				.every((image) => image.className.includes("h-[30px]")),
		).toBe(true);
		expect(screen.getByAltText("Angel portrait")).toBeTruthy();
		expect(screen.getByAltText("Francis portrait").className).toContain(
			"object-bottom",
		);
		const variantBadge = screen.getByText("Summer Dive!");
		expect(variantBadge.className).toContain("backdrop-blur-sm");
		expect(variantBadge.style.background).toBe(
			"var(--loadout-export-variant-background, transparent)",
		);
		expect(screen.getByAltText("Earth icon")).toBeTruthy();
		expect(screen.queryByAltText("Support icon")).toBeNull();
		expect(screen.queryByAltText("awakening icon")).toBeNull();
		expect(screen.getByTitle("Awakening 5")).toBeTruthy();
		expect(screen.getAllByTitle("Basic level 5")).toHaveLength(2);
		const skillCells = screen.getAllByTitle(
			/^(Special|Switch|Basic|Ultimate) level /,
		);
		expect(
			skillCells.every((skill) =>
				skill.className.includes("place-items-center"),
			),
		).toBe(true);
		expect(skillCells[0].parentElement?.style.gridTemplateColumns).toBe(
			"var(--loadout-export-skill-columns, repeat(4, minmax(0, 1fr)))",
		);
		expect(
			skillCells.every((skill) =>
				skill.querySelector("span")?.className.includes("whitespace-nowrap"),
			),
		).toBe(true);
		expect(screen.getAllByText("Monsterling 2 unavailable")).toHaveLength(3);
		expect(screen.getByText("Character unavailable")).toBeTruthy();
		expect(screen.getAllByText("Reginula")).toHaveLength(2);
		expect(screen.getAllByText("Legendary unavailable")).toHaveLength(1);
		for (const label of [
			"Edit Boss / Team",
			"Duplicate Boss / Team",
			"Copy Boss / Team image",
			"Download Boss / Team image",
			"Delete Boss / Team",
		]) {
			const action = screen.getByRole("button", { name: label });
			expect(action.title).toBe(label);
		}
		expect(
			screen.queryByRole("button", { name: "Preview Boss / Team" }),
		).toBeNull();
		expect(screen.queryByText("Copy image")).toBeNull();
		expect(screen.queryByText("Download image")).toBeNull();
	});

	it("exposes edit callbacks only for owned preview records", () => {
		const onEditCharacter = vi.fn();
		const onEditMonsterling = vi.fn();
		const callbacks = renderPreview();
		cleanup();
		render(
			<LoadoutPreviewDialog
				loadout={loadout}
				{...callbacks}
				onEditCharacter={onEditCharacter}
				onEditMonsterling={onEditMonsterling}
			/>,
		);

		fireEvent.click(
			screen.getByRole("button", { name: "Edit Angel character" }),
		);
		const monsterlingButton = screen.getAllByRole("button", {
			name: /Edit .* monsterling/,
		})[0];
		expect(monsterlingButton.className).toContain("w-fit");
		fireEvent.click(monsterlingButton);
		expect(onEditCharacter).toHaveBeenCalledWith(1);
		expect(onEditMonsterling).toHaveBeenCalledWith("regular");
		expect(
			screen.queryByRole("button", { name: "Edit Character unavailable" }),
		).toBeNull();
		expect(screen.getAllByText("Monsterling 2 unavailable")).toHaveLength(3);
	});

	it("hides stat labels but keeps stat icons and tier backgrounds in compact mode", () => {
		const { onOpenChange } = renderPreview();
		const checkbox = screen.getByRole("checkbox", {
			name: "Compact monsterlings",
		});

		expect(screen.getByTestId("loadout-share-surface").className).toContain(
			"w-[1116px]",
		);
		expect(screen.getByRole("dialog").className).toContain("sm:max-w-max");
		expect(screen.getByAltText("Stat ATK img").className).toContain("size-5");
		expect(screen.queryByText("ATK")).toBeNull();
		expect(screen.queryByText("DEF")).toBeNull();
		expect(screen.queryByText("HP")).toBeNull();
		expect(screen.queryByText("Crit Rate")).toBeNull();
		const tierStrips = [2, 3, 4, 5].map((tier) =>
			screen.getByAltText(`Tier ${tier} trait img`),
		);
		for (const tierStrip of tierStrips) {
			expect(tierStrip.className).toContain("h-[30px]");
			expect(tierStrip.className).toContain("w-[200px]");
			expect(tierStrip.className).toContain("max-w-none");
		}
		const tierStrip = tierStrips[3];
		expect(tierStrip.parentElement?.parentElement?.className).toContain(
			"overflow-hidden",
		);
		expect(
			(screen.getAllByAltText("5 background")[0] as HTMLImageElement).style
				.background,
		).not.toBe("");

		fireEvent.click(checkbox);
		fireEvent.click(screen.getByRole("button", { name: "Close" }));

		expect(onOpenChange).toHaveBeenCalledWith(false);
		expect((checkbox as HTMLButtonElement).dataset.state).toBe("checked");
	});

	it("captures and tracks the compact layout", async () => {
		let exportBackgroundDuringCapture = "";
		let exportSkillColumnsDuringCapture = "";
		toBlob.mockImplementation((node: HTMLElement) => {
			exportBackgroundDuringCapture = node.style.getPropertyValue(
				"--loadout-export-variant-background",
			);
			exportSkillColumnsDuringCapture = node.style.getPropertyValue(
				"--loadout-export-skill-columns",
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
		expect(capturedSurface.className).toContain("w-[1116px]");
		expect(exportBackgroundDuringCapture).toBe("#18181b");
		expect(exportSkillColumnsDuringCapture).toBe("repeat(2, minmax(0, 1fr))");
		expect(
			capturedSurface.style.getPropertyValue(
				"--loadout-export-variant-background",
			),
		).toBe("");
		expect(
			capturedSurface.style.getPropertyValue("--loadout-export-skill-columns"),
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

	it("runs edit, duplicate, and confirmed delete actions", () => {
		const { onEdit, onDuplicate, onDelete } = renderPreview();

		fireEvent.click(screen.getByRole("button", { name: "Edit Boss / Team" }));
		fireEvent.click(
			screen.getByRole("button", { name: "Duplicate Boss / Team" }),
		);
		fireEvent.click(screen.getByRole("button", { name: "Delete Boss / Team" }));
		fireEvent.click(screen.getByRole("button", { name: "Delete" }));

		expect(onEdit).toHaveBeenCalledOnce();
		expect(onDuplicate).toHaveBeenCalledOnce();
		expect(onDelete).toHaveBeenCalledOnce();
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
			expect(
				node.style.getPropertyValue("--loadout-export-skill-columns"),
			).toBe("repeat(2, minmax(0, 1fr))");
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
		expect(
			capturedSurface?.style.getPropertyValue("--loadout-export-skill-columns"),
		).toBe("");
	});
});
