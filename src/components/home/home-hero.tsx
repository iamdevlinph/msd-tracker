import { Sparkles } from "lucide-react";

export const HomeHero = () => (
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
				Mongil: Star Dive Tracker for Players
			</h1>
			<p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
				Keep your roster, monsterlings, codex progress, and team loadouts
				organized in one place.
			</p>
		</div>
	</section>
);
