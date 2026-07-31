import { useMemo, useState } from "react";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { PageTitle } from "@/components/shared/page-title";
import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { useAppStore } from "@/stores/app-store";
import { LinkChainLevelDialog } from "./components/link-chain-level-dialog";
import { LinkChainsFilter } from "./components/link-chains-filter";
import { MonsterlingLinkChainBadge } from "./components/monsterling-link-chain";
import { getMonsterlingLinkChainLevel } from "./components/monsterling-link-chain-utils";
import { useLinkChainsFilter } from "./store/link-chains-filter-store";

export const LinkChainsPage = () => {
	const filters = useLinkChainsFilter((state) => state.filters);
	const setFilters = useLinkChainsFilter((state) => state.setFilters);
	const levels = useAppStore((state) => state.monsterlingLinkChainLevels);
	const [selected, setSelected] = useState<number | null>(null);
	const entries = useMemo(
		() =>
			Object.values(MONSTERLINGS_DATA)
				.filter((entry) => entry.linkChain)
				.sort((a, b) => a.name.localeCompare(b.name))
				.filter(
					(entry) =>
						(!filters.search ||
							entry.name
								.toLowerCase()
								.includes(filters.search.toLowerCase())) &&
						(!filters.selectedLevels.length ||
							filters.selectedLevels.includes(
								getMonsterlingLinkChainLevel(entry.id, levels),
							)),
				),
		[filters, levels],
	);
	const selectedMonsterling =
		selected == null ? null : MONSTERLINGS_DATA[selected];
	return (
		<div>
			<PageTitle
				title="Link Chains"
				description="Track Link Chain levels for every Monsterling species."
			/>
			<div className="flex flex-col gap-5">
				<LinkChainsFilter filters={filters} onChange={setFilters} />
				{entries.length === 0 ? (
					<CollectionEmptyState
						title="No Link Chains found"
						description={
							filters.search || filters.selectedLevels.length
								? "Adjust or clear the filters to see Link Chains."
								: "No Monsterlings have a Link Chain."
						}
					/>
				) : (
					<div className="grid grid-cols-[repeat(auto-fill,120px)] justify-center gap-4 md:justify-start">
						{entries.map((entry) => {
							const level = getMonsterlingLinkChainLevel(entry.id, levels);
							const linkChain = entry.linkChain;
							if (!linkChain) return null;
							return (
								<button
									key={entry.id}
									type="button"
									aria-label={`Edit ${entry.name} Link Chain Level`}
									className="relative grid aspect-square place-items-center overflow-hidden rounded-lg border bg-card text-left hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									onClick={() => setSelected(entry.id)}
								>
									<PortraitWithName name={entry.name}>
										<TierPortrait
											tier={linkChain.tier_id}
											portraitImg={entry.image}
											portraitSize={120}
											name={entry.name}
											portraitClassName="size-[120px] object-contain"
										/>
										<MonsterlingLinkChainBadge level={level} />
									</PortraitWithName>
								</button>
							);
						})}
					</div>
				)}
			</div>
			{selectedMonsterling && (
				<LinkChainLevelDialog
					key={selectedMonsterling.id}
					monsterling={selectedMonsterling}
					level={getMonsterlingLinkChainLevel(selectedMonsterling.id, levels)}
					open
					onOpenChange={(open) => !open && setSelected(null)}
				/>
			)}
		</div>
	);
};
