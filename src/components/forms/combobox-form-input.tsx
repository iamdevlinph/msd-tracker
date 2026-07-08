"use client";

import type { JSX } from "react";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import type { SelectOption } from "@/constants";
import { cn } from "@/lib/utils";

type ComboboxInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	options: SelectOption[];
	placeholder?: string;
	selectValueType?: string | "number";
	renderItem: (item: SelectOption) => JSX.Element;
	getLabel: (value: string) => string;
};

export const ComboboxFormInput = <T extends FieldValues>({
	name,
	control,
	label,
	options,
	placeholder = "Select...",
	selectValueType = "string",
	renderItem,
	getLabel,
}: ComboboxInputProps<T>) => {
	const items = options.map((o) => ({
		label: getLabel(o.value),
		value: o.value,
	}));

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return (
					<Field
						orientation="responsive"
						data-invalid={fieldState.invalid}
						className="flex flex-col sm:flex-row"
					>
						{!!label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

						<Combobox
							items={items}
							// value={MONSTERLINGS_DATA[field.value].name}
							value={getLabel(field.value)}
							onValueChange={(e) => {
								if (e) field.onChange(selectValueType === "string" ? e : +e);
							}}
						>
							<ComboboxInput
								placeholder={placeholder}
								className={cn(fieldState.invalid && "border-red-500")}
							/>

							<ComboboxContent>
								<ComboboxEmpty>No results found.</ComboboxEmpty>

								<ComboboxList>{renderItem}</ComboboxList>
							</ComboboxContent>
						</Combobox>
					</Field>
				);
			}}
		/>
	);
};
