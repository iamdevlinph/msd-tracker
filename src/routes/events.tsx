import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/components/events/events-page";
import { noIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/events")({
	component: RouteComponent,
	head: noIndexHead,
});

function RouteComponent() {
	return <EventsPage />;
}
