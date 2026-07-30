import { arrayRemoveItem, toSentenceCase } from "common-utils-pkg";
import { StarIcon, XIcon } from "lucide-react";
import type { ArtifactFilters } from "@/components/artifacts/utils/artifact-utils";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { SearchInput } from "@/components/ui/search-input";
import {
	CHARACTER_CLASS_DATA,
	type CharacterClassId,
} from "@/data/CHARACTER_CLASS_DATA";
import { ELEMENTS_DATA, type ElementId } from "@/data/ELEMENTS_DATA";
import { TIERS_DATA, type TierId } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

type ArtifactFilterProps = {
	filters: ArtifactFilters;
	onChange: (filters: ArtifactFilters) => void;
	autoFocus?: boolean;
};
export const ArtifactFilter = ({
	filters,
	onChange,
	autoFocus = false,
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
			<ButtonGroup className="flex flex-wrap">
				{Object.values(ELEMENTS_DATA).map(({ id, image, element, hide }) =>
					hide ? null : (
						<Button
							key={id}
							type="button"
							aria-pressed={filters.selectedElements.includes(id)}
							variant={
								filters.selectedElements.includes(id) ? "default" : "outline"
							}
							className={cn(filters.selectedElements.includes(id) && "border")}
							title={element}
							onClick={() => toggle<ElementId>("selectedElements", id)}
						>
							<img src={image} width="25" height="25" alt={`${element} icon`} />
						</Button>
					),
				)}
				<ButtonGroupSeparator className="w-1.25! hidden sm:block" />
				{Object.values(CHARACTER_CLASS_DATA).map(
					({ id, image, character_class }) => (
						<Button
							key={id}
							type="button"
							aria-pressed={filters.selectedCharacterClass.includes(id)}
							variant={
								filters.selectedCharacterClass.includes(id)
									? "default"
									: "outline"
							}
							className={cn(
								filters.selectedCharacterClass.includes(id) && "border",
							)}
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
						</Button>
					),
				)}
				<ButtonGroupSeparator className="w-1.25! hidden sm:block" />
				{Object.values(TIERS_DATA)
					.filter(({ id }) => id === 3 || id === 4 || id === 5)
					.map(({ id, hex }) => (
						<Button
							key={id}
							type="button"
							aria-pressed={filters.selectedTiers.includes(id)}
							variant={
								filters.selectedTiers.includes(id) ? "default" : "outline"
							}
							className={cn(filters.selectedTiers.includes(id) && "border")}
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
						</Button>
					))}
				<Button
					variant="secondary"
					size="icon"
					type="button"
					aria-label="Clear artifact filters"
					onClick={() =>
						onChange({
							search: "",
							selectedCharacterClass: [],
							selectedElements: [],
							selectedTiers: [],
						})
					}
				>
					<XIcon />
				</Button>
			</ButtonGroup>
		</div>
	);
};
