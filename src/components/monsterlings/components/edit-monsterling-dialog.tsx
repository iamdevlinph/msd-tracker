import { Trash2Icon } from "lucide-react";
import { DialogBackdrop } from "@/components/dialog-backdrop";
import { MonsterlingForm } from "@/components/monsterlings/components/monsterling-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

type EditMonsterlingDialogProps = {
	monsterlingToEdit: string | null;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onClose?: () => void;
};

export const EditMonsterlingDialog = (props: EditMonsterlingDialogProps) => {
	const deleteMonsterlingOwned = useAppStore((s) => s.deleteMonsterlingOwned);

	const { monsterlingToEdit, open, setOpen, onClose } = props;

	if (monsterlingToEdit === null) return;

	return (
		<>
			{open && <DialogBackdrop />}
			<Dialog modal={false} open={open} onOpenChange={setOpen}>
				<DialogContent
					className={cn(
						"overflow-y-auto max-h-screen",
						"max-w-sm sm:min-w-min lg:min-w-218",
						"lg:min-w-max",
						"h-[calc(100dvh-50px)] lg:h-min",
					)}
					onCloseAutoFocus={() => onClose?.()}
				>
					<DialogHeader>
						<div className="flex items-center justify-between">
							<DialogTitle>Edit Monsterling</DialogTitle>
							<Button
								className=""
								variant={"destructive"}
								size={"icon-sm"}
								onClick={() => {
									deleteMonsterlingOwned(monsterlingToEdit);
									setOpen(false);
								}}
							>
								<Trash2Icon />
							</Button>
						</div>
						<DialogDescription>
							Update this monsterling or remove it from your collection.
						</DialogDescription>
					</DialogHeader>
					<div className="">
						<MonsterlingForm
							id={monsterlingToEdit}
							onClose={() => setOpen(false)}
							submitText="Update"
						/>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
