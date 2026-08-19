import { useState } from "react";
import { getEquippedCharacterUsage } from "@/components/loadouts/utils/equipped-character-usage";
import { EditMonsterlingDialog } from "@/components/monsterlings/components/edit-monsterling-dialog";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";
import { getMonsterlingLinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import type { MonsterlingFilters } from "@/components/monsterlings/store/monsterlings-filter-store";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { useAppStore } from "@/stores/app-store";

type MonsterlingsListProps = { filters: MonsterlingFilters };

export const MonsterlingsList = ({ filters }: MonsterlingsListProps) => {
	const [open, setOpen] = useState(false);
	const [monsterlingToEdit, setMonsterlingToEdit] = useState<null | string>(
		null,
	);

	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	const monsterlingLinkChainLevels = useAppStore(
		(s) => s.monsterlingLinkChainLevels,
	);
	const loadouts = useAppStore((s) => s.loadouts);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const equippedCharacterUsage = getEquippedCharacterUsage(
		loadouts,
		undefined,
		{ monsterlingInstanceIds: Object.keys(monsterlingsOwned), charactersOwned },
	);
	const sortedMonsterlings = Object.entries(monsterlingsOwned)
		.filter(([, monsterling]) => {
			const { name } = MONSTERLINGS_DATA[monsterling.monsterling_id];
			return (
				(!filters.search ||
					name.toLowerCase().includes(filters.search.toLowerCase())) &&
				(!filters.selectedTiers.length ||
					filters.selectedTiers.includes(monsterling.tier_id))
			);
		})
		.sort(
			([idA, a], [idB, b]) =>
				MONSTERLINGS_DATA[a.monsterling_id].name.localeCompare(
					MONSTERLINGS_DATA[b.monsterling_id].name,
				) || idA.localeCompare(idB),
		);
	return (
		<div className="">
			{sortedMonsterlings.length === 0 && (
				<CollectionEmptyState
					title={
						Object.keys(monsterlingsOwned).length === 0
							? "No monsterlings yet"
							: "No monsterlings match these filters"
					}
					description={
						Object.keys(monsterlingsOwned).length === 0
							? "Add a monsterling to start building your collection."
							: "Adjust or clear the filters to see your owned monsterlings."
					}
				/>
			)}
			<div
				className="mt-5 gap-y-5 gap-x-5 grid md:flex md:flex-wrap justify-center md:justify-start "
				style={{
					gridTemplateColumns: `repeat(auto-fit, ${MONSTERLING_CARD_WIDTH}px)`,
				}}
			>
				{sortedMonsterlings.map(([key, monsterling]) => {
					return (
						// browser add text-center when for buttons
						<button
							key={key}
							type="button"
							className="group text-left cursor-pointer"
							onClick={() => {
								setOpen(true);
								setMonsterlingToEdit(key);
							}}
						>
							<MonsterlingCard
								monsterling_id={monsterling.monsterling_id}
								tier_id={monsterling.tier_id}
								linkChainLevel={getMonsterlingLinkChainLevel(
									monsterling.monsterling_id,
									monsterlingLinkChainLevels,
								)}
								traits={monsterling.traits}
								equippedCharacters={equippedCharacterUsage.monsterlings[key]}
							/>
						</button>
					);
				})}
			</div>

			<EditMonsterlingDialog
				monsterlingToEdit={monsterlingToEdit}
				open={open}
				setOpen={setOpen}
				onClose={() => setMonsterlingToEdit(null)}
			/>
		</div>
	);
};
