import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useGoogleAuth } from "@/components/account/google/utils/use-google-auth";
import { Nav } from "@/components/navigation";
import type { Sidebar } from "@/routes/__root";

export default function Header({ sidebarOpen, setSidebarOpen }: Sidebar) {
	useGoogleAuth({ syncOnLoad: true });

	return (
		<>
			{sidebarOpen && (
				<button
					type="button"
					className="fixed inset-0 bg-black/50 z-40 lg:hidden cursor-default"
					onClick={() => setSidebarOpen(false)}
					aria-label="Close sidebar"
				/>
			)}

			<aside
				className={`fixed lg:static inset-y-0 left-0 w-60 border-r border-border bg-card flex flex-col shrink-0 z-50 transform transition-transform duration-300 ease-in-out ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				<div className="px-6 py-6 border-b border-border flex items-center justify-between">
					<Link to="/">
						<h1 className="text-lg font-semibold">Mongil: Star Dive</h1>
						<p className="text-xs text-muted-foreground mt-0.5">Tracker</p>
					</Link>
					<button
						type="button"
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden text-muted-foreground hover:text-foreground"
					>
						<X className="size-5" />
					</button>
				</div>

				<Nav />

				<div className="px-6 py-4 border-t border-border text-xs text-muted-foreground">
					<p>© 2026 Mongil Star Dive Tracker</p>
				</div>
			</aside>
		</>
	);
}
