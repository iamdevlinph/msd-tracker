import { FilterOptions } from "@/components/monster-codex/components/filter-options";
import { MonsterlingsList } from "@/components/monster-codex/components/monsterlings-list";
import { Regions } from "@/components/monster-codex/components/regions";
import { PageTitle } from "@/components/page-title";

export const MonsterCodexPage = () => {
	return (
		<div>
			<PageTitle title="Monster Codex" />

			<div className="flex gap-5 flex-col">
				<Regions />
				<FilterOptions />
				<MonsterlingsList />
			</div>
		</div>
	);
};
