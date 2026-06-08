import { Check, X } from "lucide-react";
import type { MonsterCodexEntry } from "@/components/monster-codex/store/monster-codex-constants";
import { useMonsterCodexStore } from "@/components/monster-codex/store/monster-codex-store";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useStore } from "@/stores/app-store";

export const MonsterlingCard = (props: MonsterCodexEntry) => {
	const { name, id, image } = props;

	const monsterCodexCompleted = useStore((s) => s.monsterCodexCompleted);
	const filterCodex = useMonsterCodexStore((s) => s.filterCodex);
	const setMonsterCodexComplete = useStore((s) => s.setMonsterCodexComplete);
	const deleteMonsterCodexComplete = useStore(
		(s) => s.deleteMonsterCodexComplete,
	);

	const completed = monsterCodexCompleted.includes(id);

	return (
		<div className="w-36 h-44">
			<Card
				className={cn(
					"inline-block relative",
					completed ? "bg-background" : "bg-secondary",
					"py-2",
				)}
			>
				<Button
					variant={completed ? "secondary" : "default"}
					size="icon-sm"
					className={cn(
						"rounded-full cursor-pointer z-10",
						"absolute -top-5 -right-5 m-2",
					)}
					onClick={() => {
						completed
							? deleteMonsterCodexComplete(id)
							: setMonsterCodexComplete(id);

						filterCodex();
					}}
				>
					{completed ? <X /> : <Check />}
				</Button>
				<CardHeader>
					<small>No. {id}</small>
				</CardHeader>
				<CardContent>
					<img
						src={image}
						alt={`${name} monsterling`}
						width="100"
						height="100"
						className={cn(completed && "grayscale-100", "mx-auto")}
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

			<small className={cn(completed && "line-through")}>{name}</small>
		</div>
	);
};
