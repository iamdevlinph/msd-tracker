import { AddMonsterlingDialog } from "@/components/monsterlings/components/add-monsterling";
import { MonsterlingFilter } from "@/components/monsterlings/components/monsterling-filter";
import { MonsterlingsList } from "@/components/monsterlings/components/monsterlings-list";
import { useMonsterlingFilter } from "@/components/monsterlings/store/monsterlings-filter-store";
import { PageTitle } from "@/components/shared/page-title";

export const MonsterlingsPage = () => {
	const filters = useMonsterlingFilter((state) => state.filters);
	const setFilters = useMonsterlingFilter((state) => state.setFilters);

	return (
		<div>
			<PageTitle
				title="Monsterlings"
				description="Organize your owned regular and legendary Monsterlings by tier."
			/>

			<div className="flex gap-5 flex-col">
				<AddMonsterlingDialog />

				<MonsterlingFilter filters={filters} onChange={setFilters} />

				<MonsterlingsList filters={filters} />

				{/* <MonsterlingForm onClose={() => {}} /> */}
			</div>
		</div>
	);
};
