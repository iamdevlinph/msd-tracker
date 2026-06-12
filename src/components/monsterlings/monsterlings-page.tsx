import { MonsterlingsList } from "@/components/monsterlings/components/monsterlings-list";
import { PageTitle } from "@/components/shared/page-title";

export const MonsterlingsPage = () => {
	return (
		<div>
			<PageTitle title="Monsterlings" />

			<div className="flex gap-5 flex-col">
				<MonsterlingsList />
			</div>
		</div>
	);
};
