import { Plus, RotateCcw } from "lucide-react";
import type { ChecklistTab } from "@/components/checklist/utils/checklist-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CHECKLIST_KINDS } from "@/data/CHECKLIST_DATA";

type ChecklistEmptyStateProps = { tab: ChecklistTab; onAdd: () => void };

export const ChecklistEmptyState = ({
	tab,
	onAdd,
}: ChecklistEmptyStateProps) => (
	<Card className="border-dashed">
		<CardContent className="flex flex-col items-center gap-3 py-12 text-center">
			<RotateCcw className="size-8 text-muted-foreground" />
			<div>
				<p className="font-medium">Nothing to show here</p>
				<p className="mt-1 text-sm text-muted-foreground">
					{tab === CHECKLIST_KINDS.EVENT
						? "No dated events are available yet."
						: "Adjust your settings or add a custom task."}
				</p>
			</div>
			{tab !== CHECKLIST_KINDS.EVENT && (
				<Button variant="outline" onClick={onAdd}>
					<Plus className="size-4" />
					Add item
				</Button>
			)}
		</CardContent>
	</Card>
);
