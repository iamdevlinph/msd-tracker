import { toSentenceCase } from "common-utils-pkg";
import { useEffect, useState } from "react";
import { REGIONS_DATA } from "@/components/monster-codex/data/REGIONS_DATA";
import { useMonsterCodexStore } from "@/components/monster-codex/store/monster-codex-store";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const REGIONS = REGIONS_DATA.map((item) => item.region);

export type MonsterCodexRegions = (typeof REGIONS)[number];

export const Regions = () => {
	const filterCodex = useMonsterCodexStore((s) => s.filterCodex);

	const [activeRegion, setActiveRegion] =
		useState<(typeof REGIONS)[number]>("elendor");

	useEffect(() => {
		filterCodex({ region: activeRegion });
	}, [filterCodex, activeRegion]);

	return (
		<div className="flex flex-row">
			{REGIONS.map((region) => {
				return (
					<Card
						key={region}
						className={cn(
							"cursor-pointer",
							"bg-background border-background ",
							activeRegion === region &&
								"bg-card border-initial border-b-0 rounded-b-none shadow-none",
						)}
						onClick={() => setActiveRegion(region)}
					>
						<CardContent className="text-center w-32">
							<h1>{toSentenceCase(region)}</h1>
							<small>{"82.6%"}</small>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};
