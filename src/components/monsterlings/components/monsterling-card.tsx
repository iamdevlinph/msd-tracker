// import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";
// import { TierPortrait } from "@/components/shared/tier-portrait";
// import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
// import { cn } from "@/lib/utils";
// import type { MonsterlingOwned } from "@/stores/monsterlings-slice";

// export const MonsterlingCard = ({
// 	monsterling_id,
// 	tier_id,
// 	traits,
// }: MonsterlingOwned) => {
// 	const { name, image, id } = MONSTERLINGS_DATA[monsterling_id];

// 	return (
// 		<div
// 			className={cn(
// 				"grid bg-card gap-y-2 gap-x-0 rounded-lg",
// 				`w-[${MONSTERLING_CARD_WIDTH}px]`,
// 			)}
// 			style={{
// 				gridTemplateAreas: "'portrait name' 'portrait stats'",
// 			}}
// 		>
// 			<small className="text-center" style={{ gridArea: "name" }}>
// 				{name}
// 			</small>
// 			<div className="relative" style={{ gridArea: "portrait" }}>
// 				<TierPortrait
// 					tier={tier_id}
// 					portraitImg={image}
// 					portraitSize={120}
// 					name={name}
// 					hideTierBg
// 				/>
// 			</div>

// 			<div className="flex flex-col" style={{ gridArea: "stats" }}>
// 				<small>Ice dmg 5%</small>
// 				<small>Elemental weakness boost dmg 5%</small>
// 				<small>Ice dmg 5%</small>
// 				<small>Ice dmg 5%</small>
// 			</div>
// 		</div>
// 	);
// };
