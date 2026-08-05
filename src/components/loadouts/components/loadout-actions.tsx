import {
	CameraIcon,
	CopyPlusIcon,
	EditIcon,
	EyeIcon,
	FileTextIcon,
	ShareIcon,
	Trash2Icon,
} from "lucide-react";
import type { LoadoutImageAction } from "@/components/loadouts/components/loadout-image-actions";
import { LOADOUT_IMAGE_ACTIONS } from "@/components/loadouts/loadout-constants";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoadoutActionsProps = {
	loadoutName: string;
	onEdit?: () => void;
	onDuplicate?: () => void;
	onCopy?: () => void;
	onDownload?: () => void;
	onDelete?: () => void;
	onNotes?: () => void;
	onCreateSnapshot?: () => void;
	onPreview?: () => void;
	activeImageAction?: LoadoutImageAction | null;
	disabled?: boolean;
	className?: string;
	itemType?: "team loadout" | "loadout snapshot";
};

export const LoadoutActions = ({
	loadoutName,
	onEdit,
	onDuplicate,
	onCopy,
	onDelete,
	onNotes,
	onCreateSnapshot,
	onPreview,
	activeImageAction = null,
	disabled = false,
	className,
	itemType = "team loadout",
}: LoadoutActionsProps) => {
	const busy = disabled || activeImageAction !== null;
	const labels = {
		preview: `Preview ${loadoutName}`,
		edit: `Edit ${loadoutName}`,
		duplicate: `Duplicate ${loadoutName}`,
		copy: `Copy ${loadoutName} image`,
		delete: `Delete ${loadoutName}`,
	};

	return (
		<div
			className={cn(
				"relative z-20 flex flex-wrap justify-end gap-1",
				className,
			)}
		>
			{onPreview && (
				<button
					type="button"
					className="min-w-4 flex-1 cursor-pointer self-stretch rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					onClick={onPreview}
					disabled={busy}
					aria-label={`Preview ${loadoutName} from action row`}
				/>
			)}
			{onPreview && (
				<Button
					type="button"
					size="icon-sm"
					variant="outline"
					onClick={onPreview}
					disabled={busy}
					aria-label={labels.preview}
					title={labels.preview}
				>
					<EyeIcon />
				</Button>
			)}
			{onEdit && (
				<Button
					type="button"
					size="icon-sm"
					variant="outline"
					onClick={onEdit}
					disabled={busy}
					aria-label={labels.edit}
					title={labels.edit}
				>
					<EditIcon />
				</Button>
			)}
			{onDuplicate && (
				<Button
					type="button"
					size="icon-sm"
					variant="outline"
					onClick={onDuplicate}
					disabled={busy}
					aria-label={labels.duplicate}
					title={labels.duplicate}
				>
					<CopyPlusIcon />
				</Button>
			)}
			{onCopy && (
				<Button
					type="button"
					size="icon-sm"
					variant="outline"
					onClick={onCopy}
					disabled={busy}
					aria-busy={activeImageAction === LOADOUT_IMAGE_ACTIONS.COPY}
					aria-label={labels.copy}
					title={labels.copy}
				>
					{activeImageAction === LOADOUT_IMAGE_ACTIONS.COPY ? (
						<Spinner />
					) : (
						<ShareIcon />
					)}
				</Button>
			)}
			{onNotes && (
				<Button
					type="button"
					size="icon-sm"
					variant="outline"
					disabled={busy}
					onClick={onNotes}
					aria-label={`Notes for ${loadoutName}`}
					title={`Notes for ${loadoutName}`}
				>
					<FileTextIcon />
				</Button>
			)}
			{onCreateSnapshot && (
				<Button
					type="button"
					size="icon-sm"
					variant="outline"
					disabled={busy}
					onClick={onCreateSnapshot}
					aria-label={`Create snapshot from ${loadoutName}`}
					title={`Create snapshot from ${loadoutName}`}
				>
					<CameraIcon />
				</Button>
			)}
			{onDelete && (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							type="button"
							size="icon-sm"
							variant="destructive"
							className="pointer-events-auto"
							disabled={busy}
							aria-label={labels.delete}
							title={labels.delete}
						>
							<Trash2Icon />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent size="sm">
						<AlertDialogHeader>
							<AlertDialogTitle>Delete {itemType}?</AlertDialogTitle>
							<AlertDialogDescription>
								This will permanently delete “{loadoutName}”.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction variant="destructive" onClick={onDelete}>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
};
