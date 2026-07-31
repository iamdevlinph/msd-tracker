import { ArtifactCard } from "@/components/artifacts/components/artifact-card";
import { ArtifactFilter } from "@/components/artifacts/components/artifact-filter";
import type { ArtifactFilters } from "@/components/artifacts/utils/artifact-utils";
import { ARTIFACTS_DATA } from "@/data/ARTIFACTS_DATA";
import { cn } from "@/lib/utils";

export type LoadoutArtifactOption = {
	id: string;
	artifactId: number;
	fusionLevel: number;
};

type Props = {
	filters: ArtifactFilters;
	onFiltersChange: (filters: ArtifactFilters) => void;
	options: LoadoutArtifactOption[];
	selectedIds: Set<string>;
	currentId: string | null;
	onSelect: (id: string) => void;
};

export const LoadoutArtifactPicker = ({
	filters,
	onFiltersChange,
	options,
	selectedIds,
	currentId,
	onSelect,
}: Props) => (
	<>
		<div className="mb-4">
			<ArtifactFilter filters={filters} onChange={onFiltersChange} autoFocus />
		</div>
		<div className="grid grid-cols-[repeat(auto-fit,144px)] justify-center gap-3">
			{options.map(({ id, artifactId, fusionLevel }) => {
				const artifact = ARTIFACTS_DATA[artifactId];
				if (!artifact) return null;
				const disabled = selectedIds.has(id) && currentId !== id;
				return (
					<button
						key={id}
						type="button"
						disabled={disabled}
						aria-pressed={currentId === id}
						onClick={() => onSelect(id)}
						aria-label={`Select ${artifact.name}`}
						className={cn(
							"rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							disabled && "cursor-not-allowed opacity-50",
						)}
					>
						<ArtifactCard artifact={artifact} fusionLevel={fusionLevel} />
					</button>
				);
			})}
			{options.length === 0 && (
				<p className="col-span-full rounded-md border border-dashed p-4 text-sm text-muted-foreground">
					No owned artifacts match.
				</p>
			)}
		</div>
	</>
);
