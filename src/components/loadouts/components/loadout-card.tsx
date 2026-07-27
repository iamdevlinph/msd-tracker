import { LoadoutActions } from "@/components/loadouts/components/loadout-actions";
import { LoadoutCardCharacterRow } from "@/components/loadouts/components/loadout-card-character-row";
import type { LoadoutImageAction } from "@/components/loadouts/components/loadout-image-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const CHARACTER_SLOT_INDEXES = [0, 1, 2] as const;

type LoadoutCardProps = {
	loadout: LoadoutOwned;
	onPreview: (source: "card" | "icon") => void;
	onEdit: () => void;
	onDuplicate: () => void;
	onCopy: () => void;
	onDownload: () => void;
	onDelete: () => void;
	onEditCharacter: (id: number) => void;
	onEditMonsterling: (id: string) => void;
	activeImageAction?: LoadoutImageAction | null;
	disabled?: boolean;
};

export const LoadoutCard = ({
	loadout,
	onPreview,
	onEdit,
	onDuplicate,
	onCopy,
	onDownload,
	onDelete,
	onEditCharacter,
	onEditMonsterling,
	activeImageAction,
	disabled,
}: LoadoutCardProps) => {
	const charactersOwned = useAppStore((state) => state.charactersOwned);
	const monsterlingsOwned = useAppStore((state) => state.monsterlingsOwned);

	return (
		<Card className="group relative min-w-0 cursor-pointer gap-3 rounded-lg py-3 transition-all hover:border-primary/40 hover:shadow-md focus-within:border-primary/40 focus-within:shadow-md">
			<button
				type="button"
				onClick={() => onPreview("card")}
				disabled={disabled}
				aria-label={`Preview ${loadout.name} loadout card`}
				className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			/>
			<CardHeader className="pointer-events-none relative z-10 gap-2 px-3">
				<CardTitle className="text-base leading-tight">
					{loadout.name}
				</CardTitle>
				<LoadoutActions
					className="pointer-events-none w-full justify-end **:data-[slot=button]:pointer-events-auto"
					loadoutName={loadout.name}
					onPreview={() => onPreview("icon")}
					onEdit={onEdit}
					onDuplicate={onDuplicate}
					onCopy={onCopy}
					onDownload={onDownload}
					onDelete={onDelete}
					activeImageAction={activeImageAction}
					disabled={disabled}
				/>
			</CardHeader>
			<CardContent className="pointer-events-none relative z-10 grid gap-2 px-3">
				{CHARACTER_SLOT_INDEXES.map((index) => (
					<LoadoutCardCharacterRow
						key={`${loadout.id}-character-${index + 1}`}
						loadoutId={loadout.id}
						index={index}
						slot={loadout.characters[index]}
						charactersOwned={charactersOwned}
						monsterlingsOwned={monsterlingsOwned}
						onEditCharacter={onEditCharacter}
						onEditMonsterling={onEditMonsterling}
					/>
				))}
			</CardContent>
		</Card>
	);
};
