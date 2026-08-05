import { toSentenceCase } from "common-utils-pkg";
import {
	CODEX_VIEWS,
	type CodexView,
	useCodexStore,
} from "@/components/monster-codex/store/codex-store";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SearchInput } from "@/components/ui/search-input";
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
} from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";

export const CodexFilter = () => {
	const setCodexFilters = useCodexStore((s) => s.setCodexFilters);
	const resetCodexFilters = useCodexStore((s) => s.resetCodexFilters);
	const filters = useCodexStore((s) => s.filters);
	const { selectedSources, view, search } = filters;
	const sourceOptions = Object.values(MONSTERLINGS_SOURCE_DATA).filter(
		({ id }) => id !== SOURCE_ID_BY_SOURCE.ALL,
	);
	const sourceLabel =
		selectedSources.length === 0
			? "All sources"
			: selectedSources.length === 1
				? MONSTERLINGS_SOURCE_DATA[selectedSources[0]].label
				: `${selectedSources.length} sources`;

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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								id="source"
								variant="outline"
								className="w-full justify-between"
							>
								{sourceLabel}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-56">
							<DropdownMenuLabel>Source</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem
								checked={selectedSources.length === 0}
								onSelect={(event) => event.preventDefault()}
								onCheckedChange={() => setCodexFilters({ selectedSources: [] })}
							>
								All sources
							</DropdownMenuCheckboxItem>
							{sourceOptions.map(({ label, id }) => (
								<DropdownMenuCheckboxItem
									key={id}
									checked={selectedSources.includes(id as SourceId)}
									onSelect={(event) => event.preventDefault()}
									onCheckedChange={(checked) => {
										const next = checked
											? [...selectedSources, id as SourceId]
											: selectedSources.filter((sourceId) => sourceId !== id);
										setCodexFilters({ selectedSources: next });
									}}
								>
									{label}
								</DropdownMenuCheckboxItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</Field>
			</FieldGroup>

			<FieldGroup className="w-full sm:w-2/12">
				<Field>
					<FieldLabel htmlFor="codex-search">Search</FieldLabel>
					<SearchInput
						id="codex-search"
						placeholder="Monsterling name"
						value={search}
						onValueChange={(value) => setCodexFilters({ search: value })}
						onFocus={(event) => event.currentTarget.select()}
						className="w-full sm:max-w-sm"
					/>
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
