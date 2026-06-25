import { ArrowLeftIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";
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
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import {
	emptyLoadoutCharacterSlot,
	type LoadoutCharacterSlot,
	type LoadoutOwned,
} from "@/stores/loadouts-slice";

const blankLoadout = (): Omit<LoadoutOwned, "id"> => ({
	name: "New Loadout",
	characters: [
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
		emptyLoadoutCharacterSlot(),
	],
});

const UNKNOWN_CHARACTER_PORTRAIT =
	"/images/Character_Portrait/portrait_Unknown_00.png";
const CHARACTER_SLOT_INDEXES = [0, 1, 2] as const;
const MONSTERLING_SLOT_INDEXES = [0, 1, 2] as const;
const EQUIPMENT_SLOT_INDEXES = [1, 2, 3, 4] as const;

type MonsterlingPickerTarget = {
	characterIndex: number;
	monsterlingIndex: number;
} | null;

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
	const loadouts = useAppStore((s) => s.loadouts);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	const setLoadout = useAppStore((s) => s.setLoadout);

	const [draft, setDraft] = useState<Omit<LoadoutOwned, "id">>(blankLoadout);
	const [pickerTarget, setPickerTarget] =
		useState<MonsterlingPickerTarget>(null);
	const [search, setSearch] = useState("");
	const [tierFilter, setTierFilter] = useState("all");
	const [activeCharacterTab, setActiveCharacterTab] = useState("0");

	useEffect(() => {
		if (!open) return;

		const existing = loadoutToEdit ? loadouts[loadoutToEdit] : null;
		if (existing) {
			setDraft({
				name: existing.name,
				characters: existing.characters.map((slot) => ({
					characterId: slot.characterId,
					monsterlingIds: [...slot.monsterlingIds],
				})) as LoadoutOwned["characters"],
			});
			setActiveCharacterTab("0");
			return;
		}

		setDraft(blankLoadout());
		setActiveCharacterTab("0");
	}, [loadoutToEdit, loadouts, open]);

	const selectedCharacterIds = useMemo(
		() => new Set(draft.characters.map((slot) => slot.characterId)),
		[draft.characters],
	);

	const selectedMonsterlingIds = useMemo(
		() =>
			new Set(
				draft.characters.flatMap((slot) =>
					slot.monsterlingIds.filter((id): id is string => id !== null),
				),
			),
		[draft.characters],
	);

	const ownedCharacters = Object.values(charactersOwned)
		.map((character) => CHARACTERS_DATA[character.id])
		.filter(Boolean)
		.sort((a, b) => a.name.localeCompare(b.name));

	const ownedMonsterlings = Object.entries(monsterlingsOwned)
		.map(([id, monsterling]) => ({
			id,
			...monsterling,
			info: MONSTERLINGS_DATA[monsterling.monsterling_id],
		}))
		.filter(({ info }) => !!info)
		.sort((a, b) => a.info.name.localeCompare(b.info.name));

	const pickerOptions = ownedMonsterlings.filter((monsterling) => {
		if (
			search &&
			!monsterling.info.name.toLowerCase().includes(search.toLowerCase())
		) {
			return false;
		}

		if (tierFilter !== "all" && String(monsterling.tier_id) !== tierFilter) {
			return false;
		}

		return true;
	});

	const updateCharacterSlot = (
		index: number,
		updater: (slot: LoadoutCharacterSlot) => LoadoutCharacterSlot,
	) => {
		setDraft((current) => ({
			...current,
			characters: current.characters.map((slot, slotIndex) =>
				slotIndex === index ? updater(slot) : slot,
			) as LoadoutOwned["characters"],
		}));
	};

	const selectCharacter = (index: number, value: string) => {
		updateCharacterSlot(index, (slot) => ({
			...slot,
			characterId: value === "none" ? null : Number(value),
		}));
	};

	const selectMonsterling = (monsterlingId: string | null) => {
		if (!pickerTarget) return;

		updateCharacterSlot(pickerTarget.characterIndex, (slot) => {
			const monsterlingIds = [
				...slot.monsterlingIds,
			] as LoadoutCharacterSlot["monsterlingIds"];
			monsterlingIds[pickerTarget.monsterlingIndex] = monsterlingId;

			return {
				...slot,
				monsterlingIds,
			};
		});
		setPickerTarget(null);
		setSearch("");
		setTierFilter("all");
	};

	const close = () => {
		setOpen(false);
		setPickerTarget(null);
		onClose?.();
	};

	const canSave =
		draft.name.trim().length > 0 &&
		draft.characters.every((slot) => slot.characterId !== null);

	const submit = () => {
		if (!canSave) return;

		setLoadout(
			{
				name: draft.name.trim(),
				characters: draft.characters,
			},
			loadoutToEdit ?? undefined,
		);
		close();
	};

	const showPicker = pickerTarget !== null;

	return (
		<Dialog modal={false} open={open} onOpenChange={setOpen}>
			<DialogContent
				className={cn(
					"overflow-y-auto max-h-[calc(100dvh-50px)] content-start",
					"max-w-[calc(100%-2rem)] sm:max-w-[620px]",
					!showPicker && "h-[calc(100dvh-50px)] lg:h-min",
				)}
				onCloseAutoFocus={close}
			>
				{showPicker ? (
					<>
						<DialogHeader>
							<DialogTitle className="flex items-center gap-3">
								<Button
									type="button"
									variant="secondary"
									size="icon"
									className="rounded-full"
									onClick={() => setPickerTarget(null)}
								>
									<ArrowLeftIcon />
								</Button>
								Select Monsterling
							</DialogTitle>
							<DialogDescription>
								Search owned monsterlings by name or filter by tier.
							</DialogDescription>
						</DialogHeader>

						<div className="flex flex-col sm:flex-row gap-3">
							<div className="relative flex-1">
								<SearchIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
								<Input
									value={search}
									onChange={(event) => setSearch(event.target.value)}
									placeholder="Search name"
									className="pl-9"
								/>
							</div>
							<Select value={tierFilter} onValueChange={setTierFilter}>
								<SelectTrigger className="w-full sm:w-40">
									<SelectValue placeholder="Tier" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All tiers</SelectItem>
									{Object.values(TIERS_DATA).map((tier) => (
										<SelectItem key={tier.id} value={tier.id.toString()}>
											Tier {tier.id}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							{pickerOptions.length === 0 && (
								<div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground sm:col-span-2">
									No owned monsterlings found.
								</div>
							)}

							{pickerOptions.map((monsterling) => {
								const alreadySelected =
									selectedMonsterlingIds.has(monsterling.id) &&
									draft.characters[pickerTarget.characterIndex].monsterlingIds[
										pickerTarget.monsterlingIndex
									] !== monsterling.id;

								return (
									<button
										key={monsterling.id}
										type="button"
										disabled={alreadySelected}
										onClick={() => selectMonsterling(monsterling.id)}
										className={cn(
											"rounded-md border p-2 text-left transition-colors",
											"hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
											alreadySelected && "opacity-50 cursor-not-allowed",
										)}
									>
										<MonsterlingCard
											monsterling_id={monsterling.monsterling_id}
											tier_id={monsterling.tier_id}
											traits={monsterling.traits}
											className="max-w-full"
										/>
										{alreadySelected && (
											<div className="mt-2 text-xs text-muted-foreground">
												Already selected
											</div>
										)}
									</button>
								);
							})}
						</div>
					</>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>
								{loadoutToEdit ? "Edit Team Loadout" : "Add Team Loadout"}
							</DialogTitle>
							<DialogDescription>
								Select three owned characters and assign owned monsterlings.
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-5">
							<label
								htmlFor="loadout-name"
								className="grid gap-2 text-sm font-medium"
							>
								Name
								<Input
									id="loadout-name"
									value={draft.name}
									onChange={(event) =>
										setDraft((current) => ({
											...current,
											name: event.target.value,
										}))
									}
								/>
							</label>

							<Tabs
								value={activeCharacterTab}
								onValueChange={setActiveCharacterTab}
								className="gap-4"
							>
								<TabsList className="h-auto w-full justify-start overflow-x-auto overflow-y-hidden">
									{CHARACTER_SLOT_INDEXES.map((index) => {
										const slot = draft.characters[index];
										const character =
											slot.characterId !== null
												? CHARACTERS_DATA[slot.characterId]
												: null;

										return (
											<TabsTrigger
												key={`character-slot-${index + 1}`}
												value={index.toString()}
												className="h-14 min-w-28 shrink-0 justify-start px-2"
											>
												<img
													src={
														character?.portraitImage ??
														UNKNOWN_CHARACTER_PORTRAIT
													}
													alt={
														character
															? `${character.name} portrait`
															: "Unknown character portrait"
													}
													className="size-10 rounded-sm object-cover"
												/>
												<span className="max-w-24 truncate">
													{character?.name ?? `Character ${index + 1}`}
												</span>
											</TabsTrigger>
										);
									})}
								</TabsList>

								{CHARACTER_SLOT_INDEXES.map((index) => {
									const slot = draft.characters[index];
									const character =
										slot.characterId !== null
											? CHARACTERS_DATA[slot.characterId]
											: null;
									const characterOwned =
										slot.characterId !== null
											? charactersOwned[slot.characterId]
											: null;

									return (
										<TabsContent
											key={`character-panel-${index + 1}`}
											value={index.toString()}
											className="rounded-md border p-3 grid gap-3 content-start"
										>
											<div className="text-sm font-medium">
												Character {index + 1}
											</div>

											<Select
												value={slot.characterId?.toString() ?? "none"}
												onValueChange={(value) => selectCharacter(index, value)}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select character" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="none">No character</SelectItem>
													{ownedCharacters.map((character) => {
														const alreadySelected =
															selectedCharacterIds.has(character.id) &&
															slot.characterId !== character.id;

														return (
															<SelectItem
																key={character.id}
																value={character.id.toString()}
																disabled={alreadySelected}
															>
																{character.name}
															</SelectItem>
														);
													})}
												</SelectContent>
											</Select>

											<div className="grid gap-2">
												{MONSTERLING_SLOT_INDEXES.map((monsterIndex) => {
													const monsterlingId =
														slot.monsterlingIds[monsterIndex];
													const monsterling =
														monsterlingId !== null
															? monsterlingsOwned[monsterlingId]
															: null;

													return (
														<div
															key={`character-${index + 1}-monsterling-${monsterIndex + 1}`}
															className="flex items-center gap-2 rounded-md border bg-background p-1"
														>
															<Button
																type="button"
																variant="ghost"
																className="min-w-0 flex-1 justify-start"
																onClick={() =>
																	setPickerTarget({
																		characterIndex: index,
																		monsterlingIndex: monsterIndex,
																	})
																}
															>
																<span className="truncate">
																	{monsterling
																		? MONSTERLINGS_DATA[
																				monsterling.monsterling_id
																			]?.name
																		: `Select monsterling ${monsterIndex + 1}`}
																</span>
															</Button>
															{monsterling && (
																<Button
																	type="button"
																	size="icon-sm"
																	variant="ghost"
																	title="Clear monsterling"
																	className="shrink-0"
																	onClick={() => {
																		updateCharacterSlot(index, (slot) => {
																			const monsterlingIds = [
																				...slot.monsterlingIds,
																			] as LoadoutCharacterSlot["monsterlingIds"];
																			monsterlingIds[monsterIndex] = null;

																			return {
																				...slot,
																				monsterlingIds,
																			};
																		});
																	}}
																>
																	<Trash2Icon />
																</Button>
															)}
														</div>
													);
												})}
											</div>

											<div
												className="grid justify-center gap-4 lg:grid-cols-[190px_330px]"
												style={
													{
														"--monsterling-card-width": `${MONSTERLING_CARD_WIDTH}px`,
													} as React.CSSProperties
												}
											>
												<div className="grid justify-items-center content-start gap-3">
													{character ? (
														<CharacterCard
															portraitImage={character.portraitImage}
															name={character.name}
															element_id={character.element_id}
															class_id={character.class_id}
															tier_id={character.tier_id}
															awakening={characterOwned?.awakening}
															portraitSize={130}
															iconSize={28}
														/>
													) : (
														<div className="grid place-items-center gap-2 rounded-md border border-dashed p-3 text-sm text-muted-foreground">
															<img
																src={UNKNOWN_CHARACTER_PORTRAIT}
																alt="Unknown character portrait"
																className="size-28 rounded-sm object-cover"
															/>
															No character selected
														</div>
													)}

													<div className="rounded-md border border-dashed px-3 py-4 text-center text-sm text-muted-foreground">
														Artifact
													</div>
												</div>

												<div className="grid justify-items-center content-start gap-3">
													{MONSTERLING_SLOT_INDEXES.map((monsterIndex) => {
														const monsterlingId =
															slot.monsterlingIds[monsterIndex];
														const monsterling =
															monsterlingId !== null
																? monsterlingsOwned[monsterlingId]
																: null;

														return (
															<div
																key={`character-${index + 1}-monsterling-preview-${monsterIndex + 1}`}
															>
																{monsterling ? (
																	<MonsterlingCard
																		monsterling_id={monsterling.monsterling_id}
																		tier_id={monsterling.tier_id}
																		traits={monsterling.traits}
																		className="w-[var(--monsterling-card-width)]"
																	/>
																) : (
																	<div className="grid min-h-24 w-[var(--monsterling-card-width)] place-items-center rounded-md border border-dashed px-3 py-4 text-sm text-muted-foreground">
																		Monsterling {monsterIndex + 1}
																	</div>
																)}
															</div>
														);
													})}
												</div>
											</div>

											<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
												{EQUIPMENT_SLOT_INDEXES.map((equipmentIndex) => (
													<div
														key={`character-${index + 1}-equipment-${equipmentIndex}`}
														className="rounded-md border border-dashed px-3 py-3 text-center text-xs text-muted-foreground"
													>
														Equipment {equipmentIndex}
													</div>
												))}
											</div>
										</TabsContent>
									);
								})}
							</Tabs>
						</div>

						<DialogFooter>
							<Button type="button" variant="outline" onClick={close}>
								Cancel
							</Button>
							<Button type="button" onClick={submit} disabled={!canSave}>
								{loadoutToEdit ? "Update" : "Create"}
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};
