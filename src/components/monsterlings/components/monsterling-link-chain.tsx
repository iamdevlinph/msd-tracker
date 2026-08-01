import { getLinkChainLevelOrOne } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { cn } from "@/lib/utils";

export function MonsterlingLinkChainBadge({
	level,
	className,
}: {
	level: unknown;
	className?: string;
}) {
	const linkChainLevelToDisplay = getLinkChainLevelOrOne(level);
	return (
		<img
			src={`/images/MonsterLinkChain/link-${linkChainLevelToDisplay}.webp`}
			width={25}
			alt={`Link Chain Level ${linkChainLevelToDisplay}`}
			title={`Link Chain Level ${linkChainLevelToDisplay}`}
			className={cn(
				"absolute left-0.5 top-1 z-2 h-auto drop-shadow-2xl",
				className,
			)}
			style={{ filter: "drop-shadow(0px 0px 3px rgb(0, 0, 0))" }}
		/>
	);
}
