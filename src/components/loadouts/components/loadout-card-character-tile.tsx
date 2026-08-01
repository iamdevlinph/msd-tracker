import type { CharacterOwned } from "@/components/characters/components/character-details-form";
import type { Character } from "@/data/characters/CHARACTERS_DATA";
import type { ELEMENTS_DATA, ElementId } from "@/data/elements/ELEMENTS_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";
import { UNKNOWN_CHARACTER_PORTRAIT_IMAGE } from "@/image-constants";

type LoadoutCardCharacterTileProps = {
	character: Character | null;
	owned: CharacterOwned | null;
	element: (typeof ELEMENTS_DATA)[ElementId] | null;
	onEdit?: (id: number) => void;
};
export const LoadoutCardCharacterTile = ({
	character,
	owned,
	element,
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
			<div className="absolute left-0.5 top-0.5 rounded-full bg-background/85 p-0.5 shadow-sm">
				{element && (
					<img
						src={element.image}
						alt={`${element.element} icon`}
						title={element.element}
						className="size-4"
					/>
				)}
			</div>
			{(owned?.awakening ?? 0) > 0 && (
				<span className="absolute bottom-0.5 right-0.5 rounded bg-background/90 px-1.5 py-0.5 text-xs font-bold shadow-sm">
					A{owned?.awakening}
				</span>
			)}
		</div>
	</div>
);
