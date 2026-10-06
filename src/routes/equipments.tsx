import { createFileRoute } from "@tanstack/react-router";
import { EquipmentsPage } from "@/components/equipments/equipments-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/equipments")({
	component: RouteComponent,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.EQUIPMENT,
			description:
				"Browse Mongil: Star Dive equipment pieces and compare their set effects.",
			path: "/equipments",
		}),
});

function RouteComponent() {
	return <EquipmentsPage />;
}
