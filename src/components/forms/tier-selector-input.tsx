import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import type { TierId } from "@/data/TIERS_DATA";

type TierSelectorInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label: string;
	options: TierId[];
};

export const TierSelectorInput = <T extends FieldValues>({
	name,
	control,
	label,
	options,
}: TierSelectorInputProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const tierValue = field.value;
				return (
					<Field
						orientation="responsive"
						data-invalid={fieldState.invalid}
						className="flex flex-col sm:flex-row"
					>
						<FieldLabel>{label}</FieldLabel>

						<ButtonGroup className="justify-end">
							{options.map((tier) => {
								return (
									<Button
										variant={tierValue === tier ? "default" : "outline"}
										onClick={() => field.onChange(tier)}
										type="button"
										key={tier}
									>
										{tier}
									</Button>
								);
							})}
						</ButtonGroup>
					</Field>
				);
			}}
		/>
	);
};
