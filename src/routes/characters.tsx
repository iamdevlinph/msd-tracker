import { createFileRoute } from "@tanstack/react-router";
import { CharactersPage } from "@/components/characters/characters-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/characters")({
	component: RouteComponent,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.CHARACTERS,
			description:
				"Track owned Mongil: Star Dive characters, awakening levels, tiers, and skill progress in one free fan-made tracker.",
			path: "/characters",
		}),
});

function RouteComponent() {
	return <CharactersPage />;
}
