import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { CharId } from "@/data/characters/CHARACTERS_DATA";
import type { EquipmentId } from "@/data/equipment/EQUIPMENT_DATA";
import type { StoreState } from "@/stores/app-store";
import { nextBackupUpdatedAt } from "@/stores/backup-timestamp";

export type EquipmentIds = [
	EquipmentId | null,
	EquipmentId | null,
	EquipmentId | null,
	EquipmentId | null,
];

const normalizeEquipmentIds = (ids: unknown): EquipmentIds =>
	Array.from({ length: 4 }, (_, index) => {
		const id = Array.isArray(ids) ? ids[index] : null;
		return typeof id === "number" ? id : null;
	}) as EquipmentIds;

export type LoadoutCharacterSlot = {
	characterId: CharId | null;
	monsterlingIds: [string | null, string | null, string | null];
	legendaryMonsterlingId?: string | null;
	artifactInstanceId: string | null;
	equipment_ids?: EquipmentIds;
	stat_values?: LoadoutCharacterStats;
	pinned_stat_ids?: LoadoutStatKey[];
};

export const LOADOUT_STAT_KEYS = [
	"atk",
	"hp",
	"crit_rate",
	"crit_dmg",
	"boss_enemy_dmg_boost",
	"special_skill_cd",
	"elem_weak_dmg_boost",
	"element_atk",
] as const;
export type LoadoutStatKey = (typeof LOADOUT_STAT_KEYS)[number];
export type LoadoutCharacterStats = Partial<Record<LoadoutStatKey, number>>;

export const DEFAULT_PINNED_STAT_IDS = [
	"atk",
	"crit_rate",
	"crit_dmg",
	"special_skill_cd",
	"element_atk",
] as const satisfies readonly LoadoutStatKey[];

export type LoadoutOwned = {
	id: string;
	name: string;
	notes?: string;
	characters: [
		LoadoutCharacterSlot,
		LoadoutCharacterSlot,
		LoadoutCharacterSlot,
	];
};

export type LoadoutCardPreferences = {
	showArtifactsAndEquipment: boolean;
};

export type LoadoutPreviewPreferences = {
	hideEquipment: boolean;
	compactMonsterlings: boolean;
};

export const DEFAULT_LOADOUT_PREVIEW_PREFERENCES: LoadoutPreviewPreferences = {
	hideEquipment: true,
	compactMonsterlings: true,
};

export const normalizeLoadoutPreviewPreferences = (
	value: unknown,
): LoadoutPreviewPreferences => ({
	hideEquipment:
		value &&
		typeof value === "object" &&
		typeof (value as Record<string, unknown>).hideEquipment === "boolean"
			? (value as Record<string, boolean>).hideEquipment
			: true,
	compactMonsterlings:
		value &&
		typeof value === "object" &&
		typeof (value as Record<string, unknown>).compactMonsterlings === "boolean"
			? (value as Record<string, boolean>).compactMonsterlings
			: true,
});

export const DEFAULT_LOADOUT_CARD_PREFERENCES: LoadoutCardPreferences = {
	showArtifactsAndEquipment: true,
};

export const normalizeLoadoutCardPreferences = (
	value: unknown,
): LoadoutCardPreferences => ({
	showArtifactsAndEquipment:
		value &&
		typeof value === "object" &&
		typeof (value as Record<string, unknown>).showArtifactsAndEquipment ===
			"boolean"
			? (value as Record<string, boolean>).showArtifactsAndEquipment
			: true,
});

const normalizeStats = (value: unknown): LoadoutCharacterStats => {
	if (!value || typeof value !== "object") return {};
	const source = value as Record<string, unknown>;
	const stats: LoadoutCharacterStats = {};
	for (const key of LOADOUT_STAT_KEYS) {
		const candidate = source[key];
		if (
			typeof candidate === "number" &&
			Number.isFinite(candidate) &&
			candidate >= 0
		)
			stats[key] = candidate;
	}
	return stats;
};

export const normalizePinnedStats = (value: unknown): LoadoutStatKey[] => {
	if (!Array.isArray(value)) return [...DEFAULT_PINNED_STAT_IDS];
	const selected = new Set(
		value.filter(
			(candidate): candidate is LoadoutStatKey =>
				typeof candidate === "string" &&
				(LOADOUT_STAT_KEYS as readonly string[]).includes(candidate),
		),
	);
	const pinnedStatIds = LOADOUT_STAT_KEYS.filter((key) =>
		selected.has(key),
	).slice(0, 5);
	return pinnedStatIds.length ? pinnedStatIds : [...DEFAULT_PINNED_STAT_IDS];
};

