import { PinIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { PageTitle } from "@/components/shared/page-title";
import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { Button } from "@/components/ui/button";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import { LinkChainLevelDialog } from "./components/link-chain-level-dialog";
import { LinkChainsFilter } from "./components/link-chains-filter";
import { MonsterlingLinkChainBadge } from "./components/monsterling-link-chain";
import { getMonsterlingLinkChainLevel } from "./components/monsterling-link-chain-utils";
import { useLinkChainsFilter } from "./store/link-chains-filter-store";

type LinkChainEntry = (typeof MONSTERLINGS_DATA)[number];

const sortEntries = (a: LinkChainEntry, b: LinkChainEntry) =>
	(a.linkChain?.unlock_level ?? 0) - (b.linkChain?.unlock_level ?? 0) ||
	(a.linkChain?.sort_order ?? Number.MAX_SAFE_INTEGER) -
		(b.linkChain?.sort_order ?? Number.MAX_SAFE_INTEGER) ||
	a.name.localeCompare(b.name);

type LinkChainCardProps = {
	entry: LinkChainEntry;
	level: ReturnType<typeof getMonsterlingLinkChainLevel>;
	isPinned: boolean;
	onEdit: () => void;
	onPin: () => void;
};

const LinkChainCard = ({
	entry,
	level,
	isPinned,
	onEdit,
	onPin,
}: LinkChainCardProps) => {
	const linkChain = entry.linkChain;
	if (!linkChain) return null;
	return (
		<div className="relative aspect-square overflow-hidden rounded-lg border bg-card hover:border-primary">
			<button
				type="button"
				aria-label={`Edit ${entry.name} Link Chain Level`}
				className="grid size-full place-items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				onClick={onEdit}
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
			<Button
				type="button"
				size="icon-sm"
				variant={isPinned ? "default" : "secondary"}
				className="absolute right-1 top-1 size-7"
				aria-label={`${isPinned ? "Unpin" : "Pin"} ${entry.name} Link Chain`}
				onClick={onPin}
			>
				<PinIcon />
			</Button>
		</div>
	);
};

export const LinkChainsPage = () => {
	const ga = useGoogleAnalytics();
	const filters = useLinkChainsFilter((state) => state.filters);
	const setFilters = useLinkChainsFilter((state) => state.setFilters);
	const levels = useAppStore((state) => state.monsterlingLinkChainLevels);
	const pinnedIds = useAppStore((state) => state.monsterlingLinkChainPinnedIds);
	const setPinned = useAppStore((state) => state.setMonsterlingLinkChainPinned);
	const [selected, setSelected] = useState<number | null>(null);
	const filteredEntries = useMemo(
		() =>
			Object.values(MONSTERLINGS_DATA)
				.filter((entry) => entry.linkChain)
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
				)
				.sort(sortEntries),
		[filters, levels],
	);
	const pinnedEntries = filteredEntries.filter((entry) =>
		pinnedIds.includes(entry.id),
	);
	const groups = [
		...filteredEntries.reduce((map, entry) => {
			const unlockLevel = entry.linkChain?.unlock_level;
			if (unlockLevel == null) return map;
			map.set(unlockLevel, [...(map.get(unlockLevel) ?? []), entry]);
			return map;
		}, new Map<number, LinkChainEntry[]>()),
	].sort(([a], [b]) => a - b);
	const selectedMonsterling =
		selected == null ? null : MONSTERLINGS_DATA[selected];
	const renderCard = (entry: LinkChainEntry) => (
		<LinkChainCard
			key={entry.id}
			entry={entry}
			level={getMonsterlingLinkChainLevel(entry.id, levels)}
			isPinned={pinnedIds.includes(entry.id)}
			onEdit={() => setSelected(entry.id)}
			onPin={() => {
				const isPinned = !pinnedIds.includes(entry.id);
				setPinned(entry.id, isPinned);
				ga.event(
					isPinned
						? ANALYTICS_EVENTS.MONSTERLING_LINK_CHAIN_PIN
						: ANALYTICS_EVENTS.MONSTERLING_LINK_CHAIN_UNPIN,
				);
			}}
		/>
	);
	return (
		<div>
			<PageTitle
				title="Link Chains"
				description="Track Link Chain levels for every Monsterling species."
			/>
			<div className="flex flex-col gap-5">
				<LinkChainsFilter filters={filters} onChange={setFilters} />
				<section aria-labelledby="pinned-link-chains">
					<h2 id="pinned-link-chains" className="mb-3 text-lg font-semibold">
						Pinned Link Chains
					</h2>
					{pinnedEntries.length ? (
						<div className="grid grid-cols-[repeat(auto-fill,120px)] justify-center gap-4 md:justify-start">
							{pinnedEntries.map(renderCard)}
						</div>
					) : (
						<CollectionEmptyState
							title={
								pinnedIds.length
									? "No pinned Link Chains found"
									: "No pinned Link Chains yet"
							}
							description={
								pinnedIds.length
									? "Adjust or clear the filters to see pinned Link Chains."
									: "Pin a Link Chain to keep it at the top of this page."
							}
						/>
					)}
				</section>
				{groups.length === 0 ? (
					<CollectionEmptyState
						title="No Link Chains found"
						description="Adjust or clear the filters to see Link Chains."
					/>
				) : (
					groups.map(([unlockLevel, entries]) => (
						<section
							key={unlockLevel}
							aria-labelledby={`link-chain-level-${unlockLevel}`}
						>
							<h2
								id={`link-chain-level-${unlockLevel}`}
								className="mb-3 text-lg font-semibold"
							>
								Level {unlockLevel}
							</h2>
							<div className="grid grid-cols-[repeat(auto-fill,120px)] justify-center gap-4 md:justify-start">
								{entries.map(renderCard)}
							</div>
						</section>
					))
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
