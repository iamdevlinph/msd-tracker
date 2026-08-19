import CharacterCard from "@/components/characters/components/character-card";
import type { CharacterOwned } from "@/components/characters/components/character-details-form";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { CharacterSkillLevel } from "@/components/characters/components/character-skill-level";
import type { CharacterFilters } from "@/components/characters/store/characters-filter-store";
import { resolveCharacterPortrait } from "@/components/characters/utils/character-costume";
import type { Character } from "@/data/characters/CHARACTERS_DATA";
import { cn } from "@/lib/utils";

export type LoadoutCharacterOption = CharacterOwned & { info: Character };

type LoadoutCharacterPickerProps = {
	filters: CharacterFilters;
	onFiltersChange: (filters: CharacterFilters) => void;
	options: LoadoutCharacterOption[];
	selectedIds: Set<number | null>;
	currentId: number | null;
	onSelect: (id: number) => void;
};

export const LoadoutCharacterPicker = ({
	filters,
	onFiltersChange,
	options,
	selectedIds,
	currentId,
	onSelect,
}: LoadoutCharacterPickerProps) => (
	<>
		<div className="mb-4">
			<CharacterFilter filters={filters} onChange={onFiltersChange} autoFocus />
		</div>
		<div className="grid grid-cols-[repeat(auto-fit,130px)] justify-center gap-x-5 gap-y-8">
			{options.map((character) => {
				const disabled =
					selectedIds.has(character.id) && currentId !== character.id;
				return (
					<button
						key={character.id}
						type="button"
						disabled={disabled}
						onClick={() => onSelect(character.id)}
						aria-label={`Select ${character.info.name}`}
						className={cn(
							"rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							disabled && "cursor-not-allowed opacity-50",
						)}
					>
						<CharacterCard
							portraitSize={130}
							iconSize={30}
							portraitImage={resolveCharacterPortrait(
								character.info,
								character,
							)}
							name={character.info.name}
							element_id={character.info.element_id}
							class_id={character.info.class_id}
							tier_id={character.info.tier_id}
							awakening={character.awakening}
							variant={character.info.variant}
						/>
						<CharacterSkillLevel charOwned={character} />
					</button>
				);
			})}
			{options.length === 0 && (
				<p className="col-span-full rounded-md border border-dashed p-4 text-sm text-muted-foreground">
					No owned characters match.
				</p>
			)}
		</div>
	</>
);
