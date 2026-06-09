import type { Character } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

const CARD_IMG_SIZE = 120;

export default function CharacterCard({
	tier,
	portraitImage,
	name,
	element,
}: Character) {
	const background = TIERS_DATA[tier].base;
	const elementImg = ELEMENTS_DATA[element].image;

	return (
		<div
			className={cn(
				"max-w-max flex justify-center flex-col items-center rounded",
				"bg-card",
				"cursor-pointer",
			)}
		>
			<div className="relative">
				<img
					src={elementImg}
					width={30}
					height={30}
					alt={`${element} icon`}
					className={cn("absolute right-1 top-1 z-2 drop-shadow-2xl")}
					style={{
						filter: "drop-shadow(0px 0px 3px rgb(0, 0, 0))",
					}}
				/>
				<img
					src={portraitImage}
					width={CARD_IMG_SIZE}
					height={CARD_IMG_SIZE}
					alt={`${name} portrait`}
					className={cn("absolute")}
				/>
				<img
					src={background}
					width={CARD_IMG_SIZE}
					height={CARD_IMG_SIZE}
					alt={`${tier} background`}
					className={cn("")}
				/>
			</div>
			<div className="py-1">{name}</div>
		</div>
	);
}
