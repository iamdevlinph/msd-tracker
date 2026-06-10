import { TIER_ID_BY_TIER, TIERS_DATA, type TierId } from "@/data/TIERS_DATA";
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
	const tierBg = {
		[TIER_ID_BY_TIER.CHOICE_4]: "#60318e",
		[TIER_ID_BY_TIER.PRIME_5]: "#5e290d",
	};

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
				style={{
					backgroundColor: tierBg[tier],
				}}
			/>
		</>
	);
};
