import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MonsterCodexEntry } from "@/data/MONSTERLINGS_DATA";

type LoadoutEditorMonsterlingSelectorProps = {
	info: MonsterCodexEntry | null;
	id: string | null;
	monsterIndex: number | "legendary";
	onOpen: () => void;
	onClear: () => void;
};

export const LoadoutEditorMonsterlingSelector = ({
	info,
	id,
	monsterIndex,
	onOpen,
	onClear,
}: LoadoutEditorMonsterlingSelectorProps) => {
	const legendary = monsterIndex === "legendary";
	return (
		<div
			className={`relative aspect-square min-w-0 ${legendary ? "border-l-2 border-l-primary pl-2" : ""}`}
		>
			<button
				type="button"
				onClick={onOpen}
				className="grid size-full place-items-center overflow-hidden rounded-md border border-dashed p-1 text-center text-[10px] text-muted-foreground hover:bg-accent"
			>
				{info ? (
					<>
						<img
							src={info.image}
							alt=""
							className="min-h-0 max-h-[70%] object-contain"
						/>
						<span className="w-full truncate">{info.name}</span>
					</>
				) : legendary ? (
					"Legendary"
				) : (
					`Monsterling ${Number(monsterIndex) + 1}`
				)}
			</button>
			{id && (
				<Button
					type="button"
					size="icon-sm"
					variant="destructive"
					className="absolute -right-1 -top-1 size-6"
					aria-label="Clear monsterling"
					onClick={onClear}
				>
					<Trash2Icon />
				</Button>
			)}
		</div>
	);
};
