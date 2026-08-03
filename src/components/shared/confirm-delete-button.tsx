import { Trash2Icon } from "lucide-react";
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

type ConfirmDeleteButtonProps = {
	name: string;
	onConfirm: () => void;
};

export const ConfirmDeleteButton = ({
	name,
	onConfirm,
}: ConfirmDeleteButtonProps) => (
	<AlertDialog>
		<AlertDialogTrigger asChild>
			<Button
				type="button"
				variant="destructive"
				size="icon-sm"
				aria-label={`Delete ${name}`}
			>
				<Trash2Icon />
			</Button>
		</AlertDialogTrigger>
		<AlertDialogContent size="sm">
			<AlertDialogHeader>
				<AlertDialogTitle>Delete “{name}”?</AlertDialogTitle>
				<AlertDialogDescription>
					This permanently deletes this saved record and cannot be undone.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction variant="destructive" onClick={onConfirm}>
					Delete
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);
