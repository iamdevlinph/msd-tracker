import { toSentenceCase } from "common-utils-pkg";

import { useCodexStore } from "@/components/monster-codex/store/codex-store";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { REGIONS_DATA } from "@/data/REGIONS_DATA";
import { cn } from "@/lib/utils";

export const CodexRegions = () => {
	const filterCodex = useCodexStore((s) => s.filterCodex);
	const filters = useCodexStore((s) => s.filters);

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
								filters.region === region.id &&
									"bg-card border-initial border-b-0 rounded-b-none shadow-none opacity-100",
							)}
							onClick={() => filterCodex({ ...filters, region: region.id })}
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
