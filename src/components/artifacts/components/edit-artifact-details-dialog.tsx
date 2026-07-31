import { Trash2Icon } from "lucide-react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { ArtifactOwnedDetailsForm } from "@/components/artifacts/components/artifact-details-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

type EditArtifactDetailsDialogProps = {
	instanceId: string | null;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onClose?: () => void;
};

export const EditArtifactDetailsDialog = ({
	instanceId,
	open,
	setOpen,
	onClose,
}: EditArtifactDetailsDialogProps) => {
	const ga = useGoogleAnalytics();
	const artifactsOwned = useAppStore((s) => s.artifactsOwned);
	const deleteArtifactOwned = useAppStore((s) => s.deleteArtifactOwned);
	const owned = instanceId ? artifactsOwned[instanceId] : undefined;
	const artifact = owned ? ARTIFACTS_DATA[owned.artifact_id] : undefined;

	if (!instanceId || !owned || !artifact) return null;

	const close = () => {
		setOpen(false);
		onClose?.();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => (next ? setOpen(true) : close())}
		>
			<DialogContent
				aria-describedby={undefined}
				showCloseButton={false}
				className={cn(
					"overflow-y-auto max-h-screen max-w-sm sm:min-w-min",
					"lg:max-w-md lg:min-w-0 h-[calc(100dvh-50px)] lg:h-min",
				)}
			>
				<DialogHeader>
					<div className="flex items-center justify-between gap-3">
						<DialogTitle>{artifact.name}</DialogTitle>
						<Button
							variant="destructive"
							size="icon-sm"
							aria-label={`Delete ${artifact.name}`}
							onClick={() => {
								deleteArtifactOwned(instanceId);
								ga.event(ANALYTICS_EVENTS.ARTIFACT_DELETE, {
									artifact_id: artifact.id,
									artifact_name: artifact.name,
								});
								close();
							}}
						>
							<Trash2Icon />
						</Button>
					</div>
				</DialogHeader>
				<ArtifactOwnedDetailsForm
					artifactId={artifact.id}
					instanceId={instanceId}
					currentFusionLevel={owned.fusion_level}
					onClose={close}
					submitText="Update"
				/>
			</DialogContent>
		</Dialog>
	);
};
