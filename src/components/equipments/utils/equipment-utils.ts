import type {
	Equipment,
	EquipmentPartType,
} from "@/data/equipment/EQUIPMENT_DATA";
import type { TierId } from "@/data/tiers/TIERS_DATA";

export type EquipmentFilters = {
	search: string;
	selectedPartTypes: EquipmentPartType[];
	selectedTiers: TierId[];
};

export const emptyEquipmentFilters = (): EquipmentFilters => ({
	search: "",
	selectedPartTypes: [],
	selectedTiers: [],
});

export const filterEquipment = (
	equipment: Equipment[],
	filters: EquipmentFilters,
) => {
	const search = filters.search.trim().toLowerCase();
	return equipment.filter(
		(item) =>
			(!search ||
				item.name.toLowerCase().includes(search) ||
				item.set_name.toLowerCase().includes(search)) &&
			(!filters.selectedPartTypes.length ||
				filters.selectedPartTypes.includes(item.part_type)) &&
			(!filters.selectedTiers.length ||
				filters.selectedTiers.includes(item.tier_id)),
	);
};
