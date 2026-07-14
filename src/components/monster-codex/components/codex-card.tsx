import { Check, Heart, X } from "lucide-react";
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
	const monsterCodexFavorites = useAppStore((s) => s.monsterCodexFavorites);
	const setMonsterCodexComplete = useAppStore((s) => s.setMonsterCodexComplete);
	const deleteMonsterCodexComplete = useAppStore(
		(s) => s.deleteMonsterCodexComplete,
	);
	const toggleMonsterCodexFavorite = useAppStore(
		(s) => s.toggleMonsterCodexFavorite,
	);

	const completed = monsterCodexCompleted.includes(id);
	const favorite = monsterCodexFavorites.includes(id);

	return (
		<div className="w-36 h-44">
			<Card
				className={cn(
					"inline-block relative",
					completed ? "bg-secondary" : "bg-background",
					"py-2",
				)}
			>
				<div className="absolute -top-3 -right-3 z-2 flex gap-1">
					<Button
						variant="secondary"
						size="icon-sm"
						className={cn(
							"rounded-full cursor-pointer shadow-sm",
							!favorite && "bg-chart-5 text-black hover:bg-chart-5/80",
							favorite &&
								"bg-rose-100 text-rose-600 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-400 dark:hover:bg-rose-900",
						)}
						onClick={() => toggleMonsterCodexFavorite(id)}
						aria-label={
							favorite
								? `Remove ${name} from favorites`
								: `Add ${name} to favorites`
						}
						aria-pressed={favorite}
						title={favorite ? "Remove from favorites" : "Add to favorites"}
					>
						<Heart className={cn(favorite && "fill-current")} />
					</Button>
					<Button
						variant={completed ? "default" : "secondary"}
						size="icon-sm"
						className="rounded-full cursor-pointer shadow-sm"
						onClick={() => {
							completed
								? deleteMonsterCodexComplete(id)
								: setMonsterCodexComplete(id);
						}}
						aria-label={
							completed ? `Mark ${name} incomplete` : `Mark ${name} completed`
						}
						aria-pressed={completed}
						title={completed ? "Mark incomplete" : "Mark completed"}
					>
						{completed ? <Check /> : <X />}
					</Button>
				</div>
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
