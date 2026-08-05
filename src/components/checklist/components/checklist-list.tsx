import { Fragment } from "react";
import { ChecklistItemRow } from "@/components/checklist/components/checklist-item-row";
import { isChecklistCompletedSectionStatus } from "@/components/checklist/utils/checklist";
import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import type { ChecklistViewItem } from "@/components/checklist/utils/checklist-view";
import { SeparatorText } from "@/components/shared/separator-text";
import type { ChecklistDefinition } from "@/data/checklist/CHECKLIST_DATA";

type ChecklistListProps = {
	items: ChecklistViewItem[];
	showCompleted: boolean;
	now: number;
	onComplete: (key: string) => void;
	onUndo: (key: string) => void;
	onFullComplete: (key: string) => void;
	onFullUndo: (key: string) => void;
	onEdit: (task: ChecklistTask) => void;
	onDelete: (task: ChecklistTask) => void;
	onEditPermanentNote: (definition: ChecklistDefinition) => void;
};

export const ChecklistList = ({
	items,
	showCompleted,
	...props
}: ChecklistListProps) => {
	const completedIndex = items.findIndex((item) =>
		isChecklistCompletedSectionStatus(item.status),
	);
	const showDivider =
		showCompleted && completedIndex > 0 && completedIndex < items.length;
	return (
		<ul aria-label="Checklist items" className="grid gap-2">
			{items.map((item, index) => (
				<Fragment key={`${item.definition.id}-${item.occurrence.startAt}`}>
					{showDivider && index === completedIndex && (
						<li data-testid="checklist-completed-divider">
							<SeparatorText>Completed</SeparatorText>
						</li>
					)}
					<ChecklistItemRow item={item} {...props} />
				</Fragment>
			))}
		</ul>
	);
};
