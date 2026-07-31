import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
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
import { CHECKLIST_KINDS } from "@/data/checklist/CHECKLIST_DATA";

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
				<AlertDialogTitle>
					{task ? `Delete “${task.title}”?` : "Delete item?"}
				</AlertDialogTitle>
				<AlertDialogDescription>
					This removes the{" "}
					{task?.kind === CHECKLIST_KINDS.EVENT
						? CHECKLIST_KINDS.EVENT
						: "task"}{" "}
					and all of its completion records. This cannot be undone.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					variant="destructive"
					onClick={() => task && onDelete(task)}
				>
					Delete{" "}
					{task?.kind === CHECKLIST_KINDS.EVENT
						? CHECKLIST_KINDS.EVENT
						: "task"}
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);
