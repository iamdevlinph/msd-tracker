import { Link, useLocation } from "@tanstack/react-router";
import { GitPullRequest } from "lucide-react";
import { cn } from "@/lib/utils";

export const Nav = ({ isMobile }: { isMobile?: boolean }) => {
	const location = useLocation();

	const linkStyle = "px-4 py-2 rounded-lg text-sm transition-color";
	const activeLinkStyle =
		"bg-gray-200 dark:bg-gray-700 hover:bg-gray-200/80 dark:hover:bg-gray-700/80";
	const hoverStyle = "hover:bg-gray-50 dark:hover:bg-gray-700/50";

	const combinedLinkStyle = cn(linkStyle, hoverStyle);

	return (
		<nav className={cn("flex gap-1", isMobile && "flex-col p-5 gap-2")}>
			{isMobile && (
				<div className="flex gap-1">
					<GitPullRequest className="w-6 h-6" />
					<h1 className="text-xl font-semibold">GitHub Issues Tracker</h1>
				</div>
			)}
			<Link
				to="/"
				className={cn(
					combinedLinkStyle,
					location.pathname === "/" && activeLinkStyle,
				)}
			>
				Pinned
			</Link>
			<Link
				to="/issues"
				className={cn(
					combinedLinkStyle,
					location.pathname === "/issues" && activeLinkStyle,
				)}
			>
				Issues
			</Link>
			<Link
				to="/account"
				className={cn(
					combinedLinkStyle,
					location.pathname === "/account" && activeLinkStyle,
				)}
			>
				Account
			</Link>
		</nav>
	);
};
