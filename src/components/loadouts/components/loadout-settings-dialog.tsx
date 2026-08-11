import { Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/stores/app-store";

export const LoadoutSettingsDialog = () => {
	const [open, setOpen] = useState(false);
	const preferences = useAppStore((state) => state.loadoutCardPreferences);
	const setPreferences = useAppStore(
		(state) => state.setLoadoutCardPreferences,
	);

	return (
		<>
			<Button
				type="button"
				aria-label="Loadout settings"
				className="flex-none"
				variant="outline"
				onClick={() => setOpen(true)}
			>
				<Settings className="size-4" />
				<span>Settings</span>
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Loadout settings</DialogTitle>
						<DialogDescription>
							Choose which details appear on saved loadout cards.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-3">
						<div className="flex items-center gap-3">
							<Checkbox
								id="loadout-show-artifacts-equipment"
								checked={preferences.showArtifactsAndEquipment}
								onCheckedChange={(checked) =>
									setPreferences({
										showArtifactsAndEquipment: checked === true,
									})
								}
							/>
							<Label htmlFor="loadout-show-artifacts-equipment">
								Show artifacts and equipment
							</Label>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" onClick={() => setOpen(false)}>
							Done
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
