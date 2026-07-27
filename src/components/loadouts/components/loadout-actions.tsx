import {
	CopyPlusIcon,
	DownloadIcon,
	EditIcon,
	EyeIcon,
	ShareIcon,
	Trash2Icon,
} from "lucide-react";
import type { LoadoutImageAction } from "@/components/loadouts/components/loadout-image-actions";
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
	onEdit: () => void;
	onDuplicate: () => void;
	onCopy: () => void;
	onDownload: () => void;
	onDelete: () => void;
	onPreview?: () => void;
	activeImageAction?: LoadoutImageAction | null;
	disabled?: boolean;
	className?: string;
};

export const LoadoutActions = ({
	loadoutName,
	onEdit,
	onDuplicate,
	onCopy,
	onDownload,
	onDelete,
	onPreview,
	activeImageAction = null,
	disabled = false,
	className,
}: LoadoutActionsProps) => {
	const busy = disabled || activeImageAction !== null;
	const labels = {
		preview: `Preview ${loadoutName}`,
		edit: `Edit ${loadoutName}`,
		duplicate: `Duplicate ${loadoutName}`,
		copy: `Copy ${loadoutName} image`,
		download: `Download ${loadoutName} image`,
		delete: `Delete ${loadoutName}`,
	};

	return (
		<div className={cn("flex flex-wrap justify-end gap-1", className)}>
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
			<Button
				type="button"
				size="icon-sm"
				variant="outline"
				onClick={onCopy}
				disabled={busy}
				aria-busy={activeImageAction === "copy"}
				aria-label={labels.copy}
				title={labels.copy}
			>
				{activeImageAction === "copy" ? <Spinner /> : <ShareIcon />}
			</Button>
			<Button
				type="button"
				size="icon-sm"
				variant="outline"
				onClick={onDownload}
				disabled={busy}
				aria-busy={activeImageAction === "download"}
				aria-label={labels.download}
				title={labels.download}
			>
				{activeImageAction === "download" ? <Spinner /> : <DownloadIcon />}
			</Button>
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
						<AlertDialogTitle>Delete team loadout?</AlertDialogTitle>
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
		</div>
	);
};
