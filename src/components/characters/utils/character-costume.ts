import type { Character } from "@/data/characters/CHARACTERS_DATA";

export type CharacterOwnedCostume = { costume_id?: number | null };

export const getVisibleCostumes = (character: Character) =>
	(character.costumes ?? []).filter(
		(costume) =>
			import.meta.env.VITE_NODE_ENV === "development" || !costume.is_hidden,
	);

export const resolveCharacterPortrait = (
	character: Character,
	owned?: CharacterOwnedCostume,
) =>
	getVisibleCostumes(character).find(
		(costume) => costume.id === owned?.costume_id,
	)?.portraitImage ?? character.portraitImage;

export const getCatalogCostume = (character: Character, id?: number | null) =>
	(character.costumes ?? []).find((costume) => costume.id === id);
