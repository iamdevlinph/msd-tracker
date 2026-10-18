import { createFileRoute } from "@tanstack/react-router";
import { ArtifactCatalogPage } from "@/components/artifacts/artifact-catalog-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/artifact-catalog")({
	component: RouteComponent,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.ARTIFACT_CATALOG,
			description: "Browse all available Mongil: Star Dive artifacts.",
			path: "/artifact-catalog",
		}),
});

function RouteComponent() {
	return <ArtifactCatalogPage />;
}
