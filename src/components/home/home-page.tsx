import {
	Blocks,
	BookOpenCheck,
	CalendarCheck2,
	Gem,
	PawPrint,
	ShieldCheck,
	UserRoundCheck,
} from "lucide-react";
import {
	type HomeFeature,
	HomeFeatureSections,
	type UpcomingFeature,
} from "@/components/home/home-feature-sections";
import { HomeHero } from "@/components/home/home-hero";
import {
	HomeProgress,
	type HomeStatistic,
} from "@/components/home/home-progress";
import { useCodexStore } from "@/components/monster-codex/store/codex-store";
import { useAppStore } from "@/stores/app-store";

const features: HomeFeature[] = [
	{
		title: "Characters",
		description:
			"Track owned characters, awakening levels, and skill progress.",
		to: "/characters",
		icon: UserRoundCheck,
	},
	{
		title: "Monsterlings",
		description:
			"Organize regular and legendary monsterlings in your collection.",
		to: "/monsterlings",
		icon: PawPrint,
	},
	{
		title: "Monster Codex",
		description: "Record cleared encounters and keep favorite targets close.",
		to: "/monster-codex",
		icon: BookOpenCheck,
	},
	{
		title: "Loadouts",
		description:
			"Build teams from owned characters and assign their monsterlings.",
		to: "/loadouts",
		icon: Blocks,
	},
];

const upcomingFeatures: UpcomingFeature[] = [
	{
		title: "Event Checklist",
		description: "Keep event tasks and limited-time goals organized.",
		icon: CalendarCheck2,
	},
	{
		title: "Artifacts",
		description: "Catalog owned artifacts and their important details.",
		icon: Gem,
	},
	{
		title: "Equipment",
		description: "Manage equipment across slots and categories.",
		icon: ShieldCheck,
	},
	{
		title: "Complete Loadouts",
		description: "Assign artifacts and equipment to each loadout character.",
		icon: Blocks,
	},
];

export const HomePage = () => {
	const charactersOwned = useAppStore((state) => state.charactersOwned);
	const monsterlingsOwned = useAppStore((state) => state.monsterlingsOwned);
	const monsterCodexCompleted = useAppStore(
		(state) => state.monsterCodexCompleted,
	);
	const loadouts = useAppStore((state) => state.loadouts);
	const isHydrated = useAppStore((state) => state.isHydrated);
	const setCodexFilters = useCodexStore((state) => state.setCodexFilters);
	const statistics: HomeStatistic[] = [
		{
			label: "Characters owned",
			value: Object.keys(charactersOwned).length,
			to: "/characters",
			icon: UserRoundCheck,
		},
		{
			label: "Monsterlings owned",
			value: Object.keys(monsterlingsOwned).length,
			to: "/monsterlings",
			icon: PawPrint,
		},
		{
			label: "Codex cleared",
			value: monsterCodexCompleted.length,
			to: "/monster-codex",
			icon: BookOpenCheck,
		},
		{
			label: "Loadouts created",
			value: Object.keys(loadouts).length,
			to: "/loadouts",
			icon: Blocks,
		},
	];

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-10 pb-8">
			<HomeHero />
			<HomeProgress
				statistics={statistics}
				isHydrated={isHydrated}
				onNavigate={(to) => {
					if (to === "/monster-codex") {
						setCodexFilters({ view: "completed" });
					}
				}}
			/>
			<HomeFeatureSections
				features={features}
				upcomingFeatures={upcomingFeatures}
			/>
		</div>
	);
};
