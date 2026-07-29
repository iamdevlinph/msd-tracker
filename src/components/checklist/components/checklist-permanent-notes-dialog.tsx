import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";

const notesSchema = z.object({
	notes: z.string().max(500, "Notes must be 500 characters or fewer"),
});
type NotesForm = z.infer<typeof notesSchema>;

type ChecklistPermanentNotesDialogProps = {
	definition?: ChecklistDefinition;
	onOpenChange: (open: boolean) => void;
};

export const ChecklistPermanentNotesDialog = ({
	definition,
	onOpenChange,
}: ChecklistPermanentNotesDialogProps) => {
	const ga = useGoogleAnalytics();
	const note = useAppStore((state) =>
		definition ? (state.checklistPermanentNotes[definition.id] ?? "") : "",
	);
	const setNote = useAppStore((state) => state.setChecklistPermanentNote);
	const form = useForm<NotesForm>({
		resolver: zodResolver(notesSchema),
		defaultValues: { notes: "" },
	});
	useEffect(() => {
		form.reset({ notes: note });
	}, [form, note]);
	const setOpen = (open: boolean) => {
		if (!open) form.reset({ notes: note });
		onOpenChange(open);
	};
	const submit = ({ notes }: NotesForm) => {
		if (!definition) return;
		setNote(definition.id, notes);
		ga.event(ANALYTICS_EVENTS.CHECKLIST_UPDATE);
		setOpen(false);
	};

	return (
		<Dialog open={Boolean(definition)} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{definition ? `Notes for ${definition.title}` : "Notes"}
					</DialogTitle>
					<DialogDescription>
						Add up to 500 characters. Unsaved changes are discarded when you
						close this dialog.
					</DialogDescription>
				</DialogHeader>
				<form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
					<div className="grid gap-2">
						<Label htmlFor="checklist-permanent-notes">Notes</Label>
						<Textarea
							id="checklist-permanent-notes"
							maxLength={500}
							rows={5}
							{...form.register("notes")}
						/>
						{form.formState.errors.notes && (
							<p className="text-sm text-destructive">
								{form.formState.errors.notes.message}
							</p>
						)}
					</div>
				</form>
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button type="button" onClick={form.handleSubmit(submit)}>
						Save notes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
