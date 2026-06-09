import CharacterCard from "@/components/characters/components/character-card";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { useAppStore } from "@/stores/app-store";

export const CharacterOwnedList = () => {
	const characterFilters = useCharacterFilter((s) => s.characterFilters);
	const charactersOwned = useAppStore((s) => s.charactersOwned);

	const { selectedCharacterClass, selectedElements } = characterFilters;

	return (
		<div className="mt-5 gap-y-10 gap-x-5 flex flex-wrap">
			{charactersOwned.length === 0 && <h1>No owned characters</h1>}

			{charactersOwned.length > 0 &&
				charactersOwned
					.filter((character) => {
						if (
							selectedCharacterClass.length > 0 &&
							!selectedCharacterClass.includes(character.class_id)
						) {
							return false;
						}

						if (
							selectedElements.length > 0 &&
							!selectedElements.includes(character.element_id)
						) {
							return false;
						}

						return true;
					})
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((value) => {
						return (
							<CharacterCard
								key={value.id}
								{...value}
								portraitSize={130}
								iconSize={30}
							/>
						);
					})}
		</div>
	);
};
