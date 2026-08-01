import { arrayRemoveItem, toSentenceCase } from "common-utils-pkg";
import { StarIcon, XIcon } from "lucide-react";
import type { EquipmentFilters } from "@/components/equipments/utils/equipment-utils";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { SearchInput } from "@/components/ui/search-input";
import {
	EQUIPMENT_PART_TYPES,
	type EquipmentPartType,
} from "@/data/equipment/EQUIPMENT_DATA";
import { TIERS_DATA, type TierId } from "@/data/tiers/TIERS_DATA";

const PART_TYPE_IMAGES: Record<EquipmentPartType, string> = {
	headgear: "/images/Equipment/EQUIP_SET_102_H.webp",
	chestpiece: "/images/Equipment/EQUIP_SET_102_C.webp",
	gloves: "/images/Equipment/EQUIP_SET_102_G.webp",
	footwear: "/images/Equipment/EQUIP_SET_102_S.webp",
};
const IS_PART_TYPE_FILTER_VISIBLE = false;

type LoadoutEquipmentFilterProps = {
	filters: EquipmentFilters;
	onChange: (filters: EquipmentFilters) => void;
};

export const LoadoutEquipmentFilter = ({
	filters,
	onChange,
}: LoadoutEquipmentFilterProps) => {
	const toggle = <T extends string | number>(
		key: "selectedPartTypes" | "selectedTiers",
		value: T,
	) => {
		const values = filters[key] as T[];
		onChange({
			...filters,
			[key]: values.includes(value)
				? arrayRemoveItem(values, value)
				: [...values, value],
		});
	};
	return (
		<div className="grid gap-3">
			<SearchInput
				aria-label="Search equipment"
				autoFocus
				value={filters.search}
				onValueChange={(search) => onChange({ ...filters, search })}
				onFocus={(event) => event.currentTarget.select()}
				placeholder="Search equipment"
			/>
			<ButtonGroup className="flex flex-wrap">
				{IS_PART_TYPE_FILTER_VISIBLE && (
					<>
						{EQUIPMENT_PART_TYPES.map((partType) => (
							<Button
								key={partType}
								type="button"
								aria-label={toSentenceCase(partType)}
								title={toSentenceCase(partType)}
								aria-pressed={filters.selectedPartTypes.includes(partType)}
								variant={
									filters.selectedPartTypes.includes(partType)
										? "default"
										: "outline"
								}
								onClick={() =>
									toggle<EquipmentPartType>("selectedPartTypes", partType)
								}
							>
								<img
									src={PART_TYPE_IMAGES[partType]}
									alt=""
									className="size-6 object-contain"
								/>
							</Button>
						))}
						<ButtonGroupSeparator className="w-1.25! hidden sm:block" />
					</>
				)}
				{([5, 4] as TierId[]).map((tier) => (
					<Button
						key={tier}
						type="button"
						aria-label={`Tier ${tier}`}
						title={`Tier ${tier}`}
						aria-pressed={filters.selectedTiers.includes(tier)}
						variant={
							filters.selectedTiers.includes(tier) ? "default" : "outline"
						}
						onClick={() => toggle<TierId>("selectedTiers", tier)}
					>
						{tier}
						<StarIcon
							className="size-4"
							fill="currentColor"
							style={{ color: TIERS_DATA[tier].hex }}
							aria-hidden
						/>
					</Button>
				))}
				<Button
					variant="secondary"
					size="icon"
					type="button"
					aria-label="Clear equipment filters"
					onClick={() =>
						onChange({ search: "", selectedPartTypes: [], selectedTiers: [] })
					}
				>
					<XIcon />
				</Button>
			</ButtonGroup>
		</div>
	);
};
