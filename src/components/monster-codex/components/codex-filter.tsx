import { toSentenceCase } from "common-utils-pkg";
import { XIcon } from "lucide-react";
import {
	CODEX_VIEWS,
	type CodexView,
	useCodexStore,
} from "@/components/monster-codex/store/codex-store";
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
	type SourceId,
} from "@/data/MONSTERLINGS_SOURCE_DATA";
import { cn } from "@/lib/utils";

export const CodexFilter = () => {
	const setCodexFilters = useCodexStore((s) => s.setCodexFilters);
	const resetCodexFilters = useCodexStore((s) => s.resetCodexFilters);
	const filters = useCodexStore((s) => s.filters);
	const { source, view, search } = filters;

	return (
		<div className="flex flex-row gap-2 flex-wrap">
			<FieldGroup className="w-full sm:w-2/12">
				<Field>
					<FieldLabel htmlFor="filter">Filter</FieldLabel>
					<Select
						onValueChange={(view: CodexView) => setCodexFilters({ view })}
						value={view}
					>
						<SelectTrigger className="" id="filter">
							<SelectValue placeholder="Select filter" />
						</SelectTrigger>
						<SelectContent className="">
							<SelectGroup>
								{CODEX_VIEWS.map((filter) => (
									<SelectItem value={filter} key={filter}>
										{toSentenceCase(filter)}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
			</FieldGroup>

			<FieldGroup className="w-full sm:w-2/12">
				<Field>
					<FieldLabel htmlFor="source">Source</FieldLabel>
					<Select
						onValueChange={(e: string) =>
							setCodexFilters({ source: +e as SourceId })
						}
						value={source?.toString()}
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

			<FieldGroup className="w-full sm:w-2/12">
				<Field>
					<FieldLabel>Search</FieldLabel>
					<div className="">
						<Input
							placeholder="Monsterling name"
							value={search}
							onChange={(event) =>
								setCodexFilters({ search: event.target.value })
							}
							onFocus={(event) => event.currentTarget.select()}
							className="w-full sm:max-w-sm"
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
							onClick={() => setCodexFilters({ search: "" })}
						>
							<XIcon className="h-4 w-4" />
							<span className="sr-only">Clear</span>
						</Button>
					</div>
				</Field>
			</FieldGroup>

			<FieldGroup className="w-full sm:w-3/12 md:w-2/12 self-end">
				<Field>
					<Button
						className="w-full sm:w-auto"
						variant={"outline"}
						onClick={resetCodexFilters}
					>
						Reset Filters
					</Button>
				</Field>
			</FieldGroup>
		</div>
	);
};
