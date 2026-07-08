import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import { Button } from "@/components/ui/button";

export const AddLoadoutDialog = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				type="button"
				className="w-min"
				onClick={() => {
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
