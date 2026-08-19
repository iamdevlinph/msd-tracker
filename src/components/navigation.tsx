import { Icon as IconifyIcon } from "@iconify/react";
import { Link, useLocation } from "@tanstack/react-router";
import {
	Blocks,
	BookOpenCheck,
	CalendarCheck2,
	Camera,
	type LucideIcon,
	Settings,
	UserRoundCheck,
} from "lucide-react";
import type { JSX } from "react";
import { isArtifactVisible } from "@/components/artifacts/utils/artifact-utils";
import { isCharacterVisible } from "@/components/characters/utils/character-utils";
import { SeparatorText } from "@/components/shared/separator-text";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { cn } from "@/lib/utils";
import type { FileRoutesByTo } from "@/routeTree.gen";

type Tab =
	| "checklist"
	| "characters"
	| "monster-codex"
	| "account"
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
	const showHiddenCatalog = import.meta.env.VITE_NODE_ENV === "development";
	const hiddenCharacterCount = showHiddenCatalog
		? Object.values(CHARACTERS_DATA).filter(
				({ is_hidden }) => is_hidden && isCharacterVisible({ is_hidden }),
			).length
		: 0;
	const hiddenArtifactCount = showHiddenCatalog
		? Object.values(ARTIFACTS_DATA).filter(
				({ is_hidden }) => is_hidden && isArtifactVisible({ is_hidden }),
			).length
		: 0;

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
									<span>
										{id === "characters" && showHiddenCatalog
											? `${label} (${hiddenCharacterCount})`
											: id === "artifacts" && showHiddenCatalog
												? `${label} (${hiddenArtifactCount})`
												: label}
									</span>
								</Link>
							);
						})}
					</div>
				))}
			</div>
		</nav>
	);
};
