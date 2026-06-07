import { createFileRoute } from "@tanstack/react-router";

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
	return <div>Index Page</div>;
}
