import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { getMonsterlingLinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { TierPortrait } from "@/components/shared/tier-portrait";
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
import type { StoreState } from "@/stores/app-store";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";
import { showFutureLoadoutSlots } from "./loadout-utils";

const MONSTERLING_SLOT_INDEXES = [0, 1, 2] as const;
const EQUIPMENT_SLOT_INDEXES = [1, 2, 3, 4] as const;
const UNKNOWN_CHARACTER_PORTRAIT =
	"/images/Character_Portrait/portrait_Unknown_00.png";
const SHOW_FUTURE_SLOTS = showFutureLoadoutSlots(import.meta.env.VITE_NODE_ENV);

type LoadoutCardCharacterRowProps = {
	loadoutId: string;
	index: number;
	slot: LoadoutCharacterSlot;
	charactersOwned: StoreState["charactersOwned"];
	monsterlingsOwned: StoreState["monsterlingsOwned"];
	monsterlingLinkChainLevels: StoreState["monsterlingLinkChainLevels"];
};

export const LoadoutCardCharacterRow = ({
	loadoutId,
	index,
	slot,
	charactersOwned,
	monsterlingsOwned,
	monsterlingLinkChainLevels,
}: LoadoutCardCharacterRowProps) => {
	const character =
		slot.characterId !== null ? CHARACTERS_DATA[slot.characterId] : null;
	const characterOwned =
		slot.characterId !== null ? charactersOwned[slot.characterId] : null;
	const element = character ? ELEMENTS_DATA[character.element_id] : null;

	return (
		<div className="grid grid-cols-5 gap-1 rounded-md border bg-muted/20 p-2">
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
					const monsterling = monsterlingId
						? monsterlingsOwned[monsterlingId]
						: null;
					const info = monsterling
						? MONSTERLINGS_DATA[monsterling.monsterling_id]
						: null;

					return (
						<div
							key={`${loadoutId}-character-${index + 1}-monsterling-${monsterIndex}`}
							className={cn(
								"grid aspect-square min-w-0 rounded-md border bg-background/60 text-center",
								monsterIndex === "legendary" && "border-l-2 border-l-primary",
								monsterling && info
									? "content-center gap-1"
									: "place-items-center border-dashed",
							)}
						>
							{monsterling && info ? (
								<Dialog>
									<DialogTrigger className="pointer-events-auto relative mx-auto grid size-full cursor-pointer place-items-center overflow-hidden rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
										<TierPortrait
											tier={monsterling.tier_id}
											portraitImg={info.image}
											portraitSize={112}
											name={info.name}
											hideTierBg
										/>
									</DialogTrigger>
									<DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm">
										<DialogHeader>
											<DialogTitle>{info.name}</DialogTitle>
											<DialogDescription>
												Tier and complete stats for this owned monsterling.
											</DialogDescription>
										</DialogHeader>
										<div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
											<MonsterlingCard
												monsterling_id={monsterling.monsterling_id}
												tier_id={monsterling.tier_id}
												linkChainLevel={getMonsterlingLinkChainLevel(
													monsterling.monsterling_id,
													monsterlingLinkChainLevels,
												)}
												traits={monsterling.traits}
											/>
										</div>
									</DialogContent>
								</Dialog>
							) : (
								<span className="text-[10px] text-muted-foreground">
									{monsterIndex === "legendary"
										? "Legendary"
										: `Monsterling ${monsterIndex + 1}`}
								</span>
							)}
						</div>
					);
				},
			)}
			{SHOW_FUTURE_SLOTS && (
				<>
					<div className="grid aspect-square place-items-center rounded-md border border-dashed bg-background/60 text-[10px] text-muted-foreground">
						Artifact
					</div>
					{EQUIPMENT_SLOT_INDEXES.map((equipmentIndex) => (
						<div
							key={`${loadoutId}-${index}-equipment-${equipmentIndex}`}
							className={cn(
								"grid aspect-square place-items-center rounded-md border border-dashed bg-background/60 text-[10px] text-muted-foreground",
								equipmentIndex === 1 && "border-l-2 border-l-primary pl-2",
							)}
						>
							Equipment {equipmentIndex}
						</div>
					))}
				</>
			)}
		</div>
	);
};
