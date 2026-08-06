import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import {
	LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS,
	LOADOUT_SNAPSHOT_DIFFICULTIES,
	LOADOUT_SNAPSHOT_ELEMENTS,
	LOADOUT_SNAPSHOT_TAGS,
	type LoadoutSnapshotConquestBossId,
	type LoadoutSnapshotDifficulty,
	type LoadoutSnapshotElement,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import { formatLoadoutSnapshotNameForTag } from "@/components/loadout-snapshots/utils/loadout-snapshot-name";
import type { StoreState } from "@/stores/app-store";
import { type LoadoutOwned, normalizeLoadouts } from "@/stores/loadouts-slice";

const LOADOUT_SNAPSHOT_TAG_VALUES = Object.values(LOADOUT_SNAPSHOT_TAGS);
const LOADOUT_SNAPSHOT_DIFFICULTY_VALUES = Object.values(
	LOADOUT_SNAPSHOT_DIFFICULTIES,
);
const LOADOUT_SNAPSHOT_ELEMENT_VALUES = Object.values(
	LOADOUT_SNAPSHOT_ELEMENTS,
);
const MAX_SNAPSHOT_NOTES_LENGTH = 2000;

export type ConquestSnapshotDetails = {
	difficulty: LoadoutSnapshotDifficulty;
	level: number;
	clear_time: string;
	boss_id?: LoadoutSnapshotConquestBossId;
	res_element_ids?: LoadoutSnapshotElement[];
};
export type RiftSnapshotDetails = {
	level: number;
	score?: number;
};
export type LegendaryConquestSnapshotDetails = {
	element_id: LoadoutSnapshotElement;
	score: number;
	res_element_ids?: LoadoutSnapshotElement[];
};
export type LoadoutSnapshotDetails =
	| ConquestSnapshotDetails
	| RiftSnapshotDetails
	| LegendaryConquestSnapshotDetails;

const isRecord = (value: unknown): value is Record<string, unknown> =>
	!!value && typeof value === "object";

export const normalizeLoadoutSnapshotNotes = (value: unknown): string =>
	typeof value === "string" ? value.slice(0, MAX_SNAPSHOT_NOTES_LENGTH) : "";

const isNonnegativeInteger = (value: unknown): value is number =>
	typeof value === "number" && Number.isInteger(value) && value >= 0;

const normalizeLoadoutSnapshotResElements = (
	value: unknown,
): LoadoutSnapshotElement[] =>
	Array.isArray(value)
		? [...new Set(value)].filter(
				(elementId): elementId is LoadoutSnapshotElement =>
					LOADOUT_SNAPSHOT_ELEMENT_VALUES.includes(
						elementId as LoadoutSnapshotElement,
					),
			)
		: [];

export const isValidLoadoutSnapshotClearTime = (
	value: unknown,
): value is string =>
	typeof value === "string" && /^\d{2}:[0-5]\d\.\d{2}$/.test(value);

/** Normalize category-specific metadata; invalid metadata is deliberately discarded. */
export const normalizeLoadoutSnapshotDetails = (
	tag: LoadoutSnapshotTag,
	value: unknown,
): LoadoutSnapshotDetails | null => {
	if (!isRecord(value)) return null;
	if (tag === LOADOUT_SNAPSHOT_TAGS.CONQUEST) {
		const difficulty = value.difficulty;
		const level = value.level;
		if (
			!LOADOUT_SNAPSHOT_DIFFICULTY_VALUES.includes(
				difficulty as LoadoutSnapshotDifficulty,
			) ||
			typeof level !== "number" ||
			!Number.isInteger(level) ||
			level < 1 ||
			level > 10 ||
			!isValidLoadoutSnapshotClearTime(value.clear_time)
		)
			return null;
		const bossId = value.boss_id;
		const normalizedBossId = LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS.includes(
			bossId as never,
		)
			? (bossId as LoadoutSnapshotConquestBossId)
			: undefined;
		return {
			difficulty: difficulty as LoadoutSnapshotDifficulty,
			level,
			clear_time: value.clear_time,
			...(normalizedBossId === undefined ? {} : { boss_id: normalizedBossId }),
			res_element_ids: normalizeLoadoutSnapshotResElements(
				value.res_element_ids,
			),
		};
	}
	if (tag === LOADOUT_SNAPSHOT_TAGS.RIFT) {
		const level = value.level;
		if (
			typeof level !== "number" ||
			!Number.isInteger(level) ||
			level < 1 ||
			level > 50
		)
			return null;
		const score = value.score;
		if (score !== undefined && !isNonnegativeInteger(score)) return null;
		return score === undefined ? { level } : { level, score };
	}
	if (tag === LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST) {
		const elementId = value.element_id;
		if (
			!LOADOUT_SNAPSHOT_ELEMENT_VALUES.includes(
				elementId as LoadoutSnapshotElement,
			) ||
			!isNonnegativeInteger(value.score)
		)
			return null;
		return {
			element_id: elementId as LoadoutSnapshotElement,
			score: value.score,
			res_element_ids: normalizeLoadoutSnapshotResElements(
				value.res_element_ids,
			),
		};
	}
	return null;
};

export type LoadoutSnapshot = {
	id: string;
	name: string;
	tag: LoadoutSnapshotTag;
	created_at: number;
	loadout: LoadoutOwned;
	characters_owned: StoreState["charactersOwned"];
	monsterlings_owned: StoreState["monsterlingsOwned"];
	monsterling_link_chain_levels: StoreState["monsterlingLinkChainLevels"];
	artifacts_owned: StoreState["artifactsOwned"];
	/** Legacy records may omit these fields; normalization always materializes them. */
	notes?: string;
	details?: LoadoutSnapshotDetails | null;
};

export type LoadoutSnapshotsSlice = {
	loadoutSnapshots: Record<string, LoadoutSnapshot>;
	createLoadoutSnapshot: (input: {
		loadoutId: string;
		name: string;
		tag?: LoadoutSnapshotTag;
		notes?: string;
		details?: unknown;
	}) => string | null;
	updateLoadoutSnapshot: (
		id: string,
		input: {
			name: string;
			tag: LoadoutSnapshotTag;
			notes?: string;
			details?: unknown;
		},
	) => void;
	deleteLoadoutSnapshot: (id: string) => void;
	resetLoadoutSnapshots: () => void;
};

const selectRecord = <T>(
	record: Record<string | number, T>,
	ids: Set<string>,
) =>
	Object.fromEntries(
		[...ids].flatMap((id) => (record[id] ? [[id, record[id]]] : [])),
	) as Record<string, T>;

export const normalizeLoadoutSnapshots = (
	value: unknown,
): Record<string, LoadoutSnapshot> => {
	if (!value || typeof value !== "object") return {};
	return Object.fromEntries(
		Object.entries(value as Record<string, Partial<LoadoutSnapshot>>).flatMap(
			([id, snapshot]) => {
				if (!snapshot || typeof snapshot !== "object") return [];
				const name =
					typeof snapshot.name === "string" ? snapshot.name.trim() : "";
				const createdAt = snapshot.created_at;
				const loadout = normalizeLoadouts({ [id]: snapshot.loadout })[id];
				if (
					!name ||
					!loadout ||
					typeof createdAt !== "number" ||
					!Number.isFinite(createdAt) ||
					createdAt < 0
				)
					return [];
				const tag = LOADOUT_SNAPSHOT_TAG_VALUES.includes(
					snapshot.tag as LoadoutSnapshotTag,
				)
					? (snapshot.tag as LoadoutSnapshotTag)
					: LOADOUT_SNAPSHOT_TAGS.OTHERS;
				const details = normalizeLoadoutSnapshotDetails(tag, snapshot.details);
				return [
					[
						id,
						{
							id,
							name,
							tag,
							created_at: createdAt,
							loadout,
							characters_owned: structuredClone(
								snapshot.characters_owned ?? {},
							),
							monsterlings_owned: structuredClone(
								snapshot.monsterlings_owned ?? {},
							),
							monsterling_link_chain_levels: structuredClone(
								snapshot.monsterling_link_chain_levels ?? {},
							),
							artifacts_owned: structuredClone(snapshot.artifacts_owned ?? {}),
							notes: normalizeLoadoutSnapshotNotes(snapshot.notes),
							details,
						},
					],
				];
			},
		),
	);
};

export const createLoadoutSnapshotsSlice: StateCreator<
	StoreState,
	[],
	[],
	LoadoutSnapshotsSlice
> = (set, get) => ({
	loadoutSnapshots: {},
	createLoadoutSnapshot: ({
		loadoutId,
		name,
		tag = LOADOUT_SNAPSHOT_TAGS.OTHERS,
		notes,
		details,
	}) => {
		const state = get();
		const loadout = state.loadouts[loadoutId];
		const trimmedName = name.trim();
		if (!loadout || !trimmedName) return null;
		const snapshotName = formatLoadoutSnapshotNameForTag(trimmedName, tag);
		const snapshotDetails = normalizeLoadoutSnapshotDetails(tag, details);
		const characterIds = new Set(
			loadout.characters.flatMap(({ characterId }) =>
				characterId === null ? [] : [String(characterId)],
			),
		);
		const monsterlingIds = new Set(
			loadout.characters.flatMap((slot) =>
				[...slot.monsterlingIds, slot.legendaryMonsterlingId ?? null].filter(
					(id): id is string => id !== null,
				),
			),
		);
		const artifactIds = new Set(
			loadout.characters.flatMap(({ artifactInstanceId }) =>
				artifactInstanceId === null ? [] : [artifactInstanceId],
			),
		);
		const monsterlingsOwned = Object.fromEntries(
			Object.entries(selectRecord(state.monsterlingsOwned, monsterlingIds)).map(
				([id, { usedBy: _usedBy, ...owned }]) => [id, owned],
			),
		);
		const linkChainIds = new Set(
			Object.values(monsterlingsOwned).map(({ monsterling_id }) =>
				String(monsterling_id),
			),
		);
		const id = nanoid();
		const snapshot: LoadoutSnapshot = {
			id,
			name: snapshotName,
			tag,
			created_at: Date.now(),
			loadout: structuredClone(loadout),
			characters_owned: structuredClone(
				selectRecord(state.charactersOwned, characterIds),
			),
			monsterlings_owned: structuredClone(monsterlingsOwned),
			monsterling_link_chain_levels: structuredClone(
				selectRecord(state.monsterlingLinkChainLevels, linkChainIds),
			),
			artifacts_owned: structuredClone(
				selectRecord(state.artifactsOwned, artifactIds),
			),
			notes: normalizeLoadoutSnapshotNotes(notes),
			details: snapshotDetails,
		};
		set((current) => ({
			loadoutSnapshots: { ...current.loadoutSnapshots, [id]: snapshot },
			backupUpdatedAt: Date.now(),
		}));
		return id;
	},
	updateLoadoutSnapshot: (id, input) =>
		set((state) => {
			const current = state.loadoutSnapshots[id];
			if (!current) return state;
			const name = input.name.trim();
			if (!name) return state;
			const tag = LOADOUT_SNAPSHOT_TAG_VALUES.includes(input.tag)
				? input.tag
				: LOADOUT_SNAPSHOT_TAGS.OTHERS;
			const snapshotName =
				tag === current.tag ? name : formatLoadoutSnapshotNameForTag(name, tag);
			const details = normalizeLoadoutSnapshotDetails(tag, input.details);
			return {
				loadoutSnapshots: {
					...state.loadoutSnapshots,
					[id]: {
						...current,
						name: snapshotName,
						tag,
						notes: normalizeLoadoutSnapshotNotes(input.notes),
						details,
					},
				},
				backupUpdatedAt: Date.now(),
			};
		}),
	deleteLoadoutSnapshot: (id) =>
		set((state) => {
			const { [id]: _removed, ...loadoutSnapshots } = state.loadoutSnapshots;
			return { loadoutSnapshots, backupUpdatedAt: Date.now() };
		}),
	resetLoadoutSnapshots: () =>
		set({ loadoutSnapshots: {}, backupUpdatedAt: Date.now() }),
});
