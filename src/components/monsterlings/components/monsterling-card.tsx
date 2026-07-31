import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import { MonsterlingLinkChainBadge } from "@/components/monsterlings/components/monsterling-link-chain";
import type { LinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { STAT_DATA } from "@/data/stats/STAT_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";
import { cn } from "@/lib/utils";

export type MonsterlingCardProps = MonsterlingOwned & {
	className?: string;
	compactStats?: boolean;
	linkChainLevel: LinkChainLevel;
};

export const MonsterlingCard = ({
	monsterling_id,
	tier_id,
	linkChainLevel,
	traits,
	className = "",
	compactStats = false,
}: MonsterlingCardProps) => {
	const { name, image, linkChain } = MONSTERLINGS_DATA[monsterling_id];
	const width = compactStats ? 162 : MONSTERLING_CARD_WIDTH;

	return (
		<div
			className={cn(
				"grid overflow-hidden bg-card gap-y-0 gap-x-2 rounded-lg",
				"monsterling-card",
				className,
			)}
			style={{
				width,
				minWidth: width,
				maxWidth: width,
				gridTemplateAreas: "'portrait stats'",
				gridTemplateColumns: compactStats
					? "120px 48px"
					: "120px minmax(0, 1fr)",
			}}
		>
			<div className="relative w-max" style={{ gridArea: "portrait" }}>
				{linkChain?.name && (
					<MonsterlingLinkChainBadge level={linkChainLevel} />
				)}
				<small className="absolute bottom-2 z-10 w-full text-center text-[10px] text-shadow-sm/80 stroke-black">
					{name}
				</small>
				<TierPortrait
					tier={tier_id}
					portraitImg={image}
					portraitSize={120}
					name={name}
					hideTierBg={!compactStats}
				/>
			</div>

			<div
				className={cn(
					"flex min-w-0 flex-col",
					compactStats && "overflow-hidden",
				)}
				style={{ gridArea: "stats" }}
				id="traits"
			>
				{traits.map(({ stat_id, tier_id }, idx) => {
					if (!stat_id) return null;

					const key = `${stat_id}-${idx}`;
					const statInfo = STAT_DATA[stat_id];
					const tierInfo = TIERS_DATA[tier_id];
					return (
						<div key={key} className="relative h-[30px] w-[200px] shrink-0">
							<div className="absolute inset-0 grid items-center">
								<div className="flex gap-x-1 px-2" title={statInfo.stat}>
									<img
										alt={`Stat ${statInfo.stat} img`}
										src={statInfo.image}
										className="size-5 max-w-none shrink-0"
										height={20}
										width={20}
									/>
									{!compactStats && (
										<small className="truncate text-shadow-sm/80">
											{statInfo.label}
										</small>
									)}
								</div>
							</div>
							<img
								alt={`Tier ${tierInfo.id} trait img`}
								src={tierInfo.trait_image}
								className="h-[30px] w-[200px] max-w-none"
								height={30}
								width={200}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
