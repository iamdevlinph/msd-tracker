import { Check, X } from "lucide-react";
import type { MonsterCodexEntry } from "@/components/monster-codex/store/monster-codex-constants";
import { useMonsterCodexStore } from "@/components/monster-codex/store/monster-codex-store";
import { Button } from "@/components/ui/button";
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
		<div className="text-center inline-block relative p-5">
			<Button
				variant={completed ? "secondary" : "default"}
				size="icon-sm"
				className={cn(
					"rounded-full cursor-pointer z-10",
					"absolute top-0 right-0 m-2",
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
			<img
				src={image}
				alt={`${name} monsterling`}
				width="100"
				height="100"
				className={cn(completed && "grayscale-100")}
			/>
			<small className="">{name}</small>
		</div>
	);
};
