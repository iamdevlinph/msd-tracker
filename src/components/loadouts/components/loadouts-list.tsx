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
		| { type: "character"; id: number }
		| { type: "monsterling"; id: string }
		| { type: "artifact"; id: string }
		| null
	>(null);
	const exportSurfaceRef = useRef<HTMLDivElement>(null);
	const imageActions = useLoadoutImageActions("card");

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
							onDuplicate={() => duplicate(loadout, "card")}
							onCopy={() => void exportImage("copy", loadout)}
							onDownload={() => void exportImage("download", loadout)}
							onDelete={() => remove(loadout.id)}
							onEditCharacter={(id) =>
								setEditorTarget({ type: "character", id })
							}
							onEditMonsterling={(id) =>
								setEditorTarget({ type: "monsterling", id })
							}
							onEditArtifact={(id) => setEditorTarget({ type: "artifact", id })}
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
					previewLoadout && duplicate(previewLoadout, "preview")
				}
				onDelete={() => previewLoadout && remove(previewLoadout.id)}
				onEditCharacter={(id) => setEditorTarget({ type: "character", id })}
				onEditMonsterling={(id) => setEditorTarget({ type: "monsterling", id })}
				onEditArtifact={(id) => setEditorTarget({ type: "artifact", id })}
			/>
			<EditCharacterDetailsDialog
				charIdToEdit={
					editorTarget?.type === "character" ? editorTarget.id : null
				}
				open={editorTarget?.type === "character"}
				setOpen={setEditorOpen}
				onClose={() => setEditorTarget(null)}
			/>
			<EditMonsterlingDialog
				monsterlingToEdit={
					editorTarget?.type === "monsterling" ? editorTarget.id : null
				}
				open={editorTarget?.type === "monsterling"}
				setOpen={setEditorOpen}
				onClose={() => setEditorTarget(null)}
			/>
			<EditArtifactDetailsDialog
				instanceId={editorTarget?.type === "artifact" ? editorTarget.id : null}
				open={editorTarget?.type === "artifact"}
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
