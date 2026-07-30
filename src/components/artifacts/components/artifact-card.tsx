import type { Artifact } from "@/data/ARTIFACTS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

type ArtifactCardProps = {
	artifact: Artifact;
	fusionLevel?: number;
	className?: string;
};

export const ArtifactCard = ({
	artifact,
	fusionLevel,
	className,
}: ArtifactCardProps) => (
	<div className={cn("relative w-36 h-44 rounded overflow-hidden", className)}>
		<img
			src={TIERS_DATA[artifact.tier_id].full}
			alt={`Tier ${artifact.tier_id} background`}
			className="absolute inset-0 h-full w-full object-fill"
		/>
		<div className="relative h-32 w-full">
			<img
				src={artifact.image}
				alt={artifact.name}
				className="absolute inset-0 h-full w-full object-contain p-3"
			/>
			{fusionLevel != null && (
				<img
					src={`/images/Character/Icon_shield_big${fusionLevel}.png`}
					alt={`Fusion level ${fusionLevel}`}
					className="absolute left-1 top-1 z-10 h-7 w-7 drop-shadow-lg"
				/>
			)}
		</div>
		<div className="relative flex h-12 items-center justify-center bg-black/80 px-2 text-center text-xs">
			<span className="line-clamp-2">{artifact.name}</span>
		</div>
	</div>
);
