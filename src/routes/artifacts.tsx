import { createFileRoute } from "@tanstack/react-router";
import { ArtifactsPage } from "@/components/artifacts/artifacts-page";
import { noIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/artifacts")({
	component: RouteComponent,
	head: noIndexHead,
});

function RouteComponent() {
	return <ArtifactsPage />;
}
