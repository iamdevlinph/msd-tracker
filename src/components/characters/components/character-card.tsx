import { CharacterPortrait } from "@/components/characters/components/character-portrait";
import { CHARACTER_CLASS_DATA } from "@/data/CHARACTER_CLASS_DATA";
import type { Character } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

export default function CharacterCard({
	class_id,
	tier,
	portraitImage,
	name,
	element_id,
	portraitSize = 100,
	iconSize = 25,
}: Character &
	Partial<Pick<CharacterPortrait, "portraitSize">> & { iconSize?: number }) {
	const elemInfo = ELEMENTS_DATA[element_id];
	const characterClassInfo = CHARACTER_CLASS_DATA[class_id];
	const tierBaseImg = TIERS_DATA[tier].base;

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
					src={elemInfo.image}
					width={iconSize}
					height={iconSize}
					alt={`${elemInfo.element} icon`}
					className={cn("absolute right-0.5 top-0.5 z-2 drop-shadow-2xl")}
					style={{
						filter: "drop-shadow(0px 0px 3px rgb(0, 0, 0))",
					}}
				/>
				<img
					src={characterClassInfo.image}
					width={iconSize}
					height={iconSize}
					alt={`${characterClassInfo.character_class} icon`}
					className={cn("absolute right-0.5 top-9 z-2 drop-shadow-2xl")}
					style={{
						filter: "drop-shadow(0px 0px 3px rgb(0, 0, 0))",
					}}
				/>
				<CharacterPortrait
					portraitImg={portraitImage}
					portraitSize={portraitSize}
					tier={tier}
				/>
			</div>
			<small
				className="py-1 w-full text-center"
				style={{
					backgroundImage: `url(${tierBaseImg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				{name}
			</small>
		</div>
	);
}
