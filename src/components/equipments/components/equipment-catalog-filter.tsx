import { arrayRemoveItem } from "common-utils-pkg";
import { StarIcon, XIcon } from "lucide-react";
import { SortSelect } from "@/components/shared/sort-select";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	FilterButtonGroup,
	FilterToggleButton,
} from "@/components/ui/filter-button-group";
import { SearchInput } from "@/components/ui/search-input";
import { TIERS_DATA, type TierId } from "@/data/tiers/TIERS_DATA";
import {
	EQUIPMENT_CATALOG_SORTS,
	type EquipmentCatalogFilters,
	type EquipmentCatalogSort,
	emptyEquipmentCatalogFilters,
} from "../utils/equipment-catalog";

type EquipmentCatalogFilterProps = {
	filters: EquipmentCatalogFilters;
	onChange: (filters: EquipmentCatalogFilters) => void;
};

const sortOptions: { label: string; value: EquipmentCatalogSort }[] = [
	{ label: "Set: A–Z", value: EQUIPMENT_CATALOG_SORTS.SET_ASC },
	{ label: "Set: Z–A", value: EQUIPMENT_CATALOG_SORTS.SET_DESC },
];

export const EquipmentCatalogFilter = ({
	filters,
	onChange,
}: EquipmentCatalogFilterProps) => (
	<div className="grid gap-3">
		<SearchInput
			aria-label="Search equipment sets or pieces"
			value={filters.search}
			onValueChange={(search) => onChange({ ...filters, search })}
			onFocus={(event) => event.currentTarget.select()}
			placeholder="Search equipment sets or pieces"
		/>
		<div className="flex flex-wrap gap-2">
			<FilterButtonGroup aria-label="Equipment tiers">
				{([4, 5] as TierId[]).map((tier) => (
					<FilterToggleButton
						isSelected={filters.selectedTiers.includes(tier)}
						key={tier}
						type="button"
						aria-label={`Tier ${tier}`}
						title={`Tier ${tier}`}
						onClick={() =>
							onChange({
								...filters,
								selectedTiers: filters.selectedTiers.includes(tier)
									? arrayRemoveItem(filters.selectedTiers, tier)
									: [...filters.selectedTiers, tier],
							})
						}
					>
						{tier}
						<StarIcon
							className="size-4"
							fill="currentColor"
							style={{ color: TIERS_DATA[tier].hex }}
							aria-hidden
						/>
					</FilterToggleButton>
				))}
			</FilterButtonGroup>
			<ButtonGroup aria-label="Sort equipment sets">
				<SortSelect
					ariaLabel="Sort equipment sets"
					options={sortOptions}
					value={filters.sort}
					onValueChange={(sort) => onChange({ ...filters, sort })}
				/>
			</ButtonGroup>
			<ButtonGroup aria-label="Clear equipment filters">
				<Button
					variant="secondary"
					size="icon"
					type="button"
					aria-label="Clear equipment filters"
					onClick={() => onChange(emptyEquipmentCatalogFilters())}
				>
					<XIcon />
				</Button>
			</ButtonGroup>
		</div>
	</div>
);
