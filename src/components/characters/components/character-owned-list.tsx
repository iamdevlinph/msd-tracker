import { useState } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { CharacterSkillLevel } from "@/components/characters/components/character-skill-level";
import { EditCharacterDetailsDialog } from "@/components/characters/components/edit-character-details-dialog";
import type { CharacterFilters } from "@/components/characters/store/characters-filter-store";
import { matchesCharacterFilters } from "@/components/characters/utils/character-utils";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { useAppStore } from "@/stores/app-store";

type CharacterOwnedListProps = { filters: CharacterFilters };

export const CharacterOwnedList = ({ filters }: CharacterOwnedListProps) => {
	const [open, setOpen] = useState(false);
	const [charIdToEdit, setCharIdToEdit] = useState<null | number>(null);

	const charactersOwned = useAppStore((s) => s.charactersOwned);

	const enrichedCharacters = Object.values(charactersOwned)
		.map((c) => ({
			...c,
			info: CHARACTERS_DATA[c.id],
		}))
		.filter(({ info }) => matchesCharacterFilters(info, filters))
		.sort((a, b) => {
			const nameOrder = a.info.name.localeCompare(b.info.name);

			switch (filters.sort) {
				case "name-desc":
					return -nameOrder;
				case "awakening-asc":
					return a.awakening - b.awakening || nameOrder;
				case "awakening-desc":
					return b.awakening - a.awakening || nameOrder;
				default:
					return nameOrder;
			}
		});

	return (
		<>
			{enrichedCharacters.length === 0 && (
				<CollectionEmptyState
					title={
						Object.keys(charactersOwned).length === 0
							? "No characters yet"
							: "No characters match these filters"
					}
					description={
						Object.keys(charactersOwned).length === 0
							? "Add a character to start building your roster."
							: "Adjust or clear the filters to see your owned characters."
					}
				/>
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
									variant={charOwned.info.variant}
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
