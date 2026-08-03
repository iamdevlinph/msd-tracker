import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
	type ArtifactFilters,
	compareOwnedArtifacts,
	emptyArtifactFilters,
	filterArtifacts,
} from "@/components/artifacts/utils/artifact-utils";
import { emptyCharacterFilters } from "@/components/characters/store/characters-filter-store";
import { matchesCharacterFilters } from "@/components/characters/utils/character-utils";
import {
	type EquipmentFilters,
	emptyEquipmentFilters,
	filterEquipment,
} from "@/components/equipments/utils/equipment-utils";
import type { LoadoutArtifactOption } from "@/components/loadouts/components/loadout-artifact-picker";
import type { LoadoutCharacterOption } from "@/components/loadouts/components/loadout-character-picker";
import type { LoadoutMonsterlingOption } from "@/components/loadouts/components/loadout-monsterling-picker";
import { nextLoadoutName } from "@/components/loadouts/components/loadout-utils";
import { LOADOUT_TARGET_TYPES } from "@/components/loadouts/loadout-constants";
import { getMonsterlingLinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import {
	emptyMonsterlingFilters,
	type MonsterlingFilters,
} from "@/components/monsterlings/store/monsterlings-filter-store";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import {
	EQUIPMENT_DATA,
	EQUIPMENT_PART_TYPES,
	type EquipmentId,
	type EquipmentPartType,
} from "@/data/equipment/EQUIPMENT_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import {
	emptyLoadoutCharacterSlot,
	type LoadoutCharacterSlot,
	type LoadoutOwned,
} from "@/stores/loadouts-slice";

export type PickerTarget =
	| { type: typeof LOADOUT_TARGET_TYPES.CHARACTER; characterIndex: number }
	| {
			type: typeof LOADOUT_TARGET_TYPES.MONSTERLING;
			characterIndex: number;
			monsterlingIndex?: number;
			legendary: boolean;
	  }
	| { type: typeof LOADOUT_TARGET_TYPES.ARTIFACT; characterIndex: number }
	| {
			type: typeof LOADOUT_TARGET_TYPES.EQUIPMENT;
			characterIndex: number;
			partType: EquipmentPartType;
	  }
	| null;

const blankLoadout = (name = "New Loadout"): Omit<LoadoutOwned, "id"> => ({
	name,
	notes: "",
	characters: [
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
	],
});

export type LoadoutDialogController = ReturnType<
	typeof useLoadoutDialogController
>;

