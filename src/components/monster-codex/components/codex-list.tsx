import { memo } from "react";
import { CodexCard } from "@/components/monster-codex/components/codex-card";
import { EmptyCodex } from "@/components/monster-codex/components/codex-empty";
import { useMonsterCodexFilterStore } from "@/components/monster-codex/store/monster-codex-filter-store";

const MonsterlingCardMemo = memo(CodexCard);

export const CodexList = () => {
	const monsterlings = useMonsterCodexFilterStore((s) => s.monsterlings);

	const monsterlingsDisplay = Object.keys(monsterlings);

	return (
		<>
			{monsterlingsDisplay.length === 0 && <EmptyCodex />}

			<div
				className="mt-5 gap-y-15 gap-x-10 grid md:flex md:flex-wrap justify-center md:justify-start"
				style={{
					gridTemplateColumns: "repeat(auto-fit, 125px)",
				}}
			>
				{monsterlingsDisplay.length > 0 &&
					monsterlingsDisplay.map((value) => {
						return <MonsterlingCardMemo key={value} monsterling_id={+value} />;
					})}
			</div>
		</>
	);
};
