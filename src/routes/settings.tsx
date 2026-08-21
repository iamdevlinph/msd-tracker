import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/settings/settings-page";
import { noIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/settings")({
	component: SettingsPage,
	head: noIndexHead,
});
