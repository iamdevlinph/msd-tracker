import { CalendarDays, Check, CheckCheck, RotateCcw } from "lucide-react";
import type { ChecklistStatus } from "@/components/checklist/utils/checklist";
import { cn } from "@/lib/utils";

const statusPillStyles = {
	upcoming: "bg-sky-600 text-white",
	active: "bg-muted-foreground text-background",
	"ending-soon": "bg-amber-500 text-amber-950",
	completed: "bg-emerald-600 text-white",
	expired: "bg-destructive text-destructive-foreground",
	overdue: "bg-destructive text-destructive-foreground",
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
				{status === "overdue" || status === "expired" ? (
					<RotateCcw className="mr-1 size-4" />
				) : fullyCompleted ? (
					<CheckCheck className="mr-1 size-4" />
				) : status === "completed" ? (
					<Check className="mr-1 size-4" />
				) : (
					<CalendarDays className="mr-1 size-4" />
				)}
				{countdown}
			</span>
		</span>
	</div>
);
