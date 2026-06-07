import { toSentenceCase } from "common-utils-pkg";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const REGIONS = [
	"elendor",
	"varhine",
	"serenia",
	"surah",
	"namryung",
	"muwon",
] as const;

export const Regions = () => {
	const [activeRegion, setActiveRegion] =
		useState<(typeof REGIONS)[number]>("elendor");
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
