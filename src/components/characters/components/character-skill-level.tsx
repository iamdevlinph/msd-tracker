import type { CharacterOwnedDetails } from "@/components/characters/components/character-details-form";
import {
	getAwakeningBonus,
	isMaxSkill,
} from "@/components/characters/utils/character-utils";
import { IMAGE_MAPPING, IMAGE_MAPPING_ID } from "@/data/IMAGE_MAPPING_DATA";
import { cn } from "@/lib/utils";

type CharacterSkillLevel = {
	charOwned: CharacterOwnedDetails;
};

export const CharacterSkillLevel = (props: CharacterSkillLevel) => {
	const { charOwned } = props;
	const boost = getAwakeningBonus(charOwned.awakening);
	const boostSkills = boost > 0;

	return (
		<div
			className="bg-card rounded-b-lg py-1 place-items-center"
			style={{
				display: "grid",
				// idk. might handle responsiveness
				gridTemplateAreas:
					"'basic switch special ult' 'basic-lvl switch-lvl special-lvl ult-lvl'",
				gridTemplateColumns: "1fr 1fr 1fr 1fr",
				gridTemplateRows: "1fr",
			}}
		>
			<img
				width={17}
				height={17}
				alt="basic skill icon"
				src={IMAGE_MAPPING[IMAGE_MAPPING_ID.SKILL_BASIC].image}
			/>
			<img
				width={20}
				height={20}
				alt="switch skill icon"
				src={IMAGE_MAPPING[IMAGE_MAPPING_ID.SKILL_SWITCH].image}
			/>
			<img
				width={20}
				height={20}
				alt="special skill icon"
				src={IMAGE_MAPPING[IMAGE_MAPPING_ID.SKILL_SPECIAL].image}
			/>
			<img
				width={20}
				height={20}
				alt="ultimate skill icon"
				src={IMAGE_MAPPING[IMAGE_MAPPING_ID.SKILL_ULTIMATE].image}
			/>
			<small
				className={cn(
					isMaxSkill(charOwned.skills.basic) && "text-green-300",
					boostSkills && "text-amber-400",
				)}
			>
				{charOwned.skills.basic + boost}
			</small>
			<small
				className={cn(
					isMaxSkill(charOwned.skills.switch) && "text-green-300",
					boostSkills && "text-amber-400",
				)}
			>
				{charOwned.skills.switch + boost}
			</small>
			<small
				className={cn(
					isMaxSkill(charOwned.skills.special) && "text-green-300",
					boostSkills && "text-amber-400",
				)}
			>
				{charOwned.skills.special + boost}
			</small>
			<small
				className={cn(
					isMaxSkill(charOwned.skills.ultimate) && "text-green-300",
					boostSkills && "text-amber-400",
				)}
			>
				{charOwned.skills.ultimate + boost}
			</small>
		</div>
	);
};
