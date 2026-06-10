import { useMemo } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { useAppStore } from "@/stores/app-store";

export const CharacterOwnedList = () => {
	const characterFilters = useCharacterFilter((s) => s.characterFilters);
	const charactersOwned = useAppStore((s) => s.charactersOwned);

	const { selectedCharacterClass, selectedElements } = characterFilters;

	const classSet = useMemo(
		() => new Set(selectedCharacterClass),
		[selectedCharacterClass],
	);

	const elementSet = useMemo(
		() => new Set(selectedElements),
		[selectedElements],
	);

	// const filteredCharacters = useMemo(() => {
	// 	return charactersOwned
	// 		.sort((a, b) => a.name.localeCompare(b.name))
	// 		.filter((character) => {
	// 			if (classSet.size > 0 && !classSet.has(character.class_id)) {
	// 				return false;
	// 			}

	// 			if (elementSet.size > 0 && !elementSet.has(character.element_id)) {
	// 				return false;
	// 			}

	// 			return true;
	// 		});
	// }, [charactersOwned, classSet, elementSet]);

	return (
		<div
			className="mt-5 gap-y-10 gap-x-5 grid sm:flex sm:flex-wrap justify-center sm:justify-start"
			style={{
				gridTemplateColumns: "repeat(auto-fit, 125px)",
			}}
		>
			{charactersOwned.length === 0 && <h1>No owned characters</h1>}

			{charactersOwned.length > 0 &&
				charactersOwned
					.filter((character) => {
						if (classSet.size > 0 && !classSet.has(character.class_id)) {
							return false;
						}

						if (elementSet.size > 0 && !elementSet.has(character.element_id)) {
							return false;
						}

						return true;
					})
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((character) => {
						return (
							<CharacterCard
								key={character.id}
								portraitSize={130}
								iconSize={30}
								portraitImage={character.portraitImage}
								name={character.name}
								element_id={character.element_id}
								class_id={character.class_id}
								tier={character.tier}
							/>
						);
					})}

			{/* {filteredCharacters.map((character) => (
				<CharacterCard
					key={character.id}
					portraitSize={130}
					iconSize={30}
					portraitImage={character.portraitImage}
					name={character.name}
					element_id={character.element_id}
					class_id={character.class_id}
					tier={character.tier}
				/>
			))} */}
		</div>
	);
};
