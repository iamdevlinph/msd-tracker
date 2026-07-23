import { ArrowLeftIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { emptyCharacterFilters } from "@/components/characters/store/characters-filter-store";
import { matchesCharacterFilters } from "@/components/characters/utils/character-utils";
import {
	type LoadoutCharacterOption,
	LoadoutCharacterPicker,
} from "@/components/loadouts/components/loadout-character-picker";
import { LoadoutEditor } from "@/components/loadouts/components/loadout-editor";
import {
	type LoadoutMonsterlingOption,
	LoadoutMonsterlingPicker,
} from "@/components/loadouts/components/loadout-monsterling-picker";
import { nextLoadoutName } from "@/components/loadouts/components/loadout-utils";
import { getMonsterlingLinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import {
	emptyMonsterlingFilters,
	type MonsterlingFilters,
} from "@/components/monsterlings/store/monsterlings-filter-store";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { preventSearchInputDismissOnEscape } from "@/components/ui/search-input";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import {
	emptyLoadoutCharacterSlot,
	type LoadoutCharacterSlot,
	type LoadoutOwned,
} from "@/stores/loadouts-slice";

const blankLoadout = (name = "New Loadout"): Omit<LoadoutOwned, "id"> => ({
	name,
	characters: [
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
	],
});

type PickerTarget =
	| { type: "character"; characterIndex: number }
	| {
			type: "monsterling";
			characterIndex: number;
			monsterlingIndex?: number;
			legendary: boolean;
	  }
	| null;

type LoadoutsDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	loadoutToEdit?: string | null;
	onClose?: () => void;
};

export const LoadoutsDialog = ({
	open,
	setOpen,
	loadoutToEdit = null,
	onClose,
}: LoadoutsDialogProps) => {
	const ga = useGoogleAnalytics();
	const loadouts = useAppStore((state) => state.loadouts);
	const charactersOwned = useAppStore((state) => state.charactersOwned);
	const monsterlingsOwned = useAppStore((state) => state.monsterlingsOwned);
	const monsterlingLinkChainLevels = useAppStore(
		(state) => state.monsterlingLinkChainLevels,
	);
	const setLoadout = useAppStore((state) => state.setLoadout);
	const [draft, setDraft] = useState<Omit<LoadoutOwned, "id">>(blankLoadout);
	const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
	const [monsterlingFilters, setMonsterlingFilters] =
		useState<MonsterlingFilters>(emptyMonsterlingFilters);
	const [characterFilters, setCharacterFilters] = useState(
		emptyCharacterFilters,
	);
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
		draft.characters.map((slot) => slot.characterId),
	);
	const selectedRegularMonsterlingIds = new Set(
		draft.characters
			.flatMap((slot) => slot.monsterlingIds)
			.filter((id): id is string => id !== null),
	);
	const currentCharacterRegularMonsterlingIds = new Set(
		pickerTarget?.type === "monsterling"
			? draft.characters[pickerTarget.characterIndex].monsterlingIds.filter(
					(id): id is string => id !== null,
				)
			: [],
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
				pickerTarget?.type === "monsterling" &&
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

	const updateSlot = (
		index: number,
		updater: (slot: LoadoutCharacterSlot) => LoadoutCharacterSlot,
	) =>
		setDraft((current) => ({
			...current,
			characters: current.characters.map((slot, itemIndex) =>
				itemIndex === index ? updater(slot) : slot,
			) as LoadoutOwned["characters"],
		}));
	const openCharacterPicker = (characterIndex: number) => {
		const characterId = draft.characters[characterIndex].characterId;
		setCharacterFilters({
			...emptyCharacterFilters(),
			search:
				characterId === null ? "" : (CHARACTERS_DATA[characterId]?.name ?? ""),
		});
		setPickerTarget({ type: "character", characterIndex });
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
			type: "monsterling",
			characterIndex,
			monsterlingIndex,
			legendary,
		});
	};
	const resetPicker = () => {
		setPickerTarget(null);
		setMonsterlingFilters(emptyMonsterlingFilters());
		setCharacterFilters(emptyCharacterFilters());
	};
	const selectCharacter = (id: number) => {
		if (pickerTarget?.type !== "character") return;
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
			characters: current.characters.map((slot, index) =>
				index === pickerTarget.characterIndex
					? { ...slot, characterId: id }
					: slot,
			) as LoadoutOwned["characters"],
		}));
		resetPicker();
	};
	const selectMonsterling = (id: string) => {
		if (pickerTarget?.type !== "monsterling") return;
		updateSlot(pickerTarget.characterIndex, (slot) => {
			if (pickerTarget.legendary)
				return { ...slot, legendaryMonsterlingId: id };
			const monsterlingIds = [
				...slot.monsterlingIds,
			] as LoadoutCharacterSlot["monsterlingIds"];
			const targetIndex = pickerTarget.monsterlingIndex ?? 0;
			const sourceIndex = monsterlingIds.indexOf(id);
			if (sourceIndex !== -1) {
				monsterlingIds[sourceIndex] = monsterlingIds[targetIndex];
			}
			monsterlingIds[targetIndex] = id;
			return { ...slot, monsterlingIds };
		});
		resetPicker();
	};
	const close = () => {
		setOpen(false);
		resetPicker();
		onClose?.();
	};
	const canSave =
		!!draft.name.trim() &&
		draft.characters.every((slot) => slot.characterId !== null);
	const submit = () => {
		if (!canSave) return;
		setLoadout(
			{
				name: draft.name.trim(),
				characters: draft.characters.map((slot) => ({
					...slot,
					legendaryMonsterlingId: slot.legendaryMonsterlingId ?? null,
				})) as LoadoutOwned["characters"],
			},
			loadoutToEdit ?? undefined,
		);
		ga.event(
			loadoutToEdit
				? ANALYTICS_EVENTS.LOADOUT_UPDATE
				: ANALYTICS_EVENTS.LOADOUT_CREATE,
			{
				character_count: draft.characters.filter(
					({ characterId }) => characterId !== null,
				).length,
				monsterling_count: draft.characters.reduce(
					(total, slot) =>
						total + slot.monsterlingIds.filter((id) => id !== null).length,
					0,
				),
				legendary_monsterling_count: draft.characters.filter(
					({ legendaryMonsterlingId }) => legendaryMonsterlingId != null,
				).length,
			},
		);
		close();
	};

	const pickerTitle =
		pickerTarget?.type === "character"
			? "Select Character"
			: pickerTarget?.type === "monsterling"
				? `Select ${pickerTarget.legendary ? "Legendary " : ""}Monsterling`
				: loadoutToEdit
					? "Edit Team Loadout"
					: "Add Team Loadout";
	const pickerDescription =
		pickerTarget?.type === "character"
			? "Search and filter your owned characters."
			: pickerTarget?.type === "monsterling"
				? "Search owned monsterlings by name or tier."
				: "Select three owned characters and assign their monsterlings.";

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => (next ? setOpen(true) : close())}
		>
			<DialogContent
				onEscapeKeyDown={preventSearchInputDismissOnEscape}
				className={cn(
					"grid h-[calc(100dvh-2rem)] max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-2xl",
					pickerTarget && "md:max-w-[46rem] xl:max-w-[68.5rem]",
				)}
				onCloseAutoFocus={close}
			>
				<DialogHeader className="border-b p-4">
					<div className="flex items-center gap-3">
						{pickerTarget && (
							<Button
								type="button"
								variant="secondary"
								size="icon"
								className="rounded-full"
								onClick={resetPicker}
								aria-label="Back to loadout"
							>
								<ArrowLeftIcon />
							</Button>
						)}
						<DialogTitle>{pickerTitle}</DialogTitle>
					</div>
					<DialogDescription>{pickerDescription}</DialogDescription>
				</DialogHeader>

				<div className="min-h-0 overflow-y-auto p-4">
					{pickerTarget?.type === "character" ? (
						<LoadoutCharacterPicker
							filters={characterFilters}
							onFiltersChange={setCharacterFilters}
							options={characterPickerOptions}
							selectedIds={selectedCharacterIds}
							currentId={
								draft.characters[pickerTarget.characterIndex].characterId
							}
							onSelect={selectCharacter}
						/>
					) : pickerTarget?.type === "monsterling" ? (
						<LoadoutMonsterlingPicker
							filters={monsterlingFilters}
							onFiltersChange={setMonsterlingFilters}
							options={monsterlingPickerOptions}
							selectedRegularIds={selectedRegularMonsterlingIds}
							currentCharacterRegularIds={currentCharacterRegularMonsterlingIds}
							currentId={
								pickerTarget.legendary
									? (draft.characters[pickerTarget.characterIndex]
											.legendaryMonsterlingId ?? null)
									: draft.characters[pickerTarget.characterIndex]
											.monsterlingIds[pickerTarget.monsterlingIndex ?? 0]
							}
							legendary={pickerTarget.legendary}
							onSelect={selectMonsterling}
						/>
					) : (
						<LoadoutEditor
							draft={draft}
							activeTab={activeTab}
							monsterlingsOwned={monsterlingsOwned}
							onNameChange={(name) => {
								nameManuallyEdited.current = true;
								setDraft((current) => ({ ...current, name }));
							}}
							onActiveTabChange={setActiveTab}
							onOpenCharacterPicker={openCharacterPicker}
							onOpenMonsterlingPicker={openMonsterlingPicker}
							onUpdateSlot={updateSlot}
						/>
					)}
				</div>

				<DialogFooter className="grid grid-cols-2 border-t p-4 sm:flex">
					{pickerTarget ? (
						<Button
							type="button"
							variant="outline"
							className="col-span-2"
							onClick={resetPicker}
						>
							Back
						</Button>
					) : (
						<>
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={close}
							>
								Cancel
							</Button>
							<Button
								type="button"
								className="w-full"
								disabled={!canSave}
								onClick={submit}
							>
								{loadoutToEdit ? "Update" : "Create"}
							</Button>
						</>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
