import {
	LOADOUT_SNAPSHOT_TAG_LABELS,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import { fmt } from "@/lib/utils";

type LoadoutSnapshotMetadataProps = {
	createdAt: number;
	tag: LoadoutSnapshotTag;
};

export const LoadoutSnapshotMetadata = ({
	createdAt,
	tag,
}: LoadoutSnapshotMetadataProps) => (
	<div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
		<span>Created {fmt(createdAt)}</span>
		<span className="rounded-full border bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground">
			{LOADOUT_SNAPSHOT_TAG_LABELS[tag]}
		</span>
	</div>
);
