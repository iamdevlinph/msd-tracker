import type {
	Equipment,
	EquipmentPartType,
} from "@/data/equipment/EQUIPMENT_DATA";
import type { TierId } from "@/data/tiers/TIERS_DATA";
import { matchesSearchText } from "@/lib/search";

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
	const search = filters.search;
	return equipment.filter(
		(item) =>
			(!search ||
				matchesSearchText(item.name, search) ||
				matchesSearchText(item.set_name, search)) &&
			(!filters.selectedPartTypes.length ||
				filters.selectedPartTypes.includes(item.part_type)) &&
			(!filters.selectedTiers.length ||
				filters.selectedTiers.includes(item.tier_id)),
	);
};