export type LoadoutsSlice = {
	loadouts: Record<string, LoadoutOwned>;
	loadoutCardPreferences: LoadoutCardPreferences;
	loadoutPreviewPreferences: LoadoutPreviewPreferences;
	showEquipmentSetNames: boolean;

	setLoadout: (loadout: Omit<LoadoutOwned, "id">, id?: string) => void;
	setLoadoutCardPreferences: (
		preferences: Partial<LoadoutCardPreferences>,
	) => void;
	setShowEquipmentSetNames: (show: boolean) => void;
	setLoadoutPreviewPreferences: (
		preferences: Partial<LoadoutPreviewPreferences>,
	) => void;
	deleteLoadout: (id: string) => void;
	resetLoadoutsSlice: () => void;
};

export const emptyLoadoutCharacterSlot = (): LoadoutCharacterSlot => ({
	characterId: null,
	monsterlingIds: [null, null, null],
	legendaryMonsterlingId: null,
	artifactInstanceId: null,
	equipment_ids: [null, null, null, null],
	stat_values: {},
	pinned_stat_ids: [...DEFAULT_PINNED_STAT_IDS],
});

export const normalizeLoadouts = (
	loadouts: unknown,
): Record<string, LoadoutOwned> => {
	if (!loadouts || typeof loadouts !== "object") return {};
	return Object.fromEntries(
		Object.entries(loadouts as Record<string, Partial<LoadoutOwned>>).flatMap(
			([id, loadout]) => {
				if (!loadout || !Array.isArray(loadout.characters)) return [];
				const characters = loadout.characters.slice(0, 3).map((slot) => ({
					characterId: slot.characterId ?? null,
					monsterlingIds: [...(slot.monsterlingIds ?? [null, null, null])],
					legendaryMonsterlingId: slot.legendaryMonsterlingId ?? null,
					artifactInstanceId: slot.artifactInstanceId ?? null,
					equipment_ids: normalizeEquipmentIds(slot.equipment_ids),
					stat_values: normalizeStats(
						(slot as Partial<LoadoutCharacterSlot>).stat_values ??
							(slot as Record<string, unknown>).stats,
					),
					pinned_stat_ids: normalizePinnedStats(
						(slot as Partial<LoadoutCharacterSlot>).pinned_stat_ids ??
							(slot as Record<string, unknown>).pinnedStats,
					),
				})) as LoadoutOwned["characters"];
				while (characters.length < 3)
					characters.push(emptyLoadoutCharacterSlot());
				const notes =
					typeof loadout.notes === "string" ? loadout.notes.slice(0, 2000) : "";
				return [
					[
						id,
						{
							id,
							name: typeof loadout.name === "string" ? loadout.name : "Loadout",
							notes,
							characters,
						},
					],
				];
			},
		),
	);
};

export const createLoadoutsSlice: StateCreator<
	StoreState,
	[],
	[],
	LoadoutsSlice
> = (set) => ({
	loadouts: {},
	loadoutCardPreferences: DEFAULT_LOADOUT_CARD_PREFERENCES,
	loadoutPreviewPreferences: DEFAULT_LOADOUT_PREVIEW_PREFERENCES,
	showEquipmentSetNames: false,

	setLoadout: (loadout, id) =>
		set((state) => {
			const loadoutId = id ?? nanoid();

			return {
				loadouts: {
					...state.loadouts,
					[loadoutId]: {
						id: loadoutId,
						...loadout,
					},
				},
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),

	setLoadoutCardPreferences: (preferences) =>
		set((state) => {
			const next = normalizeLoadoutCardPreferences({
				...state.loadoutCardPreferences,
				...preferences,
			});
			if (
				next.showArtifactsAndEquipment ===
				state.loadoutCardPreferences.showArtifactsAndEquipment
			)
				return state;
			return {
				loadoutCardPreferences: next,
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),

	setShowEquipmentSetNames: (show) =>
		set((state) =>
			state.showEquipmentSetNames === show
				? state
				: {
						showEquipmentSetNames: show,
						backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
					},
		),

	setLoadoutPreviewPreferences: (preferences) =>
		set((state) => {
			const next = normalizeLoadoutPreviewPreferences({
				...state.loadoutPreviewPreferences,
				...preferences,
			});
			if (
				next.hideEquipment === state.loadoutPreviewPreferences.hideEquipment &&
				next.compactMonsterlings ===
					state.loadoutPreviewPreferences.compactMonsterlings
			)
				return state;
			return {
				loadoutPreviewPreferences: next,
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),

	deleteLoadout: (id) =>
		set((state) => {
			const { [id]: _toDelete, ...rest } = state.loadouts;

			return {
				loadouts: { ...rest },
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),

	resetLoadoutsSlice: () =>
		set((state) => ({
			loadouts: {},
			backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
		})),
});
