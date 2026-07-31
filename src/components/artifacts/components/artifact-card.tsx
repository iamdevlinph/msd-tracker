import type { Artifact } from "@/data/ARTIFACTS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

type ArtifactCardProps = {
	artifact: Artifact;
	fusionLevel?: number;
	className?: string;
	imageClassName?: string;
};

export const ArtifactCard = ({
	artifact,
	fusionLevel,
	className,
	imageClassName,
}: ArtifactCardProps) => (
	<div
		className={cn(
			"relative grid h-44 w-36 grid-rows-[1fr_3rem] overflow-hidden rounded",
			className,
		)}
	>
		<img
			src={TIERS_DATA[artifact.tier_id].full}
			alt={`Tier ${artifact.tier_id} background`}
			className="absolute inset-0 size-full object-fill"
		/>
		<div className="relative min-h-0 w-full">
			<img
				src={artifact.image}
				alt={artifact.name}
				className={cn(
					"absolute inset-0 h-full w-full object-contain p-3",
					imageClassName,
				)}
			/>
			{fusionLevel != null && (
				<img
					src={`/images/Character/Icon_shield_big${fusionLevel}.png`}
					alt={`Fusion level ${fusionLevel}`}
					className="absolute left-1 top-1 z-10 h-7 w-7 drop-shadow-lg"
				/>
			)}
		</div>
		<div className="relative flex items-center justify-center bg-black/80 px-2 text-center text-xs">
			<span className="line-clamp-2">{artifact.name}</span>
		</div>
	</div>
);
