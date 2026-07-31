import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { z } from "zod";
import { ArtifactCard } from "@/components/artifacts/components/artifact-card";
import { FUSION_LEVELS } from "@/components/artifacts/utils/artifact-utils";
import { TierSelectorInput } from "@/components/forms/tier-selector-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import {
	ARTIFACTS_DATA,
	type ArtifactId,
} from "@/data/artifacts/ARTIFACTS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";

const artifactFormSchema = z.object({
	fusion_level: z.number().int().min(1).max(5),
});
type ArtifactFormValues = z.infer<typeof artifactFormSchema>;

type ArtifactOwnedDetailsFormProps = {
	artifactId: ArtifactId;
	instanceId?: string;
	currentFusionLevel?: number;
	onClose: () => void;
	submitText?: string;
};

const FORM_ID = "artifact-details-form";

export const ArtifactOwnedDetailsForm = ({
	artifactId,
	instanceId,
	currentFusionLevel,
	onClose,
	submitText = "Add",
}: ArtifactOwnedDetailsFormProps) => {
	const ga = useGoogleAnalytics();
	const create = useAppStore((s) => s.createArtifactOwned);
	const update = useAppStore((s) => s.updateArtifactOwned);
	const artifact = ARTIFACTS_DATA[artifactId];
	const form = useForm<ArtifactFormValues>({
		resolver: zodResolver(artifactFormSchema),
		defaultValues: { fusion_level: currentFusionLevel ?? 1 },
	});

	const fusionLevel = useWatch({ control: form.control, name: "fusion_level" });

	const onSubmit = ({ fusion_level }: ArtifactFormValues) => {
		if (instanceId) {
			update(instanceId, { fusion_level });
		} else {
			create({ artifact_id: artifactId, fusion_level });
		}
		ga.event(
			instanceId
				? ANALYTICS_EVENTS.ARTIFACT_UPDATE
				: ANALYTICS_EVENTS.ARTIFACT_CREATE,
			{ artifact_id: artifact.id, artifact_name: artifact.name },
		);
		onClose();
	};

	return (
		<div className="flex flex-col gap-5">
			<Card className="w-full">
				<CardContent className="flex flex-col items-center gap-4">
					<ArtifactCard artifact={artifact} fusionLevel={fusionLevel} />
					<FieldGroup className="flex flex-col sm:flex-row gap-2 sm:gap-7 justify-between">
						<TierSelectorInput<ArtifactFormValues>
							name="fusion_level"
							label="Fusion Level"
							control={form.control}
							options={[...FUSION_LEVELS]}
							buttonGroupClass="flex justify-center"
						/>
					</FieldGroup>
				</CardContent>
			</Card>
			<form
				id={FORM_ID}
				onSubmit={form.handleSubmit(onSubmit)}
				className="hidden"
			/>
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
