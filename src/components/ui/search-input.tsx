import { SearchIcon, XIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = Omit<
	React.ComponentProps<"input">,
	"type" | "value" | "onChange" | "onKeyDown"
> & {
	value: string;
	onValueChange: (value: string) => void;
};

export const preventSearchInputDismissOnEscape = (event: KeyboardEvent) => {
	const target = event.target;
	if (
		event.key === "Escape" &&
		target instanceof HTMLInputElement &&
		target.hasAttribute("data-search-input") &&
		target.value
	) {
		event.preventDefault();
	}
};

export const SearchInput = ({
	className,
	onValueChange,
	value,
	...props
}: SearchInputProps) => (
	<div className="relative">
		<SearchIcon
			aria-hidden
			className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground"
		/>
		<Input
			{...props}
			data-search-input=""
			type="text"
			value={value}
			onChange={(event) => onValueChange(event.target.value)}
			onKeyDown={(event) => {
				if (event.key !== "Escape" || !value) return;
				event.preventDefault();
				event.stopPropagation();
				onValueChange("");
			}}
			className={cn("pl-9 pr-9", className)}
		/>
		{value && (
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-1 top-1/2 size-7 -translate-y-1/2 text-muted-foreground"
				onClick={() => onValueChange("")}
				aria-label="Clear search"
			>
				<XIcon className="size-4" />
			</Button>
		)}
	</div>
);
