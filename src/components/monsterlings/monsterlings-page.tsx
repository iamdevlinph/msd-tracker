import { AddMonsterlingDialog } from "@/components/monsterlings/components/add-monsterling";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import {
	MONSTERLING_CARD_WIDTH,
	MONSTERLING_COMPACT_CARD_WIDTH,
} from "@/components/monsterlings/components/monsterling-constants";
import { MonsterlingFilter } from "@/components/monsterlings/components/monsterling-filter";
import { getMonsterlingLinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { MonsterlingsList } from "@/components/monsterlings/components/monsterlings-list";
import { useMonsterlingFilter } from "@/components/monsterlings/store/monsterlings-filter-store";
import { CollectionExportMenu } from "@/components/shared/collection-export-menu";
import { PageTitle } from "@/components/shared/page-title";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { useAppStore } from "@/stores/app-store";

export const MonsterlingsPage = () => {
	const filters = useMonsterlingFilter((state) => state.filters);
	const setFilters = useMonsterlingFilter((state) => state.setFilters);
	const monsterlingsOwned = useAppStore((state) => state.monsterlingsOwned);
	const linkChainLevels = useAppStore(
		(state) => state.monsterlingLinkChainLevels,
	);
	const exportItems = Object.entries(monsterlingsOwned)
		.filter(([, owned]) => {
			const info = MONSTERLINGS_DATA[owned.monsterling_id];
			return Boolean(
				info &&
					(!filters.search ||
						info.name.toLowerCase().includes(filters.search.toLowerCase())) &&
					(!filters.selectedTiers.length ||
						filters.selectedTiers.includes(owned.tier_id)),
			);
		})
		.sort(
			([idA, a], [idB, b]) =>
				MONSTERLINGS_DATA[a.monsterling_id].name.localeCompare(
					MONSTERLINGS_DATA[b.monsterling_id].name,
				) || idA.localeCompare(idB),
		);

	return (
		<div>
			<PageTitle
				title="Monsterlings"
				description="Organize your owned regular and legendary Monsterlings by tier."
			/>
			<div className="mb-5 flex flex-wrap gap-2">
				<AddMonsterlingDialog />
				<CollectionExportMenu
					collection="monsterlings"
					title="Monsterlings"
					count={exportItems.length}
					itemWidth={MONSTERLING_CARD_WIDTH}
					maxColumns={5}
					previewVariant={{
						itemWidth: MONSTERLING_COMPACT_CARD_WIDTH,
						maxColumns: 13,
						filenameSuffix: "compact",
						children: exportItems.map(([id, monsterling]) => (
							<MonsterlingCard
								key={id}
								{...monsterling}
								compactStats
								linkChainLevel={getMonsterlingLinkChainLevel(
									monsterling.monsterling_id,
									linkChainLevels,
								)}
							/>
						)),
					}}
				>
					{exportItems.map(([id, monsterling]) => (
						<MonsterlingCard
							key={id}
							{...monsterling}
							linkChainLevel={getMonsterlingLinkChainLevel(
								monsterling.monsterling_id,
								linkChainLevels,
							)}
						/>
					))}
				</CollectionExportMenu>
			</div>

			<div className="flex gap-5 flex-col">
				<MonsterlingFilter filters={filters} onChange={setFilters} />

				<MonsterlingsList filters={filters} />

				{/* <MonsterlingForm onClose={() => {}} /> */}
			</div>
		</div>
	);
};
