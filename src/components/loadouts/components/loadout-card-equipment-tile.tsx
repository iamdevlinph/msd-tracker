import { TierPortrait } from "@/components/shared/tier-portrait";
import type { Equipment } from "@/data/equipment/EQUIPMENT_DATA";
import { cn } from "@/lib/utils";
import { LoadoutEquipmentTooltip } from "./loadout-equipment-tooltip";

type LoadoutCardEquipmentTileProps = {
	equipment: Equipment | null;
	label: string;
	onPreview?: () => void;
};

export const LoadoutCardEquipmentTile = ({
	equipment,
	label,
	onPreview,
}: LoadoutCardEquipmentTileProps) => {
	const tileClassName = cn(
		"relative grid aspect-square min-w-0 place-items-center overflow-hidden rounded-md border bg-background/60 text-center text-[10px] text-muted-foreground",
		!equipment && "border-dashed",
	);
	if (!equipment)
		return (
			<div className={tileClassName}>
				<span className="capitalize">{label}</span>
			</div>
		);

	return (
		<div className={tileClassName}>
			<LoadoutEquipmentTooltip
				equipment={equipment}
				trigger={
					<button
						type="button"
						aria-label={`Preview ${equipment.name} equipment`}
						onClick={(event) => {
							event.stopPropagation();
							onPreview?.();
						}}
						className="pointer-events-auto relative size-full overflow-hidden rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<TierPortrait
							tier={equipment.tier_id}
							portraitImg={equipment.image}
							portraitSize={112}
							name={equipment.name}
							portraitClassName="size-full object-contain p-1"
						/>
					</button>
				}
			/>
		</div>
	);
};
