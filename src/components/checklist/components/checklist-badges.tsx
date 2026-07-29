import { SiDiscord } from "@icons-pack/react-simple-icons";
import { readableColor } from "common-utils-pkg";
import { isChecklistTask } from "@/components/checklist/utils/checklist";
import type { ChecklistDefinition } from "@/data/CHECKLIST_DATA";
import { cn } from "@/lib/utils";

const SEASONAL_BADGE_COLOR = "#16a34a";
const typeBadgeStyles = {
	Daily: "bg-teal-700/70 text-white",
	Weekly: "bg-violet-700/70 text-white",
	Event: "bg-fuchsia-700/80 text-white",
	Custom: "bg-primary/70 text-primary-foreground",
} as const;

type ChecklistBadgesProps = { definition: ChecklistDefinition };

export const ChecklistBadges = ({ definition }: ChecklistBadgesProps) => {
	const customTask = isChecklistTask(definition);
	const badges: Array<keyof typeof typeBadgeStyles> = [];
	if (definition.kind === "event") badges.push("Event");
	if (definition.recurrence === "weekly") badges.push("Weekly");
	else if (definition.recurrence === "daily") badges.push("Daily");
	else if (customTask && definition.kind !== "event") badges.push("Custom");
	return (
		<>
			{badges.map((badge) => (
				<span
					key={badge}
					className={cn(
						"shrink-0 rounded px-2 py-1 text-[10px] font-semibold sm:text-xs",
						typeBadgeStyles[badge],
					)}
				>
					{badge}
				</span>
			))}
			{definition.participation === "discord" && (
				<span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#5865F2] px-2 py-1 text-[10px] font-semibold text-white sm:text-xs">
					<SiDiscord aria-hidden="true" className="size-3" color="white" />
					Discord
				</span>
			)}
			{definition.seasonal && (
				<span
					className="inline-flex shrink-0 items-center rounded px-2 py-1 text-[10px] font-semibold sm:text-xs"
					style={{
						backgroundColor: SEASONAL_BADGE_COLOR,
						color: readableColor(SEASONAL_BADGE_COLOR),
					}}
				>
					Seasonal
				</span>
			)}
		</>
	);
};
