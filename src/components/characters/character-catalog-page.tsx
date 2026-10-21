import { useMemo, useState } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { emptyCharacterFilters } from "@/components/characters/store/characters-filter-store";
import {
	matchesCharacterFilters,
	sortCharacters,
} from "@/components/characters/utils/character-utils";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { PageTitle } from "@/components/shared/page-title";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";

export const CharacterCatalogPage = () => {
	const [filters, setFilters] = useState(emptyCharacterFilters);
	const characters = useMemo(
		() =>
			sortCharacters(
				Object.values(CHARACTERS_DATA).filter((character) =>
					matchesCharacterFilters(character, filters),
				),
				filters.sort,
			),
		[filters],
	);

	return (
		<div>
			<PageTitle
				title="Character Catalog"
				description="Browse all available characters."
			/>
			<div className="flex flex-col gap-5">
				<CharacterFilter
					filters={filters}
					onChange={setFilters}
					sortMode="catalog"
				/>
				{characters.length ? (
					<div className="grid grid-cols-[repeat(auto-fill,120px)] gap-3">
						{characters.map((character) => (
							<CharacterCard
								key={character.id}
								className="cursor-default"
								class_id={character.class_id}
								element_id={character.element_id}
								name={character.name}
								portraitImage={character.portraitImage}
								portraitSize={120}
								showAwakening={false}
								tier_id={character.tier_id}
								variant={character.variant}
							/>
						))}
					</div>
				) : (
					<CollectionEmptyState
						title="No characters found"
						description="Adjust or clear the filters to see characters."
					/>
				)}
			</div>
		</div>
	);
};
