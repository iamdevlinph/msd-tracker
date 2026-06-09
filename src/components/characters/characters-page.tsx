import { AddCharacter } from "@/components/characters/components/add-character";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { CharacterOwnedList } from "@/components/characters/components/character-owned-list";
import { PageTitle } from "@/components/page-title";

export const CharactersPage = () => {
	return (
		<div>
			<PageTitle title="Characters" />

			<div className="flex gap-5 flex-col">
				<AddCharacter />

				<CharacterFilter />

				<CharacterOwnedList />
			</div>
		</div>
	);
};
