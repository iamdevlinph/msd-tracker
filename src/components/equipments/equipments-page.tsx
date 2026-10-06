import { useMemo, useState } from "react";
import { EquipmentCatalogFilter } from "@/components/equipments/components/equipment-catalog-filter";
import { EquipmentSetRow } from "@/components/equipments/components/equipment-set-row";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { PageTitle } from "@/components/shared/page-title";
import { EQUIPMENT_DATA } from "@/data/equipment/EQUIPMENT_DATA";
import {
	emptyEquipmentCatalogFilters,
	getEquipmentSetRows,
} from "./utils/equipment-catalog";

export const EquipmentsPage = () => {
	const [filters, setFilters] = useState(emptyEquipmentCatalogFilters);
	const rows = useMemo(
		() => getEquipmentSetRows(Object.values(EQUIPMENT_DATA), filters),
		[filters],
	);

	return (
		<div>
			<PageTitle
				title="Equipment"
				description="Browse equipment pieces and their set effects."
			/>
			<div className="flex flex-col gap-5">
				<EquipmentCatalogFilter filters={filters} onChange={setFilters} />
				{rows.length ? (
					rows.map((row) => <EquipmentSetRow key={row.name} row={row} />)
				) : (
					<CollectionEmptyState
						title="No equipment sets found"
						description="Adjust or clear the filters to see equipment sets."
					/>
				)}
			</div>
		</div>
	);
};
