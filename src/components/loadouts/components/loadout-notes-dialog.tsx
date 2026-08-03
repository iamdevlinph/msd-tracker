import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

type LoadoutNotesDialogProps = {
	loadout: LoadoutOwned | null;
	onOpenChange: (open: boolean) => void;
	onSave: (notes: string) => void;
};

export const LoadoutNotesDialog = ({
	loadout,
	onOpenChange,
	onSave,
}: LoadoutNotesDialogProps) => {
	const [notes, setNotes] = useState("");
	useEffect(() => setNotes(loadout?.notes ?? ""), [loadout]);
	return (
		<Dialog open={Boolean(loadout)} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Notes for “{loadout?.name ?? "Loadout"}”</DialogTitle>
					<DialogDescription>
						Record damage results or other useful information for this loadout.
					</DialogDescription>
				</DialogHeader>
				<Textarea
					aria-label="Loadout notes"
					maxLength={2000}
					rows={8}
					value={notes}
					onChange={(event) => setNotes(event.target.value)}
				/>
				<div className="text-right text-xs text-muted-foreground">
					{notes.length}/2000
				</div>
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button type="button" onClick={() => onSave(notes)}>
						Save notes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
