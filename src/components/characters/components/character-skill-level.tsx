import type { CharacterOwned } from "@/components/characters/components/character-details-form";
import {
	getAwakeningBonus,
	isMaxSkill,
} from "@/components/characters/utils/character-utils";
import { IMAGE_MAPPING, IMAGE_MAPPING_ID } from "@/data/IMAGE_MAPPING_DATA";
import { cn } from "@/lib/utils";

type CharacterSkillLevelProps = {
	charOwned: CharacterOwned;
};

const SKILLS = [
	["special", IMAGE_MAPPING_ID.SKILL_SPECIAL, 20],
	["switch", IMAGE_MAPPING_ID.SKILL_SWITCH, 20],
	["basic", IMAGE_MAPPING_ID.SKILL_BASIC, 17],
	["ultimate", IMAGE_MAPPING_ID.SKILL_ULTIMATE, 20],
] as const;

export const CharacterSkillLevel = (props: CharacterSkillLevelProps) => {
	const { charOwned } = props;
	const boost = getAwakeningBonus(charOwned.awakening);
	const boostSkills = boost > 0;

	return (
		<div
			className="bg-card rounded-b-lg py-1 place-items-center"
			style={{
				display: "grid",
				// idk. might handle responsiveness
				gridTemplateColumns: "1fr 1fr 1fr 1fr",
				gridTemplateRows: "1fr",
			}}
		>
			{SKILLS.map(([skill, icon, size]) => (
				<img
					key={skill}
					width={size}
					height={size}
					alt={`${skill} skill icon`}
					src={IMAGE_MAPPING[icon].image}
				/>
			))}
			{SKILLS.map(([skill]) => (
				<small
					key={skill}
					className={cn(
						isMaxSkill(charOwned.skills[skill]) && "text-green-300",
						boostSkills && "text-amber-400",
					)}
				>
					{charOwned.skills[skill] + boost}
				</small>
			))}
		</div>
	);
};
