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

const getCompletedCountdown = (
	item: ChecklistViewItem,
	now: number,
): { label: string; text: string } | undefined => {
	const { definition, occurrence } = item;
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

export const ChecklistList = ({
	items,
	now,
	onComplete,
	onUndo,
	onEdit,
	onDelete,
}: ChecklistListProps) => (
	<ul aria-label="Checklist items" className="grid gap-2">
		{items.map((item) => {
			const { definition, occurrence, completionKey, status } = item;
			const canComplete = status !== "upcoming" && status !== "expired";
			const customTask = isChecklistTask(definition);
			const completedCountdown =
				status === "completed" ? getCompletedCountdown(item, now) : undefined;
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
				status === "completed"
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
					<div className="flex w-full min-w-0 flex-1 items-center sm:w-auto">
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
								{customTask && definition.notes && (
									<p className="mt-0.5 line-clamp-2 break-words whitespace-pre-line text-xs font-normal text-muted-foreground">
										{definition.notes}
									</p>
								)}
							</div>
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
					<div className="z-10 mt-2 flex shrink-0 self-end items-center gap-1 sm:mt-0 sm:ml-2 sm:self-auto">
						{completedCountdown && (
							<span
								title={completedCountdown.label}
								className="inline-flex items-center rounded bg-muted px-2 py-1 text-xs font-semibold whitespace-nowrap text-muted-foreground tabular-nums"
							>
								<span className="sr-only">{completedCountdown.label}</span>
								<span aria-hidden="true" className="inline-flex items-center">
									<CalendarDays className="mr-1 size-4" />
									{completedCountdown.text}
								</span>
							</span>
						)}
						<span
							title={countdownLabel}
							className={cn(
								"inline-flex items-center rounded px-2 py-1 text-xs font-semibold whitespace-nowrap tabular-nums",
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
					</div>
				</li>
			);
		})}
	</ul>
);
