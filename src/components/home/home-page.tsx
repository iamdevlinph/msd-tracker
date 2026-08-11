import {
	Blocks,
	BookOpenCheck,
	CalendarCheck2,
	Camera,
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
import {
	CODEX_VIEW,
	useCodexStore,
} from "@/components/monster-codex/store/codex-store";
import { useAppStore } from "@/stores/app-store";

const features: HomeFeature[] = [
	{
		title: "Checklist",
		description: "Keep event tasks and recurring goals organized.",
		to: "/checklist",
		icon: CalendarCheck2,
	},
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
		title: "Link Chains",
		description:
			"Track shared Link Chain levels across every Monsterling species.",
		to: "/link-chains",
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
	{
		title: "Loadout Snapshots",
		description: "Record and share the loadout state used for a clear.",
		to: "/loadout-snapshots",
		icon: Camera,
	},
	{
		title: "Artifacts",
		description: "Catalog owned artifacts and their fusion levels.",
		to: "/artifacts",
		icon: Gem,
	},
];

const upcomingFeatures: UpcomingFeature[] = [
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
	const loadoutSnapshots = useAppStore((state) => state.loadoutSnapshots);
	const artifactsOwned = useAppStore((state) => state.artifactsOwned);
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
			label: "Artifacts owned",
			value: Object.keys(artifactsOwned).length,
			to: "/artifacts",
			icon: Gem,
		},
		{
			label: "Loadouts created",
			value: Object.keys(loadouts).length,
			to: "/loadouts",
			icon: Blocks,
		},
		{
			label: "Loadout snapshots",
			value: Object.keys(loadoutSnapshots).length,
			to: "/loadout-snapshots",
			icon: Camera,
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
						setCodexFilters({ view: CODEX_VIEW.COMPLETED });
					}
				}}
			/>
			<HomeFeatureSections features={features} upcomingFeatures={[]} />
		</div>
	);
};
