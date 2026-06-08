import { createFileRoute } from "@tanstack/react-router";
import { AccountPage } from "@/components/account/account-page";

export const Route = createFileRoute("/account")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AccountPage />;
}
