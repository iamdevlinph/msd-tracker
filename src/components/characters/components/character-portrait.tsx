import { TIERS_DATA, type TierId } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

export type CharacterPortrait = {
	portraitImg: string;
	portraitSize: number;
	tier: TierId;
};

export const CharacterPortrait = ({
	portraitImg,
	portraitSize,
	tier,
}: CharacterPortrait) => {
	const tierImg = TIERS_DATA[tier].base;

	return (
		<>
			<img
				src={portraitImg}
				width={portraitSize}
				height={portraitSize}
				alt={`${name} portrait`}
				className={cn("absolute")}
			/>
			<img
				src={tierImg}
				width={portraitSize}
				height={portraitSize}
				alt={`${tier} background`}
				className={cn("")}
			/>
		</>
	);
};
