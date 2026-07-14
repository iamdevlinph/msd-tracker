import { ArrowLeftIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import CharacterCard from "@/components/characters/components/character-card";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { CharacterSkillLevel } from "@/components/characters/components/character-skill-level";
import { emptyCharacterFilters } from "@/components/characters/store/characters-filter-store";
import { matchesCharacterFilters } from "@/components/characters/utils/character-utils";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import {
	emptyLoadoutCharacterSlot,
	type LoadoutCharacterSlot,
	type LoadoutOwned,
} from "@/stores/loadouts-slice";
import { nextLoadoutName } from "./loadout-utils";

const blankLoadout = (name = "New Loadout"): Omit<LoadoutOwned, "id"> => ({
	name,
	characters: [
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
	],
});
const UNKNOWN_CHARACTER_PORTRAIT =
	"/images/Character_Portrait/portrait_Unknown_00.png";
const SLOT_INDEXES = [0, 1, 2] as const;
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
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
	const loadouts = useAppStore((s) => s.loadouts);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	const setLoadout = useAppStore((s) => s.setLoadout);
	const [draft, setDraft] = useState<Omit<LoadoutOwned, "id">>(blankLoadout);
	const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
	const [monsterlingSearch, setMonsterlingSearch] = useState("");
	const [tierFilter, setTierFilter] = useState("all");
	const [characterFilters, setCharacterFilters] = useState(
		emptyCharacterFilters,
	);
	const [activeTab, setActiveTab] = useState("0");

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
	}, [loadoutToEdit, loadouts, open]);

	const selectedCharacterIds = new Set(
		draft.characters.map((slot) => slot.characterId),
	);
	const selectedRegularMonsterlingIds = new Set(
		draft.characters
			.flatMap((slot) => slot.monsterlingIds)
			.filter((id): id is string => id !== null),
	);
	const ownedCharacters = Object.values(charactersOwned)
		.map((owned) => ({ ...owned, info: CHARACTERS_DATA[owned.id] }))
		.filter(({ info }) => !!info)
		.sort((a, b) => a.info.name.localeCompare(b.info.name));
	const characterPickerOptions = ownedCharacters.filter(({ info }) =>
		matchesCharacterFilters(info, characterFilters),
	);
	const ownedMonsterlings = Object.entries(monsterlingsOwned)
		.map(([id, owned]) => ({
			id,
			...owned,
			info: MONSTERLINGS_DATA[owned.monsterling_id],
		}))
		.filter(({ info }) => !!info)
		.sort((a, b) => a.info.name.localeCompare(b.info.name));
	const monsterlingPickerOptions = ownedMonsterlings.filter(
		({ info, tier_id }) => {
			const legendary = info.region_id === REGION_ID_BY_REGION.LEGENDARY;
			return (
				pickerTarget?.type === "monsterling" &&
				legendary === pickerTarget.legendary &&
				(!monsterlingSearch ||
					info.name.toLowerCase().includes(monsterlingSearch.toLowerCase())) &&
				(tierFilter === "all" || String(tier_id) === tierFilter)
			);
		},
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
		setMonsterlingSearch(
			owned ? (MONSTERLINGS_DATA[owned.monsterling_id]?.name ?? "") : "",
		);
		setTierFilter("all");
		setPickerTarget({
			type: "monsterling",
			characterIndex,
			monsterlingIndex,
			legendary,
		});
	};
	const resetPicker = () => {
		setPickerTarget(null);
		setMonsterlingSearch("");
		setTierFilter("all");
		setCharacterFilters(emptyCharacterFilters());
	};
	const selectCharacter = (id: number) => {
		if (pickerTarget?.type !== "character") return;
		updateSlot(pickerTarget.characterIndex, (slot) => ({
			...slot,
			characterId: id,
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
			monsterlingIds[pickerTarget.monsterlingIndex ?? 0] = id;
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

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => (next ? setOpen(true) : close())}
		>
			<DialogContent
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
						<DialogTitle>
							{pickerTarget?.type === "character"
								? "Select Character"
								: pickerTarget?.type === "monsterling"
									? `Select ${pickerTarget.legendary ? "Legendary " : ""}Monsterling`
									: loadoutToEdit
										? "Edit Team Loadout"
										: "Add Team Loadout"}
						</DialogTitle>
					</div>
					<DialogDescription>
						{pickerTarget?.type === "character"
							? "Search and filter your owned characters."
							: pickerTarget?.type === "monsterling"
								? "Search owned monsterlings by name or tier."
								: "Select three owned characters and assign their monsterlings."}
					</DialogDescription>
				</DialogHeader>

				<div className="min-h-0 overflow-y-auto p-4">
					{pickerTarget?.type === "character" ? (
						<>
							<div className="mb-4">
								<CharacterFilter
									filters={characterFilters}
									onChange={setCharacterFilters}
									autoFocus
								/>
							</div>
							<div className="grid grid-cols-[repeat(auto-fit,130px)] justify-center gap-x-5 gap-y-8">
								{characterPickerOptions.map((character) => {
									const currentId =
										draft.characters[pickerTarget.characterIndex].characterId;
									const disabled =
										selectedCharacterIds.has(character.id) &&
										currentId !== character.id;

									return (
										<button
											key={character.id}
											type="button"
											disabled={disabled}
											onClick={() => selectCharacter(character.id)}
											aria-label={`Select ${character.info.name}`}
											className={cn(
												"rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
												disabled && "cursor-not-allowed opacity-50",
											)}
										>
											<CharacterCard
												portraitSize={130}
												iconSize={30}
												portraitImage={character.info.portraitImage}
												name={character.info.name}
												element_id={character.info.element_id}
												class_id={character.info.class_id}
												tier_id={character.info.tier_id}
												awakening={character.awakening}
												variant={character.info.variant}
											/>
											<CharacterSkillLevel charOwned={character} />
										</button>
									);
								})}
								{characterPickerOptions.length === 0 && (
									<p className="col-span-full rounded-md border border-dashed p-4 text-sm text-muted-foreground">
										No owned characters match.
									</p>
								)}
							</div>
						</>
					) : pickerTarget?.type === "monsterling" ? (
						<>
							<div className="mb-4 grid grid-cols-[1fr_auto] gap-2">
								<div className="relative">
									<SearchIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
									<Input
										autoFocus
										value={monsterlingSearch}
										onChange={(e) => setMonsterlingSearch(e.target.value)}
										onFocus={(event) => event.currentTarget.select()}
										placeholder="Search name"
										className="pl-9"
									/>
								</div>
								<Select value={tierFilter} onValueChange={setTierFilter}>
									<SelectTrigger className="w-32">
										<SelectValue placeholder="Tier" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All tiers</SelectItem>
										{Object.values(TIERS_DATA).map((tier) => (
											<SelectItem key={tier.id} value={String(tier.id)}>
												Tier {tier.id}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2 overflow-x-auto [scrollbar-width:none] md:grid-cols-2 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden">
								{monsterlingPickerOptions.map((monsterling) => {
									const slot = draft.characters[pickerTarget.characterIndex];
									const currentId = pickerTarget.legendary
										? slot.legendaryMonsterlingId
										: slot.monsterlingIds[pickerTarget.monsterlingIndex ?? 0];
									const disabled =
										!pickerTarget.legendary &&
										selectedRegularMonsterlingIds.has(monsterling.id) &&
										currentId !== monsterling.id;
									return (
										<button
											key={monsterling.id}
											type="button"
											disabled={disabled}
											onClick={() => selectMonsterling(monsterling.id)}
											className={cn(
												"grid w-max justify-self-center rounded-md border p-2 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
												disabled && "cursor-not-allowed opacity-50",
											)}
										>
											<MonsterlingCard
												monsterling_id={monsterling.monsterling_id}
												tier_id={monsterling.tier_id}
												traits={monsterling.traits}
											/>
										</button>
									);
								})}
								{monsterlingPickerOptions.length === 0 && (
									<p className="col-span-full rounded-md border border-dashed p-4 text-sm text-muted-foreground">
										No owned monsterlings found.
									</p>
								)}
							</div>
						</>
					) : (
						<div className="grid gap-4">
							<label
								htmlFor="loadout-name"
								className="grid gap-2 text-sm font-medium"
							>
								Name
								<Input
									id="loadout-name"
									value={draft.name}
									onChange={(e) =>
										setDraft((current) => ({
											...current,
											name: e.target.value,
										}))
									}
								/>
							</label>
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className="gap-4"
							>
								<TabsList className="grid w-full grid-cols-3 divide-x divide-border group-data-[orientation=horizontal]/tabs:h-[4.375rem]">
									{SLOT_INDEXES.map((index) => {
										const character =
											draft.characters[index].characterId !== null
												? CHARACTERS_DATA[draft.characters[index].characterId]
												: null;
										return (
											<TabsTrigger
												key={index}
												value={String(index)}
												className="h-16 min-w-0 px-1 py-2 after:hidden data-[state=active]:bg-primary/20 dark:data-[state=active]:bg-primary/25"
											>
												<img
													src={
														character?.portraitImage ??
														UNKNOWN_CHARACTER_PORTRAIT
													}
													alt=""
													className="size-10 shrink-0 rounded-sm object-cover"
												/>
												<span className="min-w-0 truncate">
													{character?.name ?? `Character ${index + 1}`}
												</span>
											</TabsTrigger>
										);
									})}
								</TabsList>
								{SLOT_INDEXES.map((index) => {
									const slot = draft.characters[index];
									const character =
										slot.characterId === null
											? null
											: CHARACTERS_DATA[slot.characterId];
									return (
										<TabsContent
											key={index}
											value={String(index)}
											className="grid gap-4 rounded-md border p-3"
										>
											<div className="flex gap-2">
												<Button
													type="button"
													variant="outline"
													className="min-w-0 flex-1 justify-start"
													onClick={() => openCharacterPicker(index)}
												>
													<span className="truncate">
														{character ? character.name : "Select character"}
													</span>
												</Button>
												{slot.characterId !== null && (
													<Button
														type="button"
														size="icon"
														variant="destructive"
														aria-label={`Clear character ${index + 1}`}
														onClick={() =>
															updateSlot(index, (current) => ({
																...current,
																characterId: null,
															}))
														}
													>
														<Trash2Icon />
													</Button>
												)}
											</div>
											<div className="grid grid-cols-4 gap-2">
												{[...SLOT_INDEXES, "legendary" as const].map(
													(monsterIndex) => {
														const legendary = monsterIndex === "legendary";
														const id = legendary
															? (slot.legendaryMonsterlingId ?? null)
															: slot.monsterlingIds[monsterIndex];
														const owned = id ? monsterlingsOwned[id] : null;
														const info = owned
															? MONSTERLINGS_DATA[owned.monsterling_id]
															: null;
														return (
															<div
																key={String(monsterIndex)}
																className={cn(
																	"relative aspect-square min-w-0",
																	legendary &&
																		"border-l-2 border-l-primary pl-2",
																)}
															>
																<button
																	type="button"
																	onClick={() =>
																		openMonsterlingPicker(
																			index,
																			legendary,
																			legendary ? undefined : monsterIndex,
																		)
																	}
																	className="grid size-full place-items-center overflow-hidden rounded-md border border-dashed p-1 text-center text-[10px] text-muted-foreground hover:bg-accent"
																>
																	{info ? (
																		<>
																			<img
																				src={info.image}
																				alt=""
																				className="min-h-0 max-h-[70%] object-contain"
																			/>
																			<span className="w-full truncate">
																				{info.name}
																			</span>
																		</>
																	) : legendary ? (
																		"Legendary"
																	) : (
																		`Monsterling ${monsterIndex + 1}`
																	)}
																</button>
																{id && (
																	<Button
																		type="button"
																		size="icon-sm"
																		variant="destructive"
																		className="absolute -right-1 -top-1 size-6"
																		aria-label="Clear monsterling"
																		onClick={() =>
																			updateSlot(index, (current) =>
																				legendary
																					? {
																							...current,
																							legendaryMonsterlingId: null,
																						}
																					: {
																							...current,
																							monsterlingIds:
																								current.monsterlingIds.map(
																									(value, i) =>
																										i === monsterIndex
																											? null
																											: value,
																								) as LoadoutCharacterSlot["monsterlingIds"],
																						},
																			)
																		}
																	>
																		<Trash2Icon />
																	</Button>
																)}
															</div>
														);
													},
												)}
											</div>
										</TabsContent>
									);
								})}
							</Tabs>
						</div>
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
