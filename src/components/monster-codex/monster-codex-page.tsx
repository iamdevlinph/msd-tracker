import { CodexFilter } from "@/components/monster-codex/components/codex-filter";
import { CodexList } from "@/components/monster-codex/components/codex-list";
import { Regions } from "@/components/monster-codex/components/regions";
import { PageTitle } from "@/components/page-title";

export const MonsterCodexPage = () => {
	return (
		<div>
			<PageTitle title="Monster Codex" />

			<div className="flex gap-5 flex-col">
				<Regions />
				<CodexFilter />
				<CodexList />
			</div>
		</div>
	);
};
