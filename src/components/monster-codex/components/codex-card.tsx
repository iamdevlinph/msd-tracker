import { Check, X } from "lucide-react";
import { useCodexStore } from "@/components/monster-codex/store/codex-store";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export const CodexCard = ({ monsterling_id }: { monsterling_id: number }) => {
	const { name, image, id, display_id } = MONSTERLINGS_DATA[monsterling_id];

	const monsterCodexCompleted = useAppStore((s) => s.monsterCodexCompleted);
	const filterCodex = useCodexStore((s) => s.filterCodex);
	const setMonsterCodexComplete = useAppStore((s) => s.setMonsterCodexComplete);
	const deleteMonsterCodexComplete = useAppStore(
		(s) => s.deleteMonsterCodexComplete,
	);

	const completed = monsterCodexCompleted.includes(id);

	return (
		<div className="w-36 h-44">
			<Card
				className={cn(
					"inline-block relative",
					completed ? "bg-secondary" : "bg-background",
					"py-2",
				)}
			>
				<Button
					variant={completed ? "default" : "secondary"}
					size="icon-sm"
					className={cn(
						"rounded-full cursor-pointer z-2",
						"absolute -top-5 -right-5 m-2",
					)}
					onClick={() => {
						completed
							? deleteMonsterCodexComplete(id)
							: setMonsterCodexComplete(id);

						filterCodex();
					}}
				>
					{completed ? <Check /> : <X />}
				</Button>
				<CardHeader>
					<small>No. {display_id ?? id}</small>
				</CardHeader>
				<CardContent>
					<img
						src={image}
						alt={`${name} monsterling`}
						width="100"
						height="100"
						className={cn(
							"mx-auto drop-shadow-lg grayscale-100",
							completed && "grayscale-0",
						)}
						loading="lazy"
					/>
				</CardContent>
				<CardFooter className="justify-center">
					<h6
						className={cn(
							"invisible text-chart-4 font-bold",
							completed && "visible",
						)}
					>
						Completed
					</h6>
				</CardFooter>
			</Card>

			<small
				className={cn(completed && "", "flex justify-center mt-2 text-center")}
			>
				{name}
			</small>
		</div>
	);
};
