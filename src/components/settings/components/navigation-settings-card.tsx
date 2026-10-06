import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export const NavigationSettingsCard = () => {
	const ga = useGoogleAnalytics();
	const preferences = useAppStore((state) => state.navigationPreferences);
	const setPreferences = useAppStore((state) => state.setNavigationPreferences);
	const setVisibility = (item: "assets" | "equipment", isVisible: boolean) => {
		setPreferences(
			item === "assets"
				? { showAssets: isVisible }
				: { showEquipment: isVisible },
		);
		ga.event(ANALYTICS_EVENTS.NAVIGATION_VISIBILITY_TOGGLE, {
			item,
			is_visible: isVisible,
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Navigation</CardTitle>
				<CardDescription>
					Choose which navigation groups and items are shown. Empty groups are
					hidden automatically.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<fieldset className="grid gap-3">
					<legend className="sr-only">Navigation visibility</legend>
					<div
						className={cn(
							"flex items-center gap-3",
							!preferences.showAssets && "opacity-60",
						)}
					>
						<Checkbox
							id="show-assets-navigation"
							checked={preferences.showAssets}
							onCheckedChange={(checked) =>
								setVisibility("assets", checked === true)
							}
						/>
						<Label
							htmlFor="show-assets-navigation"
							className={cn(!preferences.showAssets && "line-through")}
						>
							Assets
						</Label>
					</div>
					<div
						className={cn(
							"ml-7 flex items-center gap-3 border-l pl-4",
							!preferences.showEquipment && "opacity-60",
						)}
					>
						<Checkbox
							id="show-equipment-navigation"
							checked={preferences.showEquipment}
							onCheckedChange={(checked) =>
								setVisibility("equipment", checked === true)
							}
						/>
						<Label
							htmlFor="show-equipment-navigation"
							className={cn(!preferences.showEquipment && "line-through")}
						>
							Equipment
						</Label>
					</div>
				</fieldset>
			</CardContent>
		</Card>
	);
};
