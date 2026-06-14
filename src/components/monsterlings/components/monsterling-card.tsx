import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { STAT_DATA } from "@/data/STAT_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

export const MonsterlingCard = ({
	monsterling_id,
	tier_id,
	traits,
	className = "",
}: MonsterlingOwned & {
	className?: string;
	imageOnly?: boolean;
}) => {
	const { name, image, id: _id } = MONSTERLINGS_DATA[monsterling_id];

	return (
		<div
			className={cn(
				"grid bg-card gap-y-0 gap-x-2 rounded-lg",
				`w-[${MONSTERLING_CARD_WIDTH}px]`,
				"monsterling-card",
				className,
			)}
			style={{
				gridTemplateAreas: "'portrait stats'",
				gridTemplateColumns: "",
			}}
		>
			<div className="relative w-max" style={{ gridArea: "portrait" }}>
				<small
					className="text-center absolute bottom-2 stroke-black w-full text-shadow-sm/80"
					style={{
						gridArea: "name",
					}}
				>
					{name}
				</small>
				<TierPortrait
					tier={tier_id}
					portraitImg={image}
					portraitSize={120}
					name={name}
					hideTierBg
				/>
			</div>

			<div className="flex flex-col" style={{ gridArea: "stats" }} id="traits">
				{traits.map(({ stat_id, tier_id }, idx) => {
					if (!stat_id) return null;

					const key = `${stat_id}-${idx}`;
					const statInfo = STAT_DATA[stat_id];
					const tierInfo = TIERS_DATA[tier_id];
					return (
						<div key={key} className="relative">
							<div className="absolute inset-0 grid items-center">
								<div className="flex px-2 gap-x-1" title={statInfo.stat}>
									<img
										alt={`Stat ${statInfo.stat} img`}
										src={statInfo.image}
										height="100%"
										width={20}
									/>
									<small className="text-shadow-sm/80">{statInfo.label}</small>
								</div>
							</div>
							<img
								alt={`Tier ${tierInfo.id} trait img`}
								src={tierInfo.trait_image}
								height="100%"
								width={200}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
