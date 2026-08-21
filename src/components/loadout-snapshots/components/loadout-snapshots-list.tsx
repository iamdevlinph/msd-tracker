import { useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { LoadoutSnapshotDialog } from "@/components/loadout-snapshots/components/create-loadout-snapshot-dialog";
import { LoadoutSnapshotFilter } from "@/components/loadout-snapshots/components/loadout-snapshot-filter";
import { LoadoutSnapshotMetadata } from "@/components/loadout-snapshots/components/loadout-snapshot-metadata";
import {
	LOADOUT_SNAPSHOT_SORTS,
	type LoadoutSnapshotSort,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import {
	LOADOUT_SNAPSHOT_ALL_TAGS,
	type LoadoutSnapshotFilters,
	matchesLoadoutSnapshotFilters,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-filter";
import { LoadoutActions } from "@/components/loadouts/components/loadout-actions";
import { useLoadoutImageActions } from "@/components/loadouts/components/loadout-image-actions";
import { LoadoutPreviewDialog } from "@/components/loadouts/components/loadout-preview-dialog";
import { LoadoutPreviewSurface } from "@/components/loadouts/components/loadout-preview-surface";
import type { LoadoutRenderData } from "@/components/loadouts/components/loadout-render-data";
import { LOADOUT_ACTION_SOURCES } from "@/components/loadouts/loadout-constants";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutSnapshot } from "@/stores/loadout-snapshots-slice";

const snapshotLoadout = (snapshot: LoadoutSnapshot) => ({
	...snapshot.loadout,
	id: snapshot.id,
	name: snapshot.name,
	notes: "",
});

const snapshotRenderData = (snapshot: LoadoutSnapshot): LoadoutRenderData => ({
	charactersOwned: snapshot.characters_owned,
	monsterlingsOwned: snapshot.monsterlings_owned,
	monsterlingLinkChainLevels: snapshot.monsterling_link_chain_levels,
	artifactsOwned: snapshot.artifacts_owned,
});

export const LoadoutSnapshotsList = () => {
	const ga = useGoogleAnalytics();
	const snapshots = useAppStore((state) => state.loadoutSnapshots);
	const previewPreferences = useAppStore(
		(state) => state.loadoutPreviewPreferences,
	);
	const deleteLoadoutSnapshot = useAppStore(
		(state) => state.deleteLoadoutSnapshot,
	);
	const updateLoadoutSnapshot = useAppStore(
		(state) => state.updateLoadoutSnapshot,
	);
	const [filters, setFilters] = useState<LoadoutSnapshotFilters>({
		search: "",
		tag: LOADOUT_SNAPSHOT_ALL_TAGS,
		selectedElementIds: [],
		selectedBossIds: [],
		difficulty: null,
	});
	const [sort, setSort] = useState<LoadoutSnapshotSort>(
		LOADOUT_SNAPSHOT_SORTS.CREATED_DESC,
	);
	const [previewId, setPreviewId] = useState<string | null>(null);
	const [exportId, setExportId] = useState<string | null>(null);
	const [editId, setEditId] = useState<string | null>(null);
	const exportRef = useRef<HTMLDivElement>(null);
	const imageActions = useLoadoutImageActions(
		LOADOUT_ACTION_SOURCES.CARD,
		"snapshot",
	);
	const entries = useMemo(() => {
		return Object.values(snapshots)
			.filter((snapshot) => matchesLoadoutSnapshotFilters(snapshot, filters))
			.sort((a, b) => {
				if (sort === LOADOUT_SNAPSHOT_SORTS.NAME_ASC)
					return a.name.localeCompare(b.name) || b.created_at - a.created_at;
				if (sort === LOADOUT_SNAPSHOT_SORTS.NAME_DESC)
					return b.name.localeCompare(a.name) || b.created_at - a.created_at;
				return sort === LOADOUT_SNAPSHOT_SORTS.CREATED_ASC
					? a.created_at - b.created_at || a.name.localeCompare(b.name)
					: b.created_at - a.created_at || a.name.localeCompare(b.name);
			});
	}, [filters, snapshots, sort]);
	const preview = previewId ? (snapshots[previewId] ?? null) : null;
	const exported = exportId ? (snapshots[exportId] ?? null) : null;
	const editing = editId ? (snapshots[editId] ?? null) : null;
	const remove = (id: string) => {
		deleteLoadoutSnapshot(id);
		setPreviewId(null);
		ga.event(ANALYTICS_EVENTS.LOADOUT_SNAPSHOT_DELETE);
	};
	const copy = async (snapshot: LoadoutSnapshot) => {
		flushSync(() => setExportId(snapshot.id));
		try {
			await imageActions.copy(
				snapshot.name,
				exportRef.current,
				previewPreferences.compactMonsterlings,
				previewPreferences.hideEquipment,
			);
		} finally {
			setExportId(null);
		}
	};

	return (
		<div className="grid gap-5">
			<div className="grid gap-3">
				<LoadoutSnapshotFilter
					filters={filters}
					sort={sort}
					onFiltersChange={setFilters}
					onSortChange={setSort}
					onClear={() => {
						setFilters({
							search: "",
							tag: LOADOUT_SNAPSHOT_ALL_TAGS,
							selectedElementIds: [],
							selectedBossIds: [],
							difficulty: null,
						});
						setSort(LOADOUT_SNAPSHOT_SORTS.CREATED_DESC);
					}}
				/>
			</div>

			{entries.length === 0 ? (
				<CollectionEmptyState
					title={
						Object.keys(snapshots).length
							? "No snapshots match these filters"
							: "No loadout snapshots yet"
					}
					description={
						Object.keys(snapshots).length
							? "Adjust or clear the filters to see your snapshots."
							: "Create a snapshot from a saved loadout to record its current state."
					}
				/>
			) : (
				<div className="grid gap-2">
					{entries.map((snapshot) => (
						<div
							key={snapshot.id}
							className="relative flex cursor-pointer flex-col gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary focus-within:border-primary sm:flex-row sm:items-center sm:justify-between"
						>
							<button
								type="button"
								className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								aria-label={`Preview ${snapshot.name} snapshot row`}
								onClick={() => {
									ga.event(ANALYTICS_EVENTS.LOADOUT_SNAPSHOT_PREVIEW);
									setPreviewId(snapshot.id);
								}}
							/>
							<div className="pointer-events-none relative z-10 min-w-0">
								<h3 className="font-semibold">{snapshot.name}</h3>
								<LoadoutSnapshotMetadata
									tag={snapshot.tag}
									details={snapshot.details}
									notes={snapshot.notes}
								/>
							</div>
							<LoadoutActions
								loadoutName={snapshot.name}
								onPreview={() => {
									ga.event(ANALYTICS_EVENTS.LOADOUT_SNAPSHOT_PREVIEW);
									setPreviewId(snapshot.id);
								}}
								onEdit={() => setEditId(snapshot.id)}
								onCopy={() => void copy(snapshot)}
								onDelete={() => remove(snapshot.id)}
								activeImageAction={
									exportId === snapshot.id ? imageActions.activeAction : null
								}
								disabled={imageActions.activeAction !== null}
								itemType="loadout snapshot"
							/>
						</div>
					))}
				</div>
			)}

			<LoadoutPreviewDialog
				loadout={preview ? snapshotLoadout(preview) : null}
				onOpenChange={(open) => !open && setPreviewId(null)}
				onEdit={() => preview && setEditId(preview.id)}
				onDelete={() => preview && remove(preview.id)}
				renderData={preview ? snapshotRenderData(preview) : undefined}
				metadata={
					preview ? (
						<LoadoutSnapshotMetadata
							tag={preview.tag}
							details={preview.details}
							showNotes={false}
						/>
					) : null
				}
				metadataWithNotes={
					preview?.notes ? (
						<LoadoutSnapshotMetadata
							tag={preview.tag}
							details={preview.details}
							notes={preview.notes}
						/>
					) : null
				}
				typeLabel="Loadout Snapshot"
				headerSupplement={
					preview ? (
						<time
							className="border-b px-4 py-1 text-[10px] leading-relaxed text-muted-foreground"
							dateTime={new Date(preview.created_at).toISOString()}
						>
							Created {new Date(preview.created_at).toLocaleString()}
						</time>
					) : null
				}
				target="snapshot"
				showMetadataInHeader={false}
			/>
			<LoadoutSnapshotDialog
				loadout={null}
				snapshot={editing}
				onOpenChange={(open) => !open && setEditId(null)}
				onSubmit={(value) => {
					if (!editing) return;
					updateLoadoutSnapshot(editing.id, value);
					ga.event(ANALYTICS_EVENTS.LOADOUT_SNAPSHOT_UPDATE);
					setEditId(null);
				}}
			/>

			{exported && (
				<div
					aria-hidden="true"
					className="pointer-events-none fixed top-0 left-[-10000px]"
				>
					<LoadoutPreviewSurface
						ref={exportRef}
						loadout={snapshotLoadout(exported)}
						renderData={snapshotRenderData(exported)}
						metadata={
							<LoadoutSnapshotMetadata
								tag={exported.tag}
								details={exported.details}
								notes={exported.notes}
							/>
						}
						compactMonsterlings={previewPreferences.compactMonsterlings}
						hideEquipment={previewPreferences.hideEquipment}
						typeLabel="Loadout Snapshot"
					/>
				</div>
			)}
		</div>
	);
};
