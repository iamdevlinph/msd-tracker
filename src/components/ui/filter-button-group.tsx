import type * as React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

type FilterButtonGroupProps = React.ComponentProps<typeof ButtonGroup>;

const FilterButtonGroup = ({ className, ...props }: FilterButtonGroupProps) => {
	return (
		<ButtonGroup
			className={cn("flex max-w-full flex-wrap", className)}
			{...props}
		/>
	);
};

type FilterToggleButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	"aria-pressed" | "variant"
> & {
	isSelected: boolean;
};

const FilterToggleButton = ({
	className,
	isSelected,
	...props
}: FilterToggleButtonProps) => {
	return (
		<Button
			{...props}
			aria-pressed={isSelected}
			variant={isSelected ? "default" : "outline"}
			className={cn(
				className,
				"border",
				isSelected &&
					"[&_svg]:stroke-white [&_img]:drop-shadow-[0_0_1px_rgb(255_255_255_/_0.8)]",
			)}
		/>
	);
};

export { FilterButtonGroup, FilterToggleButton };
