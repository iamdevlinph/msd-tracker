import type { CharacterOwned } from "@/components/characters/components/character-details-form";
import { CHARACTER_SKILLS } from "@/components/characters/utils/character-domain-values";
import {
	getAwakeningBonus,
	isMaxSkill,
} from "@/components/characters/utils/character-utils";
import {
	IMAGE_MAPPING,
	IMAGE_MAPPING_ID,
} from "@/data/image-mapping/IMAGE_MAPPING_DATA";
import { cn } from "@/lib/utils";

type CharacterSkillLevelProps = {
	charOwned: CharacterOwned;
	exportLayout?: boolean;
};

const SKILLS = [
	[CHARACTER_SKILLS.SPECIAL, IMAGE_MAPPING_ID.SKILL_SPECIAL, 20],
	[CHARACTER_SKILLS.SWITCH, IMAGE_MAPPING_ID.SKILL_SWITCH, 20],
	[CHARACTER_SKILLS.BASIC, IMAGE_MAPPING_ID.SKILL_BASIC, 17],
	[CHARACTER_SKILLS.ULTIMATE, IMAGE_MAPPING_ID.SKILL_ULTIMATE, 20],
] as const;

export const CharacterSkillLevel = (props: CharacterSkillLevelProps) => {
	const { charOwned, exportLayout = false } = props;
	const boost = getAwakeningBonus(charOwned.awakening);
	const boostSkills = boost > 0;

	return (
		<div
			className={cn(
				"bg-card rounded-b-lg py-1 place-items-center",
				exportLayout && "w-[130px]",
			)}
			style={{
				display: "grid",
				gridTemplateColumns: exportLayout
					? "repeat(4, minmax(0, 1fr))"
					: "1fr 1fr 1fr 1fr",
				gridTemplateRows: "auto auto",
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
						isMaxSkill(charOwned.skills[skill])
							? "text-green-300"
							: boostSkills && "text-amber-400",
					)}
				>
					{charOwned.skills[skill] + boost}
				</small>
			))}
		</div>
	);
};
