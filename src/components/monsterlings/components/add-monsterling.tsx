import { useState } from "react";
import { MonsterlingForm } from "@/components/monsterlings/components/monsterling-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const AddMonsterlingDialog = () => {
	const [open, setOpen] = useState(false);

	return (
		// cannot click combobox inside dialog
		// https://github.com/shadcn-ui/ui/issues/1748#issuecomment-4016938373
		<>
			{open && (
				<div
					data-state={"open"}
					data-slot="dialog-overlay"
					className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
					data-aria-hidden={open}
					aria-hidden={open}
				/>
			)}
			<Dialog modal={false} open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="default" className="w-min">
						Add monsterling
					</Button>
				</DialogTrigger>

				<DialogContent
					className={cn(
						"overflow-y-scroll max-h-screen",
						"max-w-sm sm:min-w-min lg:min-w-218",
						"lg:min-w-max",
						// hasSelectedChar && "lg:min-w-max",
						"h-[calc(100dvh-50px)] lg:h-min",
					)}
					// onCloseAutoFocus={() => setCharToAdd(null)}
				>
					<DialogHeader>
						<DialogTitle>{"Add Monsterling"}</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<div className="">
						<MonsterlingForm onClose={() => setOpen(false)} />
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
