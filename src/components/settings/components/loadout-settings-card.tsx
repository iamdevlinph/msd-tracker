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
import { useAppStore } from "@/stores/app-store";

export const LoadoutSettingsCard = () => {
	const ga = useGoogleAnalytics();
	const showEquipmentSetNames = useAppStore(
		(state) => state.showEquipmentSetNames,
	);
	const setShowEquipmentSetNames = useAppStore(
		(state) => state.setShowEquipmentSetNames,
	);
	const loadoutPreviewPreferences = useAppStore(
		(state) => state.loadoutPreviewPreferences,
	);
	const setLoadoutPreviewPreferences = useAppStore(
		(state) => state.setLoadoutPreviewPreferences,
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Loadouts</CardTitle>
				<CardDescription>
					Choose how loadouts and loadout snapshots appear in previews and
					exports. You can still change the layout within each preview.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-3">
					<Checkbox
						id="show-equipment-set-names"
						checked={showEquipmentSetNames}
						onCheckedChange={(checked) =>
							setShowEquipmentSetNames(checked === true)
						}
					/>
					<Label htmlFor="show-equipment-set-names">
						Show equipment set names
					</Label>
				</div>
				<div className="mt-3 flex items-center gap-3">
					<Checkbox
						id="hide-equipment-by-default"
						checked={loadoutPreviewPreferences.hideEquipment}
						onCheckedChange={(checked) => {
							const value = checked === true;
							setLoadoutPreviewPreferences({ hideEquipment: value });
							ga.event(ANALYTICS_EVENTS.LOADOUT_PREVIEW_EQUIPMENT_TOGGLE, {
								hide_equipment: value,
								control_location: "settings",
							});
						}}
					/>
					<Label htmlFor="hide-equipment-by-default">
						Hide equipment by default
					</Label>
				</div>
				<div className="mt-3 flex items-center gap-3">
					<Checkbox
						id="compact-monsterlings-by-default"
						checked={loadoutPreviewPreferences.compactMonsterlings}
						onCheckedChange={(checked) => {
							const value = checked === true;
							setLoadoutPreviewPreferences({ compactMonsterlings: value });
							ga.event(ANALYTICS_EVENTS.LOADOUT_PREVIEW_COMPACT_TOGGLE, {
								compact_monsterlings: value,
								control_location: "settings",
							});
						}}
					/>
					<Label htmlFor="compact-monsterlings-by-default">
						Compact monsterlings by default
					</Label>
				</div>
			</CardContent>
		</Card>
	);
};
