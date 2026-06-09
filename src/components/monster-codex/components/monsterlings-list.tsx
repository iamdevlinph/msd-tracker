import { MonsterlingCard } from "@/components/monster-codex/components/monsterling-card";
import { NoMonsterling } from "@/components/monster-codex/components/no-monsterling";
import { useMonsterCodexFilterStore } from "@/components/monster-codex/store/monster-codex-filter-store";

// const MONSTER_CODEX_DUMMY = []

export const MonsterlingsList = () => {
	const monsterlings = useMonsterCodexFilterStore((s) => s.monsterlings);

	return (
		<div className="mt-5 gap-y-15 gap-x-10 flex flex-wrap">
			{monsterlings.length === 0 && <NoMonsterling />}

			{monsterlings.length > 0 &&
				monsterlings.map((value) => {
					return <MonsterlingCard key={value.id} {...value} />;
				})}
		</div>
	);
};
