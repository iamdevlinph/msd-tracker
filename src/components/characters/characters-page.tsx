import { AddCharacter } from "@/components/characters/components/add-character";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { PageTitle } from "@/components/page-title";

export const CharactersPage = () => {
	return (
		<div>
			<PageTitle title="Characters" />

			<div className="flex gap-5 flex-col">
				<AddCharacter />

				<CharacterFilter />
			</div>
		</div>
	);
};
