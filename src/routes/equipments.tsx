import { createFileRoute } from "@tanstack/react-router";
import { EquipmentsPage } from "@/components/equipments/equipments-page";
import { noIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/equipments")({
	component: RouteComponent,
	head: noIndexHead,
});

function RouteComponent() {
	return <EquipmentsPage />;
}
