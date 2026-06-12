import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";

export const MonsterlingsList = () => {
	return (
		<div className="">
			<div
				className="mt-5 gap-y-5 gap-x-5 grid md:flex md:flex-wrap justify-center md:justify-start "
				style={{
					gridTemplateColumns: `repeat(auto-fit, ${MONSTERLING_CARD_WIDTH}px)`,
				}}
			>
				{/* {Array.from({ length: 10 }).map((_val, idx) => {
					const tempId = idx + 1;
					return (
						<MonsterlingCard
							key={tempId}
							monsterling_id={34}
							tier_id={TIER_ID_BY_TIER.PRIME_5}
							traits={[
								{
									tier_id: TIER_ID_BY_TIER.PRIME_5,
									stat_id: STAT_ID_BY_STAT.ICE_DMG,
								},
							]}
						/>
					);
				})} */}
			</div>
		</div>
	);
};
