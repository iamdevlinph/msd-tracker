import { memo, useMemo } from "react";
import { CodexCard } from "@/components/monster-codex/components/codex-card";
import { EmptyCodex } from "@/components/monster-codex/components/codex-empty";
import { useCodexStore } from "@/components/monster-codex/store/codex-store";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";
import { useAppStore } from "@/stores/app-store";

const MonsterlingCardMemo = memo(CodexCard);

export const CodexList = () => {
	const filters = useCodexStore((s) => s.filters);
	const completed = useAppStore((s) => s.monsterCodexCompleted);
	const favorites = useAppStore((s) => s.monsterCodexFavorites);

	const monsterlings = useMemo(() => {
		const completedSet = new Set(completed);
		const favoriteSet = new Set(favorites);
		const search = filters.search.trim().toLowerCase();

		return Object.values(MONSTERLINGS_DATA).filter((monsterling) => {
			if (search && !monsterling.name.toLowerCase().includes(search)) {
				return false;
			}

			if (
				filters.region !== REGION_ID_BY_REGION.ALL &&
				monsterling.region_id !== filters.region
			) {
				return false;
			}

			if (
				filters.source !== SOURCE_ID_BY_SOURCE.ALL &&
				!monsterling.source_id.includes(filters.source)
			) {
				return false;
			}

			if (filters.view === "favorite") {
				return favoriteSet.has(monsterling.id);
			}

			const isCompleted = completedSet.has(monsterling.id);
			if (filters.view === "completed") return isCompleted;
			if (filters.view === "incomplete") return !isCompleted;

			return true;
		});
	}, [completed, favorites, filters]);

	return (
		<>
			{monsterlings.length === 0 && (
				<EmptyCodex favoriteOnly={filters.view === "favorite"} />
			)}

			<div
				className="mt-5 gap-y-15 gap-x-10 grid md:flex md:flex-wrap justify-center md:justify-start"
				style={{
					gridTemplateColumns: "repeat(auto-fit, 125px)",
				}}
			>
				{monsterlings.length > 0 &&
					monsterlings.map((monsterling) => {
						return (
							<MonsterlingCardMemo
								key={monsterling.id}
								monsterling_id={monsterling.id}
							/>
						);
					})}
			</div>
		</>
	);
};
