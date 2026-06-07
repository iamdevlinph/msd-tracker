import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/components/events/events-page";

export const Route = createFileRoute("/events")({
	component: RouteComponent,
});

function RouteComponent() {
	return <EventsPage />;
}
