import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import toast from "react-hot-toast";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { EditArtifactDetailsDialog } from "@/components/artifacts/components/edit-artifact-details-dialog";
import { EditCharacterDetailsDialog } from "@/components/characters/components/edit-character-details-dialog";
import { isCharacterVisible } from "@/components/characters/utils/character-utils";
import { CreateLoadoutSnapshotDialog } from "@/components/loadout-snapshots/components/create-loadout-snapshot-dialog";
import { LoadoutCard } from "@/components/loadouts/components/loadout-card";
import {
	type LoadoutActionSource,
	type LoadoutImageAction,
	useLoadoutImageActions,
} from "@/components/loadouts/components/loadout-image-actions";
import { LoadoutNotesDialog } from "@/components/loadouts/components/loadout-notes-dialog";
import { LoadoutPreviewDialog } from "@/components/loadouts/components/loadout-preview-dialog";
import { LoadoutPreviewSurface } from "@/components/loadouts/components/loadout-preview-surface";
import { nextDuplicateLoadoutName } from "@/components/loadouts/components/loadout-utils";
import { LoadoutsDialog } from "@/components/loadouts/components/loadouts-dialog";
import {
	LOADOUT_ACTION_SOURCES,
	LOADOUT_IMAGE_ACTIONS,
	LOADOUT_TARGET_TYPES,
} from "@/components/loadouts/loadout-constants";
import { EditMonsterlingDialog } from "@/components/monsterlings/components/edit-monsterling-dialog";
import { CollectionEmptyState } from "@/components/shared/collection-empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

type LoadoutEditorTarget =
	| { type: typeof LOADOUT_TARGET_TYPES.CHARACTER; id: number }
	| { type: typeof LOADOUT_TARGET_TYPES.MONSTERLING; id: string }
	| { type: typeof LOADOUT_TARGET_TYPES.ARTIFACT; id: string };

