import {
	LOADOUT_SNAPSHOT_DIFFICULTIES,
	LOADOUT_SNAPSHOT_DIFFICULTY_LABELS,
	LOADOUT_SNAPSHOT_DIFFICULTY_OPTIONS,
	type LoadoutSnapshotDifficulty,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const ALL_DIFFICULTIES = "all" as const;
type DifficultySelectValue =
	| LoadoutSnapshotDifficulty
	| typeof ALL_DIFFICULTIES;

const DIFFICULTY_IMAGES: Record<LoadoutSnapshotDifficulty, string> = {
	[LOADOUT_SNAPSHOT_DIFFICULTIES.NORMAL]:
		"/images/UI/widget/Boss/Sprite/Boss/normal.webp",
	[LOADOUT_SNAPSHOT_DIFFICULTIES.RAGING]:
		"/images/UI/widget/Boss/Sprite/Boss/raging.webp",
	[LOADOUT_SNAPSHOT_DIFFICULTIES.AWAKENED]:
		"/images/UI/widget/Boss/Sprite/Boss/awakened.webp",
	[LOADOUT_SNAPSHOT_DIFFICULTIES.VOID]:
		"/images/UI/widget/Boss/Sprite/Boss/void.webp",
	[LOADOUT_SNAPSHOT_DIFFICULTIES.ABYSS]:
		"/images/UI/widget/Boss/Sprite/Boss/abyss.webp",
};

type LoadoutSnapshotDifficultySelectProps = {
	value: LoadoutSnapshotDifficulty | null;
	onValueChange: (value: LoadoutSnapshotDifficulty | null) => void;
	allowAll?: boolean;
	ariaLabel: string;
	id?: string;
};

export const LoadoutSnapshotDifficultySelect = ({
	value,
	onValueChange,
	allowAll = false,
	ariaLabel,
	id,
}: LoadoutSnapshotDifficultySelectProps) => {
	const selectValue: DifficultySelectValue = value ?? ALL_DIFFICULTIES;
	return (
		<Select
			value={selectValue}
			onValueChange={(nextValue) =>
				onValueChange(
					nextValue === ALL_DIFFICULTIES
						? null
						: (nextValue as LoadoutSnapshotDifficulty),
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
						<span>{LOADOUT_SNAPSHOT_DIFFICULTY_LABELS[value]}</span>
					) : (
						<span>All difficulties</span>
					)}
				</SelectValue>
			</SelectTrigger>
			<SelectContent className="[&_[role=option]:not(:last-child)]:mb-1">
				{allowAll && (
					<SelectItem value={ALL_DIFFICULTIES}>All difficulties</SelectItem>
				)}
				{LOADOUT_SNAPSHOT_DIFFICULTY_OPTIONS.map(({ value: difficulty }) => (
					<SelectItem
						key={difficulty}
						value={difficulty}
						className="bg-cover bg-center font-semibold text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.95)] focus:bg-transparent focus:text-white focus:ring-2 focus:ring-ring focus:ring-inset [&_svg]:!text-white"
						style={{
							backgroundImage: `url(${DIFFICULTY_IMAGES[difficulty]})`,
						}}
					>
						{LOADOUT_SNAPSHOT_DIFFICULTY_LABELS[difficulty]}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
