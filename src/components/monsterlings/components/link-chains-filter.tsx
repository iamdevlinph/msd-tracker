import { arrayRemoveItem } from "common-utils-pkg";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	FilterButtonGroup,
	FilterToggleButton,
} from "@/components/ui/filter-button-group";
import { SearchInput } from "@/components/ui/search-input";
import type { LinkChainsFilters } from "../store/link-chains-filter-store";
import { LINK_CHAIN_LEVELS } from "./monsterling-link-chain-utils";

export const LinkChainsFilter = ({
	filters,
	onChange,
}: {
	filters: LinkChainsFilters;
	onChange: (filters: LinkChainsFilters) => void;
}) => (
	<div className="grid gap-3">
		<SearchInput
			aria-label="Search Monsterling names"
			placeholder="Search monsterling names"
			value={filters.search}
			onValueChange={(search) => onChange({ ...filters, search })}
		/>
		<div className="flex flex-wrap gap-2">
			<FilterButtonGroup aria-label="Link Chain levels">
				{LINK_CHAIN_LEVELS.map((level) => {
					const selected = filters.selectedLevels.includes(level);
					return (
						<FilterToggleButton
							isSelected={selected}
							key={level}
							type="button"
							aria-label={`Link Chain Level ${level}`}
							title={`Link Chain Level ${level}`}
							onClick={() =>
								onChange({
									...filters,
									selectedLevels: selected
										? arrayRemoveItem(filters.selectedLevels, level)
										: [...filters.selectedLevels, level],
								})
							}
						>
							<img
								src={`/images/MonsterLinkChain/link-${level}.webp`}
								alt=""
								className="size-5"
							/>
							<span className="sr-only">Link Chain Level {level}</span>
						</FilterToggleButton>
					);
				})}
			</FilterButtonGroup>
			<ButtonGroup aria-label="Clear Link Chain filters">
				<Button
					type="button"
					variant="secondary"
					size="icon"
					aria-label="Clear Link Chain filters"
					onClick={() => onChange({ search: "", selectedLevels: [] })}
				>
					<XIcon />
				</Button>
			</ButtonGroup>
		</div>
	</div>
);
