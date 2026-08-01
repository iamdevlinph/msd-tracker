import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { z } from "zod";
import { TierSelectorInput } from "@/components/forms/tier-selector-input";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { MonsterlingComboboxInput } from "@/components/monsterlings/components/monsterling-combobox-input";
import { getMonsterlingLinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { MonsterlingTraitsFields } from "@/components/monsterlings/components/monsterling-traits-fields";
import { SeparatorText } from "@/components/shared/separator-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
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
	traits: z
		.array(
			z.object({
				tier_id: TierIdSchema,
				stat_id: StatIdSchema.optional().nullable(),
			}),
		)
		.superRefine((traits, ctx) => {
			const seen = new Map();

			traits.forEach((t, index) => {
				if (!t.stat_id) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `Empty stat_id not allowed at index: ${index}`,
						path: [index, "stat_id"],
					});
					return;
				}

				const key = t.stat_id;

				if (seen.has(key)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `Duplicate stat_id not allowed: ${key}`,
						path: [index, "stat_id"],
					});
				} else {
					seen.set(key, index);
				}
			});
		}),
});
export type MonsterlingOwned = z.infer<typeof monsterlingFormSchema>;
export type MonsterlingFormValues = MonsterlingOwned;

const MONSTERLING_FORM_ID = "MONSTERLING_FORM_ID";

const STARTING_TRAIT = {
	tier_id: TIER_ID_BY_TIER.PRIME_5,
};

export const MonsterlingForm = (props: MonsterlingFormProps) => {
	const ga = useGoogleAnalytics();

	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);
	const monsterlingLinkChainLevels = useAppStore(
		(s) => s.monsterlingLinkChainLevels,
	);
	const setMonsterlingOwned = useAppStore((s) => s.setMonsterlingOwned);

	let monsterlingInfo = null;

	const { id, onClose, submitText = "Add" } = props;

	if (id !== undefined) {
		monsterlingInfo = monsterlingsOwned[id];
	}

	const form = useForm<MonsterlingFormValues>({
		resolver: zodResolver(monsterlingFormSchema),
		defaultValues: {
			monsterling_id:
				monsterlingInfo?.monsterling_id ?? MONSTERLINGS_DATA[1].id,
			tier_id: monsterlingInfo?.tier_id ?? TIER_ID_BY_TIER.PRIME_5,
			traits: monsterlingInfo?.traits ?? [
				{
					...STARTING_TRAIT,
				},
			],
		},
		mode: "onSubmit",
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
		name: "traits", // unique name for your Field Array
	});

	const onSubmit = (data: MonsterlingFormValues) => {
		setMonsterlingOwned(data, id);

		const selectedMonsterling = MONSTERLINGS_DATA[data.monsterling_id];
		ga.event(
			id === undefined
				? ANALYTICS_EVENTS.MONSTERLING_CREATE
				: ANALYTICS_EVENTS.MONSTERLING_UPDATE,
			{
				monsterling_id: selectedMonsterling.id,
				monsterling_name: selectedMonsterling.name,
				tier_id: data.tier_id,
			},
		);

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

	const traitsValue = useWatch({
		control: form.control,
		name: "traits",
	});

	const handleDeleteTrait = (index: number) => {
		if (fields.length === 1) {
			form.setValue("traits", [{ tier_id: 5 }]);
			return;
		}

		remove(index);
	};

	return (
		<div className="flex flex-col gap-5">
			<Card>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id={MONSTERLING_FORM_ID}
						className="gap-y-2 flex flex-col w-full"
					>
						<FieldGroup className="mb-2 grid place-content-center">
							<MonsterlingCard
								monsterling_id={monsterlingValue}
								tier_id={tierValue}
								linkChainLevel={getMonsterlingLinkChainLevel(
									monsterlingValue,
									monsterlingLinkChainLevels,
								)}
								traits={traitsValue}
								className="w-full monsterling-card-form"
							/>
						</FieldGroup>

						<SeparatorText>Info</SeparatorText>

						<FieldGroup>
							<MonsterlingComboboxInput<MonsterlingFormValues>
								name="monsterling_id"
								label="Monsterling"
								control={form.control}
								selectValueType="number"
							/>
						</FieldGroup>

						<FieldGroup className="flex flex-col sm:flex-row gap-2 sm:gap-7 justify-between">
							<TierSelectorInput<MonsterlingFormValues>
								name="tier_id"
								label="Tier"
								control={form.control}
								options={[1, 2, 3, 4, 5]}
								buttonGroupClass="flex justify-center"
							/>
						</FieldGroup>

						<SeparatorText>Traits</SeparatorText>

						<MonsterlingTraitsFields
							control={form.control}
							fields={fields}
							onAdd={() => append({ ...STARTING_TRAIT })}
							onDelete={handleDeleteTrait}
						/>
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
