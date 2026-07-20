import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/home-page";
import { createSeoHead, SITE_NAME, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/")({
	component: Index,
	staticData: {
		label: "Starred",
	},
	head: () => ({
		...createSeoHead({
			title: "Mongil: Star Dive Tracker | Characters, Monsterlings & Loadouts",
			description:
				"Free unofficial fan-made tracker for Mongil: Star Dive players to organize characters, Monsterlings, Monster Codex progress, and team loadouts.",
			path: "/",
		}),
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: SITE_NAME,
					url: SITE_URL,
					description:
						"Free unofficial fan-made tracker for Mongil: Star Dive players.",
				}),
			},
		],
	}),
});

function Index() {
	return <HomePage />;
}
