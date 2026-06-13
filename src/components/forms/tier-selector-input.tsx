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
import { cn } from "@/lib/utils";

type TierSelectorInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	options: TierId[];
	label?: string;
	className?: string;
};

export const TierSelectorInput = <T extends FieldValues>({
	name,
	control,
	options,
	label = "",
	className = "",
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
						className={cn("flex flex-col sm:flex-row", className)}
					>
						{!!label && <FieldLabel>{label}</FieldLabel>}

						<ButtonGroup className="justify-end">
							{options.map((tier) => {
								return (
									<Button
										variant={tierValue === tier ? "default" : "outline"}
										onClick={() => field.onChange(tier)}
										type="button"
										key={tier}
										className="px-2"
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
