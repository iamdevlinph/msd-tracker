import { createFileRoute } from "@tanstack/react-router";
import { LoadoutsPage } from "@/components/loadouts/loadouts-page";

export const Route = createFileRoute("/loadouts")({
	component: RouteComponent,
});

function RouteComponent() {
	return <LoadoutsPage />;
}
