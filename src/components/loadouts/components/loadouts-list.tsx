import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { TierPortrait } from "@/components/shared/tier-portrait";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const CHARACTER_SLOT_INDEXES = [0, 1, 2] as const;
const MONSTERLING_SLOT_INDEXES = [0, 1, 2] as const;
const EQUIPMENT_SLOT_INDEXES = [1, 2, 3, 4] as const;
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
		<div className="min-w-0">
			{loadoutEntries.length === 0 && (
				<div className="border rounded-md p-6 text-sm text-muted-foreground">
					No loadouts yet.
				</div>
			)}

			<div className="overflow-x-auto pb-2">
				<div className="grid min-w-[18rem] grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-3">
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
		<Card className="min-w-0 gap-3 rounded-lg py-3">
			<CardHeader className="grid-cols-[1fr_auto] gap-2 px-3">
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
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								type="button"
								size="icon-sm"
								variant="destructive"
								title="Delete loadout"
							>
								<Trash2Icon />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent size="sm">
							<AlertDialogHeader>
								<AlertDialogTitle>Delete team loadout?</AlertDialogTitle>
								<AlertDialogDescription>
									This will permanently delete “{loadout.name}”.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction variant="destructive" onClick={onDelete}>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardHeader>
			<CardContent className="grid gap-2 px-3">
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

					return (
						<div
							key={`${loadout.id}-character-${index + 1}`}
							className="grid grid-cols-5 gap-1 rounded-md border bg-muted/20 p-2"
						>
							<div className="grid aspect-square min-w-0 place-items-center">
								<div
									className="relative grid size-full max-h-28 max-w-28 place-items-center bg-cover bg-center"
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
										className="size-full max-h-28 max-w-28 object-contain"
									/>
									<div className="absolute left-0.5 top-0.5 rounded-full bg-background/85 p-0.5 shadow-sm">
										{element && (
											<img
												src={element.image}
												alt={`${element.element} icon`}
												title={element.element}
												className="size-4"
											/>
										)}
									</div>
									{(characterOwned?.awakening ?? 0) > 0 && (
										<span className="absolute bottom-0.5 right-0.5 rounded bg-background/90 px-1.5 py-0.5 text-xs font-bold shadow-sm">
											A{characterOwned?.awakening}
										</span>
									)}
								</div>
							</div>
							{[...MONSTERLING_SLOT_INDEXES, "legendary" as const].map(
								(monsterIndex) => {
									const monsterlingId =
										monsterIndex === "legendary"
											? (slot.legendaryMonsterlingId ?? null)
											: slot.monsterlingIds[monsterIndex];
									const monsterling =
										monsterlingId !== null
											? monsterlingsOwned[monsterlingId]
											: null;
									const monsterlingInfo = monsterling
										? MONSTERLINGS_DATA[monsterling.monsterling_id]
										: null;

									return (
										<div
											key={`${loadout.id}-character-${index + 1}-monsterling-${monsterIndex}`}
											className={cn(
												"grid aspect-square min-w-0 rounded-md border bg-background/60 text-center",
												monsterIndex === "legendary" &&
													"border-l-2 border-l-primary pl-2",
												monsterling &&
													monsterlingInfo &&
													"content-center gap-1",
												(!monsterling || !monsterlingInfo) &&
													"place-items-center border-dashed",
											)}
										>
											{monsterling && monsterlingInfo ? (
												<Dialog>
													<DialogTrigger className="relative mx-auto grid size-full cursor-pointer place-items-center overflow-hidden rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
														<TierPortrait
															tier={monsterling.tier_id}
															portraitImg={monsterlingInfo.image}
															portraitSize={112}
															name={monsterlingInfo.name}
															hideTierBg
														/>
													</DialogTrigger>
													<DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm">
														<DialogHeader>
															<DialogTitle>{monsterlingInfo.name}</DialogTitle>
															<DialogDescription>
																Tier and complete stats for this owned
																monsterling.
															</DialogDescription>
														</DialogHeader>
														<div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
															<MonsterlingCard
																monsterling_id={monsterling.monsterling_id}
																tier_id={monsterling.tier_id}
																traits={monsterling.traits}
															/>
														</div>
													</DialogContent>
												</Dialog>
											) : (
												<span className="text-[10px] text-muted-foreground">
													{monsterIndex === "legendary"
														? "Legendary"
														: `Slot ${monsterIndex + 1}`}
												</span>
											)}
										</div>
									);
								},
							)}
							<div className="grid aspect-square place-items-center rounded-md border border-dashed bg-background/60 text-[10px] text-muted-foreground">
								Artifact
							</div>
							{EQUIPMENT_SLOT_INDEXES.map((equipmentIndex) => (
								<div
									key={`${loadout.id}-${index}-equipment-${equipmentIndex}`}
									className={cn(
										"grid aspect-square place-items-center rounded-md border border-dashed bg-background/60 text-[10px] text-muted-foreground",
										equipmentIndex === 1 && "border-l-2 border-l-primary pl-2",
									)}
								>
									Equipment {equipmentIndex}
								</div>
							))}
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
};
