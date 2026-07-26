import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ChecklistTask } from "@/lib/checklist-task";

type ChecklistDeleteDialogProps = {
	task?: ChecklistTask;
	onOpenChange: (open: boolean) => void;
	onDelete: (task: ChecklistTask) => void;
};

export const ChecklistDeleteDialog = ({
	task,
	onOpenChange,
	onDelete,
}: ChecklistDeleteDialogProps) => (
	<AlertDialog open={Boolean(task)} onOpenChange={onOpenChange}>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Delete custom task?</AlertDialogTitle>
				<AlertDialogDescription>
					This removes the task and all of its completion records. This cannot
					be undone.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					variant="destructive"
					onClick={() => task && onDelete(task)}
				>
					Delete task
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);
