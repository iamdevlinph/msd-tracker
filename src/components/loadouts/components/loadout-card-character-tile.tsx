import type { CharacterOwned } from "@/components/characters/components/character-details-form";
import type { Character } from "@/data/characters/CHARACTERS_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";
import { UNKNOWN_CHARACTER_PORTRAIT_IMAGE } from "@/image-constants";

type LoadoutCardCharacterTileProps = {
	character: Character | null;
	owned: CharacterOwned | null;
	onEdit?: (id: number) => void;
};
export const LoadoutCardCharacterTile = ({
	character,
	owned,
	onEdit,
}: LoadoutCardCharacterTileProps) => (
	<div className="grid aspect-square min-w-0 place-items-center">
		<div
			className="relative grid size-full max-h-28 max-w-28 place-items-center bg-cover bg-center"
			style={{
				backgroundImage: character
					? `url(${TIERS_DATA[character.tier_id].full})`
					: undefined,
			}}
		>
			{character && owned && onEdit ? (
				<button
					type="button"
					aria-label={`Edit ${character.name} character`}
					onClick={(event) => {
						event.stopPropagation();
						onEdit(character.id);
					}}
					className="pointer-events-auto relative size-full max-h-28 max-w-28 rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<img
						src={character.portraitImage}
						alt={`${character.name} portrait`}
						className="size-full max-h-28 max-w-28 object-contain"
					/>
				</button>
			) : (
				<img
					src={character?.portraitImage ?? UNKNOWN_CHARACTER_PORTRAIT_IMAGE}
					alt={
						character
							? `${character.name} portrait`
							: "Unknown character portrait"
					}
					className="size-full max-h-28 max-w-28 object-contain"
				/>
			)}
		</div>
	</div>
);
