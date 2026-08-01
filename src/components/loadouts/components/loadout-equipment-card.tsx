import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import type { Equipment } from "@/data/equipment/EQUIPMENT_DATA";

type LoadoutEquipmentCardProps = {
	equipment: Equipment;
};

export const LoadoutEquipmentCard = ({
	equipment,
}: LoadoutEquipmentCardProps) => (
	<div className="size-[120px] overflow-hidden rounded-lg border bg-card">
		<PortraitWithName
			name={equipment.name}
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
