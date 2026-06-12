import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";
import { useAppStore } from "@/stores/app-store";

export const MonsterlingsList = () => {
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	console.log("debu", monsterlingsOwned);
	console.log(Object.entries(monsterlingsOwned));
	return (
		<div className="">
			<div
				className="mt-5 gap-y-5 gap-x-5 grid md:flex md:flex-wrap justify-center md:justify-start "
				style={{
					gridTemplateColumns: `repeat(auto-fit, ${MONSTERLING_CARD_WIDTH}px)`,
				}}
			>
				{Object.entries(monsterlingsOwned).map(([key, monsterling]) => {
					return (
						<MonsterlingCard
							key={key}
							monsterling_id={monsterling.monsterling_id}
							tier_id={monsterling.tier_id}
							traits={monsterling.traits}
						/>
					);
				})}
			</div>
		</div>
	);
};
