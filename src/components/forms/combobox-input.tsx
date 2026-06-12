"use client";

import { useMemo } from "react";
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
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import type { SelectOption } from "@/constants";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";

type ComboboxInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label: string;
	options: SelectOption[];
	placeholder?: string;
	selectValueType?: string | "number";
};

export const ComboboxFormInput = <T extends FieldValues>({
	name,
	control,
	label,
	options,
	placeholder = "Select...",
	selectValueType = "string",
}: ComboboxInputProps<T>) => {
	// const items = useMemo(() => options.map((o) => o.value), [options]);
	const items = useMemo(
		() =>
			options.map((o) => ({
				label: MONSTERLINGS_DATA[+o.value].name,
				value: o.value,
			})),
		[options],
	);

	const renderItem = useMemo(() => {
		return (item: SelectOption) => {
			const monster = MONSTERLINGS_DATA[+item.value];

			return (
				<ComboboxItem key={+item.value} value={item.value}>
					<img
						src={monster.image}
						alt={monster.name}
						width={30}
						height={30}
						loading="lazy"
					/>
					<p className="ellipses truncate" title={monster.name}>
						{monster.name}
					</p>
				</ComboboxItem>
			);
		};
	}, []);

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
						<FieldLabel htmlFor={name}>{label}</FieldLabel>

						<Combobox
							items={items}
							value={MONSTERLINGS_DATA[field.value].name}
							onValueChange={(e) => {
								if (e) field.onChange(selectValueType === "string" ? e : +e);
							}}
						>
							<ComboboxInput placeholder={placeholder} />

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
