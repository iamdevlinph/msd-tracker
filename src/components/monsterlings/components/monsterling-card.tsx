import { TierPortrait } from "@/components/shared/tier-portrait";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { TIER_ID_BY_TIER, TIERS_DATA } from "@/data/TIERS_DATA";
import type { MonsterlingOwned } from "@/stores/monsterlings-slice";

export const MonsterlingCard = ({
	monsterling_id,
	tier_id,
	traits,
}: MonsterlingOwned) => {
	const monsterlingTier = TIERS_DATA[tier_id];
	const { name, image, id } = MONSTERLINGS_DATA[monsterling_id];

	return (
		<div className="flex">
			<div>
				<TierPortrait
					tier={TIER_ID_BY_TIER.CHOICE_4}
					portraitImg={image}
					portraitSize={100}
					name={name}
					hideTierBg
				/>

				<div className=""> {name}</div>
			</div>

			<div>Ice dmg 5%</div>
		</div>
	);
};
