import { AddLoadoutDialog } from "@/components/loadouts/components/add-loadout";
import { LoadoutsList } from "@/components/loadouts/components/loadouts-list";
import { PageTitle } from "@/components/shared/page-title";

export const LoadoutsPage = () => {
	return (
		<div>
			<PageTitle
				title="Loadouts"
				description="Build teams from owned characters and assign their Monsterlings."
			/>

			<div className="flex gap-5 flex-col">
				<AddLoadoutDialog />
				<LoadoutsList />
			</div>
		</div>
	);
};
