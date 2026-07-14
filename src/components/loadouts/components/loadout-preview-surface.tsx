import type { Ref } from "react";
import { LoadoutPreviewRow } from "@/components/loadouts/components/loadout-preview-row";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const SLOTS = [0, 1, 2] as const;

type LoadoutPreviewSurfaceProps = {
	ref?: Ref<HTMLDivElement>;
	loadout: LoadoutOwned;
	compactMonsterlings: boolean;
	className?: string;
};

export const LoadoutPreviewSurface = ({
	ref,
	loadout,
	compactMonsterlings,
	className,
}: LoadoutPreviewSurfaceProps) => {
	const charactersOwned = useAppStore((state) => state.charactersOwned);
	const monsterlingsOwned = useAppStore((state) => state.monsterlingsOwned);

	return (
		<div
			ref={ref}
			data-testid="loadout-share-surface"
			className={cn(
				"grid gap-4 bg-background p-3 text-foreground",
				compactMonsterlings ? "w-[984px]" : "w-[1600px]",
				className,
			)}
		>
			<header className="flex items-baseline justify-between border-b border-primary/60 px-1 pb-3">
				<h2 className="text-2xl font-bold">{loadout.name}</h2>
				<span className="text-sm text-muted-foreground">Team Loadout</span>
			</header>
			{SLOTS.map((index) => (
				<LoadoutPreviewRow
					key={`${loadout.id}-character-${index + 1}`}
					slot={loadout.characters[index]}
					characterOwned={
						loadout.characters[index].characterId === null
							? undefined
							: charactersOwned[loadout.characters[index].characterId]
					}
					monsterlingsOwned={monsterlingsOwned}
					compactMonsterlings={compactMonsterlings}
				/>
			))}
		</div>
	);
};
