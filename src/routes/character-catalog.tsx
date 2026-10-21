import { createFileRoute } from "@tanstack/react-router";
import { CharacterCatalogPage } from "@/components/characters/character-catalog-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/character-catalog")({
	component: RouteComponent,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.CHARACTER_CATALOG,
			description: "Browse all available Mongil: Star Dive characters.",
			path: "/character-catalog",
		}),
});

function RouteComponent() {
	return <CharacterCatalogPage />;
}
