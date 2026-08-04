import { LoadoutSnapshotsList } from "@/components/loadout-snapshots/components/loadout-snapshots-list";
import { PageTitle } from "@/components/shared/page-title";

export const LoadoutSnapshotsPage = () => (
	<div>
		<PageTitle
			title="Loadout Snapshots"
			description="Record and share the exact loadout state used for a clear."
		/>
		<LoadoutSnapshotsList />
	</div>
);
