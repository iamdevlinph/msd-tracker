import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import toast from "react-hot-toast";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { EditArtifactDetailsDialog } from "@/components/artifacts/components/edit-artifact-details-dialog";
import { EditCharacterDetailsDialog } from "@/components/characters/components/edit-character-details-dialog";
import { LoadoutCard } from "@/components/loadouts/components/loadout-card";
import {
	type LoadoutActionSource,
	type LoadoutImageAction,
	useLoadoutImageActions,
} from "@/components/loadouts/components/loadout-image-actions";
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
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

export const LoadoutsList = () => {
	const ga = useGoogleAnalytics();
	const [open, setOpen] = useState(false);
	const [loadoutToEdit, setLoadoutToEdit] = useState<string | null>(null);
	const [loadoutToPreview, setLoadoutToPreview] = useState<string | null>(null);
	const [loadoutToExport, setLoadoutToExport] = useState<string | null>(null);
	const [editorTarget, setEditorTarget] = useState<
		| { type: typeof LOADOUT_TARGET_TYPES.CHARACTER; id: number }
		| { type: typeof LOADOUT_TARGET_TYPES.MONSTERLING; id: string }
		| { type: typeof LOADOUT_TARGET_TYPES.ARTIFACT; id: string }
		| null
	>(null);
	const exportSurfaceRef = useRef<HTMLDivElement>(null);
	const imageActions = useLoadoutImageActions(LOADOUT_ACTION_SOURCES.CARD);

	const loadouts = useAppStore((state) => state.loadouts);
	const setLoadout = useAppStore((state) => state.setLoadout);
	const deleteLoadout = useAppStore((state) => state.deleteLoadout);
	const loadoutEntries = Object.values(loadouts).sort((a, b) =>
		a.name.localeCompare(b.name),
	);
	const previewLoadout = loadoutToPreview
		? (loadouts[loadoutToPreview] ?? null)
		: null;
	const exportLoadout = loadoutToExport
		? (loadouts[loadoutToExport] ?? null)
		: null;

	const edit = (id: string) => {
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
			characters: loadout.characters.map((slot) => ({
				...slot,
				monsterlingIds: [...slot.monsterlingIds],
			})) as LoadoutOwned["characters"],
		});
		toast.success(`Duplicated as “${name}”`);
		ga.event(ANALYTICS_EVENTS.LOADOUT_DUPLICATE, { source });
	};

	const remove = (id: string) => {
		deleteLoadout(id);
		setLoadoutToPreview(null);
		ga.event(ANALYTICS_EVENTS.LOADOUT_DELETE);
	};

	const exportImage = async (
		action: LoadoutImageAction,
		loadout: LoadoutOwned,
	) => {
		flushSync(() => setLoadoutToExport(loadout.id));
		try {
			await imageActions[action](loadout.name, exportSurfaceRef.current, true);
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
		<div className="min-w-0">
			{loadoutEntries.length === 0 && (
				<CollectionEmptyState
					title="No loadouts yet"
					description="Create a loadout to organize your team, Monsterlings, and artifacts."
				/>
			)}

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
								edit(loadout.id);
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
							onDelete={() => remove(loadout.id)}
							onEditCharacter={(id) =>
								setEditorTarget({ type: LOADOUT_TARGET_TYPES.CHARACTER, id })
							}
							onEditMonsterling={(id) =>
								setEditorTarget({ type: LOADOUT_TARGET_TYPES.MONSTERLING, id })
							}
							onEditArtifact={(id) =>
								setEditorTarget({ type: LOADOUT_TARGET_TYPES.ARTIFACT, id })
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
				onClose={() => setLoadoutToEdit(null)}
			/>
			<LoadoutPreviewDialog
				loadout={previewLoadout}
				onOpenChange={(next) =>
					!next && editorTarget === null && setLoadoutToPreview(null)
				}
				onEdit={() => previewLoadout && edit(previewLoadout.id)}
				onDuplicate={() =>
					previewLoadout &&
					duplicate(previewLoadout, LOADOUT_ACTION_SOURCES.PREVIEW)
				}
				onDelete={() => previewLoadout && remove(previewLoadout.id)}
				onEditCharacter={(id) =>
					setEditorTarget({ type: LOADOUT_TARGET_TYPES.CHARACTER, id })
				}
				onEditMonsterling={(id) =>
					setEditorTarget({ type: LOADOUT_TARGET_TYPES.MONSTERLING, id })
				}
				onEditArtifact={(id) =>
					setEditorTarget({ type: LOADOUT_TARGET_TYPES.ARTIFACT, id })
				}
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
						compactMonsterlings
					/>
				</div>
			)}
		</div>
	);
};
