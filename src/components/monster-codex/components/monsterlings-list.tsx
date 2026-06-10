import { memo } from "react";
import { MonsterlingCard } from "@/components/monster-codex/components/monsterling-card";
import { NoMonsterling } from "@/components/monster-codex/components/no-monsterling";
import { useMonsterCodexFilterStore } from "@/components/monster-codex/store/monster-codex-filter-store";

// const MONSTER_CODEX_DUMMY = []

const MonsterlingCardMemo = memo(MonsterlingCard);

export const MonsterlingsList = () => {
	const monsterlings = useMonsterCodexFilterStore((s) => s.monsterlings);

	return (
		<>
			{monsterlings.length === 0 && <NoMonsterling />}

			<div
				className="mt-5 gap-y-15 gap-x-10 grid md:flex md:flex-wrap justify-center md:justify-start"
				style={{
					gridTemplateColumns: "repeat(auto-fit, 125px)",
				}}
			>
				{monsterlings.length > 0 &&
					monsterlings.map((value) => {
						return <MonsterlingCardMemo key={value.id} {...value} />;
					})}
			</div>
		</>
	);
};
