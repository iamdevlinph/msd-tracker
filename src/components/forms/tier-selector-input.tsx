import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { TierId } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

type TierSelectorInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	options: TierId[];
	label?: string;
	className?: string;
	variant?: "buttons" | "select";
	buttonGroupClass?: string;
};

export const TierSelectorInput = <T extends FieldValues>({
	name,
	control,
	options,
	label = "",
	className = "",
	variant = "buttons",
	buttonGroupClass = "",
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

						{variant === "buttons" && (
							<ButtonGroup className={cn("", buttonGroupClass)}>
								{options.map((tier) => {
									return (
										<Button
											variant={tierValue === tier ? "default" : "outline"}
											onClick={() => field.onChange(tier)}
											type="button"
											key={tier}
											className="px-[15.5px]"
										>
											{tier}
										</Button>
									);
								})}
							</ButtonGroup>
						)}

						{variant === "select" && (
							<Select
								name={field.name}
								value={field.value.toString()}
								onValueChange={(e) => field.onChange(+e)}
							>
								<SelectTrigger id={name} aria-invalid={fieldState.invalid}>
									<SelectValue placeholder="Tier" />
								</SelectTrigger>
								<SelectContent position="popper" className="">
									{options.map((tier) => (
										<SelectItem key={tier} value={tier.toString()}>
											{tier}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					</Field>
				);
			}}
		/>
	);
};
