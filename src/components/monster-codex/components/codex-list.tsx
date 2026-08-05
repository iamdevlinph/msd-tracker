import { memo, useMemo, useState } from "react";
import { CodexCard } from "@/components/monster-codex/components/codex-card";
import { CodexDetailsDialog } from "@/components/monster-codex/components/codex-details-dialog";
import {
	CODEX_VIEW,
	useCodexStore,
} from "@/components/monster-codex/store/codex-store";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";
import { useAppStore } from "@/stores/app-store";

const MonsterlingCardMemo = memo(CodexCard);

export const CodexList = () => {
	const [selectedMonsterlingId, setSelectedMonsterlingId] = useState<
		number | null
	>(null);
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
				filters.selectedSources.length > 0 &&
				!filters.selectedSources.some((sourceId) =>
					monsterling.source_id.includes(sourceId),
				)
			) {
				return false;
			}

			if (filters.view === CODEX_VIEW.FAVORITE) {
				return favoriteSet.has(monsterling.id);
			}

			const isCompleted = completedSet.has(monsterling.id);
			if (filters.view === CODEX_VIEW.COMPLETED) return isCompleted;
			if (filters.view === CODEX_VIEW.INCOMPLETE) return !isCompleted;

			return true;
		});
	}, [completed, favorites, filters]);

	return (
		<>
			{monsterlings.length === 0 && (
				<CollectionEmptyState
					title={
						filters.view === CODEX_VIEW.FAVORITE
							? "No favorite monsterlings yet"
							: "No monsterling found"
					}
					description={
						filters.view === CODEX_VIEW.FAVORITE
							? "Select All, then use the heart on a card to add favorites."
							: undefined
					}
				/>
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
								onOpen={setSelectedMonsterlingId}
							/>
						);
					})}
			</div>
			<CodexDetailsDialog
				monsterlingId={selectedMonsterlingId}
				onClose={() => setSelectedMonsterlingId(null)}
			/>
		</>
	);
};
