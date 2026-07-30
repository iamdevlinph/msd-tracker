import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ArtifactCard } from "@/components/artifacts/components/artifact-card";
import { ArtifactOwnedDetailsForm } from "@/components/artifacts/components/artifact-details-form";
import { ArtifactFilter } from "@/components/artifacts/components/artifact-filter";
import {
	emptyArtifactFilters,
	filterArtifacts,
} from "@/components/artifacts/utils/artifact-utils";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { preventSearchInputDismissOnEscape } from "@/components/ui/search-input";
import { ARTIFACTS_DATA, type ArtifactId } from "@/data/ARTIFACTS_DATA";
import { cn } from "@/lib/utils";

export const AddArtifact = () => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<ArtifactId | null>(null);
	const [filters, setFilters] = useState(emptyArtifactFilters);
	const close = () => {
		setOpen(false);
		setSelected(null);
		setFilters(emptyArtifactFilters());
	};
	const artifacts = filterArtifacts(
		Object.values(ARTIFACTS_DATA),
		filters,
	).sort((a, b) => a.name.localeCompare(b.name));
	const artifact = selected == null ? null : ARTIFACTS_DATA[selected];
	return (
		<Dialog
			open={open}
			onOpenChange={(next) => (next ? setOpen(true) : close())}
		>
			<DialogTrigger asChild>
				<Button className="w-min">Add Artifact</Button>
			</DialogTrigger>
			<DialogContent
				onEscapeKeyDown={preventSearchInputDismissOnEscape}
				className={cn(
					"overflow-y-auto max-h-screen max-w-sm sm:min-w-min h-[calc(100dvh-50px)] lg:h-min",
					artifact ? "lg:max-w-md lg:min-w-0" : "lg:min-w-218",
				)}
			>
				<DialogHeader>
					<div className="flex gap-5 items-center">
						{artifact && (
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full"
								onClick={() => setSelected(null)}
								aria-label="Back to artifact list"
							>
								<ArrowLeft />
							</Button>
						)}
						<DialogTitle>
							{artifact ? artifact.name : "Add Artifact"}
						</DialogTitle>
					</div>
					<DialogDescription>
						{artifact
							? "Configure artifact"
							: "Select an artifact to add to your collection."}
					</DialogDescription>
				</DialogHeader>
				{!artifact ? (
					<div className="gap-2 flex flex-col">
						<ArtifactFilter filters={filters} onChange={setFilters} />
						<div className="flex flex-wrap gap-5 mt-5">
							{artifacts.length === 0 && (
								<p className="text-sm text-muted-foreground">
									No artifacts match these filters.
								</p>
							)}
							{artifacts.map((a) => (
								<button
									key={a.id}
									type="button"
									onClick={() => setSelected(a.id)}
								>
									<ArtifactCard artifact={a} />
								</button>
							))}
						</div>
					</div>
				) : (
					<ArtifactOwnedDetailsForm artifactId={artifact.id} onClose={close} />
				)}
			</DialogContent>
		</Dialog>
	);
};
