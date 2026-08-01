import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import {
	EQUIPMENT_DATA,
	type EquipmentId,
} from "@/data/equipment/EQUIPMENT_DATA";
import { LOADOUT_PREVIEW_PORTRAIT_SIZE } from "./loadout-preview-constants";
import { LoadoutPreviewPlaceholder } from "./loadout-preview-placeholder-slot";

type LoadoutPreviewEquipmentProps = {
	id: EquipmentId | null;
};

export const LoadoutPreviewEquipment = ({
	id,
}: LoadoutPreviewEquipmentProps) => {
	const equipment = id ? EQUIPMENT_DATA[id] : null;
	if (!equipment)
		return <LoadoutPreviewPlaceholder label="Equipment unavailable" />;
	return (
		<PortraitWithName
			name={equipment.name}
			className="size-[120px] overflow-hidden rounded-lg"
		>
			<TierPortrait
				tier={equipment.tier_id}
				portraitImg={equipment.image}
				portraitSize={LOADOUT_PREVIEW_PORTRAIT_SIZE}
				name={equipment.name}
				portraitClassName="size-[120px] object-contain p-1"
			/>
		</PortraitWithName>
	);
};
