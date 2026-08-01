// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { showFutureLoadoutSlots } from "@/components/loadouts/components/loadout-utils";
import { LoadoutsList } from "@/components/loadouts/components/loadouts-list";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { SITE_URL } from "@/lib/seo";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const { event, toBlob, success, error } = vi.hoisted(() => ({
	event: vi.fn(),
	toBlob: vi.fn(),
	success: vi.fn(),
	error: vi.fn(),
}));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));
vi.mock("html-to-image", () => ({ toBlob }));
vi.mock("react-hot-toast", () => ({ default: { success, error } }));
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

const charactersOwned = {
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
	3: {
		id: 3,
		awakening: 0,
		skills: { basic: 1, switch: 1, special: 1, ultimate: 1 },
	},
};

const teamLoadout: LoadoutOwned = {
	id: "team",
	name: "Team",
	characters: [
		{
			characterId: 1,
			monsterlingIds: [null, null, null],
			artifactInstanceId: null,
		},
		{
			characterId: 2,
			monsterlingIds: [null, null, null],
			artifactInstanceId: null,
		},
		{
			characterId: 3,
			monsterlingIds: [null, null, null],
			artifactInstanceId: null,
		},
	],
};

describe("LoadoutsList", () => {
	beforeEach(() => {
		event.mockClear();
		toBlob.mockReset();
		success.mockClear();
		error.mockClear();
		Object.defineProperty(document, "fonts", {
			configurable: true,
			value: { ready: Promise.resolve() },
		});
		Object.defineProperty(HTMLImageElement.prototype, "complete", {
			configurable: true,
			get: () => true,
		});
		HTMLImageElement.prototype.decode = vi.fn().mockResolvedValue(undefined);
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it("renders the shared centered empty-state treatment", () => {
		useAppStore.setState({ loadouts: {} });

		render(<LoadoutsList />);

		expect(
			screen.getByRole("heading", { name: "No loadouts yet" }),
		).toBeTruthy();
		expect(
			screen.getByText(
				"Create a loadout to organize your team, Monsterlings, and artifacts.",
			),
		).toBeTruthy();
	});

	it("opens owned character and monsterling editors without previewing", () => {
		useAppStore.setState({
			charactersOwned,
			monsterlingsOwned: {
				regular: { monsterling_id: 1, tier_id: 5, traits: [] },
			},
			artifactsOwned: {
				artifact: { artifact_id: 1, fusion_level: 2 },
			},
			loadouts: {
				team: {
					...teamLoadout,
					characters: [
						{
							characterId: 1,
							monsterlingIds: ["regular", null, null],
							artifactInstanceId: "artifact",
						},
						teamLoadout.characters[1],
						teamLoadout.characters[2],
					],
				},
			},
		});
		render(<LoadoutsList />);
		expect(
			screen.queryByAltText(
				`${ELEMENTS_DATA[CHARACTERS_DATA[1].element_id].element} icon`,
			),
		).toBeNull();
		expect(screen.queryByText("A5")).toBeNull();

		const monsterlingEditor = screen.getByRole("button", {
			name: `Edit ${MONSTERLINGS_DATA[1].name} monsterling`,
		});
		const monsterlingTierBackground = within(monsterlingEditor).getByAltText(
			"5 background",
		) as HTMLImageElement;
		expect(monsterlingTierBackground.style.background).not.toBe("");

		const artifactEditor = screen.getByRole("button", {
			name: `Edit ${ARTIFACTS_DATA[1].name} artifact`,
		});
		expect(
			within(artifactEditor).getByAltText(
				`${ARTIFACTS_DATA[1].tier_id} background`,
			),
		).toBeTruthy();

		fireEvent.click(
			screen.getByRole("button", { name: "Edit Angel character" }),
		);
		expect(screen.getByRole("dialog", { name: "Angel" })).toBeTruthy();
		expect(screen.queryByRole("dialog", { name: "Team" })).toBeNull();
		expect(event).not.toHaveBeenCalledWith("loadout_preview", {
			source: "card",
		});
		expect(event).toHaveBeenCalledWith("loadout_entity_editor_open", {
			target_type: "character",
			source: "card",
		});

		fireEvent.keyDown(screen.getByRole("dialog", { name: "Angel" }), {
			key: "Escape",
		});
		fireEvent.click(
			screen.getByRole("button", {
				name: `Edit ${MONSTERLINGS_DATA[1].name} monsterling`,
			}),
		);
		expect(
			screen.getByRole("dialog", { name: "Edit Monsterling" }),
		).toBeTruthy();
		expect(event).toHaveBeenCalledWith("loadout_entity_editor_open", {
			target_type: "monsterling",
			source: "card",
		});
		expect(screen.queryByRole("dialog", { name: "Team" })).toBeNull();

		fireEvent.keyDown(
			screen.getByRole("dialog", { name: "Edit Monsterling" }),
			{
				key: "Escape",
			},
		);
		fireEvent.click(
			screen.getByRole("button", {
				name: `Edit ${ARTIFACTS_DATA[1].name} artifact`,
			}),
		);
		expect(
			screen.getByRole("dialog", { name: ARTIFACTS_DATA[1].name }),
		).toBeTruthy();
		expect(screen.queryByRole("dialog", { name: "Team" })).toBeNull();
		expect(event).not.toHaveBeenCalledWith("loadout_preview", {
			source: "card",
		});
		expect(event).toHaveBeenCalledWith("loadout_entity_editor_open", {
			target_type: "artifact",
			source: "card",
		});
	});

	it("uses the environment gate for future slots", () => {
		useAppStore.setState({
			charactersOwned,
			monsterlingsOwned: {},
			loadouts: {
				team: {
					...teamLoadout,
					characters: [
						{
							...teamLoadout.characters[0],
							equipment_ids: [1, null, null, null],
						},
						teamLoadout.characters[1],
						teamLoadout.characters[2],
					],
				},
			},
		});

		render(<LoadoutsList />);
		expect(document.querySelector(".border-l-2.border-l-primary")).toBeNull();
		expect(
			within(
				screen.getByRole("button", {
					name: `Edit ${CHARACTERS_DATA[1].name} character`,
				}),
			)
				.getByText(CHARACTERS_DATA[1].name)
				.classList.contains("hidden"),
		).toBe(true);

		const futureSlotCount = showFutureLoadoutSlots(
			import.meta.env.VITE_NODE_ENV,
		)
			? 3
			: 0;
		expect(screen.queryAllByText("Artifact")).toHaveLength(futureSlotCount);
		expect(screen.queryAllByText("headgear")).toHaveLength(2);
		expect(screen.getByAltText("Test Equipment portrait")).toBeTruthy();
		expect(screen.getAllByText("Monsterling 1")).toHaveLength(3);
		for (const label of [
			"Preview Team",
			"Edit Team",
			"Duplicate Team",
			"Copy Team image",
			"Download Team image",
			"Delete Team",
		]) {
			const action = screen.getByRole("button", { name: label });
			expect(action.title).toBe(label);
		}
		const actionRow = screen.getByRole("button", {
			name: "Preview Team",
		}).parentElement;
		expect(actionRow?.className).toContain("justify-end");
		expect(actionRow?.className).toContain("pointer-events-none");
		expect(actionRow?.className).toContain(
			"**:data-[slot=button]:pointer-events-auto",
		);
		expect(
			screen.getByRole("button", { name: "Delete Team" }).className,
		).not.toContain("ml-auto");
		expect(screen.getByText("Team").className).not.toContain("truncate");
		expect(screen.queryByText("Copy image")).toBeNull();
		expect(screen.queryByText("Download image")).toBeNull();

		fireEvent.click(
			screen.getByRole("button", { name: "Preview Team loadout card" }),
		);
		expect(screen.getByRole("dialog", { name: "Team" })).toBeTruthy();
		expect(event).toHaveBeenCalledWith("loadout_preview", { source: "card" });
	});

	it("opens the delete dialog without previewing the card", () => {
		useAppStore.setState({
			charactersOwned,
			monsterlingsOwned: {},
			loadouts: { team: teamLoadout },
		});
		render(<LoadoutsList />);

		const deleteTrigger = screen.getByRole("button", { name: "Delete Team" });
		expect(deleteTrigger.className).toContain("pointer-events-auto");
		fireEvent.click(deleteTrigger);

		expect(
			screen.getByRole("alertdialog", { name: "Delete team loadout?" }),
		).toBeTruthy();
		expect(screen.queryByRole("dialog", { name: "Team" })).toBeNull();
		expect(event).not.toHaveBeenCalledWith("loadout_preview", {
			source: "card",
		});
	});

	it("duplicates a loadout into the first available name", () => {
		useAppStore.setState({
			backupUpdatedAt: 1,
			charactersOwned,
			monsterlingsOwned: {},
			loadouts: {
				team: teamLoadout,
				team2: { ...teamLoadout, id: "team2", name: "Team #2" },
				team4: { ...teamLoadout, id: "team4", name: "Team #4" },
			},
		});
		render(<LoadoutsList />);

		fireEvent.click(screen.getByRole("button", { name: "Duplicate Team #2" }));

		const duplicate = Object.values(useAppStore.getState().loadouts).find(
			({ name }) => name === "Team #3",
		);
		expect(duplicate).toBeTruthy();
		expect(duplicate?.id).not.toBe("team2");
		expect(duplicate?.characters).toEqual(teamLoadout.characters);
		expect(duplicate?.characters).not.toBe(teamLoadout.characters);
		expect(duplicate?.characters[0].monsterlingIds).not.toBe(
			teamLoadout.characters[0].monsterlingIds,
		);
		expect(useAppStore.getState().backupUpdatedAt).toBeGreaterThan(1);
		expect(success).toHaveBeenCalledWith("Duplicated as “Team #3”");
		expect(event).toHaveBeenCalledWith("loadout_duplicate", {
			source: "card",
		});
	});

	it("duplicates from the preview and keeps the preview open", () => {
		useAppStore.setState({
			charactersOwned,
			monsterlingsOwned: {},
			loadouts: { team: teamLoadout },
		});
		render(<LoadoutsList />);
		fireEvent.click(screen.getByRole("button", { name: "Preview Team" }));

		fireEvent.click(screen.getByRole("button", { name: "Duplicate Team" }));

		expect(screen.getByRole("dialog", { name: "Team" })).toBeTruthy();
		expect(
			Object.values(useAppStore.getState().loadouts).some(
				({ name }) => name === "Team #2",
			),
		).toBe(true);
		expect(success).toHaveBeenCalledWith("Duplicated as “Team #2”");
		expect(event).toHaveBeenCalledWith("loadout_duplicate", {
			source: "preview",
		});
	});

	it("closes only item editors after saving from the preview", async () => {
		useAppStore.setState({
			charactersOwned,
			monsterlingsOwned: {
				regular: { monsterling_id: 1, tier_id: 5, traits: [] },
			},
			loadouts: {
				team: {
					...teamLoadout,
					characters: [
						{
							characterId: 1,
							monsterlingIds: ["regular", null, null],
							artifactInstanceId: null,
						},
						teamLoadout.characters[1],
						teamLoadout.characters[2],
					],
				},
			},
		});
		render(<LoadoutsList />);
		fireEvent.click(screen.getByRole("button", { name: "Preview Team" }));

		fireEvent.click(
			screen.getByRole("button", { name: "Edit Angel character" }),
		);
		const characterDialog = screen.getByRole("dialog", { name: "Angel" });
		fireEvent.click(
			within(characterDialog).getByRole("button", { name: "Update" }),
		);
		await waitFor(() =>
			expect(screen.queryByRole("dialog", { name: "Angel" })).toBeNull(),
		);
		expect(screen.getByRole("dialog", { name: "Team" })).toBeTruthy();

		fireEvent.click(
			screen.getByRole("button", {
				name: `Edit ${MONSTERLINGS_DATA[1].name} monsterling`,
			}),
		);
		const monsterlingDialog = screen.getByRole("dialog", {
			name: "Edit Monsterling",
		});
		fireEvent.click(
			within(monsterlingDialog)
				.getByRole("group", { name: "Tier" })
				.querySelectorAll("button")[3],
		);
		const updateMonsterling = within(monsterlingDialog).getByRole("button", {
			name: "Update",
		});
		fireEvent.pointerDown(updateMonsterling);
		fireEvent.click(updateMonsterling);
		await waitFor(() =>
			expect(
				screen.queryByRole("dialog", { name: "Edit Monsterling" }),
			).toBeNull(),
		);
		const previewDialog = screen.getByRole("dialog", { name: "Team" });
		expect(
			within(
				within(previewDialog).getByRole("button", {
					name: `Edit ${MONSTERLINGS_DATA[1].name} monsterling`,
				}),
			).getByAltText("4 background"),
		).toBeTruthy();

		fireEvent.click(
			within(previewDialog).getByRole("button", { name: "Close" }),
		);
		await waitFor(() =>
			expect(screen.queryByRole("dialog", { name: "Team" })).toBeNull(),
		);
	});

	it("copies and downloads the compact preview directly from the card", async () => {
		const blob = new Blob(["png"], { type: "image/png" });
		const write = vi.fn().mockResolvedValue(undefined);
		const createObjectURL = vi.fn(() => "blob:image");
		const revokeObjectURL = vi.fn();
		const click = vi
			.spyOn(HTMLAnchorElement.prototype, "click")
			.mockImplementation(() => undefined);
		setClipboard(write);
		vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
		toBlob.mockResolvedValue(blob);
		useAppStore.setState({
			charactersOwned,
			monsterlingsOwned: {},
			loadouts: { team: teamLoadout },
		});
		render(<LoadoutsList />);

		fireEvent.click(screen.getByRole("button", { name: "Copy Team image" }));

		await waitFor(() =>
			expect(success).toHaveBeenCalledWith("Loadout image copied"),
		);
		expect(write).toHaveBeenCalledOnce();
		expect(toBlob.mock.calls[0][0].style.width).toBe("868px");
		expect(toBlob.mock.calls[0][0].textContent).toContain(SITE_URL);
		expect(screen.queryByRole("dialog", { name: "Team" })).toBeNull();
		expect(event).toHaveBeenCalledWith("loadout_copy_success", {
			compact_monsterlings: true,
			hide_equipment: true,
			source: "card",
		});

		fireEvent.click(
			screen.getByRole("button", { name: "Download Team image" }),
		);

		await waitFor(() =>
			expect(success).toHaveBeenCalledWith("Loadout image downloaded"),
		);
		expect(createObjectURL).toHaveBeenCalledWith(blob);
		expect(click).toHaveBeenCalledOnce();
		expect(revokeObjectURL).toHaveBeenCalledWith("blob:image");
		expect(event).toHaveBeenCalledWith("loadout_download_success", {
			compact_monsterlings: true,
			hide_equipment: true,
			source: "card",
		});
	});
});
