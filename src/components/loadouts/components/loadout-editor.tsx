import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { cn } from "@/lib/utils";
import type { StoreState } from "@/stores/app-store";
import type {
	LoadoutCharacterSlot,
	LoadoutOwned,
} from "@/stores/loadouts-slice";

const SLOT_INDEXES = [0, 1, 2] as const;
const UNKNOWN_CHARACTER_PORTRAIT =
	"/images/Character_Portrait/portrait_Unknown_00.png";

type LoadoutEditorProps = {
	draft: Omit<LoadoutOwned, "id">;
	activeTab: string;
	monsterlingsOwned: StoreState["monsterlingsOwned"];
	onNameChange: (name: string) => void;
	onActiveTabChange: (tab: string) => void;
	onOpenCharacterPicker: (characterIndex: number) => void;
	onOpenMonsterlingPicker: (
		characterIndex: number,
		legendary: boolean,
		monsterlingIndex?: number,
	) => void;
	onUpdateSlot: (
		index: number,
		updater: (slot: LoadoutCharacterSlot) => LoadoutCharacterSlot,
	) => void;
};

export const LoadoutEditor = ({
	draft,
	activeTab,
	monsterlingsOwned,
	onNameChange,
	onActiveTabChange,
	onOpenCharacterPicker,
	onOpenMonsterlingPicker,
	onUpdateSlot,
}: LoadoutEditorProps) => (
	<div className="grid gap-4">
		<label htmlFor="loadout-name" className="grid gap-2 text-sm font-medium">
			Name
			<Input
				id="loadout-name"
				value={draft.name}
				onChange={(event) => onNameChange(event.target.value)}
			/>
		</label>
		<Tabs value={activeTab} onValueChange={onActiveTabChange} className="gap-4">
			<TabsList className="grid w-full grid-cols-3 divide-x divide-border group-data-[orientation=horizontal]/tabs:h-[4.375rem]">
				{SLOT_INDEXES.map((index) => {
					const characterId = draft.characters[index].characterId;
					const character =
						characterId === null ? null : CHARACTERS_DATA[characterId];
					return (
						<TabsTrigger
							key={index}
							value={String(index)}
							className="h-16 min-w-0 px-1 py-2 after:hidden data-[state=active]:bg-primary/20 dark:data-[state=active]:bg-primary/25"
						>
							<img
								src={character?.portraitImage ?? UNKNOWN_CHARACTER_PORTRAIT}
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
					slot.characterId === null ? null : CHARACTERS_DATA[slot.characterId];
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
								onClick={() => onOpenCharacterPicker(index)}
							>
								<span className="truncate">
									{character?.name ?? "Select character"}
								</span>
							</Button>
							{slot.characterId !== null && (
								<Button
									type="button"
									size="icon"
									variant="destructive"
									aria-label={`Clear character ${index + 1}`}
									onClick={() =>
										onUpdateSlot(index, (current) => ({
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
							{[...SLOT_INDEXES, "legendary" as const].map((monsterIndex) => {
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
											legendary && "border-l-2 border-l-primary pl-2",
										)}
									>
										<button
											type="button"
											onClick={() =>
												onOpenMonsterlingPicker(
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
													<span className="w-full truncate">{info.name}</span>
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
													onUpdateSlot(index, (current) =>
														legendary
															? { ...current, legendaryMonsterlingId: null }
															: {
																	...current,
																	monsterlingIds: current.monsterlingIds.map(
																		(value, itemIndex) =>
																			itemIndex === monsterIndex ? null : value,
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
							})}
						</div>
					</TabsContent>
				);
			})}
		</Tabs>
	</div>
);
