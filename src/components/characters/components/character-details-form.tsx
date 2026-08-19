import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { z } from "zod";
import { getVisibleCostumes } from "@/components/characters/utils/character-costume";
import { CHARACTER_SKILLS } from "@/components/characters/utils/character-domain-values";
import { NumberControlInput } from "@/components/forms/number-control-input";
import { SeparatorText } from "@/components/shared/separator-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import {
	CHARACTERS_DATA,
	type Character,
} from "@/data/characters/CHARACTERS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";

type CharacterOwnedDetailsProps = {
	id: Character["id"];
	onClose: () => void;
	editCharacterData?: CharacterOwned;
	submitText?: string;
};

const characterOwnedDetailsSchema = z.object({
	id: z.number(),
	awakening: z.number().min(0).max(6),
	skills: z.object({
		[CHARACTER_SKILLS.BASIC]: z.number().min(1).max(12),
		[CHARACTER_SKILLS.SWITCH]: z.number().min(1).max(12),
		[CHARACTER_SKILLS.SPECIAL]: z.number().min(1).max(12),
		[CHARACTER_SKILLS.ULTIMATE]: z.number().min(1).max(12),
	}),
	costume_id: z.number().nullable().optional(),
});

export type CharacterOwned = z.infer<typeof characterOwnedDetailsSchema>;

const FORM_ID = "character-details-form";

export const CharacterOwnedDetailsForm = ({
	id,
	onClose,
	editCharacterData,
	submitText = "Add",
}: CharacterOwnedDetailsProps) => {
	const ga = useGoogleAnalytics();

	const setCharacterOwned = useAppStore((s) => s.setCharacterOwned);

	const form = useForm<CharacterOwned>({
		resolver: zodResolver(characterOwnedDetailsSchema),
		defaultValues: {
			id: id,
			awakening: editCharacterData?.awakening ?? 0,
			skills: {
				[CHARACTER_SKILLS.BASIC]: editCharacterData?.skills.basic ?? 1,
				[CHARACTER_SKILLS.SWITCH]: editCharacterData?.skills.switch ?? 1,
				[CHARACTER_SKILLS.SPECIAL]: editCharacterData?.skills.special ?? 1,
				[CHARACTER_SKILLS.ULTIMATE]: editCharacterData?.skills.ultimate ?? 1,
			},
			costume_id: editCharacterData?.costume_id ?? null,
		},
		mode: "onChange",
	});

	const onSubmit = (data: CharacterOwned) => {
		const { awakening, skills, costume_id } = data;
		const object = {
			id,
			awakening: Number(awakening),
			skills: {
				[CHARACTER_SKILLS.BASIC]: Number(skills[CHARACTER_SKILLS.BASIC]),
				[CHARACTER_SKILLS.SWITCH]: Number(skills[CHARACTER_SKILLS.SWITCH]),
				[CHARACTER_SKILLS.SPECIAL]: Number(skills[CHARACTER_SKILLS.SPECIAL]),
				[CHARACTER_SKILLS.ULTIMATE]: Number(skills[CHARACTER_SKILLS.ULTIMATE]),
			},
			costume_id: costume_id ?? null,
		};
		setCharacterOwned(object);

		const charInfo = CHARACTERS_DATA[id];
		ga.event(
			editCharacterData
				? ANALYTICS_EVENTS.CHARACTER_UPDATE
				: ANALYTICS_EVENTS.CHARACTER_CREATE,
			{ character_id: charInfo.id, character_name: charInfo.name },
		);

		onClose?.();
	};

	const awakeningValue = useWatch({
		control: form.control,
		name: "awakening",
	});
	const costumeId = useWatch({ control: form.control, name: "costume_id" });
	const character = CHARACTERS_DATA[id];
	const costumes = getVisibleCostumes(character);

	return (
		<div className="flex flex-col gap-5">
			<Card>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="gap-y-2 flex flex-col"
						id={FORM_ID}
					>
						<FieldGroup>
							{costumes.length > 0 && (
								<fieldset className="grid gap-2">
									<legend className="text-sm font-medium">Costume</legend>
									<div className="flex flex-wrap gap-2">
										<button
											type="button"
											onClick={() => form.setValue("costume_id", null)}
											aria-pressed={costumeId == null}
											className="rounded-md border p-1 aria-pressed:border-primary aria-pressed:ring-2 aria-pressed:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
										>
											<img
												src={character.portraitImage}
												alt="Default"
												className="size-16 object-contain"
											/>
										</button>
										{costumes.map((costume) => (
											<button
												key={costume.id}
												type="button"
												onClick={() => form.setValue("costume_id", costume.id)}
												aria-pressed={costumeId === costume.id}
												aria-label={costume.name}
												className="rounded-md border p-1 aria-pressed:border-primary aria-pressed:ring-2 aria-pressed:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
											>
												<img
													src={costume.portraitImage}
													alt={costume.name}
													className="size-16 object-contain"
												/>
											</button>
										))}
									</div>
								</fieldset>
							)}
						</FieldGroup>

						<FieldGroup>
							<NumberControlInput<CharacterOwned>
								name="awakening"
								control={form.control}
								label="Awakening"
								min={0}
								max={6}
							/>
						</FieldGroup>

						<SeparatorText>Skills</SeparatorText>

						<FieldGroup>
							<NumberControlInput<CharacterOwned>
								name="skills.special"
								control={form.control}
								label="Special"
								min={1}
								max={12}
								awakeningBoost={awakeningValue}
							/>
						</FieldGroup>

						<FieldGroup>
							<NumberControlInput<CharacterOwned>
								name="skills.switch"
								control={form.control}
								label="Switch"
								min={1}
								max={12}
								awakeningBoost={awakeningValue}
							/>
						</FieldGroup>

						<FieldGroup>
							<NumberControlInput<CharacterOwned>
								name="skills.basic"
								control={form.control}
								label="Basic"
								min={1}
								max={12}
								awakeningBoost={awakeningValue}
							/>
						</FieldGroup>

						<FieldGroup>
							<NumberControlInput<CharacterOwned>
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
				<Button type="submit" form={FORM_ID} className="w-full sm:w-max">
					{submitText}
				</Button>
			</Field>
		</div>
	);
};
