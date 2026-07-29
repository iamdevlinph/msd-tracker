import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/stores/app-store";
import type { ChecklistPreferences } from "@/stores/checklist-slice";

type ChecklistSettingsDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const categoryLabels = {
	event: "Events",
	permanent: "Permanent",
	custom: "Custom",
} as const;

const visibilityOptions = [
	["showUpcoming", "Upcoming"],
	["showCompleted", "Completed"],
	["showExpired", "Expired"],
] as const;

export const ChecklistSettingsDialog = ({
	open,
	onOpenChange,
}: ChecklistSettingsDialogProps) => {
	const preferences = useAppStore((state) => state.checklistPreferences);
	const setPreferences = useAppStore((state) => state.setChecklistPreferences);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Checklist settings</DialogTitle>
					<DialogDescription>
						Choose which activities appear and when an event becomes urgent.
					</DialogDescription>
				</DialogHeader>
				<fieldset className="grid gap-3">
					<legend className="mb-1 text-sm font-medium">Categories</legend>
					{Object.entries(categoryLabels).map(([category, label]) => (
						<div className="flex items-center gap-3" key={category}>
							<Checkbox
								id={`checklist-category-${category}`}
								checked={
									preferences.categories[
										category as keyof typeof categoryLabels
									]
								}
								onCheckedChange={(checked) =>
									setPreferences({
										categories: {
											...preferences.categories,
											[category]: checked === true,
										},
									})
								}
							/>
							<Label htmlFor={`checklist-category-${category}`}>{label}</Label>
						</div>
					))}
				</fieldset>
				<fieldset className="grid gap-3 border-t pt-4">
					<legend className="mb-1 text-sm font-medium">Statuses</legend>
					{visibilityOptions.map(([key, label]) => (
						<div className="flex items-center gap-3" key={key}>
							<Checkbox
								id={`checklist-${key}`}
								checked={preferences[key]}
								onCheckedChange={(checked) =>
									setPreferences({
										[key]: checked === true,
									} as Partial<ChecklistPreferences>)
								}
							/>
							<Label htmlFor={`checklist-${key}`}>Show {label}</Label>
						</div>
					))}
				</fieldset>
				<div className="grid gap-2 border-t pt-4">
					<Label htmlFor="checklist-ending-soon">Ending soon threshold</Label>
					<select
						id="checklist-ending-soon"
						className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
						value={preferences.endingSoonHours}
						onChange={(event) =>
							setPreferences({
								endingSoonHours: Number(
									event.target.value,
								) as ChecklistPreferences["endingSoonHours"],
							})
						}
					>
						{[5, 12, 24, 48, 72].map((hours) => (
							<option value={hours} key={hours}>
								{hours} hours
							</option>
						))}
					</select>
				</div>
				<DialogFooter>
					<Button onClick={() => onOpenChange(false)}>Done</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
