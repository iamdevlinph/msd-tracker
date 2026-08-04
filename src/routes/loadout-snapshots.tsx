import { createFileRoute } from "@tanstack/react-router";
import { LoadoutSnapshotsPage } from "@/components/loadout-snapshots/loadout-snapshots-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/loadout-snapshots")({
	component: LoadoutSnapshotsPage,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.LOADOUT_SNAPSHOTS,
			description:
				"Record and share Mongil: Star Dive loadout snapshots from completed encounters.",
			path: "/loadout-snapshots",
		}),
});
