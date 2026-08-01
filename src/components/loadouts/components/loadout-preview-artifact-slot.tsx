import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { getFusionLevelImage } from "@/image-constants";
import type { StoreState } from "@/stores/app-store";
import { LOADOUT_PREVIEW_PORTRAIT_SIZE } from "./loadout-preview-constants";
import { LoadoutPreviewPlaceholder } from "./loadout-preview-placeholder-slot";

type LoadoutPreviewArtifactProps = {
	id: string | null;
	owned: StoreState["artifactsOwned"];
	onEdit?: (id: string) => void;
};
export const LoadoutPreviewArtifact = ({
	id,
	owned,
	onEdit,
}: LoadoutPreviewArtifactProps) => {
	const item = id ? owned[id] : null;
	const artifact = item ? ARTIFACTS_DATA[item.artifact_id] : null;
	if (!item || !artifact || !id)
		return <LoadoutPreviewPlaceholder label="Artifact unavailable" />;
	const card = (
		<PortraitWithName
			name={artifact.name}
			className="size-[120px] overflow-hidden rounded-lg"
		>
			<TierPortrait
				tier={artifact.tier_id}
				portraitImg={artifact.image}
				portraitSize={LOADOUT_PREVIEW_PORTRAIT_SIZE}
				name={artifact.name}
				portraitClassName="size-[120px] object-contain"
			/>
			<img
				src={getFusionLevelImage(item.fusion_level)}
				alt={`Fusion level ${item.fusion_level}`}
				className="absolute left-1 top-1 z-10 size-7 drop-shadow-lg"
			/>
		</PortraitWithName>
	);
	return onEdit ? (
		<button
			type="button"
			aria-label={`Edit ${artifact.name} artifact`}
			onClick={() => onEdit(id)}
			className="w-fit rounded-lg text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			{card}
		</button>
	) : (
		card
	);
};
