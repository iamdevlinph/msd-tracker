import { createFileRoute } from "@tanstack/react-router";
import { MonsterCodexPage } from "@/components/monster-codex/monster-codex-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/monster-codex")({
	component: Account,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.MONSTER_CODEX,
			description:
				"Track cleared regions and Monster Codex progress while you play Mongil: Star Dive with this free fan-made tool.",
			path: "/monster-codex",
		}),
});

function Account() {
	return <MonsterCodexPage />;
}
