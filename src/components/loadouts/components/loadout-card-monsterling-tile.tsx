import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import { TierPortrait } from "@/components/shared/tier-portrait";
import type { MonsterCodexEntry } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { cn } from "@/lib/utils";

type LoadoutCardMonsterlingTileProps = {
	id: string | null;
	info: MonsterCodexEntry | null;
	owned: MonsterlingOwned | null;
	legendary: boolean;
	label: string;
	onEdit?: (id: string) => void;
};
export const LoadoutCardMonsterlingTile = ({
	id,
	info,
	owned,
	legendary,
	label,
	onEdit,
}: LoadoutCardMonsterlingTileProps) => (
	<div
		className={cn(
			"grid aspect-square min-w-0 rounded-md border bg-background/60 text-center",
			legendary && "border-l-2 border-l-primary",
			owned && info
				? "content-center gap-1"
				: "place-items-center border-dashed",
		)}
	>
		{owned && info && id && onEdit ? (
			<button
				type="button"
				aria-label={`Edit ${info.name} monsterling`}
				onClick={(event) => {
					event.stopPropagation();
					onEdit(id);
				}}
				className="pointer-events-auto relative mx-auto grid size-full cursor-pointer place-items-center overflow-hidden rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<TierPortrait
					tier={owned.tier_id}
					portraitImg={info.image}
					portraitSize={112}
					name={info.name}
					hideTierBg
				/>
			</button>
		) : (
			<span className="text-[10px] text-muted-foreground">{label}</span>
		)}
	</div>
);
