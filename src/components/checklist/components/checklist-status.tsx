import { CalendarDays, Check, CheckCheck, RotateCcw } from "lucide-react";
import {
	CHECKLIST_STATUSES,
	type ChecklistStatus,
} from "@/components/checklist/utils/checklist";
import { cn } from "@/lib/utils";

const statusPillStyles = {
	[CHECKLIST_STATUSES.UPCOMING]: "bg-sky-600 text-white",
	[CHECKLIST_STATUSES.ACTIVE]: "bg-muted-foreground text-background",
	[CHECKLIST_STATUSES.ENDING_SOON]: "bg-amber-500 text-amber-950",
	[CHECKLIST_STATUSES.COMPLETED]: "bg-emerald-600 text-white",
	[CHECKLIST_STATUSES.EXPIRED]: "bg-destructive text-destructive-foreground",
	[CHECKLIST_STATUSES.OVERDUE]: "bg-destructive text-destructive-foreground",
} as const;

type ChecklistStatusProps = {
	status: ChecklistStatus;
	countdownLabel: string;
	countdown: string;
	completedCountdown?: { label: string; text: string };
	fullyCompleted: boolean;
};

export const ChecklistStatusDisplay = ({
	status,
	countdownLabel,
	countdown,
	completedCountdown,
	fullyCompleted,
}: ChecklistStatusProps) => (
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
				{status === CHECKLIST_STATUSES.OVERDUE ||
				status === CHECKLIST_STATUSES.EXPIRED ? (
					<RotateCcw className="mr-1 size-4" />
				) : fullyCompleted ? (
					<CheckCheck className="mr-1 size-4" />
				) : status === CHECKLIST_STATUSES.COMPLETED ? (
					<Check className="mr-1 size-4" />
				) : (
					<CalendarDays className="mr-1 size-4" />
				)}
				{countdown}
			</span>
		</span>
	</div>
);
