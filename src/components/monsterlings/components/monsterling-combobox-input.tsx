import { useMemo } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { ComboboxFormInput } from "@/components/forms/combobox-form-input";
import { useMonsterOptionStore } from "@/components/monsterlings/store/monsterlings-options-store";
import { ComboboxItem } from "@/components/ui/combobox";
import type { SelectOption } from "@/constants";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";

type Props<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label: string;
	placeholder?: string;
	selectValueType?: "string" | "number";
};

export const MonsterlingComboboxInput = <T extends FieldValues>({
	...props
}: Props<T>) => {
	const getMonsterlingOptions = useMonsterOptionStore(
		(s) => s.getMonsterlingOptions,
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

	const getLabel = (value: string) => {
		return MONSTERLINGS_DATA[+value].name;
	};

	return (
		<ComboboxFormInput<T>
			options={getMonsterlingOptions()}
			selectValueType="number"
			renderItem={renderItem}
			getLabel={getLabel}
			{...props}
		/>
	);
};
