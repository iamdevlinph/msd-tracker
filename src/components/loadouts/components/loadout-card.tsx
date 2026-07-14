import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { LoadoutCardCharacterRow } from "@/components/loadouts/components/loadout-card-character-row";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const CHARACTER_SLOT_INDEXES = [0, 1, 2] as const;

type LoadoutCardProps = {
	loadout: LoadoutOwned;
	onPreview: (source: "card" | "icon") => void;
	onEdit: () => void;
	onDelete: () => void;
};

export const LoadoutCard = ({
	loadout,
	onPreview,
	onEdit,
	onDelete,
}: LoadoutCardProps) => {
	const charactersOwned = useAppStore((state) => state.charactersOwned);
	const monsterlingsOwned = useAppStore((state) => state.monsterlingsOwned);

	return (
		<Card className="group relative min-w-0 cursor-pointer gap-3 rounded-lg py-3 transition-all hover:border-primary/40 hover:shadow-md focus-within:border-primary/40 focus-within:shadow-md">
			<button
				type="button"
				onClick={() => onPreview("card")}
				aria-label={`Preview ${loadout.name} loadout card`}
				className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			/>
			<CardHeader className="pointer-events-none relative z-10 grid-cols-[1fr_auto] gap-2 px-3">
				<CardTitle className="text-base leading-tight">
					{loadout.name}
				</CardTitle>
				<div className="pointer-events-auto flex gap-2">
					<Button
						type="button"
						size="icon-sm"
						variant="outline"
						onClick={() => onPreview("icon")}
						aria-label={`Preview ${loadout.name}`}
						title="Preview loadout"
					>
						<EyeIcon />
					</Button>
					<Button
						type="button"
						size="icon-sm"
						variant="outline"
						onClick={onEdit}
						aria-label={`Edit ${loadout.name}`}
						title="Edit loadout"
					>
						<EditIcon />
					</Button>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								type="button"
								size="icon-sm"
								variant="destructive"
								title="Delete loadout"
								aria-label={`Delete ${loadout.name}`}
							>
								<Trash2Icon />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent size="sm">
							<AlertDialogHeader>
								<AlertDialogTitle>Delete team loadout?</AlertDialogTitle>
								<AlertDialogDescription>
									This will permanently delete “{loadout.name}”.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction variant="destructive" onClick={onDelete}>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
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
					/>
				))}
			</CardContent>
		</Card>
	);
};
