import { createFileRoute } from "@tanstack/react-router";
import { EquipmentsPage } from "@/components/equipments/equipments-page";

export const Route = createFileRoute("/equipments")({
	component: RouteComponent,
});

function RouteComponent() {
	return <EquipmentsPage />;
}
