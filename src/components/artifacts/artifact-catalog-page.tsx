import { useMemo, useState } from "react";
import { ArtifactCard } from "@/components/artifacts/components/artifact-card";
import { ArtifactFilter } from "@/components/artifacts/components/artifact-filter";
import {
	ARTIFACT_CATALOG_SORTS,
	type ArtifactCatalogSort,
	emptyArtifactFilters,
	filterArtifacts,
	sortArtifacts,
} from "@/components/artifacts/utils/artifact-utils";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { PageTitle } from "@/components/shared/page-title";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";

export const ArtifactCatalogPage = () => {
	const [filters, setFilters] = useState(emptyArtifactFilters);
	const [sort, setSort] = useState<ArtifactCatalogSort>(
		ARTIFACT_CATALOG_SORTS.TIER_DESC,
	);
	const artifacts = useMemo(
		() =>
			sortArtifacts(
				filterArtifacts(Object.values(ARTIFACTS_DATA), filters),
				sort,
			),
		[filters, sort],
	);

	return (
		<div>
			<PageTitle
				title="Artifact Catalog"
				description="Browse all available artifacts."
			/>
			<div className="flex flex-col gap-5">
				<ArtifactFilter
					filters={filters}
					onChange={setFilters}
					sort={sort}
					onSortChange={setSort}
				/>
				{artifacts.length ? (
					<div className="grid grid-cols-[repeat(auto-fill,120px)] gap-3">
						{artifacts.map((artifact) => (
							<ArtifactCard
								key={artifact.id}
								artifact={artifact}
								portraitSize={120}
								imageClassName="p-1"
							/>
						))}
					</div>
				) : (
					<CollectionEmptyState
						title="No artifacts found"
						description="Adjust or clear the filters to see artifacts."
					/>
				)}
			</div>
		</div>
	);
};
