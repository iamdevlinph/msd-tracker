import { Trash2Icon } from "lucide-react";
import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { Button } from "@/components/ui/button";
import type { Artifact } from "@/data/artifacts/ARTIFACTS_DATA";
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
			aria-label={
				artifact
					? artifact.name
					: artifactId
						? "Artifact unavailable"
						: "Select artifact"
			}
			onClick={onOpen}
			className="grid size-full place-items-center overflow-hidden rounded-md border border-dashed p-1 text-center text-[10px] text-muted-foreground hover:bg-accent"
		>
			{artifact && owned ? (
				<PortraitWithName
					name={artifact.name}
					className="size-28 overflow-hidden rounded-sm"
				>
					<TierPortrait
						tier={artifact.tier_id}
						portraitImg={artifact.image}
						portraitSize={112}
						name={artifact.name}
						portraitClassName="size-full object-contain p-1"
					/>
					<img
						src={`/images/Character/Icon_shield_big${owned.fusion_level}.webp`}
						alt={`Fusion level ${owned.fusion_level}`}
						className="absolute left-0.5 top-0.5 size-5"
					/>
				</PortraitWithName>
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
