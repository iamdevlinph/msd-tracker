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
					<Select>
						<SelectTrigger className="" id="source">
							<SelectValue placeholder="Select source" />
						</SelectTrigger>
						<SelectContent className="">
							<SelectGroup>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="capture">Capture</SelectItem>
								<SelectItem value="mutation">Mutation</SelectItem>
								<SelectItem value="conquest">Conquest</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
			</FieldGroup>
		</div>
	);
};
