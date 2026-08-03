import { useEffect, useMemo, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { ChecklistDeleteDialog } from "@/components/checklist/components/checklist-delete-dialog";
import { ChecklistEmptyState } from "@/components/checklist/components/checklist-empty-state";
import { ChecklistList } from "@/components/checklist/components/checklist-list";
import { ChecklistPermanentNotesDialog } from "@/components/checklist/components/checklist-permanent-notes-dialog";
import { ChecklistSettingsDialog } from "@/components/checklist/components/checklist-settings-dialog";
import { ChecklistTaskDialog } from "@/components/checklist/components/checklist-task-dialog";
import { ChecklistToolbar } from "@/components/checklist/components/checklist-toolbar";
import { useChecklistNow } from "@/components/checklist/hooks/use-checklist-now";
import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import {
	type ChecklistTab,
	getChecklistView,
} from "@/components/checklist/utils/checklist-view";
import { PageTitle } from "@/components/shared/page-title";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChecklistDefinition } from "@/data/checklist/CHECKLIST_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";

export const ChecklistPage = () => {
	const ga = useGoogleAnalytics();
	const [tab, setTab] = useState<ChecklistTab>("all");
	const [taskDialogOpen, setTaskDialogOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<ChecklistTask>();
	const [taskToDelete, setTaskToDelete] = useState<ChecklistTask>();
	const [notesDefinition, setNotesDefinition] = useState<ChecklistDefinition>();
	const tasks = useAppStore((state) => state.checklistTasks);
	const completions = useAppStore((state) => state.checklistCompletions);
	const preferences = useAppStore((state) => state.checklistPreferences);
	const permanentNotes = useAppStore((state) => state.checklistPermanentNotes);
	const isHydrated = useAppStore((state) => state.isHydrated);
	const complete = useAppStore((state) => state.completeChecklist);
	const undo = useAppStore((state) => state.undoChecklist);
	const remove = useAppStore((state) => state.deleteChecklistTask);
	const now = useChecklistNow();
	const visible = useMemo(
		() =>
			now === null
				? []
				: getChecklistView({
						tasks,
						completions,
						preferences,
						permanentNotes,
						tab,
						now,
					}),
		[completions, now, permanentNotes, preferences, tab, tasks],
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
				<ChecklistToolbar
					preferences={preferences}
					tab={tab}
					onAdd={openAddTask}
					onSettings={() => setSettingsOpen(true)}
					onTabChange={setTab}
				/>
				{!isHydrated || now === null ? (
					<div className="grid gap-2">
						{[0, 1, 2].map((key) => (
							<Skeleton className="h-14 rounded-2xl" key={key} />
						))}
					</div>
				) : (
					<ChecklistList
						items={visible}
						showCompleted={preferences.showCompleted}
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
						onEditPermanentNote={setNotesDefinition}
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
					<ChecklistEmptyState tab={tab} onAdd={openAddTask} />
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
			<ChecklistPermanentNotesDialog
				definition={notesDefinition}
				onOpenChange={(open) => !open && setNotesDefinition(undefined)}
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
