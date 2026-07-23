import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type SortSelectProps<T extends string> = {
	ariaLabel: string;
	onValueChange: (value: T) => void;
	options: { label: string; value: T }[];
	value: T;
};

export function SortSelect<T extends string>({
	ariaLabel,
	onValueChange,
	options,
	value,
}: SortSelectProps<T>) {
	return (
		<Select
			value={value}
			onValueChange={(nextValue) => onValueChange(nextValue as T)}
		>
			<SelectTrigger aria-label={ariaLabel}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
