import { Icon as IconifyIcon } from "@iconify/react";
import { Link, useLocation } from "@tanstack/react-router";
import {
	Blocks,
	BookOpenCheck,
	CalendarCheck2,
	Camera,
	type LucideIcon,
	Settings,
	UserRound,
	UserRoundCheck,
} from "lucide-react";
import type { JSX } from "react";
import { NavigationHiddenInfo } from "@/components/navigation-hidden-info";
import { SeparatorText } from "@/components/shared/separator-text";
import { cn } from "@/lib/utils";
import type { FileRoutesByTo } from "@/routeTree.gen";

type Tab =
	| "checklist"
	| "characters"
	| "monster-codex"
	| "account"
	| "settings"
	| "artifacts"
	| "equipments"
	| "monsterlings"
	| "link-chains"
	| "loadouts"
	| "loadout-snapshots";

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
	hidden?: boolean;
};

type NavSection = {
	title?: string;
	items: NavItem[];
	hidden?: boolean;
};

const navSections: NavSection[] = [
	{
		items: [
			{
				id: "checklist",
				label: "Checklist",
				icon: { type: "lucide", icon: CalendarCheck2 },
				link: "/checklist",
			},
			{
				id: "loadouts",
				label: "Loadouts",
				icon: { type: "lucide", icon: Blocks },
				link: "/loadouts",
			},
			{
				id: "loadout-snapshots",
				label: "Loadout Snapshots",
				icon: { type: "lucide", icon: Camera },
				link: "/loadout-snapshots",
			},
		],
	},
	{
		title: "Inventory",
		items: [
			{
				id: "characters",
				label: "Characters",
				icon: { type: "lucide", icon: UserRoundCheck },
				link: "/characters",
			},
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
				hidden: true,
			},
		],
	},
	{
		title: "Monsterlings",
		items: [
			{
				id: "monster-codex",
				label: "Monster Codex",
				icon: { type: "lucide", icon: BookOpenCheck },
				link: "/monster-codex",
			},
			{
				id: "link-chains",
				label: "Link Chains",
				icon: {
					type: "iconify",
					icon: <IconifyIcon icon="mdi:link-variant" />,
				},
				link: "/link-chains",
			},
		],
	},
	{
		title: "Others",
		items: [
			{
				id: "account",
				label: "Account",
				icon: { type: "lucide", icon: UserRound },
				link: "/account",
			},
			{
				id: "settings",
				label: "Settings",
				icon: { type: "lucide", icon: Settings },
				link: "/settings",
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
	const showHiddenCatalog = import.meta.env.VITE_NODE_ENV === "development";

	return (
		<nav className="flex-1 py-4 px-3 overflow-y-auto">
			<div className="space-y-0.5">
				{navSections.map((section, i) => (
					<div key={section.title ?? i}>
						{section.title && !section.hidden && (
							<SeparatorText>{section.title}</SeparatorText>
						)}

						{section.items.map(({ id, label, icon: Icon, link, hidden }) => {
							if (hidden) return null;

							const isActive = pathname === link;

							const hasDetails =
								showHiddenCatalog &&
								(id === "characters" || id === "artifacts");
							return (
								<div key={id} className="flex items-center">
									<Link
										to={link}
										className={cn(
											linkStyle,
											hasDetails && "w-auto flex-1",
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
									{hasDetails && <NavigationHiddenInfo catalog={id} />}
								</div>
							);
						})}
					</div>
				))}
			</div>
		</nav>
	);
};
