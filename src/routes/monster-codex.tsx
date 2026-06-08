import { createFileRoute } from "@tanstack/react-router";
import { MonsterCodexPage } from "@/components/monster-codex/monster-codex-page";

export const Route = createFileRoute("/monster-codex")({
	component: Account,
});

function Account() {
	return <MonsterCodexPage />;
}
