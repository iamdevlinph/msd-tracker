import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { ComboboxFormInput } from "@/components/forms/combobox-input";
import { SelectInput } from "@/components/forms/select-input";
import { TierSelectorInput } from "@/components/forms/tier-selector-input";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { useMonsterOptionStore } from "@/components/monsterlings/store/monsterlings-options-store";
import { useStatOptionStore } from "@/components/monsterlings/store/stat-options-store";
import { SeparatorText } from "@/components/shared/separator-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { STAT_ID_BY_STAT } from "@/data/STAT_DATA";
import { TIER_ID_BY_TIER } from "@/data/TIERS_DATA";
import { createZodEnumFromObject } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

type MonsterlingFormProps = {
	id?: string;
	onClose: () => void;
	submitText?: string;
};

const TierIdSchema = createZodEnumFromObject(TIER_ID_BY_TIER);
const StatIdSchema = createZodEnumFromObject(STAT_ID_BY_STAT);

// have to do this to keep the tier_id as TierId when doing z.infer
const monsterlingFormSchema = z.object({
	monsterling_id: z.number(),
	tier_id: TierIdSchema,
	traits: z.array(
		z.object({
			tier_id: TierIdSchema,
			stat_id: StatIdSchema,
		}),
	),
});

export type MonsterlingOwned = z.infer<typeof monsterlingFormSchema>;

const MONSTERLING_FORM_ID = "MONSTERLING_FORM_ID";

export const MonsterlingForm = (props: MonsterlingFormProps) => {
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	const setMonsterlingOwned = useAppStore((s) => s.setMonsterlingOwned);
	const getMonsterlingOptions = useMonsterOptionStore(
		(s) => s.getMonsterlingOptions,
	);
	const getStatOptions = useStatOptionStore((s) => s.getStatOptions);

	let monsterlingInfo = null;

	const { id, onClose, submitText = "Add" } = props;

	if (id !== undefined) {
		monsterlingInfo = monsterlingsOwned[id];
	}

	const form = useForm<MonsterlingOwned>({
		resolver: zodResolver(monsterlingFormSchema),
		defaultValues: {
			monsterling_id:
				monsterlingInfo?.monsterling_id ?? MONSTERLINGS_DATA[1].id,
			tier_id: monsterlingInfo?.tier_id ?? TIER_ID_BY_TIER.PRIME_5,
			traits: monsterlingInfo?.traits ?? [
				{
					tier_id: TIER_ID_BY_TIER.PRIME_5,
				},
				{
					tier_id: TIER_ID_BY_TIER.PRIME_5,
				},
				{
					tier_id: TIER_ID_BY_TIER.PRIME_5,
				},
			],
		},
		mode: "onChange",
	});

	// const isEdit = id === undefined;

	const onSubmit = (data: MonsterlingOwned) => {
		console.info("🍉debuu ~ onSubmit ~ data:", data);
		setMonsterlingOwned(data, id);

		onClose();
	};

	const monsterlingValue = useWatch({
		control: form.control,
		name: "monsterling_id",
	});

	const tierValue = useWatch({
		control: form.control,
		name: "tier_id",
	});

	return (
		<div className="flex flex-col gap-5">
			<Card>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id={MONSTERLING_FORM_ID}
						className="gap-y-2 flex flex-col w-full"
					>
						<FieldGroup className="flex items-center justify-center mb-2">
							<MonsterlingCard
								monsterling_id={monsterlingValue}
								tier_id={tierValue}
								traits={[]}
								className="w-full"
							/>
						</FieldGroup>

						<SeparatorText>Info</SeparatorText>

						<FieldGroup>
							<ComboboxFormInput<MonsterlingOwned>
								name="monsterling_id"
								label="Monsterling"
								control={form.control}
								options={getMonsterlingOptions()}
								selectValueType="number"
							/>
						</FieldGroup>

						<FieldGroup>
							<TierSelectorInput<MonsterlingOwned>
								name="tier_id"
								label="Tier"
								control={form.control}
								options={[1, 2, 3, 4, 5]}
							/>
						</FieldGroup>

						<SeparatorText>Traits</SeparatorText>

						<FieldGroup className="flex flex-row">
							<SelectInput<MonsterlingOwned>
								name="traits.0.stat_id"
								options={getStatOptions()}
								control={form.control}
								className="w-full"
							/>

							<TierSelectorInput<MonsterlingOwned>
								name="traits.0.tier_id"
								control={form.control}
								options={[1, 2, 3, 4, 5]}
								className="max-w-min"
							/>
						</FieldGroup>

						<FieldGroup className="flex flex-row">
							<SelectInput<MonsterlingOwned>
								name="traits.1.stat_id"
								options={getStatOptions()}
								control={form.control}
								className="w-full"
							/>

							<TierSelectorInput<MonsterlingOwned>
								name="traits.1.tier_id"
								control={form.control}
								options={[1, 2, 3, 4, 5]}
								className="max-w-min"
							/>
						</FieldGroup>

						<FieldGroup className="flex flex-row">
							<SelectInput<MonsterlingOwned>
								name="traits.2.stat_id"
								options={getStatOptions()}
								control={form.control}
								className="w-full"
							/>

							<TierSelectorInput<MonsterlingOwned>
								name="traits.2.tier_id"
								control={form.control}
								options={[1, 2, 3, 4, 5]}
								className="max-w-min"
							/>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>

			<Field
				orientation="horizontal"
				className="justify-end flex sm:flex-row flex-col-reverse"
			>
				<Button
					type="button"
					variant="outline"
					onClick={onClose}
					className="w-full sm:w-max"
				>
					Cancel
				</Button>
				<Button
					type="submit"
					form={MONSTERLING_FORM_ID}
					className="w-full sm:w-max"
				>
					{submitText}
				</Button>
			</Field>
		</div>
	);
};
