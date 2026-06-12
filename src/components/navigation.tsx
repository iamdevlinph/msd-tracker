import { Icon as IconifyIcon } from "@iconify/react";
import { Link, useLocation } from "@tanstack/react-router";
import {
	BookOpenCheck,
	CalendarCheck2,
	type LucideIcon,
	Settings,
	UserRoundCheck,
} from "lucide-react";
import type { JSX } from "react";
import { SeparatorText } from "@/components/separator-text";
import { cn } from "@/lib/utils";
import type { FileRoutesByTo } from "@/routeTree.gen";

type Tab =
	| "events"
	| "characters"
	| "monster-codex"
	| "account"
	| "artifacts"
	| "equipments"
	| "monsterlings";

type NavItem = {
	id: Tab;
	label: string;
	icon:
		| {
				type: "lucide";
				icon: LucideIcon;
		  }
		| { type: "iconify"; icon: JSX.Element };
	link: keyof FileRoutesByTo;
};

type NavSection = {
	title?: string;
	items: NavItem[];
};

const navSections: NavSection[] = [
	{
		items: [
			{
				id: "events",
				label: "Checklist",
				icon: { type: "lucide", icon: CalendarCheck2 },
				link: "/events",
			},
			{
				id: "characters",
				label: "Characters",
				icon: { type: "lucide", icon: UserRoundCheck },

				link: "/characters",
			},
			{
				id: "monster-codex",
				label: "Monster Codex",
				icon: { type: "lucide", icon: BookOpenCheck },
				link: "/monster-codex",
			},
		],
	},
	{
		title: "Inventory",
		items: [
			{
				id: "artifacts",
				label: "Artifacts",
				icon: {
					type: "iconify",
					icon: <IconifyIcon icon="boxicons:sword-filled" />,
				},
				link: "/artifacts",
			},
			{
				id: "monsterlings",
				label: "Monsterlings",
				icon: {
					type: "iconify",
					icon: <IconifyIcon icon="fluent:animal-paw-print-16-filled" />,
				},
				link: "/monsterlings",
			},
			{
				id: "equipments",
				label: "Equipments",
				icon: {
					type: "iconify",
					icon: <IconifyIcon icon="game-icons:shoulder-armor" />,
				},
				link: "/equipments",
			},
		],
	},
	{
		title: "Settings",
		items: [
			{
				id: "account",
				label: "Account",
				icon: { type: "lucide", icon: Settings },
				link: "/account",
			},
		],
	},
];

const linkStyle =
	"w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all text-muted-foreground";
const activeLinkStyle =
	"bg-primary text-primary-foreground font-medium shadow-sm";
const hoverStyle = "hover:text-foreground hover:bg-accent/50";

export const Nav = () => {
	const { pathname } = useLocation();

	return (
		<nav className="flex-1 py-4 px-3 overflow-y-auto">
			<div className="space-y-0.5">
				{navSections.map((section, i) => (
					<div key={section.title ?? i}>
						{section.title && <SeparatorText>{section.title}</SeparatorText>}

						{section.items.map(({ id, label, icon: Icon, link }) => {
							const isActive = pathname === link;

							return (
								<Link
									key={id}
									to={link}
									className={cn(
										linkStyle,
										isActive && activeLinkStyle,
										!isActive && hoverStyle,
									)}
								>
									{Icon.type === "lucide" && (
										<Icon.icon className="size-4 shrink-0" />
									)}
									{Icon.type === "iconify" && Icon.icon}
									<span>{label}</span>
								</Link>
							);
						})}
					</div>
				))}
			</div>
		</nav>
	);
};
