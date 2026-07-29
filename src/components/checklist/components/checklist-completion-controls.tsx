import { Check, CheckCheck, Undo2 } from "lucide-react";
import type { ChecklistViewItem } from "@/components/checklist/utils/checklist-view";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

type ChecklistCompletionControlsProps = {
	item: ChecklistViewItem;
	onComplete: (key: string) => void;
	onUndo: (key: string) => void;
	onFullComplete: (key: string) => void;
	onFullUndo: (key: string) => void;
};

export const ChecklistCompletionControls = ({
	item,
	onComplete,
	onUndo,
	onFullComplete,
	onFullUndo,
}: ChecklistCompletionControlsProps) => {
	const {
		definition,
		completionKey,
		fullCompletionKey,
		occurrenceCompleted,
		fullyCompleted,
		status,
	} = item;
	const canComplete = status !== "upcoming" && status !== "expired";
	const occurrenceIsCompleted =
		definition.kind === "event" ? occurrenceCompleted : status === "completed";
	const occurrenceButton = (
		<Button
			aria-label={
				occurrenceIsCompleted
					? `Mark ${definition.title} incomplete`
					: `Mark ${definition.title} complete`
			}
			aria-pressed={occurrenceIsCompleted}
			className={cn(
				"size-8 border-0 bg-muted-foreground/35 p-1 text-foreground shadow-none hover:bg-muted-foreground/55",
				definition.kind !== "event" && "mr-2 rounded-full",
				occurrenceIsCompleted &&
					"bg-primary text-primary-foreground hover:bg-primary/90",
			)}
			disabled={!canComplete || fullyCompleted}
			size="icon-sm"
			variant="ghost"
			onClick={() =>
				occurrenceIsCompleted
					? onUndo(completionKey)
					: onComplete(completionKey)
			}
		>
			{occurrenceIsCompleted ? (
				<Undo2 className="size-5" />
			) : (
				<Check className="size-5" />
			)}
		</Button>
	);
	const fullCompletionButton = (
		<Button
			aria-label={
				fullyCompleted
					? `Mark ${definition.title} not fully complete`
					: `Mark ${definition.title} fully complete`
			}
			aria-pressed={fullyCompleted}
			className={cn(
				"size-8 border-0 bg-muted-foreground/35 p-1 text-foreground shadow-none hover:bg-muted-foreground/55",
				definition.recurrence !== "daily" && "mr-2 rounded-full",
				fullyCompleted &&
					"bg-primary text-primary-foreground hover:bg-primary/90",
			)}
			disabled={!canComplete}
			size="icon-sm"
			variant="ghost"
			onClick={() =>
				fullyCompleted
					? onFullUndo(fullCompletionKey)
					: onFullComplete(fullCompletionKey)
			}
		>
			{fullyCompleted ? (
				<Undo2 className="size-5" />
			) : (
				<CheckCheck className="size-5" />
			)}
		</Button>
	);

	if (definition.kind !== "event") return occurrenceButton;
	if (definition.recurrence !== "daily") return fullCompletionButton;
	return (
		<ButtonGroup
			aria-label={`${definition.title} completion controls`}
			className="mr-2 shrink-0 [&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full"
		>
			{occurrenceButton}
			{fullCompletionButton}
		</ButtonGroup>
	);
};
