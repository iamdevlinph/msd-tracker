import { readableBytes } from "common-utils-pkg";
import { useState } from "react";
import {
	download,
	select,
	upload,
} from "@/components/account/google/utils/drive-sync";
import { SeparatorText } from "@/components/separator-text";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/stores/auth-store";

export function SyncConflictDialog() {
	const [buttonClicked, setButtonClicked] = useState<
		"local" | "remote" | undefined
	>(undefined);
	const conflict = useAuthStore((s) => s.syncConflict);
	const setConflict = useAuthStore((s) => s.setSyncConflict);
	const syncInProgress = useAuthStore((s) => s.syncInProgress);

	if (!conflict) return null;

	const fmt = (ts: number) => new Date(ts).toLocaleString();

	return (
		<AlertDialog open={!!conflict}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Sync conflict detected</AlertDialogTitle>

					<AlertDialogDescription>
						Choose which version to keep. This will overwrite the other copy.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="space-y-4 text-sm">
					<div className="space-y-2 flex flex-col">
						<div className="border rounded p-3">
							<div className="font-medium">Local copy</div>
							<div>Last updated: {fmt(conflict.local.updatedAt)}</div>
							<div>Size: {readableBytes(conflict.local.size, 2)}</div>
						</div>

						<AlertDialogAction
							onClick={async () => {
								setButtonClicked("local");
								// KEEP LOCAL
								await upload(select(useAuthStore.getState()));
								setConflict(null);
							}}
							className="w-full sm:w-max self-center"
							variant="secondary"
							disabled={syncInProgress}
						>
							{syncInProgress && buttonClicked === "local" && (
								<Spinner data-icon="inline-start" />
							)}
							Keep Local
						</AlertDialogAction>
					</div>

					<SeparatorText>or</SeparatorText>

					<div className="space-y-2 flex flex-col">
						<div className="border rounded p-3">
							<div className="font-medium">Remote copy (Google Drive)</div>
							<div>Last updated: {fmt(conflict.remote.updatedAt)}</div>
							<div>Size: {readableBytes(conflict.remote.size, 2)}</div>
						</div>

						<AlertDialogAction
							onClick={() => {
								setButtonClicked("remote");
								// KEEP REMOTE
								setConflict(null);

								(async () => {
									const remote = await download();

									if (!remote) return;

									useAuthStore.setState({
										pinnedRepos: remote.pinnedRepos,
										pinnedIssues: remote.pinnedIssues,
										backupUpdatedAt: remote.backupUpdatedAt,
									});
								})();
							}}
							className="w-full  sm:w-max flex self-center"
							disabled={syncInProgress}
						>
							{syncInProgress && buttonClicked === "remote" && (
								<Spinner data-icon="inline-start" />
							)}
							Keep Remote
						</AlertDialogAction>
					</div>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
