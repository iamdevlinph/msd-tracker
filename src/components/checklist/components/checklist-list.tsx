import { ChecklistItemRow } from "@/components/checklist/components/checklist-item-row";
import type { ChecklistTask } from "@/components/checklist/utils/checklist-task";
import type { ChecklistViewItem } from "@/components/checklist/utils/checklist-view";
import type { ChecklistDefinition } from "@/data/checklist/CHECKLIST_DATA";

type ChecklistListProps = {
	items: ChecklistViewItem[];
	now: number;
	onComplete: (key: string) => void;
	onUndo: (key: string) => void;
	onFullComplete: (key: string) => void;
	onFullUndo: (key: string) => void;
	onEdit: (task: ChecklistTask) => void;
	onDelete: (task: ChecklistTask) => void;
	onEditPermanentNote: (definition: ChecklistDefinition) => void;
};

export const ChecklistList = ({ items, ...props }: ChecklistListProps) => (
	<ul aria-label="Checklist items" className="grid gap-2">
		{items.map((item) => (
			<ChecklistItemRow
				key={`${item.definition.id}-${item.occurrence.startAt}`}
				item={item}
				{...props}
			/>
		))}
	</ul>
);
