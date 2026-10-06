import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import type { Equipment } from "@/data/equipment/EQUIPMENT_DATA";

type EquipmentCardProps = {
	equipment: Equipment;
	caption?: string;
};

export const EquipmentCard = ({
	equipment,
	caption = equipment.name,
}: EquipmentCardProps) => (
	<div className="size-[120px] overflow-hidden rounded-lg border bg-card">
		<PortraitWithName name={caption} className="size-[120px] overflow-hidden">
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
