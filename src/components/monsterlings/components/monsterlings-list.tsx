import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { STAT_ID_BY_STAT } from "@/data/STAT_DATA";
import { TIER_ID_BY_TIER } from "@/data/TIERS_DATA";

export const MonsterlingsList = () => {
	return (
		<div>
			<MonsterlingCard
				monsterling_id={1}
				tier_id={TIER_ID_BY_TIER.CHOICE_4}
				traits={[
					{
						tier_id: TIER_ID_BY_TIER.PRIME_5,
						stat_id: STAT_ID_BY_STAT.ICE_DMG,
					},
				]}
			/>
		</div>
	);
};
