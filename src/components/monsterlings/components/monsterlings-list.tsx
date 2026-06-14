import { useState } from "react";
import { EditMonsterlingDialog } from "@/components/monsterlings/components/edit-monsterling-dialog";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { MONSTERLING_CARD_WIDTH } from "@/components/monsterlings/components/monsterling-constants";
import { useAppStore } from "@/stores/app-store";

export const MonsterlingsList = () => {
	const [open, setOpen] = useState(false);
	const [monsterlingToEdit, setMonsterlingToEdit] = useState<null | string>(
		null,
	);

	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	return (
		<div className="">
			<div
				className="mt-5 gap-y-5 gap-x-5 grid md:flex md:flex-wrap justify-center md:justify-start "
				style={{
					gridTemplateColumns: `repeat(auto-fit, ${MONSTERLING_CARD_WIDTH}px)`,
				}}
			>
				{Object.entries(monsterlingsOwned).map(([key, monsterling]) => {
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
