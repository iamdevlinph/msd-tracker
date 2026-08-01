import type { CharacterOwned } from "@/components/characters/components/character-details-form";
import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { CHARACTER_CLASS_DATA } from "@/data/character-classes/CHARACTER_CLASS_DATA";
import type { Character } from "@/data/characters/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import { AWAKENING_ICON_IMAGE } from "@/image-constants";
import { cn } from "@/lib/utils";

type CharacterCardProps = Pick<
	Character,
	"class_id" | "tier_id" | "portraitImage" | "name" | "element_id" | "variant"
> &
	Partial<Pick<TierPortrait, "portraitSize">> & {
		iconSize?: number;
		className?: string;
		portraitClassName?: string;
		showElement?: boolean;
		showClass?: boolean;
		showAwakening?: boolean;
	} & Partial<Pick<CharacterOwned, "awakening">>;

export default function CharacterCard({
	class_id,
	tier_id,
	portraitImage,
	name,
	element_id,
	portraitSize = 100,
	iconSize = 25,
	awakening = undefined,
	variant = undefined,
	className,
	portraitClassName,
	showElement = true,
	showClass = true,
	showAwakening = true,
}: CharacterCardProps) {
	const elemInfo = ELEMENTS_DATA[element_id];
	const characterClassInfo = CHARACTER_CLASS_DATA[class_id];

	// const awakeningImg =
	// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1781063623/msd/Misc/awakening-icon.png";
	const awakeningImg = AWAKENING_ICON_IMAGE;

	return (
		<div
			className={cn(
				"max-w-max flex justify-center flex-col items-center rounded",
				"bg-card",
				"cursor-pointer",
				className,
			)}
		>
			<PortraitWithName name={name}>
				{variant && (
					<div
						className={cn(
							"absolute left-1/2 top-0 z-10",
							"-translate-x-1/2 -translate-y-1/2",
							"rounded-full border border-white/30 px-3 py-1",
							"text-[10px] font-semibold tracking-wide text-white whitespace-nowrap uppercase",
							"shadow-[0_2px_6px_rgba(0,0,0,1)] backdrop-blur-sm",
						)}
						style={{
							background:
								"var(--loadout-export-variant-background, transparent)",
						}}
					>
						{variant}
					</div>
				)}
				{showElement && (
					<img
						src={elemInfo.image}
						width={iconSize}
						height={iconSize}
						alt={`${elemInfo.element} icon`}
						className={cn("absolute right-0.5 top-1 z-2 drop-shadow-2xl")}
						style={{
							filter: "drop-shadow(0px 0px 3px rgb(0, 0, 0))",
						}}
						title={elemInfo.element}
					/>
				)}
				{showClass && (
					<img
						src={characterClassInfo.image}
						width={iconSize}
						height={iconSize}
						alt={`${characterClassInfo.character_class} icon`}
						className={cn("absolute right-0.5 top-9 z-2 drop-shadow-2xl")}
						style={{
							filter: "drop-shadow(0px 0px 3px rgb(0, 0, 0))",
						}}
						title={characterClassInfo.character_class}
					/>
				)}
				{showAwakening && (awakening ?? 0) > 0 && (
					<div
						className={cn("absolute right-0.5 top-17 z-2")}
						title={`Awakening ${awakening}`}
					>
						<img
							src={awakeningImg}
							width={iconSize}
							height={iconSize}
							alt={`awakening icon`}
							className="drop-shadow-2xl"
							style={{
								filter: "drop-shadow(0px 0px 3px rgb(0, 0, 0))",
							}}
						/>
						<span
							className={cn(
								"absolute top-0.5 right-1",
								"drop-shadow-2xl font-bold bg-black/30 rounded-full w-max text-amber-300",
							)}
						>
							A{awakening}
						</span>
					</div>
				)}
				<TierPortrait
					portraitImg={portraitImage}
					portraitSize={portraitSize}
					tier={tier_id}
					name={name}
					portraitClassName={portraitClassName}
				/>
			</PortraitWithName>
		</div>
	);
}
