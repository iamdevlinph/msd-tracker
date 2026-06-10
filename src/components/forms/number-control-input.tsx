import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NumberControlInput<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label: string;
	min?: number;
	max?: number;
	awakeningBoost?: number;
};

export const NumberControlInput = <T extends FieldValues>({
	name,
	control,
	label,
	min = 0,
	max = 5,
	awakeningBoost = undefined,
}: NumberControlInput<T>) => {
	const clamp = (val: number) => {
		if (min !== undefined) val = Math.max(min, val);
		if (max !== undefined) val = Math.min(max, val);
		return val;
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const value = field.value ?? 0;

				const setValue = (val: number) => {
					field.onChange(clamp(val));
				};

				const increment = () => setValue(Number(value) + 1);
				const decrement = () => setValue(Number(value) - 1);

				return (
					<Field
						orientation="responsive"
						data-invalid={fieldState.invalid}
						className="flex flex-col sm:flex-row"
					>
						<FieldLabel htmlFor={name} className="w-ull">
							{label}
						</FieldLabel>
						<ButtonGroup className="flex justify-center sm:justify-end">
							<Button
								variant="secondary"
								onClick={decrement}
								type="button"
								disabled={value === min}
							>
								<ChevronLeft />
							</Button>

							<Input
								{...field}
								id={name}
								aria-invalid={fieldState.invalid}
								placeholder="0"
								className={cn(
									"max-w-15 text-center hide-input-arrows",
									fieldState.invalid && "border-0",
								)}
								type="number"
								onChange={(e) => setValue(+e.target.value)}
							/>
							{awakeningBoost !== undefined && (
								<Button
									variant="default"
									type="button"
									className="w-5 bg-chart-3 pointer-events-none"
								>
									{value + getAwakeningBonus(awakeningBoost)}
								</Button>
							)}
							<Button
								variant="secondary"
								onClick={increment}
								type="button"
								disabled={value === max}
							>
								<ChevronRight />
							</Button>
						</ButtonGroup>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				);
			}}
		/>
	);
};

function getAwakeningBonus(awakeningBoost: number) {
	if (awakeningBoost >= 4) return 4;
	if (awakeningBoost >= 2) return 2;
	return 0;
}
