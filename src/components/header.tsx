import { Link } from "@tanstack/react-router";
import { useGoogleAuth } from "@/components/account/google/utils/use-google-auth";
import { Nav } from "@/components/navigation";

export default function Header() {
	useGoogleAuth({ syncOnLoad: true });

	return (
		<aside className="w-60 border-r border-border bg-card flex flex-col shrink-0">
			<div className="px-6 py-6 border-b border-border">
				<Link to="/">
					<h1 className="text-lg font-semibold">Mongil: Star Dive</h1>
					<p className="text-xs text-muted-foreground mt-0.5">Tracker</p>
				</Link>
			</div>

			<Nav />

			{/* <div className="px-6 py-4 border-t border-border text-xs text-muted-foreground">
				<p>© 2026 Mongil Star Dive Tracker</p>
			</div> */}
		</aside>
	);
}
