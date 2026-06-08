import { toSentenceCase } from "common-utils-pkg";
import { useEffect } from "react";
import {
	MONSTER_CODEX_SOURCE,
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
	const filterBySource = useMonsterCodexStore((s) => s.filterBySource);

	useEffect(() => {
		filterBySource({ source: "all" });
	}, [filterBySource]);

	return (
		<div className="flex flex-row gap-2">
			<FieldGroup className="w-42">
				<Field>
					<FieldLabel htmlFor="filter">Filter</FieldLabel>
					<Select>
						<SelectTrigger className="" id="filter">
							<SelectValue placeholder="Select filter" />
						</SelectTrigger>
						<SelectContent className="">
							<SelectGroup>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
								<SelectItem value="not-completed">Not Completed</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
			</FieldGroup>

			<FieldGroup className="w-42">
				<Field>
					<FieldLabel htmlFor="source">Source</FieldLabel>
					<Select
						onValueChange={(e: MonsterCodexSource) =>
							filterBySource({ source: e })
						}
					>
						<SelectTrigger className="" id="source">
							<SelectValue placeholder="Select source" />
						</SelectTrigger>
						<SelectContent className="">
							<SelectGroup>
								{MONSTER_CODEX_SOURCE.map((value) => {
									return (
										<SelectItem value={value} key={value}>
											{toSentenceCase(value)}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
			</FieldGroup>
		</div>
	);
};
