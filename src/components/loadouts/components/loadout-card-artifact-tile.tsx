import { TierPortrait } from "@/components/shared/tier-portrait";
import type { Artifact } from "@/data/artifacts/ARTIFACTS_DATA";
import type { ArtifactOwned } from "@/stores/artifacts-owned-slice";

type LoadoutCardArtifactTileProps = {
	id: string | null;
	artifact: Artifact | null;
	owned: ArtifactOwned | null;
	onEdit?: (id: string) => void;
};
export const LoadoutCardArtifactTile = ({
	id,
	artifact,
	owned,
	onEdit,
}: LoadoutCardArtifactTileProps) => (
	<div className="relative grid aspect-square min-w-0 place-items-center overflow-hidden rounded-md border bg-background/60 text-center">
		{owned && artifact && id ? (
			onEdit ? (
				<button
					type="button"
					aria-label={`Edit ${artifact.name} artifact`}
					onClick={(event) => {
						event.stopPropagation();
						onEdit(id);
					}}
					className="pointer-events-auto relative grid size-full grid-rows-[1fr_auto] overflow-hidden rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<TierPortrait
						tier={artifact.tier_id}
						portraitImg={artifact.image}
						portraitSize={112}
						name={artifact.name}
						portraitClassName="size-full object-contain p-1"
					/>
				</button>
			) : (
				<TierPortrait
					tier={artifact.tier_id}
					portraitImg={artifact.image}
					portraitSize={112}
					name={artifact.name}
					portraitClassName="size-full object-contain p-1"
				/>
			)
		) : (
			<span className="text-[10px] text-muted-foreground">
				{id ? "Artifact unavailable" : "Artifact"}
			</span>
		)}
	</div>
);
