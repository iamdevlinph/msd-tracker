import { PageTitle } from "@/components/shared/page-title";
import { LoadoutSettingsCard } from "./components/loadout-settings-card";

export const SettingsPage = () => {
	return (
		<>
			<PageTitle
				title="Settings"
				description="Customize how loadout details are shown."
			/>
			<LoadoutSettingsCard />
		</>
	);
};
