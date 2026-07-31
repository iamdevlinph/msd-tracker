import type { Artifact } from "@/data/ARTIFACTS_DATA";
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
	<div className="grid aspect-square min-w-0 place-items-center overflow-hidden rounded-md border bg-background/60 text-center">
		{owned && artifact && id && onEdit ? (
			<button
				type="button"
				aria-label={`Edit ${artifact.name} artifact`}
				onClick={(event) => {
					event.stopPropagation();
					onEdit(id);
				}}
				className="pointer-events-auto relative grid size-full grid-rows-[1fr_auto] overflow-hidden rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<img
					src={artifact.image}
					alt={artifact.name}
					className="size-full min-h-0 object-contain p-1"
				/>
			</button>
		) : (
			<span className="text-[10px] text-muted-foreground">
				{id ? "Artifact unavailable" : "Artifact"}
			</span>
		)}
	</div>
);
