import { useMemo } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
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

	const enrichedCharacters = charactersOwned
		.map((c) => ({
			...c,
			info: CHARACTERS_DATA[c.id],
		}))
		.filter(({ info }) => {
			if (classSet.size && !classSet.has(info.class_id)) return false;
			if (elementSet.size && !elementSet.has(info.element_id)) return false;
			return true;
		})
		.sort((a, b) => a.info.name.localeCompare(b.info.name));

	return (
		<div
			className="mt-5 gap-y-10 gap-x-5 grid sm:flex sm:flex-wrap justify-center sm:justify-start"
			style={{
				gridTemplateColumns: "repeat(auto-fit, 125px)",
			}}
		>
			{enrichedCharacters.length === 0 && <h1>No owned characters</h1>}

			{enrichedCharacters.length > 0 &&
				enrichedCharacters.map((charOwned) => (
					<CharacterCard
						key={charOwned.id}
						portraitSize={130}
						iconSize={30}
						portraitImage={charOwned.info.portraitImage}
						name={charOwned.info.name}
						element_id={charOwned.info.element_id}
						class_id={charOwned.info.class_id}
						tier={charOwned.info.tier}
						awakening={charOwned.awakening}
					/>
				))}
		</div>
	);
};
