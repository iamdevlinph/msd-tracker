import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/home-page";

export const Route = createFileRoute("/")({
	component: Index,
	staticData: {
		label: "Starred",
	},
	// head: () => ({
	// 	meta: [
	// 		{
	// 			title: "Index Page",
	// 		},
	// 	],
	// }),
});

function Index() {
	return <HomePage />;
}
