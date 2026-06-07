import { Regions } from "@/components/monster-codex/regions";
import { PageTitle } from "@/components/page-title";

export const MonsterCodexPage = () => {
	return (
		<div>
			<PageTitle title="Monster Codex" />

			<div>
				<Regions />
				{/* <MonsterlingsList /> */}
			</div>
		</div>
	);
};
