import { Trash2Icon } from "lucide-react";
import { CharacterOwnedDetailsForm } from "@/components/characters/components/character-details-form";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { CHARACTERS_DATA, type Character } from "@/data/CHARACTERS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

type EditCharacterDetailsDialogProps = {
	charIdToEdit: Character["id"] | null;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onClose?: () => void;
};

export const EditCharacterDetailsDialog = (
	props: EditCharacterDetailsDialogProps,
) => {
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const deleteCharacterOwned = useAppStore((s) => s.deleteCharacterOwned);

	const { charIdToEdit, open, setOpen, onClose } = props;

	if (charIdToEdit === null) return;

	const charToEditInfo = charactersOwned[charIdToEdit];
	const charInfo = CHARACTERS_DATA[charIdToEdit];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				className={cn(
					"overflow-y-auto max-h-screen",
					"max-w-sm sm:min-w-min lg:min-w-218",
					"lg:min-w-max",
					"h-[calc(100dvh-50px)] lg:h-min",
				)}
				onCloseAutoFocus={() => onClose?.()}
			>
				<DialogHeader>
					<div className="flex gap-5 items-center">
						<DialogTitle>{charInfo.name}</DialogTitle>
						<div
							className="flex items-center gap-2 relative"
							aria-hidden="true"
						>
							<TierPortrait
								portraitImg={charInfo.portraitImage}
								portraitSize={50}
								tier={charInfo.tier_id}
								name={charInfo.name}
							/>
						</div>
						<Button
							className=""
							variant={"destructive"}
							size={"icon-sm"}
							onClick={() => {
								deleteCharacterOwned(charIdToEdit);
								setOpen(false);
							}}
						>
							<Trash2Icon />
						</Button>
					</div>
					<DialogDescription>
						Update this character or remove it from your collection.
					</DialogDescription>
				</DialogHeader>
				<div className="">
					<CharacterOwnedDetailsForm
						id={charIdToEdit}
						onClose={() => setOpen(false)}
						submitText="Update"
						editCharacterData={charToEditInfo}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};
