import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import {
	LOADOUT_SNAPSHOT_TAGS,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import type { StoreState } from "@/stores/app-store";
import { type LoadoutOwned, normalizeLoadouts } from "@/stores/loadouts-slice";

const LOADOUT_SNAPSHOT_TAG_VALUES = Object.values(LOADOUT_SNAPSHOT_TAGS);

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
};

export type LoadoutSnapshotsSlice = {
	loadoutSnapshots: Record<string, LoadoutSnapshot>;
	createLoadoutSnapshot: (input: {
		loadoutId: string;
		name: string;
		tag?: LoadoutSnapshotTag;
	}) => string | null;
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
	}) => {
		const state = get();
		const loadout = state.loadouts[loadoutId];
		const snapshotName = name.trim();
		if (!loadout || !snapshotName) return null;
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
		};
		set((current) => ({
			loadoutSnapshots: { ...current.loadoutSnapshots, [id]: snapshot },
			backupUpdatedAt: Date.now(),
		}));
		return id;
	},
	deleteLoadoutSnapshot: (id) =>
		set((state) => {
			const { [id]: _removed, ...loadoutSnapshots } = state.loadoutSnapshots;
			return { loadoutSnapshots, backupUpdatedAt: Date.now() };
		}),
	resetLoadoutSnapshots: () =>
		set({ loadoutSnapshots: {}, backupUpdatedAt: Date.now() }),
});
