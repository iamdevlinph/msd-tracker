import { Trash2Icon } from "lucide-react";
import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { Button } from "@/components/ui/button";
import type { MonsterCodexEntry } from "@/data/monsterlings/MONSTERLINGS_DATA";
import type { TierId } from "@/data/tiers/TIERS_DATA";

type LoadoutEditorMonsterlingSelectorProps = {
	info: MonsterCodexEntry | null;
	tier: TierId | null;
	id: string | null;
	monsterIndex: number | "legendary";
	onOpen: () => void;
	onClear: () => void;
};

export const LoadoutEditorMonsterlingSelector = ({
	info,
	tier,
	id,
	monsterIndex,
	onOpen,
	onClear,
}: LoadoutEditorMonsterlingSelectorProps) => {
	const legendary = monsterIndex === "legendary";
	return (
		<div className="relative aspect-square min-w-0">
			<button
				type="button"
				aria-label={
					info
						? info.name
						: legendary
							? "Legendary"
							: `Monsterling ${Number(monsterIndex) + 1}`
				}
				onClick={onOpen}
				className="grid size-full place-items-center overflow-hidden rounded-md border border-dashed p-1 text-center text-[10px] text-muted-foreground hover:bg-accent"
			>
				{info && tier ? (
					<PortraitWithName
						name={info.name}
						className="size-28 overflow-hidden rounded-sm"
					>
						<TierPortrait
							tier={tier}
							portraitImg={info.image}
							portraitSize={112}
							name={info.name}
							portraitClassName="size-full object-contain"
						/>
					</PortraitWithName>
				) : legendary ? (
					"Legendary"
				) : (
					`Monsterling ${Number(monsterIndex) + 1}`
				)}
			</button>
			{id && (
				<Button
					type="button"
					size="icon-sm"
					variant="destructive"
					className="absolute -right-1 -top-1 size-6"
					aria-label="Clear monsterling"
					onClick={onClear}
				>
					<Trash2Icon />
				</Button>
			)}
		</div>
	);
};
