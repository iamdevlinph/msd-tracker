import { PortraitWithName } from "@/components/shared/portrait-with-name";
import type { Artifact } from "@/data/artifacts/ARTIFACTS_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";
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
	<PortraitWithName
		name={artifact.name}
		className={cn("h-44 w-36 overflow-hidden rounded", className)}
		nameClassName="bg-transparent text-shadow-sm/80"
	>
		<img
			src={TIERS_DATA[artifact.tier_id].full}
			alt={`Tier ${artifact.tier_id} background`}
			className="absolute inset-0 size-full object-fill"
		/>
		<div className="relative h-full w-full">
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
	</PortraitWithName>
);
