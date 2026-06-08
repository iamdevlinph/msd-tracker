import { Check, X } from "lucide-react";
import type { MonsterCodeEntry } from "@/components/monster-codex/store/monster-codex-constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/stores/app-store";

type MonsterlingCardProps = Pick<MonsterCodeEntry, "id" | "name">;

export const MonsterlingCard = (props: MonsterlingCardProps) => {
	const { name, id } = props;

	const monsterCodexCompleted = useStore((s) => s.monsterCodexCompleted);
	const setMonsterCodexComplete = useStore((s) => s.setMonsterCodexComplete);
	const deleteMonsterCodexComplete = useStore(
		(s) => s.deleteMonsterCodexComplete,
	);

	const completed = monsterCodexCompleted.includes(id);

	return (
		<div className="text-center inline-block relative p-5">
			<Button
				variant={completed ? "secondary" : "default"}
				size="icon-sm"
				className={cn(
					"rounded-full cursor-pointer z-10",
					"absolute top-0 right-0 m-2",
				)}
				onClick={() =>
					completed
						? deleteMonsterCodexComplete(id)
						: setMonsterCodexComplete(id)
				}
			>
				{completed ? <X /> : <Check />}
			</Button>
			<img
				src="https://img.game8.co/4468847/04d43411fbb7e641eab09b14e67fa200.png/show"
				alt="monsterling"
				width="70"
				height="70"
				className={cn(completed && "grayscale-100")}
			/>
			<small>{name}</small>
		</div>
	);
};
