import { MonsterlingCard } from "@/components/monster-codex/components/monsterling-card";
import { useMonsterCodexStore } from "@/components/monster-codex/store/monster-codex-store";

// const MONSTER_CODEX_DUMMY = []

export const MonsterlingsList = () => {
	const monsterlings = useMonsterCodexStore((s) => s.monsterlings);

	return (
		<div className="mt-5 gap-y-15 gap-x-10 flex flex-wrap">
			{monsterlings.map((value) => {
				return <MonsterlingCard key={value.id} {...value} />;
			})}
		</div>
	);
};
