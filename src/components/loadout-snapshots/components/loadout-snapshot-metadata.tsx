import {
	CONQUEST_DIFFICULTY_LABELS,
	LOADOUT_SNAPSHOT_ELEMENT_LABELS,
	type LoadoutSnapshotElement,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import type {
	ConquestSnapshotDetails,
	LoadoutSnapshotDetails,
} from "@/stores/loadout-snapshots-slice";
import { LoadoutSnapshotTagBadge } from "./loadout-snapshot-tag-badge";

type LoadoutSnapshotMetadataProps = {
	tag: LoadoutSnapshotTag;
	details?: LoadoutSnapshotDetails | null;
	notes?: string;
	showNotes?: boolean;
};

const ResElementMetadata = ({
	elementIds,
}: {
	elementIds?: LoadoutSnapshotElement[];
}) =>
	elementIds?.length ? (
		<span className="inline-flex flex-wrap items-center gap-1">
			<span className="text-muted-foreground">RES Element</span>
			<span className="inline-flex items-center gap-1 font-semibold text-foreground">
				{elementIds.map((elementId) => (
					<img
						key={elementId}
						src={ELEMENTS_DATA[elementId].image}
						width="16"
						height="16"
						alt={`${LOADOUT_SNAPSHOT_ELEMENT_LABELS[elementId]} RES Element icon`}
					/>
				))}
			</span>
		</span>
	) : null;

const ConquestSnapshotMetadata = ({
	details,
}: {
	details: ConquestSnapshotDetails;
}) => (
	<div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3">
		<div className="min-w-0">
			<LoadoutSnapshotTagBadge tag="conquest" />
		</div>
		<div className="inline-flex min-w-0 items-center gap-1 text-foreground">
			{details.boss_id !== undefined ? (
				<>
					<span className="text-muted-foreground">Boss</span>
					<img
						src={MONSTERLINGS_DATA[details.boss_id].image}
						width="20"
						height="20"
						alt={`${MONSTERLINGS_DATA[details.boss_id].name} icon`}
					/>
					<span className="truncate font-semibold">
						{MONSTERLINGS_DATA[details.boss_id].name}
					</span>
				</>
			) : null}
		</div>
		<div className="min-w-0">
			{details.res_element_ids?.length ? (
				<ResElementMetadata elementIds={details.res_element_ids} />
			) : null}
		</div>
		<div className="inline-flex min-w-0 flex-wrap items-center gap-1">
			<span>Difficulty</span>
			<span className="font-semibold text-foreground">
				{CONQUEST_DIFFICULTY_LABELS[details.difficulty]}
			</span>
		</div>
		<div className="inline-flex min-w-0 flex-wrap items-center gap-1">
			<span>Level</span>
			<span className="font-semibold text-foreground">{details.level}</span>
		</div>
		<div className="inline-flex min-w-0 flex-wrap items-center gap-1">
			<span>Clear time</span>
			<span className="font-semibold text-foreground">
				{details.clear_time}
			</span>
		</div>
	</div>
);

export const LoadoutSnapshotMetadata = ({
	tag,
	details,
	notes,
	showNotes = true,
}: LoadoutSnapshotMetadataProps) => (
	<div className="mt-1 grid gap-1 text-xs text-muted-foreground">
		{details && "difficulty" in details ? (
			<ConquestSnapshotMetadata details={details} />
		) : (
			<div className="flex flex-wrap items-center gap-1.5">
				<LoadoutSnapshotTagBadge tag={tag} />
				{details && (
					<span className="inline-flex flex-wrap items-center gap-1">
						{"element_id" in details ? (
							<>
								<span>Element</span>{" "}
								<span className="inline-flex items-center gap-1 font-semibold text-foreground">
									<img
										src={ELEMENTS_DATA[details.element_id].image}
										width="16"
										height="16"
										alt={`${LOADOUT_SNAPSHOT_ELEMENT_LABELS[details.element_id]} icon`}
									/>
								</span>{" "}
								{details.res_element_ids?.length ? (
									<>
										·{" "}
										<ResElementMetadata
											elementIds={details.res_element_ids}
										/>{" "}
									</>
								) : null}
								· <span>Score</span>{" "}
								<span className="font-semibold text-foreground">
									{details.score.toLocaleString("en-US")}
								</span>
							</>
						) : (
							<>
								<span>Level</span>{" "}
								<span className="font-semibold text-foreground">
									{details.level}
								</span>{" "}
								· <span>Clear time</span>{" "}
								<span className="font-semibold text-foreground">
									{details.clear_time}
								</span>
								{details.score === undefined ? null : (
									<>
										{" "}
										· <span>Score</span>{" "}
										<span className="font-semibold text-foreground">
											{details.score.toLocaleString("en-US")}
										</span>
									</>
								)}
							</>
						)}
					</span>
				)}
			</div>
		)}
		{showNotes && notes && (
			<p className="whitespace-pre-wrap text-foreground">
				<span className="font-medium">Note:</span> {notes}
			</p>
		)}
	</div>
);
