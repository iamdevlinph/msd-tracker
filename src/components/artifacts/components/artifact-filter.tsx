import { arrayRemoveItem, toSentenceCase } from "common-utils-pkg";
import { StarIcon, XIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
	ARTIFACT_CATALOG_SORTS,
	type ArtifactCatalogSort,
	type ArtifactFilters,
	emptyArtifactFilters,
} from "@/components/artifacts/utils/artifact-utils";
import { SortSelect } from "@/components/shared/sort-select";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	FilterButtonGroup,
	FilterToggleButton,
} from "@/components/ui/filter-button-group";
import { SearchInput } from "@/components/ui/search-input";
import {
	CHARACTER_CLASS_DATA,
	type CharacterClassId,
} from "@/data/character-classes/CHARACTER_CLASS_DATA";
import { ELEMENTS_DATA, type ElementId } from "@/data/elements/ELEMENTS_DATA";
import { TIERS_DATA, type TierId } from "@/data/tiers/TIERS_DATA";

type ArtifactFilterProps = {
	filters: ArtifactFilters;
	onChange: (filters: ArtifactFilters) => void;
	autoFocus?: boolean;
	sort?: ArtifactCatalogSort;
	onSortChange?: (sort: ArtifactCatalogSort) => void;
};

const tierSortLabel = (first: TierId, second: TierId) => (
	<>
		{`Tier: ${first}–${second}`}
		<span className="inline-flex gap-1">
			{[first, second].map((tier) => (
				<StarIcon
					key={tier}
					className="size-4"
					fill="currentColor"
					style={{ color: TIERS_DATA[tier].hex }}
					aria-hidden
				/>
			))}
		</span>
	</>
);

const sortOptions: { label: ReactNode; value: ArtifactCatalogSort }[] = [
	{ label: "Name: A–Z", value: ARTIFACT_CATALOG_SORTS.NAME_ASC },
	{ label: "Name: Z–A", value: ARTIFACT_CATALOG_SORTS.NAME_DESC },
	{ label: tierSortLabel(3, 5), value: ARTIFACT_CATALOG_SORTS.TIER_ASC },
	{ label: tierSortLabel(5, 3), value: ARTIFACT_CATALOG_SORTS.TIER_DESC },
];

export const ArtifactFilter = ({
	filters,
	onChange,
	autoFocus = false,
	sort,
	onSortChange,
}: ArtifactFilterProps) => {
	const toggle = <T extends string | number>(
		key: keyof ArtifactFilters,
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
				aria-label="Search artifacts"
				autoFocus={autoFocus}
				value={filters.search}
				onValueChange={(search) => onChange({ ...filters, search })}
				onFocus={(e) => e.currentTarget.select()}
				placeholder="Search artifacts"
			/>
			<div className="flex flex-wrap gap-2">
				<FilterButtonGroup aria-label="Elements">
					{Object.values(ELEMENTS_DATA).map(({ id, image, element, hide }) =>
						hide ? null : (
							<FilterToggleButton
								isSelected={filters.selectedElements.includes(id)}
								key={id}
								type="button"
								title={element}
								onClick={() => toggle<ElementId>("selectedElements", id)}
							>
								<img
									src={image}
									width="25"
									height="25"
									alt={`${element} icon`}
								/>
							</FilterToggleButton>
						),
					)}
				</FilterButtonGroup>
				<FilterButtonGroup aria-label="Character classes">
					{Object.values(CHARACTER_CLASS_DATA).map(
						({ id, image, character_class }) => (
							<FilterToggleButton
								isSelected={filters.selectedCharacterClass.includes(id)}
								key={id}
								type="button"
								title={toSentenceCase(character_class)}
								onClick={() =>
									toggle<CharacterClassId>("selectedCharacterClass", id)
								}
							>
								<img
									src={image}
									width="25"
									height="25"
									alt={`${character_class} icon`}
								/>
							</FilterToggleButton>
						),
					)}
				</FilterButtonGroup>
				<FilterButtonGroup aria-label="Tiers">
					{Object.values(TIERS_DATA)
						.filter(({ id }) => id === 3 || id === 4 || id === 5)
						.map(({ id, hex }) => (
							<FilterToggleButton
								isSelected={filters.selectedTiers.includes(id)}
								key={id}
								type="button"
								aria-label={`Tier ${id}`}
								title={`Tier ${id}`}
								onClick={() => toggle<TierId>("selectedTiers", id)}
							>
								{id}
								<StarIcon
									className="size-4"
									fill="currentColor"
									style={{ color: hex }}
									aria-hidden
								/>
							</FilterToggleButton>
						))}
				</FilterButtonGroup>
				{sort && onSortChange && (
					<ButtonGroup aria-label="Sort artifacts">
						<SortSelect
							ariaLabel="Sort artifacts"
							options={sortOptions}
							value={sort}
							onValueChange={onSortChange}
						/>
					</ButtonGroup>
				)}
				<ButtonGroup aria-label="Clear artifact filters">
					<Button
						variant="secondary"
						size="icon"
						type="button"
						aria-label="Clear artifact filters"
						onClick={() => {
							onChange(emptyArtifactFilters());
							onSortChange?.(ARTIFACT_CATALOG_SORTS.TIER_DESC);
						}}
					>
						<XIcon />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};