export function useLoadoutDialogController(
	loadoutToEdit: string | null,
	open: boolean,
	setOpen: Dispatch<SetStateAction<boolean>>,
	onClose?: () => void,
) {
	const ga = useGoogleAnalytics();
	const loadouts = useAppStore((s) => s.loadouts);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	const artifactsOwned = useAppStore((s) => s.artifactsOwned);
	const monsterlingLinkChainLevels = useAppStore(
		(s) => s.monsterlingLinkChainLevels,
	);
	const setLoadout = useAppStore((s) => s.setLoadout);
	const [draft, setDraft] = useState<Omit<LoadoutOwned, "id">>(blankLoadout);
	const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
	const [monsterlingFilters, setMonsterlingFilters] =
		useState<MonsterlingFilters>(emptyMonsterlingFilters);
	const [characterFilters, setCharacterFilters] = useState(
		emptyCharacterFilters,
	);
	const [artifactFilters, setArtifactFilters] =
		useState<ArtifactFilters>(emptyArtifactFilters);
	const [equipmentFilters, setEquipmentFilters] = useState<EquipmentFilters>(
		emptyEquipmentFilters,
	);
	const [activeTab, setActiveTab] = useState("0");
	const nameManuallyEdited = useRef(false);
	const hasTrackedClose = useRef(false);
	useEffect(() => {
		if (!open) return;
		hasTrackedClose.current = false;
		const existing = loadoutToEdit ? loadouts[loadoutToEdit] : null;
		setDraft(
			existing
				? {
						name: existing.name,
						notes: existing.notes,
						characters: existing.characters.map((slot) => ({
							characterId: slot.characterId,
							monsterlingIds: [...slot.monsterlingIds],
							legendaryMonsterlingId: slot.legendaryMonsterlingId ?? null,
							artifactInstanceId: slot.artifactInstanceId ?? null,
							equipment_ids: [
								...(slot.equipment_ids ?? [null, null, null, null]),
							],
							stat_values: { ...(slot.stat_values ?? {}) },
							pinned_stat_ids: [...(slot.pinned_stat_ids ?? [])],
						})) as LoadoutOwned["characters"],
					}
				: blankLoadout(
						nextLoadoutName(Object.values(loadouts).map(({ name }) => name)),
					),
		);
		setActiveTab("0");
		nameManuallyEdited.current = false;
	}, [loadoutToEdit, loadouts, open]);
	const selectedCharacterIds = new Set(
		draft.characters.map((s) => s.characterId),
	);
	const selectedRegularMonsterlingIds = new Set(
		draft.characters
			.flatMap((s) => s.monsterlingIds)
			.filter((id): id is string => id !== null),
	);
	const currentCharacterRegularMonsterlingIds = new Set(
		pickerTarget?.type === LOADOUT_TARGET_TYPES.MONSTERLING
			? draft.characters[pickerTarget.characterIndex].monsterlingIds.filter(
					(id): id is string => id !== null,
				)
			: [],
	);
	const selectedArtifactIds = new Set(
		draft.characters
			.map((s) => s.artifactInstanceId)
			.filter((id): id is string => id != null),
	);
	const characterPickerOptions: LoadoutCharacterOption[] = Object.values(
		charactersOwned,
	)
		.flatMap((owned) => {
			const info = CHARACTERS_DATA[owned.id];
			return info ? [{ ...owned, info }] : [];
		})
		.filter(({ info }) => matchesCharacterFilters(info, characterFilters))
		.sort((a, b) => a.info.name.localeCompare(b.info.name));
	const monsterlingPickerOptions: LoadoutMonsterlingOption[] = Object.entries(
		monsterlingsOwned,
	)
		.flatMap(([id, owned]) => {
			const info = MONSTERLINGS_DATA[owned.monsterling_id];
			return info
				? [
						{
							id,
							...owned,
							info,
							linkChainLevel: getMonsterlingLinkChainLevel(
								owned.monsterling_id,
								monsterlingLinkChainLevels,
							),
						},
					]
				: [];
		})
		.filter(({ info, tier_id }) => {
			const legendary = info.region_id === REGION_ID_BY_REGION.LEGENDARY;
			return (
				pickerTarget?.type === LOADOUT_TARGET_TYPES.MONSTERLING &&
				legendary === pickerTarget.legendary &&
				(!monsterlingFilters.search ||
					info.name
						.toLowerCase()
						.includes(monsterlingFilters.search.toLowerCase())) &&
				(!monsterlingFilters.selectedTiers.length ||
					monsterlingFilters.selectedTiers.includes(tier_id))
			);
		})
		.sort((a, b) => a.info.name.localeCompare(b.info.name));
	const artifactPickerOptions: LoadoutArtifactOption[] = Object.entries(
		artifactsOwned,
	)
		.flatMap(([id, owned]) => {
			const info = ARTIFACTS_DATA[owned.artifact_id];
			return info && filterArtifacts([info], artifactFilters).length
				? [
						{
							id,
							artifactId: owned.artifact_id,
							fusionLevel: owned.fusion_level,
						},
					]
				: [];
		})
		.sort((a, b) =>
			compareOwnedArtifacts(
				{
					artifact: ARTIFACTS_DATA[a.artifactId],
					fusionLevel: a.fusionLevel,
					id: a.id,
				},
				{
					artifact: ARTIFACTS_DATA[b.artifactId],
					fusionLevel: b.fusionLevel,
					id: b.id,
				},
			),
		);
	const equipmentPickerOptions = filterEquipment(
		Object.values(EQUIPMENT_DATA).filter(
			({ part_type }) =>
				pickerTarget?.type !== LOADOUT_TARGET_TYPES.EQUIPMENT ||
				part_type === pickerTarget.partType,
		),
		equipmentFilters,
	)
		.sort(
			(a, b) =>
				b.tier_id - a.tier_id ||
				a.set_name.localeCompare(b.set_name) ||
				EQUIPMENT_PART_TYPES.indexOf(a.part_type) -
					EQUIPMENT_PART_TYPES.indexOf(b.part_type),
		)
		.map(({ id }) => id);
	const selectedEquipmentIds = new Set(
		draft.characters
			.flatMap((slot) => slot.equipment_ids ?? [])
			.filter((id): id is EquipmentId => id != null),
	);
	const updateSlot = (
		index: number,
		updater: (slot: LoadoutCharacterSlot) => LoadoutCharacterSlot,
		shouldTrackClear = true,
	) =>
		setDraft((current) => {
			const previousSlot = current.characters[index];
			const nextSlot = updater(previousSlot);
			if (shouldTrackClear) {
				if (previousSlot.characterId !== null && nextSlot.characterId === null)
					ga.event(ANALYTICS_EVENTS.LOADOUT_SLOT_CLEAR, {
						slot_type: "character",
						character_slot: index,
					});
				if (
					previousSlot.artifactInstanceId !== null &&
					nextSlot.artifactInstanceId === null
				)
					ga.event(ANALYTICS_EVENTS.LOADOUT_SLOT_CLEAR, {
						slot_type: "artifact",
						character_slot: index,
					});
				previousSlot.monsterlingIds.forEach((id, monsterlingSlot) => {
					if (id !== null && nextSlot.monsterlingIds[monsterlingSlot] === null)
						ga.event(ANALYTICS_EVENTS.LOADOUT_SLOT_CLEAR, {
							slot_type: "monsterling",
							character_slot: index,
							monsterling_slot: monsterlingSlot,
							is_legendary: false,
						});
				});
				if (
					previousSlot.legendaryMonsterlingId != null &&
					nextSlot.legendaryMonsterlingId == null
				)
					ga.event(ANALYTICS_EVENTS.LOADOUT_SLOT_CLEAR, {
						slot_type: "monsterling",
						character_slot: index,
						is_legendary: true,
					});
				(previousSlot.equipment_ids ?? []).forEach((id, equipmentSlot) => {
					if (
						id != null &&
						(nextSlot.equipment_ids?.[equipmentSlot] ?? null) === null
					)
						ga.event(ANALYTICS_EVENTS.LOADOUT_SLOT_CLEAR, {
							slot_type: "equipment",
							character_slot: index,
							equipment_slot: EQUIPMENT_PART_TYPES[equipmentSlot],
						});
				});
			}
			return {
				...current,
				characters: current.characters.map((slot, i) =>
					i === index ? nextSlot : slot,
				) as LoadoutOwned["characters"],
			};
		});
	const resetPickerState = (trackBack: boolean) => {
		if (trackBack && pickerTarget)
			ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_BACK);
		setPickerTarget(null);
		setMonsterlingFilters(emptyMonsterlingFilters());
		setCharacterFilters(emptyCharacterFilters());
		setArtifactFilters(emptyArtifactFilters());
		setEquipmentFilters(emptyEquipmentFilters());
	};
	const resetPicker = () => resetPickerState(true);
	const openCharacterPicker = (characterIndex: number) => {
		ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_OPEN, {
			picker_type: "character",
			character_slot: characterIndex,
		});
		const id = draft.characters[characterIndex].characterId;
		setCharacterFilters({
			...emptyCharacterFilters(),
			search: id === null ? "" : (CHARACTERS_DATA[id]?.name ?? ""),
		});
		setPickerTarget({ type: LOADOUT_TARGET_TYPES.CHARACTER, characterIndex });
	};
	const openMonsterlingPicker = (
		characterIndex: number,
		legendary: boolean,
		monsterlingIndex?: number,
	) => {
		ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_OPEN, {
			picker_type: "monsterling",
			character_slot: characterIndex,
			monsterling_slot: monsterlingIndex,
			is_legendary: legendary,
		});
		const slot = draft.characters[characterIndex];
		const id = legendary
			? slot.legendaryMonsterlingId
			: slot.monsterlingIds[monsterlingIndex ?? 0];
		const owned = id ? monsterlingsOwned[id] : null;
		setMonsterlingFilters({
			search: owned
				? (MONSTERLINGS_DATA[owned.monsterling_id]?.name ?? "")
				: "",
			selectedTiers: [],
		});
		setPickerTarget({
			type: LOADOUT_TARGET_TYPES.MONSTERLING,
			characterIndex,
			monsterlingIndex,
			legendary,
		});
	};
	const openArtifactPicker = (characterIndex: number) => {
		ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_OPEN, {
			picker_type: "artifact",
			character_slot: characterIndex,
		});
		const characterId = draft.characters[characterIndex]?.characterId;
		const characterClass =
			characterId == null ? undefined : CHARACTERS_DATA[characterId]?.class_id;
		setArtifactFilters({
			...emptyArtifactFilters(),
			...(characterClass == null
				? {}
				: { selectedCharacterClass: [characterClass] }),
		});
		setPickerTarget({ type: LOADOUT_TARGET_TYPES.ARTIFACT, characterIndex });
	};
	const openEquipmentPicker = (
		characterIndex: number,
		partType: EquipmentPartType,
	) => {
		ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_OPEN, {
			picker_type: "equipment",
			character_slot: characterIndex,
			equipment_slot: partType,
		});
		setEquipmentFilters(emptyEquipmentFilters());
		setPickerTarget({
			type: LOADOUT_TARGET_TYPES.EQUIPMENT,
			characterIndex,
			partType,
		});
	};
	const selectCharacter = (id: number) => {
		if (pickerTarget?.type !== LOADOUT_TARGET_TYPES.CHARACTER) return;
		ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_SELECT, {
			picker_type: "character",
			character_slot: pickerTarget.characterIndex,
		});
		setDraft((current) => ({
			...current,
			name:
				!loadoutToEdit &&
				!nameManuallyEdited.current &&
				current.characters.every(({ characterId }) => characterId === null)
					? nextLoadoutName(
							Object.values(loadouts).map(({ name }) => name),
							CHARACTERS_DATA[id].name,
						)
					: current.name,
			characters: current.characters.map((slot, i) =>
				i === pickerTarget.characterIndex
					? slot.characterId === id
						? slot
						: { ...slot, characterId: id }
					: slot,
			) as LoadoutOwned["characters"],
		}));
		resetPickerState(false);
	};
	const selectMonsterling = (id: string) => {
		if (pickerTarget?.type !== LOADOUT_TARGET_TYPES.MONSTERLING) return;
		ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_SELECT, {
			picker_type: "monsterling",
			character_slot: pickerTarget.characterIndex,
			monsterling_slot: pickerTarget.monsterlingIndex,
			is_legendary: pickerTarget.legendary,
		});
		updateSlot(
			pickerTarget.characterIndex,
			(slot) => {
				if (pickerTarget.legendary)
					return { ...slot, legendaryMonsterlingId: id };
				const ids = [
					...slot.monsterlingIds,
				] as LoadoutCharacterSlot["monsterlingIds"];
				const target = pickerTarget.monsterlingIndex ?? 0;
				const source = ids.indexOf(id);
				if (source !== -1) {
					if (source !== target)
						ga.event(
							ids[target] === null
								? ANALYTICS_EVENTS.LOADOUT_MONSTERLING_MOVE
								: ANALYTICS_EVENTS.LOADOUT_MONSTERLING_SWAP,
							{
								character_slot: pickerTarget.characterIndex,
								from_slot: source,
								to_slot: target,
							},
						);
					ids[source] = ids[target];
				}
				ids[target] = id;
				return { ...slot, monsterlingIds: ids };
			},
			false,
		);
		resetPickerState(false);
	};
	const selectArtifact = (id: string) => {
		if (pickerTarget?.type !== LOADOUT_TARGET_TYPES.ARTIFACT) return;
		if (
			selectedArtifactIds.has(id) &&
			draft.characters[pickerTarget.characterIndex].artifactInstanceId !== id
		)
			return;
		ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_SELECT, {
			picker_type: "artifact",
			character_slot: pickerTarget.characterIndex,
		});
		updateSlot(
			pickerTarget.characterIndex,
			(slot) => ({ ...slot, artifactInstanceId: id }),
			false,
		);
		resetPickerState(false);
	};
	const selectEquipment = (id: EquipmentId) => {
		if (pickerTarget?.type !== LOADOUT_TARGET_TYPES.EQUIPMENT) return;
		const equipment = EQUIPMENT_DATA[id];
		if (!equipment) return;
		const equipmentSlot = EQUIPMENT_PART_TYPES.indexOf(equipment.part_type);
		ga.event(ANALYTICS_EVENTS.LOADOUT_PICKER_SELECT, {
			picker_type: "equipment",
			character_slot: pickerTarget.characterIndex,
			equipment_slot: equipment.part_type,
		});
		updateSlot(
			pickerTarget.characterIndex,
			(slot) => {
				const equipment_ids = [
					...(slot.equipment_ids ?? [null, null, null, null]),
				] as NonNullable<LoadoutCharacterSlot["equipment_ids"]>;
				equipment_ids[equipmentSlot] = id;
				return { ...slot, equipment_ids };
			},
			false,
		);
		resetPickerState(false);
	};
	const closeEditor = (trackClose: boolean) => {
		if (trackClose && !hasTrackedClose.current) {
			ga.event(ANALYTICS_EVENTS.LOADOUT_EDITOR_CLOSE);
			hasTrackedClose.current = true;
		}
		setOpen(false);
		resetPickerState(false);
		onClose?.();
	};
	const close = () => closeEditor(true);
	const canSave =
		!!draft.name.trim() &&
		draft.characters.every((s) => s.characterId !== null) &&
		new Set(
			draft.characters
				.map((s) => s.artifactInstanceId)
				.filter((id): id is string => id !== null),
		).size ===
			draft.characters.filter((s) => s.artifactInstanceId !== null).length;
	const submit = () => {
		if (!canSave) return;
		setLoadout(
			{
				name: draft.name.trim(),
				notes: (draft.notes ?? "").slice(0, 2000),
				characters: draft.characters.map((s) => ({
					...s,
					legendaryMonsterlingId: s.legendaryMonsterlingId ?? null,
					artifactInstanceId: s.artifactInstanceId ?? null,
					equipment_ids: [...(s.equipment_ids ?? [null, null, null, null])],
				})) as LoadoutOwned["characters"],
			},
			loadoutToEdit ?? undefined,
		);
		ga.event(
			loadoutToEdit
				? ANALYTICS_EVENTS.LOADOUT_UPDATE
				: ANALYTICS_EVENTS.LOADOUT_CREATE,
			{
				character_count: draft.characters.filter((s) => s.characterId !== null)
					.length,
				monsterling_count: draft.characters.reduce(
					(t, s) => t + s.monsterlingIds.filter((id) => id !== null).length,
					0,
				),
				legendary_monsterling_count: draft.characters.filter(
					(s) => s.legendaryMonsterlingId != null,
				).length,
				artifact_count: draft.characters.filter(
					(s) => s.artifactInstanceId != null,
				).length,
				equipment_count: draft.characters.reduce(
					(total, slot) =>
						total +
						(slot.equipment_ids ?? []).filter((id) => id != null).length,
					0,
				),
			},
		);
		closeEditor(false);
	};
	return {
		draft,
		pickerTarget,
		monsterlingFilters,
		characterFilters,
		artifactFilters,
		equipmentFilters,
		activeTab,
		setActiveTab: (tab: string) => {
			ga.event(ANALYTICS_EVENTS.LOADOUT_TAB_CHANGE, { tab_index: Number(tab) });
			setActiveTab(tab);
		},
		setMonsterlingFilters,
		setCharacterFilters,
		setArtifactFilters,
		setEquipmentFilters,
		selectedCharacterIds,
		selectedRegularMonsterlingIds,
		currentCharacterRegularMonsterlingIds,
		selectedArtifactIds,
		selectedEquipmentIds,
		characterPickerOptions,
		monsterlingPickerOptions,
		artifactPickerOptions,
		equipmentPickerOptions,
		monsterlingsOwned,
		artifactsOwned,
		updateSlot,
		openCharacterPicker,
		openMonsterlingPicker,
		openArtifactPicker,
		openEquipmentPicker,
		selectCharacter,
		selectMonsterling,
		selectArtifact,
		selectEquipment,
		resetPicker,
		close,
		canSave,
		submit,
		setName: (name: string) => {
			nameManuallyEdited.current = true;
			setDraft((current) => ({ ...current, name }));
		},
	};
}
