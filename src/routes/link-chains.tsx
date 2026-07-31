import { createFileRoute } from "@tanstack/react-router";
import { LinkChainsPage } from "@/components/monsterlings/link-chains-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/link-chains")({
	component: LinkChainsPage,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.LINK_CHAINS,
			description:
				"Track Link Chain levels for every Mongil: Star Dive Monsterling.",
			path: "/link-chains",
		}),
});
