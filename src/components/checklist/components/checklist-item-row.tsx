import { Pencil, Trash2 } from "lucide-react";
import { ChecklistBadges } from "@/components/checklist/components/checklist-badges";
import { ChecklistCompletionControls } from "@/components/checklist/components/checklist-completion-controls";
import { ChecklistStatusDisplay } from "@/components/checklist/components/checklist-status";
import {
	formatCountdown,
	isChecklistTask,
} from "@/components/checklist/utils/checklist";
import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import type { ChecklistViewItem } from "@/components/checklist/utils/checklist-view";
import { Button } from "@/components/ui/button";
import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";
import { cn } from "@/lib/utils";

const eventRowStyles = {
	daily: "from-teal-500/15 hover:border-teal-500/40",
	weekly: "from-violet-500/15 hover:border-violet-500/40",
	none: "from-fuchsia-500/15 hover:border-fuchsia-500/40",
} as const;

type ChecklistItemRowProps = {
	item: ChecklistViewItem;
	now: number;
	onComplete: (key: string) => void;
	onUndo: (key: string) => void;
	onFullComplete: (key: string) => void;
	onFullUndo: (key: string) => void;
	onEdit: (task: ChecklistTask) => void;
	onDelete: (task: ChecklistTask) => void;
	onEditPermanentNote: (definition: ChecklistDefinition) => void;
};

const getCompletedCountdown = (
	item: ChecklistViewItem,
	now: number,
): { label: string; text: string } | undefined => {
	const { definition, occurrence } = item;
	if (item.fullyCompleted && occurrence.endAt) {
		if (occurrence.endAt <= now) return undefined;
		const text = formatCountdown(occurrence.endAt - now);
		return { label: `Ends in ${text}`, text };
	}
	let boundary: number | undefined;
	let action: "due" | "ends" | "resets" = "resets";

	if (definition.mode === "after_completion" && now < occurrence.startAt) {
		boundary = occurrence.startAt;
	} else if (occurrence.nextResetAt) {
		boundary = occurrence.nextResetAt;
	} else if (occurrence.endAt) {
		boundary = occurrence.endAt;
		action = definition.kind === "event" ? "ends" : "due";
	}

	if (
		definition.kind === "event" &&
		occurrence.endAt &&
		(!boundary || occurrence.endAt < boundary)
	) {
		boundary = occurrence.endAt;
		action = "ends";
	}
	if (!boundary || boundary <= now) return undefined;

	const remaining = formatCountdown(boundary - now);
	const actionLabel = {
		due: "Due",
		ends: "Ends",
		resets: "Resets",
	}[action];
	return {
		label: `${actionLabel} in ${remaining}`,
		text: remaining,
	};
};

export const ChecklistItemRow = ({
	item,
	now,
	onComplete,
	onUndo,
	onFullComplete,
	onFullUndo,
	onEdit,
	onDelete,
	onEditPermanentNote,
}: ChecklistItemRowProps) => {
	const { definition, occurrence, fullyCompleted, status } = item;
	const customTask = isChecklistTask(definition);
	const completedCountdown =
		status === "completed" ? getCompletedCountdown(item, now) : undefined;
	const countdownLabel = fullyCompleted
		? "Fully completed"
		: status === "completed"
			? "Completed"
			: status === "expired"
				? "Expired"
				: status === "overdue"
					? "Overdue"
					: status === "upcoming"
						? `Starts in ${formatCountdown(occurrence.startAt - now)}`
						: definition.kind === "event" && occurrence.endAt
							? `Ends in ${formatCountdown(occurrence.endAt - now)}`
							: customTask && occurrence.endAt
								? `Due in ${formatCountdown(occurrence.endAt - now)}`
								: occurrence.nextResetAt
									? `Resets in ${formatCountdown(occurrence.nextResetAt - now)}`
									: "Available now";
	const countdown = fullyCompleted
		? "Fully completed"
		: status === "completed"
			? "Completed"
			: status === "upcoming"
				? `in ${formatCountdown(occurrence.startAt - now)}`
				: countdownLabel.includes(" in ")
					? countdownLabel.slice(countdownLabel.indexOf(" in ") + 4)
					: countdownLabel;
	return (
		<li
			key={`${definition.id}-${occurrence.startAt}`}
			className={cn(
				"group relative flex min-h-14 w-full flex-col items-stretch justify-between overflow-hidden rounded-2xl border bg-card/85 p-2 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md sm:flex-row sm:items-center",
				!customTask && "bg-gradient-to-r from-primary/10 via-card/90 to-card",
				definition.kind === "event" &&
					eventRowStyles[
						definition.recurrence === "daily" ||
						definition.recurrence === "weekly"
							? definition.recurrence
							: "none"
					],
				definition.kind === "event" &&
					definition.participation === "discord" &&
					"from-[#5865F2]/15 hover:border-[#5865F2]/40",
				status === "ending-soon" &&
					"from-amber-500/15 hover:border-amber-500/40",
				status === "overdue" &&
					"from-destructive/10 hover:border-destructive/40",
				status === "completed" && "opacity-70",
				status === "expired" && "opacity-50",
			)}
		>
			<div className="flex w-full min-w-0 flex-1 items-center sm:w-auto">
				<ChecklistCompletionControls
					item={item}
					onComplete={onComplete}
					onFullComplete={onFullComplete}
					onFullUndo={onFullUndo}
					onUndo={onUndo}
				/>
				<div className="mr-2 flex min-w-0 flex-1 items-center gap-1.5 leading-tight">
					<ChecklistBadges definition={definition} />
					<div className="min-w-0 flex-1">
						<span
							className={cn(
								"line-clamp-2 font-semibold",
								customTask
									? "text-sm sm:text-base"
									: "text-xs sm:text-sm md:text-base",
								(status === "completed" || status === "expired") &&
									"line-through",
							)}
						>
							{definition.title}
						</span>
						{item.notes && (
							<p className="mt-0.5 line-clamp-2 break-words whitespace-pre-line text-xs font-normal text-muted-foreground">
								{item.notes}
							</p>
						)}
					</div>
				</div>
				{(customTask || definition.kind === "permanent") && (
					<div className="flex shrink-0 items-center gap-1 opacity-60 transition-opacity sm:opacity-0 sm:group-hover:opacity-75 sm:group-focus-within:opacity-100">
						<Button
							aria-label={
								definition.kind === "permanent"
									? `Edit notes for ${definition.title}`
									: `Edit ${definition.title}`
							}
							size="icon-xs"
							variant="ghost"
							onClick={() =>
								definition.kind === "permanent"
									? onEditPermanentNote(definition)
									: onEdit(definition as ChecklistTask)
							}
						>
							<Pencil />
						</Button>
						{customTask && (
							<Button
								aria-label={`Delete ${definition.title}`}
								size="icon-xs"
								variant="ghost"
								onClick={() => onDelete(definition)}
							>
								<Trash2 className="text-destructive" />
							</Button>
						)}
					</div>
				)}
			</div>
			<ChecklistStatusDisplay
				completedCountdown={completedCountdown}
				countdown={countdown}
				countdownLabel={countdownLabel}
				fullyCompleted={fullyCompleted}
				status={status}
			/>
		</li>
	);
};
