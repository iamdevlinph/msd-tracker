import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { ComboboxFormInput } from "@/components/forms/combobox-input";
import { useMonsterOptionStore } from "@/components/monsterlings/store/monsterlings-options-store";
import { SeparatorText } from "@/components/shared/separator-text";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
			traits: monsterlingInfo?.traits ?? [],
		},
		mode: "onChange",
	});

	const isEdit = id === undefined;

	const onSubmit = (data: MonsterlingOwned) => {
		console.info("🍉debuu ~ onSubmit ~ data:", data);
		setMonsterlingOwned(data, id);

		onClose();
	};

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
							<Field className="flex flex-col sm:flex-row">
								<FieldLabel>Tier</FieldLabel>

								<ButtonGroup className="justify-end">
									<Button
										variant={
											tierValue === TIER_ID_BY_TIER.CHOICE_4
												? "default"
												: "outline"
										}
										onClick={() =>
											form.setValue("tier_id", TIER_ID_BY_TIER.CHOICE_4)
										}
										type="button"
									>
										{TIER_ID_BY_TIER.CHOICE_4}
									</Button>
									<Button
										variant={
											tierValue === TIER_ID_BY_TIER.PRIME_5
												? "default"
												: "outline"
										}
										onClick={() =>
											form.setValue("tier_id", TIER_ID_BY_TIER.PRIME_5)
										}
										type="button"
									>
										{TIER_ID_BY_TIER.PRIME_5}
									</Button>
								</ButtonGroup>
							</Field>
						</FieldGroup>

						<SeparatorText>Traits</SeparatorText>
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
