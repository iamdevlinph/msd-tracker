import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHARACTER_CLASS_DATA } from "@/data/CHARACTER_CLASS_DATA";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const CHARACTER_SLOT_INDEXES = [0, 1, 2] as const;
const MONSTERLING_SLOT_INDEXES = [0, 1, 2] as const;
// const EQUIPMENT_SLOT_INDEXES = [1, 2, 3, 4] as const;
const UNKNOWN_CHARACTER_PORTRAIT =
	"/images/Character_Portrait/portrait_Unknown_00.png";

export const LoadoutsList = () => {
	const [open, setOpen] = useState(false);
	const [loadoutToEdit, setLoadoutToEdit] = useState<string | null>(null);

	const loadouts = useAppStore((s) => s.loadouts);
	const deleteLoadout = useAppStore((s) => s.deleteLoadout);

	const loadoutEntries = Object.values(loadouts).sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	return (
		<div>
			{loadoutEntries.length === 0 && (
				<div className="border rounded-md p-6 text-sm text-muted-foreground">
					No loadouts yet.
				</div>
			)}

			<div className="grid gap-4 xl:grid-cols-2">
				{loadoutEntries.map((loadout) => (
					<LoadoutCard
						key={loadout.id}
						loadout={loadout}
						onEdit={() => {
							setLoadoutToEdit(loadout.id);
							setOpen(true);
						}}
						onDelete={() => deleteLoadout(loadout.id)}
					/>
				))}
			</div>

			<LoadoutsDialog
				open={open}
				setOpen={setOpen}
				loadoutToEdit={loadoutToEdit}
				onClose={() => setLoadoutToEdit(null)}
			/>
		</div>
	);
};

type LoadoutCardProps = {
	loadout: LoadoutOwned;
	onEdit: () => void;
	onDelete: () => void;
};

const LoadoutCard = ({ loadout, onEdit, onDelete }: LoadoutCardProps) => {
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);

	return (
		<Card className="rounded-lg py-4 gap-4">
			<CardHeader className="gap-3 px-4 grid-cols-[1fr_auto]">
				<CardTitle className="text-base leading-tight">
					{loadout.name}
				</CardTitle>
				<div className="flex gap-2">
					<Button
						type="button"
						size="icon-sm"
						variant="outline"
						onClick={onEdit}
						title="Edit loadout"
					>
						<EditIcon />
					</Button>
					<Button
						type="button"
						size="icon-sm"
						variant="destructive"
						onClick={onDelete}
						title="Delete loadout"
					>
						<Trash2Icon />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="grid gap-3 px-4">
				{CHARACTER_SLOT_INDEXES.map((index) => {
					const slot = loadout.characters[index];
					const character =
						slot.characterId !== null
							? CHARACTERS_DATA[slot.characterId]
							: null;
					const characterOwned =
						slot.characterId !== null
							? charactersOwned[slot.characterId]
							: null;
					const element =
						character !== null ? ELEMENTS_DATA[character.element_id] : null;
					const characterClass =
						character !== null
							? CHARACTER_CLASS_DATA[character.class_id]
							: null;

					return (
						<div
							key={`${loadout.id}-character-${index + 1}`}
							className="grid gap-3 rounded-md border bg-muted/20 p-3 sm:grid-cols-[110px_minmax(0,1fr)]"
						>
							<div className="grid justify-items-center gap-2 content-start">
								<div
									className="relative grid size-24 place-items-center bg-cover bg-center"
									style={{
										backgroundImage: character
											? `url(${TIERS_DATA[character.tier_id].full})`
											: undefined,
									}}
								>
									<img
										src={character?.portraitImage ?? UNKNOWN_CHARACTER_PORTRAIT}
										alt={
											character
												? `${character.name} portrait`
												: "Unknown character portrait"
										}
										className="size-22 object-contain"
									/>
								</div>

								<div className="flex items-center justify-center gap-2">
									{element && (
										<img
											src={element.image}
											alt={`${element.element} icon`}
											title={element.element}
											className="size-5"
										/>
									)}

									{characterClass && (
										<img
											src={characterClass.image}
											alt={`${characterClass.character_class} icon`}
											title={characterClass.character_class}
											className="size-5"
										/>
									)}

									{(characterOwned?.awakening ?? 0) > 0 && (
										<span className="rounded-sm bg-background px-1.5 py-0.5 text-xs font-medium">
											A{characterOwned?.awakening}
										</span>
									)}
								</div>
							</div>

							<div className="grid content-center gap-2">
								{/* <div className="grid grid-cols-5 gap-2">
									<div className="grid aspect-square place-items-center rounded-md border border-dashed bg-background/60 p-1 text-center text-[10px] text-muted-foreground">
										Artifact
									</div>
									{EQUIPMENT_SLOT_INDEXES.map((equipmentIndex) => (
										<div
											key={`${loadout.id}-character-${index + 1}-equipment-${equipmentIndex}`}
											className="grid aspect-square place-items-center rounded-md border border-dashed bg-background/60 p-1 text-center text-[10px] text-muted-foreground"
										>
											Eq {equipmentIndex}
										</div>
									))}
								</div> */}

								<div className="grid grid-cols-3 gap-2">
									{MONSTERLING_SLOT_INDEXES.map((monsterIndex) => {
										const monsterlingId = slot.monsterlingIds[monsterIndex];
										const monsterling =
											monsterlingId !== null
												? monsterlingsOwned[monsterlingId]
												: null;
										const monsterlingInfo = monsterling
											? MONSTERLINGS_DATA[monsterling.monsterling_id]
											: null;

										return (
											<div
												key={`${loadout.id}-character-${index + 1}-monsterling-${monsterIndex + 1}`}
												className={cn(
													"grid rounded-md border bg-background/60 text-center",
													monsterling &&
														monsterlingInfo &&
														"content-center gap-1",
													(!monsterling || !monsterlingInfo) &&
														"place-items-center border-dashed",
												)}
											>
												{monsterling && monsterlingInfo ? (
													<div className="mx-auto grid place-items-center bg-cover bg-center relative">
														{/* <small className="text-center absolute bottom-2 stroke-black w-full text-shadow-sm/100 text-[14px]">
															{monsterlingInfo.name}
														</small> */}
														<TierPortrait
															tier={monsterling.tier_id}
															portraitImg={monsterlingInfo.image}
															portraitSize={120}
															name={monsterlingInfo.name}
															hideTierBg
														/>
													</div>
												) : (
													<span className="text-[10px] text-muted-foreground">
														Slot {monsterIndex + 1}
													</span>
												)}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
};
