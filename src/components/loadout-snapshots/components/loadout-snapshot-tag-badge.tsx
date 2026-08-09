import {
	LOADOUT_SNAPSHOT_TAG_LABELS,
	LOADOUT_SNAPSHOT_TAG_STYLES,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";

type LoadoutSnapshotTagBadgeProps = {
	tag: LoadoutSnapshotTag;
};

export const LoadoutSnapshotTagBadge = ({
	tag,
}: LoadoutSnapshotTagBadgeProps) => (
	<span
		className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${LOADOUT_SNAPSHOT_TAG_STYLES[tag]}`}
	>
		{LOADOUT_SNAPSHOT_TAG_LABELS[tag]}
	</span>
);
