import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { FileRoutesByTo } from "@/routeTree.gen";

export type HomeFeature = {
	title: string;
	description: string;
	to: keyof FileRoutesByTo;
	icon: LucideIcon;
};

export type UpcomingFeature = Omit<HomeFeature, "to">;

type HomeFeatureSectionsProps = {
	features: HomeFeature[];
	upcomingFeatures: UpcomingFeature[];
};

export const HomeFeatureSections = ({
	features,
	upcomingFeatures,
}: HomeFeatureSectionsProps) => (
	<>
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
	</>
);
