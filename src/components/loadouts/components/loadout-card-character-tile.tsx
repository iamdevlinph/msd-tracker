import type { CharacterOwned } from "@/components/characters/components/character-details-form";
import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import type { Character } from "@/data/characters/CHARACTERS_DATA";
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
		<div className="relative grid size-full max-h-28 max-w-28 place-items-center">
			{character && owned && onEdit ? (
				<button
					type="button"
					aria-label={`Edit ${character.name} character`}
					onClick={(event) => {
						event.stopPropagation();
						onEdit(character.id);
					}}
					className="pointer-events-auto relative size-full max-h-28 max-w-28 overflow-hidden rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<PortraitWithName
						name={character.name}
						className="size-full"
						nameClassName="hidden"
					>
						<TierPortrait
							tier={character.tier_id}
							portraitImg={character.portraitImage}
							portraitSize={112}
							name={character.name}
							portraitClassName="size-full object-contain object-bottom"
						/>
					</PortraitWithName>
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
