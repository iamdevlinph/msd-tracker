import { createFileRoute } from "@tanstack/react-router";
import { ArtifactsPage } from "@/components/artifacts/artifacts-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/artifacts")({
	component: RouteComponent,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.ARTIFACTS ?? "Artifacts",
			description: "Track Mongil: Star Dive artifacts and fusion levels.",
			path: "/artifacts",
		}),
});

function RouteComponent() {
	return <ArtifactsPage />;
}