export const LoadoutsList = () => {
	const ga = useGoogleAnalytics();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [loadoutToEdit, setLoadoutToEdit] = useState<string | null>(null);
	const [loadoutToPreview, setLoadoutToPreview] = useState<string | null>(null);
	const [loadoutToExport, setLoadoutToExport] = useState<string | null>(null);
	const [loadoutForNotes, setLoadoutForNotes] = useState<string | null>(null);
	const [loadoutToSnapshot, setLoadoutToSnapshot] = useState<string | null>(
		null,
	);
	const [editorTarget, setEditorTarget] = useState<LoadoutEditorTarget | null>(
		null,
	);
	const exportSurfaceRef = useRef<HTMLDivElement>(null);
	const previewAfterEditRef = useRef<string | null>(null);
	const imageActions = useLoadoutImageActions(LOADOUT_ACTION_SOURCES.CARD);

	const loadouts = useAppStore((state) => state.loadouts);
	const previewPreferences = useAppStore(
		(state) => state.loadoutPreviewPreferences,
	);
	const setLoadout = useAppStore((state) => state.setLoadout);
	const deleteLoadout = useAppStore((state) => state.deleteLoadout);
	const createLoadoutSnapshot = useAppStore(
		(state) => state.createLoadoutSnapshot,
	);
	const searchQuery = search.trim().toLocaleLowerCase();
	const loadoutEntries = Object.values(loadouts)
		.filter((loadout) =>
			[
				loadout.name,
				...loadout.characters.flatMap(({ characterId }) => {
					if (characterId === null) return [];
					const catalogCharacter = CHARACTERS_DATA[characterId];
					const character =
						catalogCharacter && isCharacterVisible(catalogCharacter)
							? catalogCharacter
							: null;
					return character ? [character.name] : [];
				}),
			].some((searchableName) =>
				searchableName.toLocaleLowerCase().includes(searchQuery),
			),
		)
		.sort((a, b) => a.name.localeCompare(b.name));
	const previewLoadout = loadoutToPreview
		? (loadouts[loadoutToPreview] ?? null)
		: null;
	const exportLoadout = loadoutToExport
		? (loadouts[loadoutToExport] ?? null)
		: null;
	const notesLoadout = loadoutForNotes
		? (loadouts[loadoutForNotes] ?? null)
		: null;
	const snapshotLoadout = loadoutToSnapshot
		? (loadouts[loadoutToSnapshot] ?? null)
		: null;

	const edit = (id: string, source: LoadoutActionSource) => {
		ga.event(ANALYTICS_EVENTS.LOADOUT_EDITOR_OPEN, { mode: "edit", source });
		previewAfterEditRef.current =
			source === LOADOUT_ACTION_SOURCES.PREVIEW ? id : null;
		setLoadoutToPreview(null);
		setLoadoutToEdit(id);
		setOpen(true);
	};

	const duplicate = (loadout: LoadoutOwned, source: LoadoutActionSource) => {
		const name = nextDuplicateLoadoutName(
			loadout.name,
			loadoutEntries.map(({ name }) => name),
		);
		setLoadout({
			name,
			notes: loadout.notes ?? "",
			characters: loadout.characters.map((slot) => ({
				...slot,
				monsterlingIds: [...slot.monsterlingIds],
				stat_values: slot.stat_values ? { ...slot.stat_values } : undefined,
				pinned_stat_ids: slot.pinned_stat_ids
					? [...slot.pinned_stat_ids]
					: undefined,
			})) as LoadoutOwned["characters"],
		});
		toast.success(`Duplicated as “${name}”`);
		ga.event(ANALYTICS_EVENTS.LOADOUT_DUPLICATE, { source });
	};

	const remove = (id: string, source: LoadoutActionSource) => {
		deleteLoadout(id);
		setLoadoutToPreview(null);
		ga.event(ANALYTICS_EVENTS.LOADOUT_DELETE, { source });
	};
	const openEntityEditor = (
		target: LoadoutEditorTarget,
		source: LoadoutActionSource,
	) => {
		ga.event(ANALYTICS_EVENTS.LOADOUT_ENTITY_EDITOR_OPEN, {
			target_type: target.type,
			source,
		});
		setEditorTarget(target);
	};

	const exportImage = async (
		action: LoadoutImageAction,
		loadout: LoadoutOwned,
	) => {
		flushSync(() => setLoadoutToExport(loadout.id));
		try {
			await imageActions[action](
				loadout.name,
				exportSurfaceRef.current,
				previewPreferences.compactMonsterlings,
				previewPreferences.hideEquipment,
			);
		} finally {
			setLoadoutToExport(null);
		}
	};
	const setEditorOpen = (next: boolean | ((open: boolean) => boolean)) => {
		const isOpen = editorTarget !== null;
		if (!(typeof next === "function" ? next(isOpen) : next))
			setEditorTarget(null);
	};

	return (
		<div className="grid min-w-0 gap-3">
			{Object.keys(loadouts).length > 0 && (
				<SearchInput
					aria-label="Search saved loadouts"
					placeholder="Search loadouts or characters"
					value={search}
					onValueChange={setSearch}
				/>
			)}

			{Object.keys(loadouts).length === 0 ? (
				<CollectionEmptyState
					title="No loadouts yet"
					description="Create a loadout to organize your team, Monsterlings, and artifacts."
				/>
			) : loadoutEntries.length === 0 ? (
				<CollectionEmptyState
					title="No loadouts match this search"
					description="Try a different loadout or character name."
				/>
			) : null}

			<div className="overflow-x-auto pb-2">
				<div className="grid min-w-[18rem] grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-3">
					{loadoutEntries.map((loadout) => (
						<LoadoutCard
							key={loadout.id}
							loadout={loadout}
							onPreview={(source) => {
								ga.event(ANALYTICS_EVENTS.LOADOUT_PREVIEW, { source });
								setLoadoutToPreview(loadout.id);
							}}
							onEdit={() => {
								edit(loadout.id, LOADOUT_ACTION_SOURCES.CARD);
							}}
							onDuplicate={() =>
								duplicate(loadout, LOADOUT_ACTION_SOURCES.CARD)
							}
							onCopy={() =>
								void exportImage(LOADOUT_IMAGE_ACTIONS.COPY, loadout)
							}
							onDownload={() =>
								void exportImage(LOADOUT_IMAGE_ACTIONS.DOWNLOAD, loadout)
							}
							onNotes={() => setLoadoutForNotes(loadout.id)}
							onCreateSnapshot={() => setLoadoutToSnapshot(loadout.id)}
							onDelete={() => remove(loadout.id, LOADOUT_ACTION_SOURCES.CARD)}
							onEditCharacter={(id) =>
								openEntityEditor(
									{ type: LOADOUT_TARGET_TYPES.CHARACTER, id },
									LOADOUT_ACTION_SOURCES.CARD,
								)
							}
							onEditMonsterling={(id) =>
								openEntityEditor(
									{ type: LOADOUT_TARGET_TYPES.MONSTERLING, id },
									LOADOUT_ACTION_SOURCES.CARD,
								)
							}
							onEditArtifact={(id) =>
								openEntityEditor(
									{ type: LOADOUT_TARGET_TYPES.ARTIFACT, id },
									LOADOUT_ACTION_SOURCES.CARD,
								)
							}
							activeImageAction={
								loadoutToExport === loadout.id
									? imageActions.activeAction
									: null
							}
							disabled={imageActions.activeAction !== null}
						/>
					))}
				</div>
			</div>

			<LoadoutsDialog
				open={open}
				setOpen={setOpen}
				loadoutToEdit={loadoutToEdit}
				onClose={() => {
					const previewId = previewAfterEditRef.current;
					previewAfterEditRef.current = null;
					setLoadoutToEdit(null);
					if (previewId) setLoadoutToPreview(previewId);
				}}
			/>
			<LoadoutPreviewDialog
				loadout={previewLoadout}
				onOpenChange={(next) =>
					!next && editorTarget === null && setLoadoutToPreview(null)
				}
				onEdit={() =>
					previewLoadout &&
					edit(previewLoadout.id, LOADOUT_ACTION_SOURCES.PREVIEW)
				}
				onDuplicate={() =>
					previewLoadout &&
					duplicate(previewLoadout, LOADOUT_ACTION_SOURCES.PREVIEW)
				}
				onDelete={() =>
					previewLoadout &&
					remove(previewLoadout.id, LOADOUT_ACTION_SOURCES.PREVIEW)
				}
				onNotes={() => previewLoadout && setLoadoutForNotes(previewLoadout.id)}
				onCreateSnapshot={() =>
					previewLoadout && setLoadoutToSnapshot(previewLoadout.id)
				}
				onEditCharacter={(id) =>
					openEntityEditor(
						{ type: LOADOUT_TARGET_TYPES.CHARACTER, id },
						LOADOUT_ACTION_SOURCES.PREVIEW,
					)
				}
				onEditMonsterling={(id) =>
					openEntityEditor(
						{ type: LOADOUT_TARGET_TYPES.MONSTERLING, id },
						LOADOUT_ACTION_SOURCES.PREVIEW,
					)
				}
				onEditArtifact={(id) =>
					openEntityEditor(
						{ type: LOADOUT_TARGET_TYPES.ARTIFACT, id },
						LOADOUT_ACTION_SOURCES.PREVIEW,
					)
				}
			/>
			<LoadoutNotesDialog
				loadout={notesLoadout}
				onOpenChange={(next) => !next && setLoadoutForNotes(null)}
				onSave={(notes) => {
					if (!notesLoadout) return;
					setLoadout(
						{
							name: notesLoadout.name,
							notes,
							characters: notesLoadout.characters,
						},
						notesLoadout.id,
					);
					ga.event(ANALYTICS_EVENTS.LOADOUT_NOTES_SAVE);
					setLoadoutForNotes(null);
				}}
			/>
			<CreateLoadoutSnapshotDialog
				loadout={snapshotLoadout}
				onOpenChange={(next) => !next && setLoadoutToSnapshot(null)}
				onCreate={(name, tag, notes, details) => {
					if (!snapshotLoadout) return;
					const id = createLoadoutSnapshot({
						loadoutId: snapshotLoadout.id,
						name,
						tag,
						notes,
						details,
					});
					if (!id) return;
					ga.event(ANALYTICS_EVENTS.LOADOUT_SNAPSHOT_CREATE);
					toast.success(`Created snapshot “${name}”`);
					setLoadoutToSnapshot(null);
				}}
			/>
			<EditCharacterDetailsDialog
				charIdToEdit={
					editorTarget?.type === LOADOUT_TARGET_TYPES.CHARACTER
						? editorTarget.id
						: null
				}
				open={editorTarget?.type === LOADOUT_TARGET_TYPES.CHARACTER}
				setOpen={setEditorOpen}
				onClose={() => setEditorTarget(null)}
			/>
			<EditMonsterlingDialog
				monsterlingToEdit={
					editorTarget?.type === LOADOUT_TARGET_TYPES.MONSTERLING
						? editorTarget.id
						: null
				}
				open={editorTarget?.type === LOADOUT_TARGET_TYPES.MONSTERLING}
				setOpen={setEditorOpen}
				onClose={() => setEditorTarget(null)}
			/>
			<EditArtifactDetailsDialog
				instanceId={
					editorTarget?.type === LOADOUT_TARGET_TYPES.ARTIFACT
						? editorTarget.id
						: null
				}
				open={editorTarget?.type === LOADOUT_TARGET_TYPES.ARTIFACT}
				setOpen={setEditorOpen}
				onClose={() => setEditorTarget(null)}
			/>
			{exportLoadout && (
				<div
					aria-hidden="true"
					className="pointer-events-none fixed top-0 left-[-10000px]"
				>
					<LoadoutPreviewSurface
						ref={exportSurfaceRef}
						loadout={exportLoadout}
						compactMonsterlings={previewPreferences.compactMonsterlings}
						hideEquipment={previewPreferences.hideEquipment}
					/>
				</div>
			)}
		</div>
	);
};
