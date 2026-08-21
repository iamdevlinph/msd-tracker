import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import type { Equipment } from "@/data/equipment/EQUIPMENT_DATA";
import { getEquipmentCaption } from "../utils/equipment-set-effects";

type LoadoutEquipmentCardProps = {
	equipment: Equipment;
	showSetName?: boolean;
};

export const LoadoutEquipmentCard = ({
	equipment,
	showSetName = false,
}: LoadoutEquipmentCardProps) => (
	<div className="size-[120px] overflow-hidden rounded-lg border bg-card">
		<PortraitWithName
			name={getEquipmentCaption(equipment, showSetName)}
			className="size-[120px] overflow-hidden"
		>
			<TierPortrait
				tier={equipment.tier_id}
				portraitImg={equipment.image}
				portraitSize={120}
				name={equipment.name}
				portraitClassName="size-full object-contain p-2"
			/>
		</PortraitWithName>
	</div>
);
