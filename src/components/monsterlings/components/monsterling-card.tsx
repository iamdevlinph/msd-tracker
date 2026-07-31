import {
	MONSTERLING_CARD_WIDTH,
	MONSTERLING_COMPACT_CARD_WIDTH,
} from "@/components/monsterlings/components/monsterling-constants";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import { MonsterlingLinkChainBadge } from "@/components/monsterlings/components/monsterling-link-chain";
import type { LinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { STAT_DATA } from "@/data/stats/STAT_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";
import { cn } from "@/lib/utils";

export type MonsterlingCardProps = MonsterlingOwned & {
	className?: string;
	compactStats?: boolean;
	showLinkChainBadge?: boolean;
	linkChainLevel: LinkChainLevel;
};

export const MonsterlingCard = ({
	monsterling_id,
	tier_id,
	linkChainLevel,
	traits,
	className = "",
	compactStats = false,
	showLinkChainBadge = true,
}: MonsterlingCardProps) => {
	const { name, image, linkChain } = MONSTERLINGS_DATA[monsterling_id];
	const width = compactStats
		? MONSTERLING_COMPACT_CARD_WIDTH
		: MONSTERLING_CARD_WIDTH;

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
			<div className="w-max" style={{ gridArea: "portrait" }}>
				<PortraitWithName name={name}>
					{showLinkChainBadge && linkChain?.name && (
						<MonsterlingLinkChainBadge level={linkChainLevel} />
					)}
					<TierPortrait
						tier={tier_id}
						portraitImg={image}
						portraitSize={120}
						name={name}
						hideTierBg={!compactStats}
					/>
				</PortraitWithName>
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
