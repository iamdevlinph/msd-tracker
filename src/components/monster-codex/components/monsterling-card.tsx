import { Check, X } from "lucide-react";
import { useMonsterCodexFilterStore } from "@/components/monster-codex/store/monster-codex-filter-store";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import type { MonsterCodexEntry } from "@/data/MONSTERLINGS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export const MonsterlingCard = (props: MonsterCodexEntry) => {
	const { name, id, image } = props;

	const monsterCodexCompleted = useAppStore((s) => s.monsterCodexCompleted);
	const filterCodex = useMonsterCodexFilterStore((s) => s.filterCodex);
	const setMonsterCodexComplete = useAppStore((s) => s.setMonsterCodexComplete);
	const deleteMonsterCodexComplete = useAppStore(
		(s) => s.deleteMonsterCodexComplete,
	);

	const completed = monsterCodexCompleted.includes(id);

	// const { ref, inView } = useInView({
	// 	threshold: 0.1, // Triggers when 10% of the element is visible
	// 	triggerOnce: false, // Optional: Stop observing after it becomes visible
	// });

	return (
		<div
			className="w-36 h-44"
			// ref={ref}
		>
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
					<small>No. {id}</small>
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
