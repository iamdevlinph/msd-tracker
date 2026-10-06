import {
	EQUIPMENT_PART_TYPES,
	type Equipment,
} from "@/data/equipment/EQUIPMENT_DATA";
import type { EquipmentSetName } from "@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA";
import type { TierId } from "@/data/tiers/TIERS_DATA";

export const EQUIPMENT_CATALOG_SORTS = {
	SET_ASC: "set-asc",
	SET_DESC: "set-desc",
} as const;

export type EquipmentCatalogSort =
	(typeof EQUIPMENT_CATALOG_SORTS)[keyof typeof EQUIPMENT_CATALOG_SORTS];

export type EquipmentCatalogFilters = {
	search: string;
	selectedTiers: TierId[];
	sort: EquipmentCatalogSort;
};

export type EquipmentSetRow = {
	name: EquipmentSetName;
	tier: TierId;
	equipment: Equipment[];
};

export const emptyEquipmentCatalogFilters = (): EquipmentCatalogFilters => ({
	search: "",
	selectedTiers: [],
	sort: EQUIPMENT_CATALOG_SORTS.SET_ASC,
});

export const getEquipmentSetRows = (
	equipment: readonly Equipment[],
	filters: EquipmentCatalogFilters,
): EquipmentSetRow[] => {
	const grouped = new Map<EquipmentSetName, Equipment[]>();
	for (const piece of equipment) {
		grouped.set(piece.set_name, [
			...(grouped.get(piece.set_name) ?? []),
			piece,
		]);
	}

	const search = filters.search.trim().toLowerCase();
	return [...grouped.entries()]
		.map(([name, pieces]) => ({
			name,
			tier: pieces[0].tier_id,
			equipment: pieces.sort(
				(a, b) =>
					EQUIPMENT_PART_TYPES.indexOf(a.part_type) -
					EQUIPMENT_PART_TYPES.indexOf(b.part_type),
			),
		}))
		.filter(
			(row) =>
				(!search ||
					row.name.toLowerCase().includes(search) ||
					row.equipment.some((piece) =>
						piece.name.toLowerCase().includes(search),
					)) &&
				(!filters.selectedTiers.length ||
					filters.selectedTiers.includes(row.tier)),
		)
		.sort((a, b) => {
			const order = a.name.localeCompare(b.name);
			return filters.sort === EQUIPMENT_CATALOG_SORTS.SET_ASC ? order : -order;
		});
};
