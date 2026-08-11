import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

type AddLoadoutDialogProps = { className?: string };

export const AddLoadoutDialog = ({ className }: AddLoadoutDialogProps) => {
	const [open, setOpen] = useState(false);
	const ga = useGoogleAnalytics();

	return (
		<>
			<Button
				type="button"
				className={className ?? "w-min"}
				onClick={() => {
					ga.event(ANALYTICS_EVENTS.LOADOUT_EDITOR_OPEN, { mode: "create" });
					setOpen(true);
				}}
			>
				<PlusIcon />
				Add Loadout
			</Button>

			<LoadoutsDialog open={open} setOpen={setOpen} />
		</>
	);
};
