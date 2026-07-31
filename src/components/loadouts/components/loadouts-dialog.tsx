import { ArrowLeftIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { LoadoutArtifactPicker } from "@/components/loadouts/components/loadout-artifact-picker";
import { LoadoutCharacterPicker } from "@/components/loadouts/components/loadout-character-picker";
import { LoadoutEditor } from "@/components/loadouts/components/loadout-editor";
import { LoadoutMonsterlingPicker } from "@/components/loadouts/components/loadout-monsterling-picker";
import { useLoadoutDialogController } from "@/components/loadouts/hooks/use-loadout-dialog-controller";
import { LOADOUT_TARGET_TYPES } from "@/components/loadouts/loadout-constants";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { preventSearchInputDismissOnEscape } from "@/components/ui/search-input";
import { cn } from "@/lib/utils";

type LoadoutsDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	loadoutToEdit?: string | null;
	onClose?: () => void;
};

export const LoadoutsDialog = ({
	open,
	setOpen,
	loadoutToEdit = null,
	onClose,
}: LoadoutsDialogProps) => {
	const controller = useLoadoutDialogController(
		loadoutToEdit,
		open,
		setOpen,
		onClose,
	);
	const title =
		controller.pickerTarget?.type === LOADOUT_TARGET_TYPES.CHARACTER
			? "Select Character"
			: controller.pickerTarget?.type === LOADOUT_TARGET_TYPES.MONSTERLING
				? `Select ${controller.pickerTarget.legendary ? "Legendary " : ""}Monsterling`
				: controller.pickerTarget?.type === LOADOUT_TARGET_TYPES.ARTIFACT
					? "Select Artifact"
					: loadoutToEdit
						? "Edit Team Loadout"
						: "Add Team Loadout";
	const description = controller.pickerTarget
		? controller.pickerTarget.type === LOADOUT_TARGET_TYPES.CHARACTER
			? "Search and filter your owned characters."
			: controller.pickerTarget.type === LOADOUT_TARGET_TYPES.MONSTERLING
				? "Search owned monsterlings by name or tier."
				: "Search and filter your owned artifacts."
		: "Select three owned characters and assign their monsterlings.";
	return (
		<Dialog
			open={open}
			onOpenChange={(next) => (next ? setOpen(true) : controller.close())}
		>
			<DialogContent
				onEscapeKeyDown={preventSearchInputDismissOnEscape}
				className={cn(
					"grid h-[calc(100dvh-2rem)] max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-2xl",
					controller.pickerTarget && "md:max-w-[46rem] xl:max-w-[68.5rem]",
				)}
				onCloseAutoFocus={controller.close}
			>
				<DialogHeader className="border-b p-4">
					<div className="flex items-center gap-3">
						{controller.pickerTarget && (
							<Button
								type="button"
								variant="secondary"
								size="icon"
								className="rounded-full"
								onClick={controller.resetPicker}
								aria-label="Back to loadout"
							>
								<ArrowLeftIcon />
							</Button>
						)}
						<DialogTitle>{title}</DialogTitle>
					</div>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="min-h-0 overflow-y-auto p-4">
					{controller.pickerTarget?.type === LOADOUT_TARGET_TYPES.CHARACTER ? (
						<LoadoutCharacterPicker
							filters={controller.characterFilters}
							onFiltersChange={controller.setCharacterFilters}
							options={controller.characterPickerOptions}
							selectedIds={controller.selectedCharacterIds}
							currentId={
								controller.draft.characters[
									controller.pickerTarget.characterIndex
								].characterId
							}
							onSelect={controller.selectCharacter}
						/>
					) : controller.pickerTarget?.type ===
						LOADOUT_TARGET_TYPES.MONSTERLING ? (
						<LoadoutMonsterlingPicker
							filters={controller.monsterlingFilters}
							onFiltersChange={controller.setMonsterlingFilters}
							options={controller.monsterlingPickerOptions}
							selectedRegularIds={controller.selectedRegularMonsterlingIds}
							currentCharacterRegularIds={
								controller.currentCharacterRegularMonsterlingIds
							}
							currentId={
								controller.pickerTarget.legendary
									? (controller.draft.characters[
											controller.pickerTarget.characterIndex
										].legendaryMonsterlingId ?? null)
									: controller.draft.characters[
											controller.pickerTarget.characterIndex
										].monsterlingIds[
											controller.pickerTarget.monsterlingIndex ?? 0
										]
							}
							legendary={controller.pickerTarget.legendary}
							onSelect={controller.selectMonsterling}
						/>
					) : controller.pickerTarget?.type ===
						LOADOUT_TARGET_TYPES.ARTIFACT ? (
						<LoadoutArtifactPicker
							filters={controller.artifactFilters}
							onFiltersChange={controller.setArtifactFilters}
							options={controller.artifactPickerOptions}
							selectedIds={controller.selectedArtifactIds}
							currentId={
								controller.draft.characters[
									controller.pickerTarget.characterIndex
								].artifactInstanceId ?? null
							}
							onSelect={controller.selectArtifact}
						/>
					) : (
						<LoadoutEditor
							draft={controller.draft}
							activeTab={controller.activeTab}
							monsterlingsOwned={controller.monsterlingsOwned}
							artifactsOwned={controller.artifactsOwned}
							onNameChange={controller.setName}
							onActiveTabChange={controller.setActiveTab}
							onOpenCharacterPicker={controller.openCharacterPicker}
							onOpenMonsterlingPicker={controller.openMonsterlingPicker}
							onOpenArtifactPicker={controller.openArtifactPicker}
							onUpdateSlot={controller.updateSlot}
						/>
					)}
				</div>
				<DialogFooter className="grid grid-cols-2 border-t p-4 sm:flex">
					{controller.pickerTarget ? (
						<Button
							type="button"
							variant="outline"
							className="col-span-2"
							onClick={controller.resetPicker}
						>
							Back
						</Button>
					) : (
						<>
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={controller.close}
							>
								Cancel
							</Button>
							<Button
								type="button"
								className="w-full"
								disabled={!controller.canSave}
								onClick={controller.submit}
							>
								{loadoutToEdit ? "Update" : "Create"}
							</Button>
						</>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
