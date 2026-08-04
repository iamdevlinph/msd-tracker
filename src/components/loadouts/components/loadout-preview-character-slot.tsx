import CharacterCard from "@/components/characters/components/character-card";
import {
	CHARACTER_SKILLS,
	type CharacterSkill,
} from "@/components/characters/utils/character-domain-values";
import {
	getAwakeningBonus,
	isMaxSkill,
} from "@/components/characters/utils/character-utils";
import type { Character } from "@/data/characters/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import {
	IMAGE_MAPPING,
	IMAGE_MAPPING_ID,
} from "@/data/image-mapping/IMAGE_MAPPING_DATA";
import { STAT_DATA } from "@/data/stats/STAT_DATA";
import {
	type LoadoutCharacterSlot,
	normalizePinnedStats,
} from "@/stores/loadouts-slice";
import { LOADOUT_PREVIEW_PORTRAIT_SIZE } from "./loadout-preview-constants";
import { ELEMENT_ATK_STAT_DATA, LOADOUT_STAT_DATA } from "./loadout-stat-utils";

const SKILLS = [
	["Special", IMAGE_MAPPING_ID.SKILL_SPECIAL, CHARACTER_SKILLS.SPECIAL],
	["Switch", IMAGE_MAPPING_ID.SKILL_SWITCH, CHARACTER_SKILLS.SWITCH],
	["Basic", IMAGE_MAPPING_ID.SKILL_BASIC, CHARACTER_SKILLS.BASIC],
	["Ultimate", IMAGE_MAPPING_ID.SKILL_ULTIMATE, CHARACTER_SKILLS.ULTIMATE],
] as const;
const STAT_ROWS = ["stat-1", "stat-2", "stat-3", "stat-4", "stat-5"];
const STAT_NUMBER_FORMATTER = new Intl.NumberFormat("en-US", {
	maximumFractionDigits: 20,
});

type PreviewCharacter = Character;
type CharacterOwned = {
	awakening: number;
	skills: Record<CharacterSkill, number>;
};
type LoadoutPreviewCharacterProps = {
	character: PreviewCharacter;
	owned: CharacterOwned;
	onEdit?: (id: number) => void;
	statValues?: LoadoutCharacterSlot["stat_values"];
	pinnedStatIds?: LoadoutCharacterSlot["pinned_stat_ids"];
};

export const LoadoutPreviewCharacter = ({
	character,
	owned,
	onEdit,
	statValues = {},
	pinnedStatIds = [],
}: LoadoutPreviewCharacterProps) => {
	const orderedPinnedStatIds = normalizePinnedStats(pinnedStatIds);
	const panel = (
		<div className="grid h-[120px] grid-cols-[44px_82px_120px] items-center gap-2 rounded-lg border bg-card px-1 pr-0">
			<div className="grid content-center gap-2">
				<div className="grid grid-cols-2 items-center gap-1.5">
					<img
						src={ELEMENTS_DATA[character.element_id].image}
						alt={`${ELEMENTS_DATA[character.element_id].element} icon`}
						className="size-5 justify-self-start"
					/>
					<span
						className="grid size-5 place-items-center justify-self-end rounded-full bg-primary/20 text-[10px] font-bold text-primary"
						title={`Awakening ${owned.awakening}`}
					>
						A{owned.awakening}
					</span>
				</div>
				<div className="grid gap-1">
					{SKILLS.map(([label, icon, key]) => (
						<div
							key={key}
							className="grid grid-cols-[1fr_auto] items-center gap-1"
							title={`${label} level ${owned.skills[key] + getAwakeningBonus(owned.awakening)}`}
						>
							<img
								src={IMAGE_MAPPING[icon].image}
								alt={`${label} skill icon`}
								className="size-4 justify-self-start"
							/>
							<span
								className={`whitespace-nowrap text-xs font-bold ${isMaxSkill(owned.skills[key]) ? "text-green-300" : "text-amber-400"}`}
							>
								{owned.skills[key] + getAwakeningBonus(owned.awakening)}
							</span>
						</div>
					))}
				</div>
			</div>
			<div className="grid h-[104px] content-center gap-1 border-l border-primary/60 pl-2">
				{STAT_ROWS.map((rowKey, index) => {
					const key = orderedPinnedStatIds[index];
					if (!key) return <span key={rowKey} className="h-4" />;
					const element = ELEMENTS_DATA[character.element_id];
					const stat =
						key === "element_atk"
							? STAT_DATA[ELEMENT_ATK_STAT_DATA[character.element_id]]
							: STAT_DATA[LOADOUT_STAT_DATA[key]];
					const value = statValues[key];
					const statLabel =
						key === "element_atk" ? `${element.element} ATK` : stat.stat;
					return (
						<span
							key={key}
							className="grid grid-cols-[16px_1fr] items-center gap-1 text-xs font-bold"
							title={statLabel}
						>
							<img
								src={stat.image}
								alt={`${statLabel} icon`}
								className="size-4"
							/>
							<span className="truncate">
								{value === undefined
									? "—"
									: STAT_NUMBER_FORMATTER.format(value)}
								{value !== undefined && key !== "atk" && key !== "hp"
									? "%"
									: ""}
							</span>
						</span>
					);
				})}
			</div>
			<CharacterCard
				portraitSize={LOADOUT_PREVIEW_PORTRAIT_SIZE}
				iconSize={18}
				portraitImage={character.portraitImage}
				name={character.name}
				element_id={character.element_id}
				class_id={character.class_id}
				tier_id={character.tier_id}
				awakening={owned.awakening}
				variant={character.variant}
				className="cursor-default"
				portraitClassName="size-full object-contain object-bottom"
				hideTierBg
				showElement={false}
				showClass={false}
				showAwakening={false}
			/>
		</div>
	);
	return onEdit ? (
		<button
			type="button"
			aria-label={`Edit ${character.name} character`}
			onClick={() => onEdit(character.id)}
			className="rounded-lg text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			{panel}
		</button>
	) : (
		panel
	);
};
