import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
	type TaskForm,
	taskDefaults,
	taskFormToChecklistTask,
	taskSchema,
} from "@/components/checklist/checklist-task-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";

type ChecklistTaskDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	task?: ChecklistTask;
};

import type { ChecklistTask } from "@/lib/checklist-task";

export const ChecklistTaskDialog = ({
	open,
	onOpenChange,
	task,
}: ChecklistTaskDialogProps) => {
	const ga = useGoogleAnalytics();
	const recordTask = useAppStore((state) => state.recordChecklistTask);
	const updateTask = useAppStore((state) => state.updateChecklistTask);
	const form = useForm<TaskForm>({
		resolver: zodResolver(taskSchema),
		defaultValues: taskDefaults(task),
		mode: "onSubmit",
	});
	const recurrence = useWatch({ control: form.control, name: "recurrence" });

	const submit = (values: TaskForm) => {
		const checklistTask = taskFormToChecklistTask(values);

		if (task) {
			updateTask(task.id, checklistTask);
			ga.event(ANALYTICS_EVENTS.CHECKLIST_UPDATE);
		} else {
			recordTask(checklistTask);
			ga.event(ANALYTICS_EVENTS.CHECKLIST_CREATE);
		}
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>{task ? "Edit task" : "Add item"}</DialogTitle>
					<DialogDescription>
						Dates follow the daily reset at 08:00 GMT+8 and stay consistent
						across devices.
					</DialogDescription>
				</DialogHeader>
				<form
					id="checklist-task-form"
					className="grid gap-4"
					onSubmit={form.handleSubmit(submit)}
				>
					<div className="grid gap-2">
						<Label htmlFor="checklist-task-name">Task name</Label>
						<Input
							id="checklist-task-name"
							autoFocus
							aria-describedby={
								form.formState.errors.title
									? "checklist-task-name-error"
									: undefined
							}
							aria-invalid={Boolean(form.formState.errors.title)}
							{...form.register("title")}
						/>
						{form.formState.errors.title && (
							<p
								id="checklist-task-name-error"
								className="text-sm text-destructive"
							>
								{form.formState.errors.title.message}
							</p>
						)}
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="grid gap-2">
							<Label htmlFor="checklist-task-start">Start</Label>
							<Input
								id="checklist-task-start"
								type="date"
								aria-describedby={
									form.formState.errors.startAt
										? "checklist-task-start-error"
										: undefined
								}
								aria-invalid={Boolean(form.formState.errors.startAt)}
								{...form.register("startAt")}
							/>
							{form.formState.errors.startAt && (
								<p
									id="checklist-task-start-error"
									className="text-sm text-destructive"
								>
									{form.formState.errors.startAt.message}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="checklist-task-due">End (optional)</Label>
							<Input
								id="checklist-task-due"
								type="date"
								aria-describedby={
									form.formState.errors.dueAt
										? "checklist-task-due-error"
										: undefined
								}
								aria-invalid={Boolean(form.formState.errors.dueAt)}
								{...form.register("dueAt")}
							/>
							{form.formState.errors.dueAt && (
								<p
									id="checklist-task-due-error"
									className="text-sm text-destructive"
								>
									{form.formState.errors.dueAt.message}
								</p>
							)}
						</div>
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="grid gap-2">
							<Label htmlFor="checklist-task-recurrence">Recurrence</Label>
							<select
								id="checklist-task-recurrence"
								className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
								{...form.register("recurrence")}
							>
								<option value="none">Does not repeat</option>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="interval_days">Every N days</option>
							</select>
						</div>
						{recurrence === "interval_days" && (
							<div className="grid gap-2">
								<Label htmlFor="checklist-task-interval">Every</Label>
								<div className="flex items-center gap-2">
									<Input
										id="checklist-task-interval"
										type="number"
										min={1}
										inputMode="numeric"
										aria-describedby={
											form.formState.errors.intervalDays
												? "checklist-task-interval-error"
												: undefined
										}
										aria-invalid={Boolean(form.formState.errors.intervalDays)}
										{...form.register("intervalDays")}
									/>
									<span className="text-sm text-muted-foreground">days</span>
								</div>
								{form.formState.errors.intervalDays && (
									<p
										id="checklist-task-interval-error"
										className="text-sm text-destructive"
									>
										{form.formState.errors.intervalDays.message}
									</p>
								)}
							</div>
						)}
					</div>
					{recurrence !== "none" && (
						<div className="grid gap-2">
							<Label htmlFor="checklist-task-mode">Recurrence mode</Label>
							<select
								id="checklist-task-mode"
								className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
								{...form.register("mode")}
							>
								<option value="fixed">Original date (fixed schedule)</option>
								<option value="after_completion">
									After completion (rolling)
								</option>
							</select>
							<p className="text-xs text-muted-foreground">
								Fixed schedules keep their original cadence. Rolling schedules
								start the next interval when you complete the task.
							</p>
						</div>
					)}
					<div className="grid gap-2">
						<Label htmlFor="checklist-task-notes">Notes (optional)</Label>
						<Textarea
							id="checklist-task-notes"
							rows={3}
							{...form.register("notes")}
						/>
					</div>
				</form>
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button type="submit" form="checklist-task-form">
						{task ? "Save changes" : "Add item"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
