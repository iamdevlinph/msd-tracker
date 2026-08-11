import { arrayRemoveItem } from "common-utils-pkg";
import { XIcon } from "lucide-react";
import {
	LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS,
	LOADOUT_SNAPSHOT_ELEMENTS,
	LOADOUT_SNAPSHOT_SORTS,
	LOADOUT_SNAPSHOT_TAG_LABELS,
	LOADOUT_SNAPSHOT_TAGS,
	type LoadoutSnapshotConquestBossId,
	type LoadoutSnapshotElement,
	type LoadoutSnapshotSort,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import {
	LOADOUT_SNAPSHOT_ALL_TAGS,
	type LoadoutSnapshotFilters,
	type LoadoutSnapshotFilterTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-filter";
import { SortSelect } from "@/components/shared/sort-select";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	FilterButtonGroup,
	FilterToggleButton,
} from "@/components/ui/filter-button-group";
import { SearchInput } from "@/components/ui/search-input";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";

const SORT_OPTIONS: { label: string; value: LoadoutSnapshotSort }[] = [
	{ label: "Name: A–Z", value: LOADOUT_SNAPSHOT_SORTS.NAME_ASC },
	{ label: "Name: Z–A", value: LOADOUT_SNAPSHOT_SORTS.NAME_DESC },
	{ label: "Created: Oldest", value: LOADOUT_SNAPSHOT_SORTS.CREATED_ASC },
	{ label: "Created: Newest", value: LOADOUT_SNAPSHOT_SORTS.CREATED_DESC },
];

const TAG_OPTIONS: {
	label: string;
	value: LoadoutSnapshotFilterTag;
}[] = [
	{ label: "All tags", value: LOADOUT_SNAPSHOT_ALL_TAGS },
	...Object.values(LOADOUT_SNAPSHOT_TAGS).map((value) => ({
		label: LOADOUT_SNAPSHOT_TAG_LABELS[value],
		value,
	})),
];

type LoadoutSnapshotFilterProps = {
	filters: LoadoutSnapshotFilters;
	sort: LoadoutSnapshotSort;
	onFiltersChange: (filters: LoadoutSnapshotFilters) => void;
	onSortChange: (sort: LoadoutSnapshotSort) => void;
	onClear: () => void;
};

const toggleValue = <T extends string | number>(values: T[], value: T): T[] =>
	values.includes(value) ? arrayRemoveItem(values, value) : [...values, value];

export const LoadoutSnapshotFilter = ({
	filters,
	sort,
	onFiltersChange,
	onSortChange,
	onClear,
}: LoadoutSnapshotFilterProps) => {
	const isLegendaryConquest =
		filters.tag === LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST;
	const isConquest = filters.tag === LOADOUT_SNAPSHOT_TAGS.CONQUEST;

	return (
		<div className="grid gap-3">
			<SearchInput
				aria-label="Search loadout snapshots"
				placeholder="Search loadout snapshots"
				value={filters.search}
				onValueChange={(search) => onFiltersChange({ ...filters, search })}
			/>
			<div className="flex flex-wrap gap-2">
				<FilterButtonGroup aria-label="Filter loadout snapshots by tag">
					{TAG_OPTIONS.map(({ label, value }) => (
						<FilterToggleButton
							key={value}
							isSelected={filters.tag === value}
							type="button"
							onClick={() =>
								onFiltersChange({
									...filters,
									tag: value,
									selectedElementIds: [],
									selectedBossIds: [],
								})
							}
						>
							{label}
						</FilterToggleButton>
					))}
				</FilterButtonGroup>
				{isLegendaryConquest && (
					<FilterButtonGroup aria-label="Filter loadout snapshots by element">
						{Object.values(ELEMENTS_DATA)
							.filter(
								({ id, hide }) =>
									!hide &&
									Object.values(LOADOUT_SNAPSHOT_ELEMENTS).includes(
										id as LoadoutSnapshotElement,
									),
							)
							.map(({ id, image, element }) => (
								<FilterToggleButton
									key={id}
									type="button"
									isSelected={filters.selectedElementIds.includes(
										id as LoadoutSnapshotElement,
									)}
									aria-label={element}
									title={element}
									onClick={() =>
										onFiltersChange({
											...filters,
											selectedElementIds: toggleValue(
												filters.selectedElementIds,
												id as LoadoutSnapshotElement,
											),
										})
									}
								>
									<img
										src={image}
										width="25"
										height="25"
										alt={`${element} icon`}
									/>
								</FilterToggleButton>
							))}
					</FilterButtonGroup>
				)}
				{isConquest && (
					<FilterButtonGroup aria-label="Filter loadout snapshots by boss">
						{LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS.map((id) => {
							const boss = MONSTERLINGS_DATA[id];
							return (
								<FilterToggleButton
									key={id}
									type="button"
									isSelected={filters.selectedBossIds.includes(id)}
									aria-label={boss.name}
									title={boss.name}
									onClick={() =>
										onFiltersChange({
											...filters,
											selectedBossIds: toggleValue(
												filters.selectedBossIds,
												id as LoadoutSnapshotConquestBossId,
											),
										})
									}
								>
									<img
										src={boss.image}
										width="25"
										height="25"
										alt={`${boss.name} icon`}
									/>
								</FilterToggleButton>
							);
						})}
					</FilterButtonGroup>
				)}
				<ButtonGroup aria-label="Sort loadout snapshots">
					<SortSelect
						ariaLabel="Sort loadout snapshots"
						options={SORT_OPTIONS}
						value={sort}
						onValueChange={onSortChange}
					/>
				</ButtonGroup>
				<ButtonGroup aria-label="Clear loadout snapshot filters">
					<Button
						type="button"
						variant="secondary"
						size="icon"
						aria-label="Clear loadout snapshot filters"
						onClick={onClear}
					>
						<XIcon />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};
