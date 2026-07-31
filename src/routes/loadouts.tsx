import { createFileRoute } from "@tanstack/react-router";
import { LoadoutsPage } from "@/components/loadouts/loadouts-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/loadouts")({
	component: RouteComponent,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.LOADOUTS,
			description:
				"Build Mongil: Star Dive team loadouts from owned characters, Monsterlings, and artifacts.",
			path: "/loadouts",
		}),
});

function RouteComponent() {
	return <LoadoutsPage />;
}
