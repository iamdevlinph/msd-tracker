import { AddCharacter } from "@/components/characters/components/add-character";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { CharacterOwnedList } from "@/components/characters/components/character-owned-list";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { PageTitle } from "@/components/shared/page-title";

export const CharactersPage = () => {
	const filters = useCharacterFilter((s) => s.characterFilters);
	const setFilters = useCharacterFilter((s) => s.setCharacaterFilters);

	return (
		<div>
			<PageTitle
				title="Characters"
				description="Track your owned characters, tiers, awakening levels, and skill progress."
			/>

			<div className="flex gap-5 flex-col">
				<AddCharacter />

				<CharacterFilter filters={filters} onChange={setFilters} showSort />

				<CharacterOwnedList filters={filters} />
			</div>
		</div>
	);
};
