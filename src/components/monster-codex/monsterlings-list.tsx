import { MonsterlingCard } from "@/components/monster-codex/monsterling-card";

// const MONSTER_CODEX_DUMMY = []

export const MonsterlingsList = () => {
	return (
		<div className="m-2">
			{Array(50)
				.fill(null)
				.map((_value, idx) => idx + 1)
				.map((value, idx) => {
					return <MonsterlingCard key={value} completed={idx % 2 === 0} />;
				})}
		</div>
	);
};
