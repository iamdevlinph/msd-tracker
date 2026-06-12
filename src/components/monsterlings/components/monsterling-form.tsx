import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
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
		setMonsterlingOwned(data, id);
	};

	return (
		<Card>
			<CardContent>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					id={MONSTERLING_FORM_ID}
					className="gap-y-2 flex flex-col"
				></form>
			</CardContent>

			<CardFooter>
				<Field orientation="horizontal" className="justify-end">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" form={MONSTERLING_FORM_ID}>
						{submitText}
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
};
