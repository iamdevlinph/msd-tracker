import { arrayRemoveItem } from "common-utils-pkg";
import { StarIcon, XIcon } from "lucide-react";
import type { MonsterlingFilters } from "@/components/monsterlings/store/monsterlings-filter-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	FilterButtonGroup,
	FilterToggleButton,
} from "@/components/ui/filter-button-group";
import { SearchInput } from "@/components/ui/search-input";
import { TIERS_DATA, type TierId } from "@/data/tiers/TIERS_DATA";

type MonsterlingFilterProps = {
	filters: MonsterlingFilters;
	onChange: (filters: MonsterlingFilters) => void;
	autoFocus?: boolean;
};

export const MonsterlingFilter = ({
	filters,
	onChange,
	autoFocus = false,
}: MonsterlingFilterProps) => {
	const { search, selectedTiers } = filters;
	const handleSelectTier = (tierId: TierId) => {
		onChange({
			...filters,
			selectedTiers: selectedTiers.includes(tierId)
				? arrayRemoveItem(selectedTiers, tierId)
				: [...selectedTiers, tierId],
		});
	};

	return (
		<div className="grid gap-3">
			<SearchInput
				aria-label="Search monsterlings"
				autoFocus={autoFocus}
				value={search}
				onValueChange={(value) => onChange({ ...filters, search: value })}
				onFocus={(event) => event.currentTarget.select()}
				placeholder="Search monsterlings"
			/>
			<div className="flex flex-wrap gap-2">
				<FilterButtonGroup aria-label="Tiers">
					{Object.values(TIERS_DATA).map(({ id, hex }) => {
						const isTierSelected = selectedTiers.includes(id);

						return (
							<FilterToggleButton
								isSelected={isTierSelected}
								type="button"
								key={id}
								onClick={() => handleSelectTier(id)}
								aria-label={`Tier ${id}`}
								title={`Tier ${id}`}
							>
								{id}
								<StarIcon
									className="size-4"
									fill="currentColor"
									style={{ color: hex }}
									aria-hidden
								/>
							</FilterToggleButton>
						);
					})}
				</FilterButtonGroup>
				<ButtonGroup aria-label="Clear monsterling filters">
					<Button
						variant="secondary"
						size="icon"
						type="button"
						onClick={() => onChange({ search: "", selectedTiers: [] })}
						aria-label="Clear monsterling filters"
					>
						<XIcon />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};
