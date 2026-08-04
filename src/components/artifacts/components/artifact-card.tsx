import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import type { Artifact } from "@/data/artifacts/ARTIFACTS_DATA";
import { cn } from "@/lib/utils";

type ArtifactCardProps = {
	artifact: Artifact;
	fusionLevel?: number;
	className?: string;
	imageClassName?: string;
	portraitSize?: number;
};

export const ArtifactCard = ({
	artifact,
	fusionLevel,
	className,
	imageClassName,
	portraitSize = 144,
}: ArtifactCardProps) => (
	<PortraitWithName
		name={artifact.name}
		className={cn(
			"overflow-hidden rounded border hover:border-primary",
			className,
		)}
		nameClassName="z-20 text-shadow-sm/80"
		style={{ height: portraitSize, width: portraitSize }}
	>
		<TierPortrait
			tier={artifact.tier_id}
			portraitImg={artifact.image}
			portraitSize={portraitSize}
			name={artifact.name}
			portraitClassName={cn("size-full object-contain p-3", imageClassName)}
		/>
		{fusionLevel != null && (
			<img
				src={`/images/Character/Icon_shield_big${fusionLevel}.webp`}
				alt={`Fusion level ${fusionLevel}`}
				className="absolute left-1 top-1 z-10 h-7 w-7 drop-shadow-lg"
			/>
		)}
	</PortraitWithName>
);
