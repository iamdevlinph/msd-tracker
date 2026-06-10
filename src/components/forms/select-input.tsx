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

type SelectInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label: string;
	options: { label: string; value: string }[];
};

export const SelectInput = <T extends FieldValues>({
	name,
	control,
	label,
	options,
}: SelectInputProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field
					orientation="responsive"
					data-invalid={fieldState.invalid}
					className="flex flex-row"
				>
					<FieldLabel htmlFor={name}>{label}</FieldLabel>
					<Select
						name={field.name}
						value={field.value}
						onValueChange={field.onChange}
					>
						<SelectTrigger
							id="char-details-form-awakening"
							aria-invalid={fieldState.invalid}
						>
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
