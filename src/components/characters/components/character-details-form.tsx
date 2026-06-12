import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { NumberControlInput } from "@/components/forms/number-control-input";
import { SeparatorText } from "@/components/separator-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import type { Character } from "@/data/CHARACTERS_DATA";
import { useAppStore } from "@/stores/app-store";
import type { CharacterOwned } from "@/stores/characters-owned-slice";

type CharacterDetailsProps = {
	char_id: Character["id"];
	onClose: () => void;
	editCharacterData?: CharacterOwned;
	submitText?: string;
};

const characterDetailsSchema = z.object({
	char_id: z.number(),
	awakening: z.number().min(0).max(6),
	skills: z.object({
		basic_level: z.number().min(1).max(12),
		switch_level: z.number().min(1).max(12),
		special_level: z.number().min(1).max(12),
		ultimate_level: z.number().min(1).max(12),
	}),
});

type CharacterDetailsSchemaType = z.infer<typeof characterDetailsSchema>;

const FORM_ID = "character-details-form";

export const CharacterDetailsForm = ({
	char_id,
	onClose,
	editCharacterData,
	submitText = "Add",
}: CharacterDetailsProps) => {
	const setCharacterOwned = useAppStore((s) => s.setCharacterOwned);

	const form = useForm<CharacterDetailsSchemaType>({
		resolver: zodResolver(characterDetailsSchema),
		defaultValues: {
			char_id: char_id,
			awakening: editCharacterData?.awakening ?? 0,
			skills: {
				basic_level: editCharacterData?.skills.basic ?? 1,
				switch_level: editCharacterData?.skills.switch ?? 1,
				special_level: editCharacterData?.skills.special ?? 1,
				ultimate_level: editCharacterData?.skills.ultimate ?? 1,
			},
		},
		mode: "onChange",
	});

	const onSubmit = (data: CharacterDetailsSchemaType) => {
		const {
			awakening,
			skills: { basic_level, switch_level, special_level, ultimate_level },
		} = data;
		const object = {
			id: char_id,
			awakening: Number(awakening),
			skills: {
				basic: Number(basic_level),
				switch: Number(switch_level),
				special: Number(special_level),
				ultimate: Number(ultimate_level),
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
						<NumberControlInput<CharacterDetailsSchemaType>
							name="awakening"
							control={form.control}
							label="Awakening"
							min={0}
							max={6}
						/>
					</FieldGroup>

					<SeparatorText>Skills</SeparatorText>

					<FieldGroup>
						<NumberControlInput<CharacterDetailsSchemaType>
							name="skills.basic_level"
							control={form.control}
							label="Basic"
							min={1}
							max={12}
							awakeningBoost={awakeningValue}
						/>
					</FieldGroup>

					<FieldGroup>
						<NumberControlInput<CharacterDetailsSchemaType>
							name="skills.switch_level"
							control={form.control}
							label="Switch"
							min={1}
							max={12}
							awakeningBoost={awakeningValue}
						/>
					</FieldGroup>

					<FieldGroup>
						<NumberControlInput<CharacterDetailsSchemaType>
							name="skills.special_level"
							control={form.control}
							label="Special"
							min={1}
							max={12}
							awakeningBoost={awakeningValue}
						/>
					</FieldGroup>

					<FieldGroup>
						<NumberControlInput<CharacterDetailsSchemaType>
							name="skills.ultimate_level"
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
