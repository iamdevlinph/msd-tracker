import { createFileRoute } from "@tanstack/react-router";
import { MonsterlingsPage } from "@/components/monsterlings/monsterlings-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/monsterlings")({
	component: RouteComponent,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.MONSTERLINGS,
			description:
				"Organize your Mongil: Star Dive Monsterlings by tier and ownership with this free unofficial collection tracker.",
			path: "/monsterlings",
		}),
});

function RouteComponent() {
	return <MonsterlingsPage />;
}
