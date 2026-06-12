import { useMemo, useState } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { CharacterSkillLevel } from "@/components/characters/components/character-skill-level";
import { EditCharacterDetailsDialog } from "@/components/characters/components/edit-character-details-dialog";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { useAppStore } from "@/stores/app-store";

export const CharacterOwnedList = () => {
	const [open, setOpen] = useState(false);
	const [charIdToEdit, setCharIdToEdit] = useState<null | number>(null);

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

	const enrichedCharacters = Object.values(charactersOwned)
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
		<>
			{enrichedCharacters.length === 0 && (
				<h1 className="">No owned characters</h1>
			)}

			<div
				className="mt-5 gap-y-10 gap-x-5 grid sm:flex sm:flex-wrap justify-center sm:justify-start"
				style={{
					gridTemplateColumns: "repeat(auto-fit, 125px)",
				}}
			>
				{enrichedCharacters.length > 0 &&
					enrichedCharacters.map((charOwned) => {
						return (
							<button
								key={charOwned.id}
								type="button"
								onClick={() => {
									setOpen(true);
									setCharIdToEdit(charOwned.id);
								}}
							>
								<CharacterCard
									key={charOwned.id}
									portraitSize={130}
									iconSize={30}
									portraitImage={charOwned.info.portraitImage}
									name={charOwned.info.name}
									element_id={charOwned.info.element_id}
									class_id={charOwned.info.class_id}
									tier_id={charOwned.info.tier_id}
									awakening={charOwned.awakening}
								/>
								<CharacterSkillLevel charOwned={charOwned} />
							</button>
						);
					})}
			</div>

			<EditCharacterDetailsDialog
				charIdToEdit={charIdToEdit}
				open={open}
				setOpen={setOpen}
				onClose={() => setCharIdToEdit(null)}
			/>
		</>
	);
};
