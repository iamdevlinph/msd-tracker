import { arrayRemoveItem, toSentenceCase } from "common-utils-pkg";
import { StarIcon, XIcon } from "lucide-react";
import type {
	CharacterFilters,
	CharacterSort,
} from "@/components/characters/store/characters-filter-store";
import { CHARACTER_SORTS } from "@/components/characters/store/characters-filter-store";
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

type CharacterFilterProps = {
	filters: CharacterFilters;
	onChange: (filters: CharacterFilters) => void;
	autoFocus?: boolean;
	showSort?: boolean;
};

const sortOptions: { label: string; value: CharacterSort }[] = [
	{ label: "Name: A–Z", value: CHARACTER_SORTS.NAME_ASC },
	{ label: "Name: Z–A", value: CHARACTER_SORTS.NAME_DESC },
	{ label: "Awakening: Low–High", value: CHARACTER_SORTS.AWAKENING_ASC },
	{ label: "Awakening: High–Low", value: CHARACTER_SORTS.AWAKENING_DESC },
];

export const CharacterFilter = ({
	filters,
	onChange,
	autoFocus = false,
	showSort = false,
}: CharacterFilterProps) => {
	const {
		search,
		selectedElements,
		selectedCharacterClass,
		selectedTiers,
		sort,
	} = filters;

	const handleSelectElement = (elemId: ElementId) => {
		if (selectedElements.includes(elemId)) {
			const newArr = arrayRemoveItem(selectedElements, elemId);
			onChange({
				...filters,
				selectedElements: [...newArr],
			});
		} else {
			onChange({
				...filters,
				selectedElements: [...selectedElements, elemId],
			});
		}
	};

	const handleSelectClass = (charClassId: CharacterClassId) => {
		if (selectedCharacterClass.includes(charClassId)) {
			const newArr = arrayRemoveItem(selectedCharacterClass, charClassId);
			onChange({
				...filters,
				selectedCharacterClass: [...newArr],
			});
		} else {
			onChange({
				...filters,
				selectedCharacterClass: [...selectedCharacterClass, charClassId],
			});
		}
	};

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
				aria-label="Search characters"
				autoFocus={autoFocus}
				value={search}
				onValueChange={(value) => onChange({ ...filters, search: value })}
				onFocus={(event) => event.currentTarget.select()}
				placeholder="Search characters"
			/>
			<div className="flex flex-wrap gap-2">
				<FilterButtonGroup aria-label="Elements">
					{Object.values(ELEMENTS_DATA).map(({ id, image, element, hide }) => {
						if (hide) return null;

						const isElemSelected = selectedElements.includes(id);

						return (
							<FilterToggleButton
								isSelected={isElemSelected}
								type="button"
								key={id}
								onClick={() => handleSelectElement(id)}
								title={element}
							>
								<img
									src={image}
									width="25"
									height="25"
									alt={`${element} icon`}
								/>
							</FilterToggleButton>
						);
					})}
				</FilterButtonGroup>
				<FilterButtonGroup aria-label="Character classes">
					{Object.values(CHARACTER_CLASS_DATA).map(
						({ id, image, character_class }) => {
							const isCharClassSelected = selectedCharacterClass.includes(id);
							const elementName = toSentenceCase(character_class);

							return (
								<FilterToggleButton
									isSelected={isCharClassSelected}
									type="button"
									key={id}
									onClick={() => handleSelectClass(id)}
									title={elementName}
								>
									<img
										src={image}
										width="25"
										height="25"
										alt={`${elementName} icon`}
									/>
								</FilterToggleButton>
							);
						},
					)}
				</FilterButtonGroup>
				<FilterButtonGroup aria-label="Tiers">
					{Object.values(TIERS_DATA)
						.filter(({ id }) => id === 4 || id === 5)
						.map(({ id, hex }) => {
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

				{showSort && (
					<ButtonGroup aria-label="Sort owned characters">
						<SortSelect
							ariaLabel="Sort owned characters"
							options={sortOptions}
							value={sort}
							onValueChange={(nextSort) =>
								onChange({ ...filters, sort: nextSort })
							}
						/>
					</ButtonGroup>
				)}

				<ButtonGroup aria-label="Clear character filters">
					<Button
						variant="secondary"
						size="icon"
						type="button"
						onClick={() =>
							onChange({
								search: "",
								selectedCharacterClass: [],
								selectedElements: [],
								selectedTiers: [],
								sort: CHARACTER_SORTS.NAME_ASC,
							})
						}
						aria-label="Clear character filters"
					>
						<XIcon />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};
