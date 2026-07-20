import { createFileRoute } from "@tanstack/react-router";
import { AccountPage } from "@/components/account/account-page";
import { noIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/account")({
	component: RouteComponent,
	head: noIndexHead,
});

function RouteComponent() {
	return <AccountPage />;
}
