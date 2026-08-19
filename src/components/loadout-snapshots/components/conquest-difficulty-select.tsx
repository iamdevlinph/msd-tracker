import {
	CONQUEST_DIFFICULTIES,
	CONQUEST_DIFFICULTY_LABELS,
	CONQUEST_DIFFICULTY_OPTIONS,
	type ConquestDifficulty,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const ALL_DIFFICULTIES = "all" as const;
type DifficultySelectValue = ConquestDifficulty | typeof ALL_DIFFICULTIES;

const DIFFICULTY_IMAGES: Record<ConquestDifficulty, string> = {
	[CONQUEST_DIFFICULTIES.NORMAL]:
		"/images/UI/widget/Boss/Sprite/Boss/normal.webp",
	[CONQUEST_DIFFICULTIES.RAGING]:
		"/images/UI/widget/Boss/Sprite/Boss/raging.webp",
	[CONQUEST_DIFFICULTIES.AWAKENED]:
		"/images/UI/widget/Boss/Sprite/Boss/awakened.webp",
	[CONQUEST_DIFFICULTIES.VOID]: "/images/UI/widget/Boss/Sprite/Boss/void.webp",
	[CONQUEST_DIFFICULTIES.ABYSS]:
		"/images/UI/widget/Boss/Sprite/Boss/abyss.webp",
};

type ConquestDifficultySelectProps = {
	value: ConquestDifficulty | null;
	onValueChange: (value: ConquestDifficulty | null) => void;
	allowAll?: boolean;
	ariaLabel: string;
	id?: string;
};

export const ConquestDifficultySelect = ({
	value,
	onValueChange,
	allowAll = false,
	ariaLabel,
	id,
}: ConquestDifficultySelectProps) => {
	const selectValue: DifficultySelectValue = value ?? ALL_DIFFICULTIES;
	return (
		<Select
			value={selectValue}
			onValueChange={(nextValue) =>
				onValueChange(
					nextValue === ALL_DIFFICULTIES
						? null
						: (nextValue as ConquestDifficulty),
				)
			}
		>
			<SelectTrigger
				id={id}
				aria-label={ariaLabel}
				className={
					value
						? "min-w-40 bg-cover bg-center font-semibold text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.95)] [&_svg]:!text-white"
						: "min-w-40"
				}
				style={
					value
						? { backgroundImage: `url(${DIFFICULTY_IMAGES[value]})` }
						: undefined
				}
			>
				<SelectValue>
					{value ? (
						<span>{CONQUEST_DIFFICULTY_LABELS[value]}</span>
					) : (
						<span>All difficulties</span>
					)}
				</SelectValue>
			</SelectTrigger>
			<SelectContent className="[&_[role=option]:not(:last-child)]:mb-1">
				{allowAll && (
					<SelectItem value={ALL_DIFFICULTIES}>All difficulties</SelectItem>
				)}
				{CONQUEST_DIFFICULTY_OPTIONS.map(({ value: difficulty }) => (
					<SelectItem
						key={difficulty}
						value={difficulty}
						className="bg-cover bg-center font-semibold text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.95)] focus:bg-transparent focus:text-white focus:ring-2 focus:ring-ring focus:ring-inset [&_svg]:!text-white"
						style={{
							backgroundImage: `url(${DIFFICULTY_IMAGES[difficulty]})`,
						}}
					>
						{CONQUEST_DIFFICULTY_LABELS[difficulty]}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
