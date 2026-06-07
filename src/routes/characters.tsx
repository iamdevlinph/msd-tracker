import { createFileRoute } from "@tanstack/react-router";
import { CharactersPage } from "@/components/characters/characters-page";

export const Route = createFileRoute("/characters")({
	component: RouteComponent,
});

function RouteComponent() {
	return <CharactersPage />;
}
