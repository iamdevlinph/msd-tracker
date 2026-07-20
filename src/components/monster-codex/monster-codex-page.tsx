import { CodexFilter } from "@/components/monster-codex/components/codex-filter";
import { CodexList } from "@/components/monster-codex/components/codex-list";
import { CodexRegions } from "@/components/monster-codex/components/codex-regions";
import { PageTitle } from "@/components/shared/page-title";

export const MonsterCodexPage = () => {
	return (
		<div>
			<PageTitle
				title="Monster Codex"
				description="Record cleared encounters and keep your Monster Codex progress organized."
			/>

			<div className="flex gap-5 flex-col">
				<CodexRegions />
				<CodexFilter />
				<CodexList />
			</div>
		</div>
	);
};
