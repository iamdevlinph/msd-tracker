import { toSentenceCase } from "common-utils-pkg";
import { useEffect, useState } from "react";

import { useMonsterCodexStore } from "@/components/monster-codex/store/monster-codex-store";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	REGION_ID_BY_REGION,
	REGIONS_DATA,
	type RegionId,
} from "@/data/REGIONS_DATA";
import { cn } from "@/lib/utils";

export const Regions = () => {
	const filterCodex = useMonsterCodexStore((s) => s.filterCodex);
	const filters = useMonsterCodexStore((s) => s.filters);

	const [activeRegion, setActiveRegion] = useState<RegionId>(
		filters.region ?? REGION_ID_BY_REGION.ALL,
	);

	useEffect(() => {
		filterCodex({ region: activeRegion });
	}, [filterCodex, activeRegion]);

	return (
		<ScrollArea className="">
			<div className="flex flex-row">
				{Object.values(REGIONS_DATA).map((region) => {
					return (
						<Card
							key={region.id}
							className={cn(
								"cursor-pointer",
								"bg-background border-background opacity-50",
								activeRegion === region.id &&
									"bg-card border-initial border-b-0 rounded-b-none shadow-none opacity-100",
							)}
							onClick={() => setActiveRegion(region.id)}
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
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};
