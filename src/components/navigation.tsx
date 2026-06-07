import { Link, useLocation } from "@tanstack/react-router";
import { CheckSquare, MapPin, Users } from "lucide-react";

import { cn } from "@/lib/utils";

type Tab = "events" | "characters" | "monsterlings";

const navigation = [
	{ id: "events" as Tab, label: "Events", icon: CheckSquare, link: "/events" },
	{
		id: "characters" as Tab,
		label: "Characters",
		icon: Users,
		link: "/characters",
	},
	{
		id: "monster-codex" as Tab,
		label: "Monster Codex",
		icon: MapPin,
		link: "/monster-codex",
	},
];

const linkStyle =
	"w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-accent/50";
const activeLinkStyle =
	"bg-primary text-primary-foreground font-medium shadow-sm";

export const Nav = ({ isMobile }: { isMobile?: boolean }) => {
	const location = useLocation();

	return (
		<nav className="flex-1 py-4 px-3 overflow-y-auto">
			<div className="space-y-0.5">
				{navigation.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.id}
							className={cn(
								linkStyle,
								location.pathname === item.link && activeLinkStyle,
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
