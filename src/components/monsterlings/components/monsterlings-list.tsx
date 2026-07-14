import { useState } from "react";
import { EditMonsterlingDialog } from "@/components/monsterlings/components/edit-monsterling-dialog";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { useAppStore } from "@/stores/app-store";

export const MonsterlingsList = () => {
	const [open, setOpen] = useState(false);
	const [monsterlingToEdit, setMonsterlingToEdit] = useState<null | string>(
		null,
	);

	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	const sortedMonsterlings = Object.entries(monsterlingsOwned).sort(
		([idA, a], [idB, b]) =>
			MONSTERLINGS_DATA[a.monsterling_id].name.localeCompare(
				MONSTERLINGS_DATA[b.monsterling_id].name,
			) || idA.localeCompare(idB),
	);
	return (
		<div className="">
			{sortedMonsterlings.length === 0 && (
				<CollectionEmptyState
					title="No monsterlings yet"
					description="Add a monsterling to start building your collection."
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
							className="text-left cursor-pointer"
							onClick={() => {
								setOpen(true);
								setMonsterlingToEdit(key);
							}}
						>
							<MonsterlingCard
								monsterling_id={monsterling.monsterling_id}
								tier_id={monsterling.tier_id}
								traits={monsterling.traits}
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
