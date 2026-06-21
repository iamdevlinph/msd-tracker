import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type LoadoutsDialogProps = {
	onClose?: () => void;
};

export const LoadoutsDialog = ({ onClose }: LoadoutsDialogProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent onCloseAutoFocus={() => onClose?.()}>
				<DialogHeader>
					<DialogTitle>Team Loadout</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
