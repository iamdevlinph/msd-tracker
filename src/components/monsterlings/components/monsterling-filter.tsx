import { arrayRemoveItem } from "common-utils-pkg";
import { StarIcon, XIcon } from "lucide-react";
import type { MonsterlingFilters } from "@/components/monsterlings/store/monsterlings-filter-store";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { SearchInput } from "@/components/ui/search-input";
import { TIERS_DATA, type TierId } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

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
			<ButtonGroup className="flex flex-wrap">
				{Object.values(TIERS_DATA).map(({ id, hex }) => {
					const isTierSelected = selectedTiers.includes(id);

					return (
						<Button
							type="button"
							variant={isTierSelected ? "default" : "outline"}
							key={id}
							onClick={() => handleSelectTier(id)}
							className={cn(isTierSelected && "border")}
							aria-pressed={isTierSelected}
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
						</Button>
					);
				})}

				<ButtonGroupSeparator className="w-1.25! hidden sm:block" />

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
	);
};
