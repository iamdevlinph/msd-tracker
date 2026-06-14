import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { SelectOption } from "@/constants";
import { cn } from "@/lib/utils";

type SelectInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	options: SelectOption[];
	label?: string;
	className?: string;
};

export const SelectInput = <T extends FieldValues>({
	name,
	control,
	options,
	label = "",
	className,
}: SelectInputProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field
					orientation="responsive"
					data-invalid={fieldState.invalid}
					className={cn("flex flex-row", className)}
				>
					{!!label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
					<Select
						name={field.name}
						value={field.value}
						onValueChange={field.onChange}
					>
						<SelectTrigger id={name} aria-invalid={fieldState.invalid}>
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent position="item-aligned">
							{options.map(({ label, value }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			)}
		/>
	);
};
