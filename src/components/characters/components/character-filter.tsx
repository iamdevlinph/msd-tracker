import { arrayRemoveItem, toSentenceCase } from "common-utils-pkg";
import { SearchIcon, StarIcon, XIcon } from "lucide-react";
import type { CharacterFilters } from "@/components/characters/store/characters-filter-store";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
	CHARACTER_CLASS_DATA,
	type CharacterClassId,
} from "@/data/CHARACTER_CLASS_DATA";
import { ELEMENTS_DATA, type ElementId } from "@/data/ELEMENTS_DATA";
import { TIERS_DATA, type TierId } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

type CharacterFilterProps = {
	filters: CharacterFilters;
	onChange: (filters: CharacterFilters) => void;
	autoFocus?: boolean;
};

export const CharacterFilter = ({
	filters,
	onChange,
	autoFocus = false,
}: CharacterFilterProps) => {
	const { search, selectedElements, selectedCharacterClass, selectedTiers } =
		filters;

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
			<div className="relative">
				<SearchIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
				<Input
					aria-label="Search characters"
					autoFocus={autoFocus}
					value={search}
					onChange={(event) =>
						onChange({ ...filters, search: event.target.value })
					}
					onFocus={(event) => event.currentTarget.select()}
					placeholder="Search characters"
					className="pl-9"
				/>
			</div>
			<ButtonGroup className="flex flex-wrap">
				{Object.values(ELEMENTS_DATA).map(({ id, image, element, hide }) => {
					if (hide) return null;

					const isElemSelected = selectedElements.includes(id);

					return (
						<Button
							type="button"
							aria-pressed={isElemSelected}
							variant={isElemSelected ? "default" : "outline"}
							key={id}
							onClick={() => handleSelectElement(id)}
							className={cn(isElemSelected && "border")}
							title={element}
						>
							<img src={image} width="25" height="25" alt={`${element} icon`} />
						</Button>
					);
				})}

				<ButtonGroupSeparator className="w-1.25! hidden sm:block" />

				{Object.values(CHARACTER_CLASS_DATA).map(
					({ id, image, character_class }) => {
						const isCharClassSelected = selectedCharacterClass.includes(id);
						const elementName = toSentenceCase(character_class);

						return (
							<Button
								type="button"
								aria-pressed={isCharClassSelected}
								variant={isCharClassSelected ? "default" : "outline"}
								key={id}
								onClick={() => handleSelectClass(id)}
								className={cn(isCharClassSelected && "border")}
								title={elementName}
							>
								<img
									src={image}
									width="25"
									height="25"
									alt={`${elementName} icon`}
								/>
							</Button>
						);
					},
				)}

				<ButtonGroupSeparator className="w-1.25! hidden sm:block" />

				{Object.values(TIERS_DATA)
					.filter(({ id }) => id === 4 || id === 5)
					.map(({ id, hex }) => {
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
						})
					}
					aria-label="Clear character filters"
				>
					<XIcon />
				</Button>
			</ButtonGroup>
		</div>
	);
};
