import { toTitleCase } from "common-utils-pkg";
import { Fragment } from "react";
import { useCodexStore } from "@/components/monster-codex/store/codex-store";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { REGIONS_DATA } from "@/data/REGIONS_DATA";
import { cn } from "@/lib/utils";

export const CodexRegions = () => {
	const setCodexFilters = useCodexStore((s) => s.setCodexFilters);
	const filters = useCodexStore((s) => s.filters);

	return (
		<ScrollArea className="">
			<div className="flex flex-row">
				{Object.values(REGIONS_DATA).map((region) => {
					const regionNameTitleCase = toTitleCase(region.region);
					return (
						<Card
							key={region.id}
							className={cn(
								"cursor-pointer",
								"bg-background border-background opacity-50",
								filters.region === region.id &&
									"bg-card border-initial border-b-0 rounded-b-none shadow-none opacity-100",
							)}
							onClick={() => setCodexFilters({ region: region.id })}
						>
							<CardContent className="w-32 flex flex-col justify-center items-center">
								<img
									src={region.image}
									width="50"
									height="50"
									alt={`${region.region} map icon`}
								/>
								<h1 className="text-center break-keep whitespace-nowrap">
									{/* {toTitleCase(region.region)} */}
									{/* {toTitleCase()} */}
									{regionNameTitleCase.split(" ").map((word, index) => (
										<Fragment key={word}>
											{index > 0 && <br />}
											{word}
										</Fragment>
									))}
								</h1>
							</CardContent>
						</Card>
					);
				})}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};
