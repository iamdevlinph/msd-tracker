import { AddCharacter } from "@/components/characters/components/add-character";
import CharacterCard from "@/components/characters/components/character-card";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { CharacterOwnedList } from "@/components/characters/components/character-owned-list";
import { CharacterSkillLevel } from "@/components/characters/components/character-skill-level";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { matchesCharacterFilters } from "@/components/characters/utils/character-utils";
import { CollectionExportMenu } from "@/components/shared/collection-export-menu";
import { PageTitle } from "@/components/shared/page-title";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { useAppStore } from "@/stores/app-store";

export const CharactersPage = () => {
	const filters = useCharacterFilter((s) => s.characterFilters);
	const setFilters = useCharacterFilter((s) => s.setCharacaterFilters);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const exportItems = Object.values(charactersOwned)
		.flatMap((owned) => {
			const info = CHARACTERS_DATA[owned.id];
			return info && matchesCharacterFilters(info, filters)
				? [{ ...owned, info }]
				: [];
		})
		.sort((a, b) => {
			const nameOrder = a.info.name.localeCompare(b.info.name);
			if (filters.sort === "name-desc") return -nameOrder;
			if (
				filters.sort === "awakening-asc" ||
				filters.sort === "awakening-desc"
			) {
				return (
					(filters.sort === "awakening-asc"
						? a.awakening - b.awakening
						: b.awakening - a.awakening) || nameOrder
				);
			}
			return nameOrder;
		});

	return (
		<div>
			<PageTitle
				title="Characters"
				description="Track your owned characters, tiers, awakening levels, and skill progress."
			/>

			<div className="mb-5 flex flex-wrap gap-2">
				<AddCharacter />
				<CollectionExportMenu
					collection="characters"
					title="Character"
					count={exportItems.length}
					itemWidth={130}
					maxColumns={12}
				>
					{exportItems.map((character) => (
						<div key={character.id} className="flex flex-col items-center">
							<CharacterCard
								portraitSize={130}
								iconSize={30}
								portraitImage={character.info.portraitImage}
								name={character.info.name}
								element_id={character.info.element_id}
								class_id={character.info.class_id}
								tier_id={character.info.tier_id}
								awakening={character.awakening}
								variant={character.info.variant}
							/>
							<CharacterSkillLevel charOwned={character} exportLayout />
						</div>
					))}
				</CollectionExportMenu>
			</div>

			<div className="flex gap-5 flex-col">
				<CharacterFilter filters={filters} onChange={setFilters} showSort />

				<CharacterOwnedList filters={filters} />
			</div>
		</div>
	);
};
