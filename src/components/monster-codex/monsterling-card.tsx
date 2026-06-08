import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MonsterlingCardProps = {
	completed?: boolean;
};

export const MonsterlingCard = (props: MonsterlingCardProps) => {
	const { completed = false } = props;

	return (
		<div className="text-center inline-block relative p-5">
			<Button
				variant={completed ? "secondary" : "default"}
				size="icon-sm"
				className={cn(
					"rounded-full cursor-pointer z-10",
					"absolute top-0 right-0 m-2",
				)}
			>
				<Check />
			</Button>
			<img
				src="https://img.game8.co/4468847/04d43411fbb7e641eab09b14e67fa200.png/show"
				alt="monsterling"
				width="70"
				height="70"
				className={cn(completed && "grayscale-100")}
			/>
			<small>Cappy</small>
		</div>
	);
};
