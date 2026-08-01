// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoadoutPreviewDialog } from "@/components/loadouts/components/loadout-preview-dialog";
import { STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
import { SITE_URL } from "@/lib/seo";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const { event } = vi.hoisted(() => ({ event: vi.fn() }));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));
vi.mock("@/data/equipment/EQUIPMENT_DATA", () => ({
	EQUIPMENT_PART_TYPES: ["headgear", "chestpiece", "gloves", "footwear"],
	EQUIPMENT_DATA: {
		1: {
			id: 1,
			name: "Test Equipment",
			image: "/equipment.webp",
			tier_id: 5,
			part_type: "headgear",
			set_name: "Test Set",
			set_effects: [{ pieces: 2, effect: "Test effect" }],
		},
	},
}));

const loadout: LoadoutOwned = {
	id: "team-1",
	name: "Boss / Team",
	characters: [
		{
			characterId: 1,
			monsterlingIds: ["regular", "deleted", null],
			artifactInstanceId: "artifact",
			legendaryMonsterlingId: "legendary",
			equipment_ids: [1, null, null, null],
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
		event.mockClear();
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
		expect(surface.style.width).toBe("868px");
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
		expect(screen.queryByAltText("Stat ATK img")).toBeNull();
		expect(screen.getByAltText("Link Chain Level 5")).toBeTruthy();
		expect(screen.getByText("Fall from Grace")).toBeTruthy();
		expect(screen.queryByAltText("Test Equipment portrait")).toBeNull();
		expect(
			screen.getByRole("checkbox", { name: "Hide equipment" }),
		).toBeTruthy();
		expect(surface.querySelector(".border-l-2.border-primary")).toBeNull();
		const artifactImage = screen.getByAltText("Fall from Grace portrait");
		expect(artifactImage.className).not.toContain("scale-");
		expect(artifactImage.parentElement?.className).toContain("size-[120px]");
		expect(
			screen
				.getAllByAltText("4 background")
				.some((background) => background.getAttribute("width") === "120"),
		).toBe(true);
		expect(screen.getByAltText("Fusion level 2")).toBeTruthy();
		expect(screen.getAllByText("Artifact unavailable")[0].className).toContain(
			"text-center",
		);
		expect(screen.queryByText("ATK")).toBeNull();
		expect(screen.queryAllByAltText(/Tier [2-5] trait img/)).toHaveLength(0);
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
				skill.className.includes("grid-cols-[1fr_auto]"),
			),
		).toBe(true);
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
		const onEditArtifact = vi.fn();
		const callbacks = renderPreview();
		cleanup();
		render(
			<LoadoutPreviewDialog
				loadout={loadout}
				{...callbacks}
				onEditCharacter={onEditCharacter}
				onEditMonsterling={onEditMonsterling}
				onEditArtifact={onEditArtifact}
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
		fireEvent.click(
			screen.getByRole("button", {
				name: "Edit Fall from Grace artifact",
			}),
		);
		expect(onEditCharacter).toHaveBeenCalledWith(1);
		expect(onEditMonsterling).toHaveBeenCalledWith("regular");
		expect(onEditArtifact).toHaveBeenCalledWith("artifact");
		expect(
			screen.queryByRole("button", { name: "Edit Character unavailable" }),
		).toBeNull();
		expect(screen.getAllByText("Monsterling 2 unavailable")).toHaveLength(3);
	});

	it("hides the stat pane and keeps tier backgrounds in compact mode", () => {
		const { onOpenChange } = renderPreview();
		const checkbox = screen.getByRole("checkbox", {
			name: "Compact monsterlings",
		});

		expect(screen.getByTestId("loadout-share-surface").style.width).toBe(
			"868px",
		);
		expect(screen.getByRole("dialog").className).toContain("sm:max-w-max");
		expect(screen.queryByAltText("Stat ATK img")).toBeNull();
		expect(screen.queryByText("ATK")).toBeNull();
		expect(screen.queryByText("DEF")).toBeNull();
		expect(screen.queryByText("HP")).toBeNull();
		expect(screen.queryByText("Crit Rate")).toBeNull();
		expect(screen.queryAllByAltText(/Tier [2-5] trait img/)).toHaveLength(0);
		expect(
			(screen.getAllByAltText("5 background")[0] as HTMLImageElement).style
				.background,
		).not.toBe("");

		fireEvent.click(checkbox);
		expect(event).toHaveBeenCalledWith("loadout_preview_compact_toggle", {
			compact_monsterlings: false,
		});

		expect(screen.getByTestId("loadout-share-surface").style.width).toBe(
			"1708px",
		);
		expect(screen.getByRole("dialog").className).toContain(
			"2xl:max-w-[1772px]",
		);
		expect(screen.getByText("ATK")).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: "Close" }));

		expect(onOpenChange).toHaveBeenCalledWith(false);
		expect(event).toHaveBeenCalledWith("loadout_preview_close");
		expect((checkbox as HTMLButtonElement).dataset.state).toBe("checked");
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
});
