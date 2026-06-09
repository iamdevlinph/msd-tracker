import { MonsterCodexFilter } from "@/components/monster-codex/components/monster-codex-filter";
import { MonsterlingsList } from "@/components/monster-codex/components/monsterlings-list";
import { Regions } from "@/components/monster-codex/components/regions";
import { PageTitle } from "@/components/page-title";

export const MonsterCodexPage = () => {
	return (
		<div>
			<PageTitle title="Monster Codex" />

			<div className="flex gap-5 flex-col">
				<Regions />
				<MonsterCodexFilter />
				<MonsterlingsList />
			</div>
		</div>
	);
};
