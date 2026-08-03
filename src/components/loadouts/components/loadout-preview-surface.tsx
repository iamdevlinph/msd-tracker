import type { Ref } from "react";
import { LoadoutPreviewRow } from "@/components/loadouts/components/loadout-preview-row";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";
import {
	LOADOUT_PREVIEW_COMPACT_HIDDEN_EQUIPMENT_WIDTH,
	LOADOUT_PREVIEW_COMPACT_WIDTH,
	LOADOUT_PREVIEW_DETAILED_HIDDEN_EQUIPMENT_WIDTH,
	LOADOUT_PREVIEW_DETAILED_WIDTH,
} from "./loadout-preview-constants";

const SLOTS = [0, 1, 2] as const;

type LoadoutPreviewSurfaceProps = {
	ref?: Ref<HTMLDivElement>;
	loadout: LoadoutOwned;
	monsterlingStatsDisplay?: "icons" | "full";
	compactMonsterlings?: boolean;
	hideEquipment: boolean;
	className?: string;
	onEditCharacter?: (id: number) => void;
	onEditMonsterling?: (id: string) => void;
	onEditArtifact?: (id: string) => void;
};

export const LoadoutPreviewSurface = ({
	ref,
	loadout,
	monsterlingStatsDisplay,
	compactMonsterlings,
	hideEquipment,
	className,
	onEditCharacter,
	onEditMonsterling,
	onEditArtifact,
}: LoadoutPreviewSurfaceProps) => {
	const statsDisplay =
		monsterlingStatsDisplay ??
		(compactMonsterlings === false ? "full" : "icons");
	const charactersOwned = useAppStore((state) => state.charactersOwned);
	const monsterlingsOwned = useAppStore((state) => state.monsterlingsOwned);
	const artifactsOwned = useAppStore((state) => state.artifactsOwned);
	const monsterlingLinkChainLevels = useAppStore(
		(state) => state.monsterlingLinkChainLevels,
	);

	return (
		<div
			ref={ref}
			data-testid="loadout-share-surface"
			className={cn("grid gap-4 bg-background p-3 text-foreground", className)}
			style={{
				width:
					statsDisplay === "icons"
						? hideEquipment
							? LOADOUT_PREVIEW_COMPACT_HIDDEN_EQUIPMENT_WIDTH
							: LOADOUT_PREVIEW_COMPACT_WIDTH
						: hideEquipment
							? LOADOUT_PREVIEW_DETAILED_HIDDEN_EQUIPMENT_WIDTH
							: LOADOUT_PREVIEW_DETAILED_WIDTH,
			}}
		>
			<header className="flex items-baseline justify-between gap-4 border-b border-primary/60 px-1 pb-3">
				<h2
					className="min-w-0 flex-1 truncate text-2xl font-bold"
					title={loadout.name}
				>
					{loadout.name}
				</h2>
				<span className="shrink-0 text-sm text-muted-foreground">
					Team Loadout
				</span>
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
					artifactsOwned={artifactsOwned}
					monsterlingLinkChainLevels={monsterlingLinkChainLevels}
					monsterlingStatsDisplay={statsDisplay}
					hideEquipment={hideEquipment}
					onEditCharacter={onEditCharacter}
					onEditMonsterling={onEditMonsterling}
					onEditArtifact={onEditArtifact}
				/>
			))}
			<footer className="flex justify-end px-1 pb-1 pt-2 text-sm text-muted-foreground">
				<a href={SITE_URL} target="_blank" rel="noreferrer">
					{SITE_URL}
				</a>
			</footer>
		</div>
	);
};
