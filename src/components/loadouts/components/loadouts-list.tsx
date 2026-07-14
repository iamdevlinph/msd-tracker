import { useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { LoadoutCard } from "@/components/loadouts/components/loadout-card";
import { LoadoutPreviewDialog } from "@/components/loadouts/components/loadout-preview-dialog";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";

export const LoadoutsList = () => {
	const ga = useGoogleAnalytics();
	const [open, setOpen] = useState(false);
	const [loadoutToEdit, setLoadoutToEdit] = useState<string | null>(null);
	const [loadoutToPreview, setLoadoutToPreview] = useState<string | null>(null);

	const loadouts = useAppStore((state) => state.loadouts);
	const deleteLoadout = useAppStore((state) => state.deleteLoadout);
	const loadoutEntries = Object.values(loadouts).sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	return (
		<div className="min-w-0">
			{loadoutEntries.length === 0 && (
				<CollectionEmptyState
					title="No loadouts yet"
					description="Create a loadout to organize your team and monsterlings."
				/>
			)}

			<div className="overflow-x-auto pb-2">
				<div className="grid min-w-[18rem] grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-3">
					{loadoutEntries.map((loadout) => (
						<LoadoutCard
							key={loadout.id}
							loadout={loadout}
							onPreview={(source) => {
								ga.event(ANALYTICS_EVENTS.LOADOUT_PREVIEW, { source });
								setLoadoutToPreview(loadout.id);
							}}
							onEdit={() => {
								setLoadoutToEdit(loadout.id);
								setOpen(true);
							}}
							onDelete={() => {
								deleteLoadout(loadout.id);
								ga.event(ANALYTICS_EVENTS.LOADOUT_DELETE);
							}}
						/>
					))}
				</div>
			</div>

			<LoadoutsDialog
				open={open}
				setOpen={setOpen}
				loadoutToEdit={loadoutToEdit}
				onClose={() => setLoadoutToEdit(null)}
			/>
			<LoadoutPreviewDialog
				loadout={loadoutToPreview ? (loadouts[loadoutToPreview] ?? null) : null}
				onOpenChange={(next) => !next && setLoadoutToPreview(null)}
			/>
		</div>
	);
};
