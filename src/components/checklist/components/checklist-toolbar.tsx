import { Plus, Settings } from "lucide-react";
import type { ChecklistPreferences } from "@/components/checklist/utils/checklist-persistence";
import type { ChecklistTab } from "@/components/checklist/utils/checklist-view";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CHECKLIST_KINDS } from "@/data/checklist/CHECKLIST_DATA";
import { cn } from "@/lib/utils";

const checklistCategories = [
	["all", "All"],
	[CHECKLIST_KINDS.EVENT, "Events"],
	[CHECKLIST_KINDS.PERMANENT, "Permanent"],
	[CHECKLIST_KINDS.CUSTOM, "Custom"],
] as const;

type ChecklistToolbarProps = {
	tab: ChecklistTab;
	preferences: ChecklistPreferences;
	onTabChange: (tab: ChecklistTab) => void;
	onSettings: () => void;
	onAdd: () => void;
};

export const ChecklistToolbar = ({
	tab,
	preferences,
	onTabChange,
	onSettings,
	onAdd,
}: ChecklistToolbarProps) => {
	const visibleCategories = checklistCategories.filter(
		([value]) => value === "all" || preferences.categories[value],
	);
	return (
		<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
				<div className="-mx-1 min-w-0 overflow-x-auto px-1 pb-1">
					<ButtonGroup className="flex flex-wrap">
						{visibleCategories.map(([value, label]) => {
							const isSelected = tab === value;
							return (
								<Button
									aria-pressed={isSelected}
									className={cn(isSelected && "border")}
									key={value}
									type="button"
									variant={isSelected ? "default" : "outline"}
									onClick={() => onTabChange(value)}
								>
									{label}
								</Button>
							);
						})}
					</ButtonGroup>
				</div>
				<Button
					aria-label="Add item"
					className="w-full shrink-0 sm:w-auto"
					onClick={onAdd}
				>
					<Plus className="size-4" />
					<span>Add item</span>
				</Button>
			</div>
			<div className="flex w-full shrink-0 sm:w-auto">
				<Button
					aria-label="Checklist settings"
					className="w-full sm:w-auto"
					variant="outline"
					onClick={onSettings}
				>
					<Settings className="size-4" />
					<span>Settings</span>
				</Button>
			</div>
		</div>
	);
};
