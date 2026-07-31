import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Artifact } from "@/data/ARTIFACTS_DATA";
import type { ArtifactOwned } from "@/stores/artifacts-owned-slice";

type LoadoutEditorArtifactSelectorProps = {
	artifact: Artifact | null;
	owned: ArtifactOwned | null;
	artifactId: string | null;
	onOpen: () => void;
	onClear: () => void;
};

export const LoadoutEditorArtifactSelector = ({
	artifact,
	owned,
	artifactId,
	onOpen,
	onClear,
}: LoadoutEditorArtifactSelectorProps) => (
	<div className="relative aspect-square min-w-0">
		<button
			type="button"
			onClick={onOpen}
			className="grid size-full place-items-center overflow-hidden rounded-md border border-dashed p-1 text-center text-[10px] text-muted-foreground hover:bg-accent"
		>
			{artifact && owned ? (
				<div className="relative grid size-full grid-rows-[1fr_auto] place-items-center overflow-hidden rounded-sm">
					<img
						src={artifact.image}
						alt={artifact.name}
						className="size-full min-h-0 object-contain p-1"
					/>
					<img
						src={`/images/Character/Icon_shield_big${owned.fusion_level}.png`}
						alt={`Fusion level ${owned.fusion_level}`}
						className="absolute left-0.5 top-0.5 size-5"
					/>
					<span className="w-full truncate bg-black/80 px-1 py-0.5 text-[9px] text-white">
						{artifact.name}
					</span>
				</div>
			) : artifactId ? (
				"Artifact unavailable"
			) : (
				"Select artifact"
			)}
		</button>
		{artifactId && (
			<Button
				type="button"
				size="icon-sm"
				variant="destructive"
				className="absolute -right-1 -top-1 size-6"
				aria-label="Clear artifact"
				onClick={onClear}
			>
				<Trash2Icon />
			</Button>
		)}
	</div>
);
