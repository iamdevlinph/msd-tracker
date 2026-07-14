import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Blocks,
	BookOpenCheck,
	CalendarCheck2,
	Gem,
	PawPrint,
	ShieldCheck,
	Sparkles,
	UserRoundCheck,
} from "lucide-react";
import { useCodexStore } from "@/components/monster-codex/store/codex-store";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";

const features = [
	{
		title: "Characters",
		description:
			"Track owned characters, awakening levels, and skill progress.",
		to: "/characters" as const,
		icon: UserRoundCheck,
	},
	{
		title: "Monsterlings",
		description:
			"Organize regular and legendary monsterlings in your collection.",
		to: "/monsterlings" as const,
		icon: PawPrint,
	},
	{
		title: "Monster Codex",
		description: "Record cleared encounters and keep favorite targets close.",
		to: "/monster-codex" as const,
		icon: BookOpenCheck,
	},
	{
		title: "Loadouts",
		description:
			"Build teams from owned characters and assign their monsterlings.",
		to: "/loadouts" as const,
		icon: Blocks,
	},
];

const upcomingFeatures = [
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

	const statistics = [
		{
			label: "Characters owned",
			value: Object.keys(charactersOwned).length,
			to: "/characters" as const,
			icon: UserRoundCheck,
		},
		{
			label: "Monsterlings owned",
			value: Object.keys(monsterlingsOwned).length,
			to: "/monsterlings" as const,
			icon: PawPrint,
		},
		{
			label: "Codex cleared",
			value: monsterCodexCompleted.length,
			to: "/monster-codex" as const,
			icon: BookOpenCheck,
		},
		{
			label: "Loadouts created",
			value: Object.keys(loadouts).length,
			to: "/loadouts" as const,
			icon: Blocks,
		},
	];

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-10 pb-8">
			<section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-card to-card px-6 py-10 shadow-sm sm:px-10 sm:py-12">
				<div
					className="absolute -right-16 -top-20 size-64 rounded-full bg-primary/10 blur-3xl"
					aria-hidden="true"
				/>
				<div className="relative max-w-3xl">
					<div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
						<Sparkles className="size-3.5 text-primary" aria-hidden="true" />
						Mongil: Star Dive Tracker
					</div>
					<h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
						Welcome back, Adventurer
					</h1>
					<p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
						Keep your roster, monsterlings, codex progress, and team loadouts
						organized in one place.
					</p>
				</div>
			</section>

			<section aria-labelledby="progress-heading">
				<div className="mb-4">
					<h2
						id="progress-heading"
						className="text-2xl font-semibold tracking-tight"
					>
						Your progress
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						A quick look at everything you have tracked so far.
					</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{statistics.map(({ label, value, to, icon: Icon }) => (
						<Link
							key={label}
							to={to}
							aria-label={`View ${label}`}
							onClick={
								to === "/monster-codex"
									? () => setCodexFilters({ view: "completed" })
									: undefined
							}
							className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						>
							<Card className="h-full gap-4 py-5 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
								<CardHeader className="flex grid-cols-none flex-row items-center justify-between px-5">
									<CardDescription className="font-medium">
										{label}
									</CardDescription>
									<span className="rounded-lg bg-primary/10 p-2 text-primary">
										<Icon className="size-4" aria-hidden="true" />
									</span>
								</CardHeader>
								<CardContent className="flex items-end justify-between px-5">
									<span className="text-3xl font-bold tabular-nums">
										{isHydrated ? value : "—"}
									</span>
									<ArrowRight
										className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
										aria-hidden="true"
									/>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</section>

			<section aria-labelledby="features-heading">
				<div className="mb-4">
					<h2
						id="features-heading"
						className="text-2xl font-semibold tracking-tight"
					>
						Explore the tracker
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Jump into any part of your collection.
					</p>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{features.map(({ title, description, to, icon: Icon }) => (
						<Link
							key={title}
							to={to}
							aria-label={`Explore ${title}`}
							className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						>
							<Card className="h-full gap-4 py-5 transition-all group-hover:border-primary/40 group-hover:bg-accent/30 group-hover:shadow-md">
								<CardHeader className="grid-cols-[auto_1fr_auto] items-center gap-x-4 px-5">
									<span className="row-span-2 rounded-xl bg-primary/10 p-3 text-primary">
										<Icon className="size-5" aria-hidden="true" />
									</span>
									<CardTitle>{title}</CardTitle>
									<CardDescription className="col-start-2 leading-5">
										{description}
									</CardDescription>
									<ArrowRight
										className="col-start-3 row-span-2 row-start-1 size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
										aria-hidden="true"
									/>
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>
			</section>

			<section aria-labelledby="upcoming-heading">
				<div className="mb-4 flex items-end justify-between gap-4">
					<div>
						<h2
							id="upcoming-heading"
							className="text-2xl font-semibold tracking-tight"
						>
							Coming next
						</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							More ways to plan and track your account are on the roadmap.
						</p>
					</div>
					<span className="hidden rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
						Planned
					</span>
				</div>
				<div className="grid gap-3 sm:grid-cols-2">
					{upcomingFeatures.map(({ title, description, icon: Icon }) => (
						<Card
							key={title}
							className="gap-3 border-dashed bg-muted/20 py-4 shadow-none"
						>
							<CardHeader className="grid-cols-[auto_1fr] items-center gap-x-3 px-4">
								<span className="row-span-2 rounded-lg border bg-background p-2 text-muted-foreground">
									<Icon className="size-4" aria-hidden="true" />
								</span>
								<CardTitle className="text-sm">{title}</CardTitle>
								<CardDescription className="col-start-2 leading-5">
									{description}
								</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
};
