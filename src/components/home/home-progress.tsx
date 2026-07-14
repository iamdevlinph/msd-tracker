import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import type { FileRoutesByTo } from "@/routeTree.gen";

export type HomeStatistic = {
	label: string;
	value: number;
	to: keyof FileRoutesByTo;
	icon: LucideIcon;
};

type HomeProgressProps = {
	statistics: HomeStatistic[];
	isHydrated: boolean;
	onNavigate: (to: keyof FileRoutesByTo) => void;
};

export const HomeProgress = ({
	statistics,
	isHydrated,
	onNavigate,
}: HomeProgressProps) => (
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
					onClick={() => onNavigate(to)}
					className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<Card className="h-full gap-4 py-5 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
						<CardHeader className="flex grid-cols-none flex-row items-center justify-between px-5">
							<CardDescription className="font-medium">{label}</CardDescription>
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
);
