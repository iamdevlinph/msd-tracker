import {
	LOADOUT_SNAPSHOT_DIFFICULTY_LABELS,
	LOADOUT_SNAPSHOT_ELEMENT_LABELS,
	LOADOUT_SNAPSHOT_TAG_LABELS,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import { fmt } from "@/lib/utils";
import type { LoadoutSnapshotDetails } from "@/stores/loadout-snapshots-slice";

type LoadoutSnapshotMetadataProps = {
	createdAt: number;
	tag: LoadoutSnapshotTag;
	details?: LoadoutSnapshotDetails | null;
	notes?: string;
	showNotes?: boolean;
};

export const LoadoutSnapshotMetadata = ({
	createdAt,
	tag,
	details,
	notes,
	showNotes = true,
}: LoadoutSnapshotMetadataProps) => (
	<div className="mt-1 grid gap-1 text-xs text-muted-foreground">
		<div className="flex flex-wrap items-center gap-1.5">
			<span className="rounded-full border bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground">
				{LOADOUT_SNAPSHOT_TAG_LABELS[tag]}
			</span>
			{details && (
				<span className="inline-flex flex-wrap items-center gap-1">
					{"difficulty" in details ? (
						`Difficulty ${LOADOUT_SNAPSHOT_DIFFICULTY_LABELS[details.difficulty]} · Level ${details.level} · Clear time ${details.clear_time}`
					) : "element_id" in details ? (
						<>
							Element{" "}
							<img
								src={ELEMENTS_DATA[details.element_id].image}
								width="16"
								height="16"
								alt={`${LOADOUT_SNAPSHOT_ELEMENT_LABELS[details.element_id]} icon`}
							/>{" "}
							· Score {details.score.toLocaleString("en-US")}
						</>
					) : (
						`Level ${details.level}${details.score === undefined ? "" : ` · Score ${details.score.toLocaleString("en-US")}`}`
					)}
				</span>
			)}
		</div>
		<div>Created {fmt(createdAt)}</div>
		{showNotes && notes && (
			<p className="whitespace-pre-wrap text-foreground">
				<span className="font-medium">Note:</span> {notes}
			</p>
		)}
	</div>
);
