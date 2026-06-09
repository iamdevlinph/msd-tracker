import { toSentenceCase } from "common-utils-pkg";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useMonsterCodexFilterStore } from "@/components/monster-codex/store/monster-codex-filter-store";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	MONSTERLINGS_SOURCE_DATA,
	SOURCE_ID_BY_SOURCE,
	type SourceId,
} from "@/data/MONSTERLINGS_SOURCE_DATA";
import { cn } from "@/lib/utils";

const COMPLETE_FILTERS = ["all", "completed", "incomplete"] as const;
export type CompletedFilter = (typeof COMPLETE_FILTERS)[number];

export const MonsterCodexFilter = () => {
	const filterCodex = useMonsterCodexFilterStore((s) => s.filterCodex);
	const filters = useMonsterCodexFilterStore((s) => s.filters);

	const [completeFilter, setCompleteFilter] = useState<CompletedFilter>(
		filters.completed ?? "all",
	);
	const [sourceFilter, setSourceFilter] = useState<SourceId>(
		filters.source ?? SOURCE_ID_BY_SOURCE.ALL,
	);
	const [search, setSearch] = useState("");

	useEffect(() => {
		filterCodex({
			source: sourceFilter,
			completed: completeFilter,
			search: search,
		});
	}, [filterCodex, completeFilter, sourceFilter, search]);

	return (
		<div className="flex flex-row gap-2">
			<FieldGroup className="w-42">
				<Field>
					<FieldLabel htmlFor="filter">Filter</FieldLabel>
					<Select
						onValueChange={(e: CompletedFilter) => setCompleteFilter(e)}
						value={completeFilter}
					>
						<SelectTrigger className="" id="filter">
							<SelectValue placeholder="Select filter" />
						</SelectTrigger>
						<SelectContent className="">
							<SelectGroup>
								{COMPLETE_FILTERS.map((filter) => (
									<SelectItem value={filter} key={filter}>
										{toSentenceCase(filter)}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
			</FieldGroup>

			<FieldGroup className="w-42">
				<Field>
					<FieldLabel htmlFor="source">Source</FieldLabel>
					<Select
						onValueChange={(e: string) =>
							setSourceFilter(+e as unknown as SourceId)
						}
						value={sourceFilter.toString()}
					>
						<SelectTrigger className="" id="source">
							<SelectValue placeholder="Select source" />
						</SelectTrigger>
						<SelectContent className="">
							<SelectGroup>
								{Object.values(MONSTERLINGS_SOURCE_DATA).map(
									({ label, id }) => {
										return (
											<SelectItem value={id.toString()} key={id}>
												{label}
											</SelectItem>
										);
									},
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
			</FieldGroup>

			<FieldGroup className="w-70">
				<Field>
					<FieldLabel>Search</FieldLabel>
					<div className="relative w-full max-w-sm">
						<Input
							placeholder="Monsterling name"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							className="max-w-sm"
						/>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className={cn(
								"absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
								"invisible",
								!!search && "visible",
							)}
							onClick={() => setSearch("")}
						>
							<XIcon className="h-4 w-4" />
							<span className="sr-only">Clear</span>
						</Button>
					</div>
				</Field>
			</FieldGroup>
		</div>
	);
};
