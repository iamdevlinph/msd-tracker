import { useMemo } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { ComboboxFormInput } from "@/components/forms/combobox-form-input";
import { useStatOptionStore } from "@/components/monsterlings/store/stat-options-store";
import { ComboboxItem } from "@/components/ui/combobox";
import type { SelectOption } from "@/constants";
import { STAT_DATA, type StatId } from "@/data/STAT_DATA";

type Props<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	placeholder?: string;
	selectValueType?: "string" | "number";
};

export const StatComboboxInput = <T extends FieldValues>({
	...props
}: Props<T>) => {
	const getStatOptions = useStatOptionStore((s) => s.getStatOptions);

	const renderItem = useMemo(() => {
		return (item: SelectOption) => {
			const stat = STAT_DATA[item.value as StatId];

			return (
				<ComboboxItem key={item.value} value={item.value}>
					<img
						src={stat.image}
						alt={stat.stat}
						width={30}
						height={30}
						loading="lazy"
					/>
					<p className="ellipses truncate" title={stat.stat}>
						{stat.stat}
					</p>
				</ComboboxItem>
			);
		};
	}, []);

	const getLabel = (value: string) => {
		if (!value) return "";
		return STAT_DATA[value as StatId].stat;
	};

	return (
		<ComboboxFormInput<T>
			options={getStatOptions()}
			renderItem={renderItem}
			getLabel={getLabel}
			{...props}
		/>
	);
};
