import { useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
	download,
	select,
	upload,
} from "@/components/account/google/utils/drive-sync";
import { SeparatorText } from "@/components/shared/separator-text";
import { SyncCopyCard } from "@/components/sync/sync-copy-card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";

export function SyncConflictDialog() {
	const ga = useGoogleAnalytics();
	const [buttonClicked, setButtonClicked] = useState<
		"local" | "remote" | undefined
	>(undefined);
	const conflict = useAppStore((s) => s.syncConflict);
	const setConflict = useAppStore((s) => s.setSyncConflict);
	const syncInProgress = useAppStore((s) => s.syncInProgress);

	if (!conflict) return null;

	const { local, remote } = conflict;

	return (
		<AlertDialog open={!!conflict}>
			<AlertDialogContent className="max-h-[calc(100dvh-2rem)] min-w-0 overflow-y-auto">
				<AlertDialogHeader>
					<AlertDialogTitle>Sync conflict detected</AlertDialogTitle>

					<AlertDialogDescription>
						Choose which version to keep. This will overwrite the other copy.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="min-w-0 space-y-4 text-sm">
					<div className="flex min-w-0 flex-col space-y-2">
						<SyncCopyCard
							title="Local copy"
							copy={local}
							isNewer={local.updatedAt > remote.updatedAt}
						/>

						<AlertDialogAction
							onClick={async () => {
								setButtonClicked("local");
								ga.event(ANALYTICS_EVENTS.SYNC_CONFLICT_KEEP_LOCAL_ATTEMPT);
								try {
									await upload(select(useAppStore.getState()));
									setConflict(null);
									ga.event(ANALYTICS_EVENTS.SYNC_CONFLICT_KEEP_LOCAL_SUCCESS);
								} catch {
									ga.event(ANALYTICS_EVENTS.SYNC_CONFLICT_KEEP_LOCAL_FAILURE);
								}
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

					<div className="flex min-w-0 flex-col space-y-2">
						<SyncCopyCard
							title="Remote copy (Google Drive)"
							copy={remote}
							isNewer={remote.updatedAt > local.updatedAt}
						/>

						<AlertDialogAction
							onClick={async () => {
								setButtonClicked("remote");
								ga.event(ANALYTICS_EVENTS.SYNC_CONFLICT_KEEP_REMOTE_ATTEMPT);
								try {
									const remote = await download();

									if (!remote) {
										ga.event(
											ANALYTICS_EVENTS.SYNC_CONFLICT_KEEP_REMOTE_FAILURE,
										);
										return;
									}

									useAppStore.setState({
										...remote,
									});

									setConflict(null);
									ga.event(ANALYTICS_EVENTS.SYNC_CONFLICT_KEEP_REMOTE_SUCCESS);
								} catch {
									ga.event(ANALYTICS_EVENTS.SYNC_CONFLICT_KEEP_REMOTE_FAILURE);
								}
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
