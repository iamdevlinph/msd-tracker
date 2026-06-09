import { CharacterPortrait } from "@/components/characters/components/character-portrait";
import type { Character } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { cn } from "@/lib/utils";

export default function CharacterCard({
	tier,
	portraitImage,
	name,
	element,
}: Character) {
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
					className={cn("absolute right-0.5 top-0.5 z-2 drop-shadow-2xl")}
					style={{
						filter: "drop-shadow(0px 0px 3px rgb(0, 0, 0))",
					}}
				/>
				<CharacterPortrait
					portraitImg={portraitImage}
					cardSize={100}
					tier={tier}
				/>
			</div>
			<div className="py-1">{name}</div>
		</div>
	);
}
