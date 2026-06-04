import { createFileRoute } from "@tanstack/react-router";
import { AllIssuesPage } from "@/components/issues/all-issues-page";

export const Route = createFileRoute("/issues")({
	component: Issues,
	staticData: {
		label: "Issues",
	},
	head: () => ({
		meta: [
			{
				title: "All Issues",
			},
		],
	}),
});

function Issues() {
	return <AllIssuesPage />;
}
