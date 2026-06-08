import { FilterOptions } from "@/components/monster-codex/components/filter-options";
import { MonsterlingsList } from "@/components/monster-codex/components/monsterlings-list";
import { Regions } from "@/components/monster-codex/components/regions";
import { PageTitle } from "@/components/page-title";

export const MonsterCodexPage = () => {
	return (
		<div>
			<PageTitle title="Monster Codex" />

			<div>
				<Regions />
				<div className="mb-2 mt-5">
					<FilterOptions />
				</div>
				<MonsterlingsList />
			</div>
		</div>
	);
};
