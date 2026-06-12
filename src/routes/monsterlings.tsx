import { createFileRoute } from "@tanstack/react-router";
import { MonsterlingsPage } from "@/components/monsterlings/monsterlings-page";

export const Route = createFileRoute("/monsterlings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MonsterlingsPage />;
}
