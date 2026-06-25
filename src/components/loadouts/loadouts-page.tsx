import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import { PageTitle } from "@/components/shared/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHARACTER_CLASS_DATA } from "@/data/CHARACTER_CLASS_DATA";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

const CHARACTER_SLOT_INDEXES = [0, 1, 2] as const;
const MONSTERLING_SLOT_INDEXES = [0, 1, 2] as const;

export const LoadoutsPage = () => {
	const [open, setOpen] = useState(false);
	const [loadoutToEdit, setLoadoutToEdit] = useState<string | null>(null);

	const loadouts = useAppStore((s) => s.loadouts);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	const deleteLoadout = useAppStore((s) => s.deleteLoadout);

	const loadoutEntries = Object.values(loadouts).sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	return (
		<div className="flex flex-col gap-5">
			<PageTitle title="Loadouts" />

			<div className="flex justify-between gap-3 items-center">
				<div className="text-sm text-muted-foreground">
					{loadoutEntries.length} team loadout
					{loadoutEntries.length === 1 ? "" : "s"}
				</div>
				<Button
					type="button"
					onClick={() => {
						setLoadoutToEdit(null);
						setOpen(true);
					}}
				>
					<PlusIcon />
					Add Loadout
				</Button>
			</div>

			{loadoutEntries.length === 0 && (
				<div className="border rounded-md p-6 text-sm text-muted-foreground">
					No loadouts yet.
				</div>
			)}

			<div className="grid gap-4 xl:grid-cols-2">
				{loadoutEntries.map((loadout) => (
					<Card key={loadout.id} className="rounded-lg py-4 gap-4">
						<CardHeader className="gap-3 px-4 sm:grid-cols-[1fr_auto]">
							<CardTitle className="text-base leading-tight">
								{loadout.name}
							</CardTitle>
							<div className="flex gap-2">
								<Button
									type="button"
									size="icon-sm"
									variant="outline"
									onClick={() => {
										setLoadoutToEdit(loadout.id);
										setOpen(true);
									}}
									title="Edit loadout"
								>
									<EditIcon />
								</Button>
								<Button
									type="button"
									size="icon-sm"
									variant="destructive"
									onClick={() => deleteLoadout(loadout.id)}
									title="Delete loadout"
								>
									<Trash2Icon />
								</Button>
							</div>
						</CardHeader>
						<CardContent className="grid gap-3 px-4 md:grid-cols-3">
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
									character !== null
										? ELEMENTS_DATA[character.element_id]
										: null;
								const characterClass =
									character !== null
										? CHARACTER_CLASS_DATA[character.class_id]
										: null;

								return (
									<div
										key={`${loadout.id}-character-${index + 1}`}
										className="rounded-md border bg-muted/20 p-3 grid gap-3 content-start"
									>
										{character ? (
											<div className="flex gap-3 min-w-0">
												<div
													className="relative grid size-20 shrink-0 place-items-center bg-cover bg-center"
													style={{
														backgroundImage: `url(${TIERS_DATA[character.tier_id].full})`,
													}}
												>
													<img
														src={character.portraitImage}
														alt={`${character.name} portrait`}
														className="size-18 object-contain"
													/>
												</div>
												<div className="grid min-w-0 content-center gap-2">
													<div className="truncate text-sm font-semibold">
														{character.name}
													</div>
													<div className="flex items-center gap-2">
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
											</div>
										) : (
											<div className="grid min-h-20 place-items-center rounded-md border border-dashed p-4 text-sm text-muted-foreground">
												Character {index + 1}
											</div>
										)}

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
															"grid min-h-24 rounded-md border bg-background/60 p-2 text-center",
															monsterling &&
																monsterlingInfo &&
																"content-start gap-1",
															(!monsterling || !monsterlingInfo) &&
																"place-items-center border-dashed",
														)}
													>
														{monsterling && monsterlingInfo ? (
															<>
																<div
																	className="mx-auto grid size-12 place-items-center bg-cover bg-center"
																	style={{
																		backgroundImage: `url(${TIERS_DATA[monsterling.tier_id].full})`,
																	}}
																>
																	<img
																		src={monsterlingInfo.image}
																		alt={`${monsterlingInfo.name} monsterling`}
																		className="size-11 object-contain"
																	/>
																</div>
																<div className="truncate text-[11px] font-medium">
																	{monsterlingInfo.name}
																</div>
																<div className="text-[10px] text-muted-foreground">
																	Tier {monsterling.tier_id}
																</div>
															</>
														) : (
															<span className="text-[11px] text-muted-foreground">
																Monsterling {monsterIndex + 1}
															</span>
														)}
													</div>
												);
											})}
										</div>

										<div className="grid grid-cols-2 gap-2">
											<div className="rounded-md border border-dashed px-3 py-2 text-center text-xs text-muted-foreground">
												Artifact
											</div>
											<div className="rounded-md border border-dashed px-3 py-2 text-center text-xs text-muted-foreground">
												Equipment
											</div>
										</div>
									</div>
								);
							})}
						</CardContent>
					</Card>
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
