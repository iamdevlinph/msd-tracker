import { createFileRoute } from "@tanstack/react-router";
import { MonsterCodexPage } from "@/components/monster-codex/monster-condex-page";

export const Route = createFileRoute("/monster-codex")({
	component: Account,
});

function Account() {
	return <MonsterCodexPage />;
}
