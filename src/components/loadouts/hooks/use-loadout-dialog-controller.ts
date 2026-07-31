import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
	type ArtifactFilters,
	emptyArtifactFilters,
	filterArtifacts,
} from "@/components/artifacts/utils/artifact-utils";
import { emptyCharacterFilters } from "@/components/characters/store/characters-filter-store";
import { matchesCharacterFilters } from "@/components/characters/utils/character-utils";
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
	| null;

const blankLoadout = (name = "New Loadout"): Omit<LoadoutOwned, "id"> => ({
	name,
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
	const [activeTab, setActiveTab] = useState("0");
	const nameManuallyEdited = useRef(false);
	useEffect(() => {
		if (!open) return;
		const existing = loadoutToEdit ? loadouts[loadoutToEdit] : null;
		setDraft(
			existing
				? {
						name: existing.name,
						characters: existing.characters.map((slot) => ({
							characterId: slot.characterId,
							monsterlingIds: [...slot.monsterlingIds],
							legendaryMonsterlingId: slot.legendaryMonsterlingId ?? null,
							artifactInstanceId: slot.artifactInstanceId ?? null,
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
		.sort(
			(a, b) =>
				ARTIFACTS_DATA[a.artifactId].name.localeCompare(
					ARTIFACTS_DATA[b.artifactId].name,
				) ||
				a.fusionLevel - b.fusionLevel ||
				a.id.localeCompare(b.id),
		);
	const updateSlot = (
		index: number,
		updater: (slot: LoadoutCharacterSlot) => LoadoutCharacterSlot,
	) =>
		setDraft((current) => ({
			...current,
			characters: current.characters.map((slot, i) =>
				i === index ? updater(slot) : slot,
			) as LoadoutOwned["characters"],
		}));
	const resetPicker = () => {
		setPickerTarget(null);
		setMonsterlingFilters(emptyMonsterlingFilters());
		setCharacterFilters(emptyCharacterFilters());
		setArtifactFilters(emptyArtifactFilters());
	};
	const openCharacterPicker = (characterIndex: number) => {
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
		setArtifactFilters(emptyArtifactFilters());
		setPickerTarget({ type: LOADOUT_TARGET_TYPES.ARTIFACT, characterIndex });
	};
	const selectCharacter = (id: number) => {
		if (pickerTarget?.type !== LOADOUT_TARGET_TYPES.CHARACTER) return;
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
				i === pickerTarget.characterIndex ? { ...slot, characterId: id } : slot,
			) as LoadoutOwned["characters"],
		}));
		resetPicker();
	};
	const selectMonsterling = (id: string) => {
		if (pickerTarget?.type !== LOADOUT_TARGET_TYPES.MONSTERLING) return;
		updateSlot(pickerTarget.characterIndex, (slot) => {
			if (pickerTarget.legendary)
				return { ...slot, legendaryMonsterlingId: id };
			const ids = [
				...slot.monsterlingIds,
			] as LoadoutCharacterSlot["monsterlingIds"];
			const target = pickerTarget.monsterlingIndex ?? 0;
			const source = ids.indexOf(id);
			if (source !== -1) ids[source] = ids[target];
			ids[target] = id;
			return { ...slot, monsterlingIds: ids };
		});
		resetPicker();
	};
	const selectArtifact = (id: string) => {
		if (pickerTarget?.type !== LOADOUT_TARGET_TYPES.ARTIFACT) return;
		if (
			selectedArtifactIds.has(id) &&
			draft.characters[pickerTarget.characterIndex].artifactInstanceId !== id
		)
			return;
		updateSlot(pickerTarget.characterIndex, (slot) => ({
			...slot,
			artifactInstanceId: id,
		}));
		resetPicker();
	};
	const close = () => {
		setOpen(false);
		resetPicker();
		onClose?.();
	};
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
				characters: draft.characters.map((s) => ({
					...s,
					legendaryMonsterlingId: s.legendaryMonsterlingId ?? null,
					artifactInstanceId: s.artifactInstanceId ?? null,
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
			},
		);
		close();
	};
	return {
		draft,
		pickerTarget,
		monsterlingFilters,
		characterFilters,
		artifactFilters,
		activeTab,
		setActiveTab,
		setMonsterlingFilters,
		setCharacterFilters,
		setArtifactFilters,
		selectedCharacterIds,
		selectedRegularMonsterlingIds,
		currentCharacterRegularMonsterlingIds,
		selectedArtifactIds,
		characterPickerOptions,
		monsterlingPickerOptions,
		artifactPickerOptions,
		monsterlingsOwned,
		artifactsOwned,
		updateSlot,
		openCharacterPicker,
		openMonsterlingPicker,
		openArtifactPicker,
		selectCharacter,
		selectMonsterling,
		selectArtifact,
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
