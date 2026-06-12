import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { NumberControlInput } from "@/components/forms/number-control-input";
import { SeparatorText } from "@/components/shared/separator-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import type { Character } from "@/data/CHARACTERS_DATA";
import { useAppStore } from "@/stores/app-store";

type CharacterOwnedDetailsProps = {
	id: Character["id"];
	onClose: () => void;
	editCharacterData?: CharacterOwnedDetails;
	submitText?: string;
};

const characterOwnedDetailsSchema = z.object({
	id: z.number(),
	awakening: z.number().min(0).max(6),
	skills: z.object({
		basic: z.number().min(1).max(12),
		switch: z.number().min(1).max(12),
		special: z.number().min(1).max(12),
		ultimate: z.number().min(1).max(12),
	}),
});

export type CharacterOwnedDetails = z.infer<typeof characterOwnedDetailsSchema>;

const FORM_ID = "character-details-form";

export const CharacterOwnedDetailsForm = ({
	id,
	onClose,
	editCharacterData,
	submitText = "Add",
}: CharacterOwnedDetailsProps) => {
	const setCharacterOwned = useAppStore((s) => s.setCharacterOwned);

	const form = useForm<CharacterOwnedDetails>({
		resolver: zodResolver(characterOwnedDetailsSchema),
		defaultValues: {
			id: id,
			awakening: editCharacterData?.awakening ?? 0,
			skills: {
				basic: editCharacterData?.skills.basic ?? 1,
				switch: editCharacterData?.skills.switch ?? 1,
				special: editCharacterData?.skills.special ?? 1,
				ultimate: editCharacterData?.skills.ultimate ?? 1,
			},
		},
		mode: "onChange",
	});

	const onSubmit = (data: CharacterOwnedDetails) => {
		const {
			awakening,
			skills: { basic, switch: switch_level, special, ultimate },
		} = data;
		const object = {
			id,
			awakening: Number(awakening),
			skills: {
				basic: Number(basic),
				switch: Number(switch_level),
				special: Number(special),
				ultimate: Number(ultimate),
			},
		};
		setCharacterOwned(object);

		onClose?.();
	};

	const awakeningValue = useWatch({
		control: form.control,
		name: "awakening",
	});

	return (
		<Card>
			<CardContent>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="gap-y-2 flex flex-col"
					id={FORM_ID}
				>
					<FieldGroup>
						<NumberControlInput<CharacterOwnedDetails>
							name="awakening"
							control={form.control}
							label="Awakening"
							min={0}
							max={6}
						/>
					</FieldGroup>

					<SeparatorText>Skills</SeparatorText>

					<FieldGroup>
						<NumberControlInput<CharacterOwnedDetails>
							name="skills.basic"
							control={form.control}
							label="Basic"
							min={1}
							max={12}
							awakeningBoost={awakeningValue}
						/>
					</FieldGroup>

					<FieldGroup>
						<NumberControlInput<CharacterOwnedDetails>
							name="skills.switch"
							control={form.control}
							label="Switch"
							min={1}
							max={12}
							awakeningBoost={awakeningValue}
						/>
					</FieldGroup>

					<FieldGroup>
						<NumberControlInput<CharacterOwnedDetails>
							name="skills.special"
							control={form.control}
							label="Special"
							min={1}
							max={12}
							awakeningBoost={awakeningValue}
						/>
					</FieldGroup>

					<FieldGroup>
						<NumberControlInput<CharacterOwnedDetails>
							name="skills.ultimate"
							control={form.control}
							label="Ultimate"
							min={1}
							max={12}
							awakeningBoost={awakeningValue}
						/>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter>
				<Field orientation="horizontal" className="justify-end">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" form={FORM_ID}>
						{submitText}
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
};
