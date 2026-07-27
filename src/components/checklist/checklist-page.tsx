import { Plus, RotateCcw, Settings } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { ChecklistDeleteDialog } from "@/components/checklist/checklist-delete-dialog";
import { ChecklistList } from "@/components/checklist/checklist-list";
import { ChecklistSettingsDialog } from "@/components/checklist/checklist-settings-dialog";
import { ChecklistTaskDialog } from "@/components/checklist/checklist-task-dialog";
import { PageTitle } from "@/components/shared/page-title";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { ChecklistTask } from "@/lib/checklist-task";
import { type ChecklistTab, getChecklistView } from "@/lib/checklist-view";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

const checklistCategories = [
	["all", "All"],
	["event", "Events"],
	["permanent", "Permanent"],
	["custom", "Custom"],
] as const;

const useChecklistNow = () => {
	const [now, setNow] = useState<number | null>(null);
	useEffect(() => {
		let timer: number;
		const update = () => {
			const currentTime = Date.now();
			setNow(currentTime);
			timer = window.setTimeout(update, 60_000 - (currentTime % 60_000));
		};
		update();
		return () => window.clearTimeout(timer);
	}, []);
	return now;
};

export const ChecklistPage = () => {
	const ga = useGoogleAnalytics();
	const [tab, setTab] = useState<ChecklistTab>("all");
	const [taskDialogOpen, setTaskDialogOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<ChecklistTask>();
	const [taskToDelete, setTaskToDelete] = useState<ChecklistTask>();
	const tasks = useAppStore((state) => state.checklistTasks);
	const completions = useAppStore((state) => state.checklistCompletions);
	const preferences = useAppStore((state) => state.checklistPreferences);
	const isHydrated = useAppStore((state) => state.isHydrated);
	const complete = useAppStore((state) => state.completeChecklist);
	const undo = useAppStore((state) => state.undoChecklist);
	const remove = useAppStore((state) => state.deleteChecklistTask);
	const now = useChecklistNow();
	const visibleCategories = checklistCategories.filter(
		([value]) => value === "all" || preferences.categories[value],
	);
	const visible = useMemo(
		() =>
			now === null
				? []
				: getChecklistView({ tasks, completions, preferences, tab, now }),
		[completions, now, preferences, tab, tasks],
	);

	useEffect(() => {
		if (tab !== "all" && !preferences.categories[tab]) setTab("all");
	}, [preferences.categories, tab]);

	const openAddTask = () => {
		setEditingTask(undefined);
		setTaskDialogOpen(true);
	};

	const openEditTask = (task: ChecklistTask) => {
		setEditingTask(task);
		setTaskDialogOpen(true);
	};

	return (
		<div>
			<PageTitle
				title="Checklist"
				description="Stay on top of server resets, limited events, and your own recurring tasks."
			/>
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
					<div className="-mx-1 min-w-0 flex-1 overflow-x-auto px-1 pb-1">
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
										onClick={() => setTab(value)}
									>
										{label}
									</Button>
								);
							})}
						</ButtonGroup>
					</div>
					<div className="flex w-full shrink-0 gap-2 sm:w-auto">
						<Button
							aria-label="Checklist settings"
							className="flex-1 sm:flex-none"
							variant="outline"
							onClick={() => setSettingsOpen(true)}
						>
							<Settings className="size-4" />
							<span>Settings</span>
						</Button>
						<Button
							aria-label="Add item"
							className="flex-1 sm:flex-none"
							onClick={openAddTask}
						>
							<Plus className="size-4" />
							<span>Add item</span>
						</Button>
					</div>
				</div>
				{!isHydrated || now === null ? (
					<div className="grid gap-2">
						{[0, 1, 2].map((key) => (
							<Skeleton className="h-14 rounded-2xl" key={key} />
						))}
					</div>
				) : (
					<ChecklistList
						items={visible}
						now={now}
						onComplete={(key) => {
							complete(key);
							ga.event(ANALYTICS_EVENTS.CHECKLIST_COMPLETE);
						}}
						onFullComplete={(key) => {
							complete(key);
							ga.event(ANALYTICS_EVENTS.CHECKLIST_FULL_COMPLETE);
						}}
						onDelete={setTaskToDelete}
						onEdit={openEditTask}
						onUndo={(key) => {
							undo(key);
							ga.event(ANALYTICS_EVENTS.CHECKLIST_UNDO);
						}}
						onFullUndo={(key) => {
							undo(key);
							ga.event(ANALYTICS_EVENTS.CHECKLIST_FULL_UNDO);
						}}
					/>
				)}
				{isHydrated && now !== null && visible.length === 0 && (
					<Card className="border-dashed">
						<CardContent className="flex flex-col items-center gap-3 py-12 text-center">
							<RotateCcw className="size-8 text-muted-foreground" />
							<div>
								<p className="font-medium">Nothing to show here</p>
								<p className="mt-1 text-sm text-muted-foreground">
									{tab === "event"
										? "No dated events are available yet."
										: "Adjust your settings or add a custom task."}
								</p>
							</div>
							{tab !== "event" && (
								<Button variant="outline" onClick={openAddTask}>
									<Plus className="size-4" />
									Add item
								</Button>
							)}
						</CardContent>
					</Card>
				)}
			</div>
			{taskDialogOpen && (
				<ChecklistTaskDialog
					open={taskDialogOpen}
					onOpenChange={setTaskDialogOpen}
					task={editingTask}
				/>
			)}
			<ChecklistSettingsDialog
				open={settingsOpen}
				onOpenChange={setSettingsOpen}
			/>
			<ChecklistDeleteDialog
				task={taskToDelete}
				onOpenChange={(open) => !open && setTaskToDelete(undefined)}
				onDelete={(task) => {
					remove(task.id);
					ga.event(ANALYTICS_EVENTS.CHECKLIST_DELETE);
					setTaskToDelete(undefined);
				}}
			/>
		</div>
	);
};
