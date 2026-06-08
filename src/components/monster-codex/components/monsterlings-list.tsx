import { MonsterlingCard } from "@/components/monster-codex/components/monsterling-card";
import { useMonsterCodexStore } from "@/components/monster-codex/store/monster-codex-store";

// const MONSTER_CODEX_DUMMY = []

export const MonsterlingsList = () => {
	const monsterlings = useMonsterCodexStore((s) => s.monsterlings);

	return (
		<div className="m-2">
			{monsterlings.map((value, idx) => {
				return <MonsterlingCard key={value.id} {...value} />;
			})}
		</div>
	);
};
