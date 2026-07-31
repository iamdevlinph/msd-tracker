import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Character } from "@/data/characters/CHARACTERS_DATA";

type LoadoutEditorCharacterSelectorProps = {
	character: Character | null;
	characterId: number | null;
	characterIndex: number;
	onOpen: () => void;
	onClear: () => void;
};

export const LoadoutEditorCharacterSelector = ({
	character,
	characterId,
	characterIndex,
	onOpen,
	onClear,
}: LoadoutEditorCharacterSelectorProps) => (
	<div className="flex gap-2">
		<Button
			type="button"
			variant="outline"
			className="min-w-0 flex-1 justify-start"
			onClick={onOpen}
		>
			<span className="truncate">{character?.name ?? "Select character"}</span>
		</Button>
		{characterId !== null && (
			<Button
				type="button"
				size="icon"
				variant="destructive"
				aria-label={`Clear character ${characterIndex + 1}`}
				onClick={onClear}
			>
				<Trash2Icon />
			</Button>
		)}
	</div>
);
