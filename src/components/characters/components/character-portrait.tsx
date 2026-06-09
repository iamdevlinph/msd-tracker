import { TIERS_DATA, type TierId } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

type CharacterPortrait = {
	portraitImg: string;
	cardSize: number;
	tier: TierId;
};

export const CharacterPortrait = ({
	portraitImg,
	cardSize,
	tier,
}: CharacterPortrait) => {
	const tierImg = TIERS_DATA[tier].base;

	return (
		<>
			<img
				src={portraitImg}
				width={cardSize}
				height={cardSize}
				alt={`${name} portrait`}
				className={cn("absolute")}
			/>
			<img
				src={tierImg}
				width={cardSize}
				height={cardSize}
				alt={`${tier} background`}
				className={cn("")}
			/>
		</>
	);
};
