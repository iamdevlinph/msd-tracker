import { Link, useLocation } from "@tanstack/react-router";
import {
	BookOpenCheck,
	CalendarCheck2,
	type LucideIcon,
	Settings,
	UserRoundCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileRoutesByTo } from "@/routeTree.gen";

type Tab = "events" | "characters" | "monster-codex" | "account";

type Navigation = {
	id: Tab;
	label: string;
	icon: LucideIcon;
	link: keyof FileRoutesByTo;
}[];

const navigation: Navigation = [
	{ id: "events", label: "Events", icon: CalendarCheck2, link: "/events" },
	{
		id: "characters",
		label: "Characters",
		icon: UserRoundCheck,
		link: "/characters",
	},
	{
		id: "monster-codex",
		label: "Monster Codex",
		icon: BookOpenCheck,
		link: "/monster-codex",
	},
	{
		id: "account",
		label: "Account",
		icon: Settings,
		link: "/account",
	},
];

const linkStyle =
	"w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all text-muted-foreground";
const activeLinkStyle =
	"bg-primary text-primary-foreground font-medium shadow-sm";
const hoverStyle = "hover:text-foreground hover:bg-accent/50";

export const Nav = () => {
	const location = useLocation();

	return (
		<nav className="flex-1 py-4 px-3 overflow-y-auto">
			<div className="space-y-0.5">
				{navigation.map((item) => {
					const isActive = location.pathname === item.link;
					const Icon = item.icon;
					return (
						<Link
							key={item.id}
							className={cn(
								linkStyle,
								isActive && activeLinkStyle,
								!isActive && hoverStyle,
							)}
							to={item.link}
						>
							<Icon className="size-4 shrink-0" />
							<span>{item.label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
};
