import { AddMonsterlingDialog } from "@/components/monsterlings/components/add-monsterling";
import { MonsterlingsList } from "@/components/monsterlings/components/monsterlings-list";
import { PageTitle } from "@/components/shared/page-title";

export const MonsterlingsPage = () => {
	return (
		<div>
			<PageTitle title="Monsterlings" />

			<div className="flex gap-5 flex-col">
				<AddMonsterlingDialog />

				<MonsterlingsList />

				{/* <MonsterlingForm onClose={() => {}} /> */}
			</div>
		</div>
	);
};
