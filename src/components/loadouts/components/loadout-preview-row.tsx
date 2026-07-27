import CharacterCard from "@/components/characters/components/character-card";
import { getAwakeningBonus } from "@/components/characters/utils/character-utils";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { getMonsterlingLinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { IMAGE_MAPPING, IMAGE_MAPPING_ID } from "@/data/IMAGE_MAPPING_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { cn } from "@/lib/utils";
import type { StoreState } from "@/stores/app-store";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";

const SLOT_INDEXES = [0, 1, 2] as const;
const SKILLS = [
	["Special", IMAGE_MAPPING_ID.SKILL_SPECIAL, "special"],
	["Switch", IMAGE_MAPPING_ID.SKILL_SWITCH, "switch"],
	["Basic", IMAGE_MAPPING_ID.SKILL_BASIC, "basic"],
	["Ultimate", IMAGE_MAPPING_ID.SKILL_ULTIMATE, "ultimate"],
] as const;

type LoadoutPreviewRowProps = {
	slot: LoadoutCharacterSlot;
	characterOwned?: StoreState["charactersOwned"][number];
	monsterlingsOwned: StoreState["monsterlingsOwned"];
	monsterlingLinkChainLevels: StoreState["monsterlingLinkChainLevels"];
	compactMonsterlings: boolean;
};

export const LoadoutPreviewRow = ({
	slot,
	characterOwned,
	monsterlingsOwned,
	monsterlingLinkChainLevels,
	compactMonsterlings,
}: LoadoutPreviewRowProps) => {
	const character =
		slot.characterId === null ? null : CHARACTERS_DATA[slot.characterId];
	const validCharacter = character && characterOwned;

	return (
		<section
			className={cn(
				"grid items-center gap-3 border-b border-border/70 pb-4 last:border-0 last:pb-0",
				compactMonsterlings
					? "grid-cols-[184px_repeat(3,176px)_188px]"
					: "grid-cols-[184px_repeat(3,330px)_342px]",
			)}
		>
			{validCharacter ? (
				<div className="grid h-[120px] grid-cols-[84px_1fr] items-center gap-2 rounded-lg border bg-card px-1">
					<CharacterCard
						portraitSize={84}
						iconSize={18}
						portraitImage={character.portraitImage}
						name={character.name}
						element_id={character.element_id}
						class_id={character.class_id}
						tier_id={character.tier_id}
						awakening={characterOwned.awakening}
						variant={character.variant}
						className="cursor-default"
						portraitClassName="size-full object-contain object-bottom"
						showElement={false}
						showClass={false}
						showAwakening={false}
					/>
					<div className="grid content-center gap-2">
						<div className="flex items-center justify-center gap-1.5">
							<img
								src={ELEMENTS_DATA[character.element_id].image}
								alt={`${ELEMENTS_DATA[character.element_id].element} icon`}
								className="size-5"
							/>
							<span
								className="grid size-5 place-items-center rounded-full bg-primary/20 text-[10px] font-bold text-primary"
								title={`Awakening ${characterOwned.awakening}`}
							>
								A{characterOwned.awakening}
							</span>
						</div>
						<div
							className="grid gap-1"
							style={{
								gridTemplateColumns:
									"var(--loadout-export-skill-columns, repeat(4, minmax(0, 1fr)))",
							}}
						>
							{SKILLS.map(([label, icon, key]) => (
								<div
									key={key}
									className="grid place-items-center gap-0.5"
									title={`${label} level ${characterOwned.skills[key] + getAwakeningBonus(characterOwned.awakening)}`}
								>
									<img
										src={IMAGE_MAPPING[icon].image}
										alt={`${label} skill icon`}
										className="size-4"
									/>
									<span className="whitespace-nowrap text-xs font-bold text-amber-400">
										{characterOwned.skills[key] +
											getAwakeningBonus(characterOwned.awakening)}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<PreviewPlaceholder label="Character unavailable" />
			)}
			{SLOT_INDEXES.map((index) => (
				<PreviewMonsterlingSlot
					key={index}
					id={slot.monsterlingIds[index]}
					owned={monsterlingsOwned}
					levels={monsterlingLinkChainLevels}
					label={`Monsterling ${index + 1} unavailable`}
					compactStats={compactMonsterlings}
				/>
			))}
			<div className="border-l-2 border-primary pl-3">
				<PreviewMonsterlingSlot
					id={slot.legendaryMonsterlingId ?? null}
					owned={monsterlingsOwned}
					levels={monsterlingLinkChainLevels}
					label="Legendary unavailable"
					compactStats={compactMonsterlings}
				/>
			</div>
		</section>
	);
};

type PreviewMonsterlingSlotProps = {
	id: string | null;
	owned: StoreState["monsterlingsOwned"];
	levels: StoreState["monsterlingLinkChainLevels"];
	label: string;
	compactStats: boolean;
};

const PreviewMonsterlingSlot = ({
	id,
	owned,
	levels,
	label,
	compactStats,
}: PreviewMonsterlingSlotProps) => {
	const monsterling = id ? owned[id] : null;
	return monsterling && MONSTERLINGS_DATA[monsterling.monsterling_id] ? (
		<MonsterlingCard
			{...monsterling}
			linkChainLevel={getMonsterlingLinkChainLevel(
				monsterling.monsterling_id,
				levels,
			)}
			compactStats={compactStats}
		/>
	) : (
		<PreviewPlaceholder label={label} />
	);
};

type PreviewPlaceholderProps = { label: string };

const PreviewPlaceholder = ({ label }: PreviewPlaceholderProps) => (
	<div className="grid h-[120px] w-full place-items-center rounded-lg border border-dashed bg-muted/20 text-sm text-muted-foreground">
		{label}
	</div>
);
