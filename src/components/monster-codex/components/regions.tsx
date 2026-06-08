import { toSentenceCase } from "common-utils-pkg";
import { useEffect, useState } from "react";
import { REGIONS_DATA } from "@/components/monster-codex/data/REGIONS_DATA";
import type { MonsterCodexRegion } from "@/components/monster-codex/store/monster-codex-constants";
import { useMonsterCodexStore } from "@/components/monster-codex/store/monster-codex-store";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Regions = () => {
	const filterCodex = useMonsterCodexStore((s) => s.filterCodex);

	const [activeRegion, setActiveRegion] =
		useState<MonsterCodexRegion>("elendor");

	useEffect(() => {
		filterCodex({ region: activeRegion });
	}, [filterCodex, activeRegion]);

	return (
		<div className="flex flex-row">
			{REGIONS_DATA.map((region) => {
				return (
					<Card
						key={region.id}
						className={cn(
							"cursor-pointer",
							"bg-background border-background opacity-50",
							activeRegion === region.region &&
								"bg-card border-initial border-b-0 rounded-b-none shadow-none opacity-100",
						)}
						onClick={() => setActiveRegion(region.region)}
					>
						<CardContent className="w-32 flex flex-col justify-center items-center">
							<img
								src={region.image}
								width="50"
								height="50"
								alt={`${region.region} map icon`}
							/>
							<h1>{toSentenceCase(region.region)}</h1>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};
