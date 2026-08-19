import { useMemo, useState } from "react";
import { AddArtifact } from "@/components/artifacts/components/add-artifact";
import { ArtifactCard } from "@/components/artifacts/components/artifact-card";
import { ArtifactFilter } from "@/components/artifacts/components/artifact-filter";
import { EditArtifactDetailsDialog } from "@/components/artifacts/components/edit-artifact-details-dialog";
import {
	compareOwnedArtifacts,
	emptyArtifactFilters,
	filterArtifacts,
} from "@/components/artifacts/utils/artifact-utils";
import { getEquippedCharacterUsage } from "@/components/loadouts/utils/equipped-character-usage";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { CollectionExportMenu } from "@/components/shared/collection-export-menu";
import { PageTitle } from "@/components/shared/page-title";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { useAppStore } from "@/stores/app-store";

export const ArtifactsPage = () => {
	const owned = useAppStore((s) => s.artifactsOwned);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const loadouts = useAppStore((s) => s.loadouts);
	const equippedCharacterUsage = getEquippedCharacterUsage(
		loadouts,
		undefined,
		{ artifactInstanceIds: Object.keys(owned), charactersOwned },
	);
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
		.sort((a, b) =>
			compareOwnedArtifacts(
				{
					artifact: a.artifact,
					fusionLevel: a.value.fusion_level,
					id: a.instanceId,
				},
				{
					artifact: b.artifact,
					fusionLevel: b.value.fusion_level,
					id: b.instanceId,
				},
			),
		);
	return (
		<div>
			<PageTitle
				title="Artifacts"
				description="Track owned artifacts and fusion levels."
			/>
			<div className="mb-5 flex flex-wrap gap-2">
				<AddArtifact />
				<CollectionExportMenu
					collection="artifacts"
					title="Artifacts"
					count={cards.length}
					itemWidth={120}
					maxColumns={13}
				>
					{cards.map(({ instanceId, value, artifact }) => (
						<ArtifactCard
							key={instanceId}
							artifact={artifact}
							fusionLevel={value.fusion_level}
							portraitSize={120}
							imageClassName="p-1"
						/>
					))}
				</CollectionExportMenu>
			</div>
			<div className="flex gap-5 flex-col">
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
								className="group w-[120px] text-left"
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
									equippedCharacters={
										equippedCharacterUsage.artifacts[instanceId]
									}
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
