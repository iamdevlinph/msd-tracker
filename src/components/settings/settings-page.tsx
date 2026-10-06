import { PageTitle } from "@/components/shared/page-title";
import { LoadoutSettingsCard } from "./components/loadout-settings-card";
import { NavigationSettingsCard } from "./components/navigation-settings-card";

export const SettingsPage = () => {
	return (
		<>
			<PageTitle
				title="Settings"
				description="Customize navigation and how loadout details are shown."
			/>
			<div className="grid gap-6">
				<NavigationSettingsCard />
				<LoadoutSettingsCard />
			</div>
		</>
	);
};
