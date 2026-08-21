import type { EquipmentFilters } from "@/components/equipments/utils/equipment-utils";
import {
	EQUIPMENT_DATA,
	type EquipmentId,
} from "@/data/equipment/EQUIPMENT_DATA";
import { useAppStore } from "@/stores/app-store";
import { LoadoutEquipmentCard } from "./loadout-equipment-card";
import { LoadoutEquipmentFilter } from "./loadout-equipment-filter";
import { LoadoutEquipmentTooltip } from "./loadout-equipment-tooltip";

type LoadoutEquipmentPickerProps = {
	filters: EquipmentFilters;
	onFiltersChange: (filters: EquipmentFilters) => void;
	options: EquipmentId[];
	selectedIds: Set<EquipmentId>;
	onSelect: (id: EquipmentId) => void;
};

export const LoadoutEquipmentPicker = ({
	filters,
	onFiltersChange,
	options,
	selectedIds,
	onSelect,
}: LoadoutEquipmentPickerProps) => {
	const showEquipmentSetNames = useAppStore(
		(state) => state.showEquipmentSetNames,
	);
	return (
		<>
			<div className="mb-4">
				<LoadoutEquipmentFilter filters={filters} onChange={onFiltersChange} />
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,120px)] justify-center gap-3">
				{options.map((id) => {
					const equipment = EQUIPMENT_DATA[id];
					return (
						<LoadoutEquipmentTooltip
							key={id}
							equipment={equipment}
							trigger={
								<button
									type="button"
									aria-pressed={selectedIds.has(id)}
									onClick={() => onSelect(id)}
									aria-label={`Select ${equipment.name}`}
									className="rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								>
									<LoadoutEquipmentCard
										equipment={equipment}
										showSetName={showEquipmentSetNames}
									/>
								</button>
							}
						/>
					);
				})}
				{options.length === 0 && (
					<p className="col-span-full rounded-md border border-dashed p-4 text-sm text-muted-foreground">
						No equipment matches.
					</p>
				)}
			</div>
		</>
	);
};
