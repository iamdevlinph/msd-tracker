import { toSentenceCase } from "common-utils-pkg";
import { useEffect, useState } from "react";
import { MONSTERLINGS_SOURCE_DATA } from "@/components/monster-codex/data/MONSTERLINGS_SOURCE_DATA";
import {
	COMPLETE_FILTERS,
	type CompletedFilter,
	type MonsterCodexSource,
} from "@/components/monster-codex/store/monster-codex-constants";
import { useMonsterCodexStore } from "@/components/monster-codex/store/monster-codex-store";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const FilterOptions = () => {
	const filterCodex = useMonsterCodexStore((s) => s.filterCodex);
	const filters = useMonsterCodexStore((s) => s.filters);

	const [completeFilter, setCompleteFilter] = useState<CompletedFilter>(
		filters.completed ?? "all",
	);
	const [sourceFilter, setSourceFilter] = useState<MonsterCodexSource>(
		filters.source ?? "all",
	);

	useEffect(() => {
		filterCodex({ source: sourceFilter, completed: completeFilter });
	}, [filterCodex, completeFilter, sourceFilter]);

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
						onValueChange={(e: MonsterCodexSource) => setSourceFilter(e)}
						value={sourceFilter}
					>
						<SelectTrigger className="" id="source">
							<SelectValue placeholder="Select source" />
						</SelectTrigger>
						<SelectContent className="">
							<SelectGroup>
								{Object.values(MONSTERLINGS_SOURCE_DATA).map(
									({ source, label }) => {
										return (
											<SelectItem value={source} key={source}>
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
		</div>
	);
};
