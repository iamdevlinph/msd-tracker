import { useMemo, useState } from "react";
import { AddArtifact } from "@/components/artifacts/components/add-artifact";
import { ArtifactCard } from "@/components/artifacts/components/artifact-card";
import { ArtifactFilter } from "@/components/artifacts/components/artifact-filter";
import { EditArtifactDetailsDialog } from "@/components/artifacts/components/edit-artifact-details-dialog";
import {
	emptyArtifactFilters,
	filterArtifacts,
} from "@/components/artifacts/utils/artifact-utils";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { PageTitle } from "@/components/shared/page-title";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { useAppStore } from "@/stores/app-store";

export const ArtifactsPage = () => {
	const owned = useAppStore((s) => s.artifactsOwned);
	const [filters, setFilters] = useState(emptyArtifactFilters);
	const [instanceIdToEdit, setInstanceIdToEdit] = useState<string | null>(null);
	const [editOpen, setEditOpen] = useState(false);
	const filtered = useMemo(
		() => filterArtifacts(Object.values(ARTIFACTS_DATA), filters),
		[filters],
	);
	const filteredIds = new Set(filtered.map(({ id }) => id));
	const cards = Object.entries(owned)
		.map(([instanceId, value]) => ({
			instanceId,
			value,
			artifact: ARTIFACTS_DATA[value.artifact_id],
		}))
		.filter((x) => x.artifact && filteredIds.has(x.artifact.id))
		.sort(
			(a, b) =>
				a.artifact.name.localeCompare(b.artifact.name) ||
				a.value.fusion_level - b.value.fusion_level,
		);
	return (
		<div>
			<PageTitle
				title="Artifacts"
				description="Track owned artifacts and fusion levels."
			/>
			<div className="flex gap-5 flex-col">
				<AddArtifact />
				<ArtifactFilter filters={filters} onChange={setFilters} />
				{cards.length === 0 ? (
					<CollectionEmptyState
						title={
							Object.keys(owned).length === 0
								? "No artifacts yet"
								: "No artifacts match these filters"
						}
						description={
							Object.keys(owned).length === 0
								? "Add an artifact to start building your collection."
								: "Adjust or clear the filters to see your owned artifacts."
						}
					/>
				) : (
					<div className="grid grid-cols-[repeat(auto-fill,120px)] gap-3">
						{cards.map(({ instanceId, value, artifact }) => (
							<button
								className="w-[120px] text-left"
								key={instanceId}
								type="button"
								onClick={() => {
									setInstanceIdToEdit(instanceId);
									setEditOpen(true);
								}}
							>
								<ArtifactCard
									artifact={artifact}
									fusionLevel={value.fusion_level}
									portraitSize={120}
									imageClassName="p-1"
								/>
							</button>
						))}
					</div>
				)}
			</div>
			<EditArtifactDetailsDialog
				instanceId={instanceIdToEdit}
				open={editOpen}
				setOpen={setEditOpen}
				onClose={() => setInstanceIdToEdit(null)}
			/>
		</div>
	);
};
