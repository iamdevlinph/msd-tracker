import {
	CalendarDays,
	Check,
	Pencil,
	RotateCcw,
	Trash2,
	Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCountdown, isChecklistTask } from "@/lib/checklist";
import type { ChecklistTask } from "@/lib/checklist-task";
import type { ChecklistViewItem } from "@/lib/checklist-view";
import { cn } from "@/lib/utils";

const statusPillStyles = {
	upcoming: "bg-sky-600 text-white",
	active: "bg-muted-foreground text-background",
	"ending-soon": "bg-amber-500 text-amber-950",
	completed: "bg-emerald-600 text-white",
	expired: "bg-destructive text-destructive-foreground",
	overdue: "bg-destructive text-destructive-foreground",
} as const;

const typeBadgeStyles = {
	Daily: "bg-teal-700/70 text-white",
	Weekly: "bg-violet-700/70 text-white",
	Event: "bg-amber-600/80 text-white",
	Custom: "bg-primary/70 text-primary-foreground",
} as const;

type ChecklistListProps = {
	items: ChecklistViewItem[];
	now: number;
	onComplete: (key: string) => void;
	onUndo: (key: string) => void;
	onEdit: (task: ChecklistTask) => void;
	onDelete: (task: ChecklistTask) => void;
};

export const ChecklistList = ({
	items,
	now,
	onComplete,
	onUndo,
	onEdit,
	onDelete,
}: ChecklistListProps) => (
	<ul aria-label="Checklist items" className="grid gap-2">
		{items.map(({ definition, occurrence, completionKey, status }) => {
			const canComplete = status !== "upcoming" && status !== "expired";
			const customTask = isChecklistTask(definition);
			const typeBadges: Array<keyof typeof typeBadgeStyles> = [];
			if (definition.kind === "event") typeBadges.push("Event");
			if (definition.recurrence === "weekly") typeBadges.push("Weekly");
			else if (definition.recurrence === "daily") typeBadges.push("Daily");
			else if (customTask && definition.kind !== "event")
				typeBadges.push("Custom");
			const countdownLabel =
				status === "completed"
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
			const countdown =
				status === "upcoming"
					? `in ${formatCountdown(occurrence.startAt - now)}`
					: countdownLabel.includes(" in ")
						? countdownLabel.slice(countdownLabel.indexOf(" in ") + 4)
						: countdownLabel;

			return (
				<li
					key={`${definition.id}-${occurrence.startAt}`}
					className={cn(
						"group relative flex min-h-14 w-full items-center justify-between overflow-hidden rounded-2xl border bg-card/85 p-2 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md",
						!customTask &&
							"bg-gradient-to-r from-primary/10 via-card/90 to-card",
						status === "ending-soon" &&
							"from-amber-500/15 hover:border-amber-500/40",
						status === "overdue" &&
							"from-destructive/10 hover:border-destructive/40",
						status === "completed" && "opacity-70",
						status === "expired" && "opacity-50",
					)}
				>
					<div className="flex min-w-0 flex-1 items-center">
						<Button
							aria-label={
								status === "completed"
									? `Mark ${definition.title} incomplete`
									: `Mark ${definition.title} complete`
							}
							aria-pressed={status === "completed"}
							className={cn(
								"mr-2 size-8 rounded-full border-0 bg-muted-foreground/35 p-1 text-foreground shadow-none hover:bg-muted-foreground/55",
								status === "completed" &&
									"bg-primary text-primary-foreground hover:bg-primary/90",
							)}
							disabled={!canComplete}
							size="icon-sm"
							variant="ghost"
							onClick={() =>
								status === "completed"
									? onUndo(completionKey)
									: onComplete(completionKey)
							}
						>
							{status === "completed" ? (
								<Undo2 className="size-5" />
							) : (
								<Check className="size-5" />
							)}
						</Button>
						<div className="mr-2 flex min-w-0 flex-1 items-center gap-1.5 leading-tight">
							{typeBadges.map((typeBadge) => (
								<span
									key={typeBadge}
									className={cn(
										"shrink-0 rounded px-2 py-1 text-[10px] font-semibold sm:text-xs",
										typeBadgeStyles[typeBadge],
									)}
								>
									{typeBadge}
								</span>
							))}
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
						</div>
						{customTask && (
							<div className="flex shrink-0 items-center gap-1 opacity-60 transition-opacity sm:opacity-0 sm:group-hover:opacity-75 sm:group-focus-within:opacity-100">
								<Button
									aria-label={`Edit ${definition.title}`}
									size="icon-xs"
									variant="ghost"
									onClick={() => onEdit(definition)}
								>
									<Pencil />
								</Button>
								<Button
									aria-label={`Delete ${definition.title}`}
									size="icon-xs"
									variant="ghost"
									onClick={() => onDelete(definition)}
								>
									<Trash2 />
								</Button>
							</div>
						)}
					</div>
					<span
						title={countdownLabel}
						className={cn(
							"z-10 ml-2 inline-flex shrink-0 items-center rounded px-2 py-1 text-xs font-semibold whitespace-nowrap tabular-nums",
							statusPillStyles[status],
						)}
					>
						<span className="sr-only">{countdownLabel}</span>
						<span aria-hidden="true" className="inline-flex items-center">
							{status === "overdue" || status === "expired" ? (
								<RotateCcw className="mr-1 size-4" />
							) : status === "completed" ? (
								<Check className="mr-1 size-4" />
							) : (
								<CalendarDays className="mr-1 size-4" />
							)}
							{countdown}
						</span>
					</span>
				</li>
			);
		})}
	</ul>
);
