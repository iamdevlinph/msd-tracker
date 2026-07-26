import { createFileRoute } from "@tanstack/react-router";
import { ChecklistPage } from "@/components/checklist/checklist-page";
import { createSeoHead, PUBLIC_PAGE_TITLES } from "@/lib/seo";

export const Route = createFileRoute("/checklist")({
	component: ChecklistPage,
	head: () =>
		createSeoHead({
			title: PUBLIC_PAGE_TITLES.CHECKLIST,
			description:
				"Track Mongil: Star Dive daily and weekly activities, limited events, and custom recurring tasks.",
			path: "/checklist",
		}),
});
