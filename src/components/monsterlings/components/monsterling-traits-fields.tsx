import { XIcon } from "lucide-react";
import type { Control, FieldArrayWithId } from "react-hook-form";
import { TierSelectorInput } from "@/components/forms/tier-selector-input";
import type { MonsterlingFormValues } from "@/components/monsterlings/components/monsterling-form";
import { StatComboboxInput } from "@/components/monsterlings/components/stats-combobox-input";
import { Button } from "@/components/ui/button";

type MonsterlingTraitsFieldsProps = {
	control: Control<MonsterlingFormValues>;
	fields: FieldArrayWithId<MonsterlingFormValues, "traits", "id">[];
	onAdd: () => void;
	onDelete: (index: number) => void;
};

export const MonsterlingTraitsFields = ({
	control,
	fields,
	onAdd,
	onDelete,
}: MonsterlingTraitsFieldsProps) => (
	<div className="gap-y-5 sm:gap-y-2 flex flex-col">
		{fields.map((field, index) => (
			<div className="monsterling-card__traits" key={field.id}>
				<div style={{ gridArea: "stat" }}>
					<StatComboboxInput<MonsterlingFormValues>
						name={`traits.${index}.stat_id`}
						control={control}
						selectValueType="number"
					/>
				</div>
				<div style={{ gridArea: "tier" }}>
					<TierSelectorInput<MonsterlingFormValues>
						name={`traits.${index}.tier_id`}
						control={control}
						options={[1, 2, 3, 4, 5]}
						className="w-full"
						variant="select"
						selectLabelPrefix="Tier"
					/>
				</div>
				<div
					style={{ gridArea: "remove" }}
					className="grid place-content-center"
				>
					<Button
						variant="destructive"
						type="button"
						size="icon-xs"
						className="min-w-max"
						onClick={() => onDelete(index)}
					>
						<XIcon />
					</Button>
				</div>
			</div>
		))}

		{fields.length < 4 && (
			<Button type="button" onClick={onAdd} variant="ghost">
				<small>Add trait</small>
			</Button>
		)}
	</div>
);
