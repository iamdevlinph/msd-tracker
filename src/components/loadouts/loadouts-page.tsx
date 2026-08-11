import { AddLoadoutDialog } from "@/components/loadouts/components/add-loadout";
import { LoadoutSettingsDialog } from "@/components/loadouts/components/loadout-settings-dialog";
import { LoadoutsList } from "@/components/loadouts/components/loadouts-list";
import { PageTitle } from "@/components/shared/page-title";

export const LoadoutsPage = () => {
	return (
		<div>
			<PageTitle
				title="Loadouts"
				description="Build teams from owned characters and assign their Monsterlings and artifacts."
			/>

			<div className="flex flex-col gap-5">
				<div className="flex w-full items-center justify-between gap-2">
					<AddLoadoutDialog />
					<LoadoutSettingsDialog />
				</div>
				<LoadoutsList />
			</div>
		</div>
	);
};
