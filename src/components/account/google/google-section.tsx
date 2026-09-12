import { SiGoogledrive } from "@icons-pack/react-simple-icons";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
	keepLocalBackup,
	retrySync,
} from "@/components/account/google/utils/drive-sync";
import { useGoogleAuth } from "@/components/account/google/utils/use-google-auth";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { fmt } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export const GoogleSection = () => {
	const ga = useGoogleAnalytics();
	const { status, login, logout, email } = useGoogleAuth();
	const syncInProgress = useAppStore((s) => s.syncInProgress);
	const syncStatus = useAppStore((s) => s.syncStatus);
	const syncError = useAppStore((s) => s.syncError);
	const syncRecovery = useAppStore((s) => s.syncRecovery);
	const backupUpdatedAt = useAppStore((s) => s.backupUpdatedAt);
	const isHydrated = useAppStore((s) => s.isHydrated);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<SiGoogledrive color="#cecece" />
					Google Drive
				</CardTitle>
				<CardDescription>
					Login with Google to sync data to Google Drive. This app can only
					access the data created by this app.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-5">
					{!!email && (
						<div>
							Logged in as <strong className="underline">{email}</strong>
							<div className="text-xs">Last change: {fmt(backupUpdatedAt)}</div>
						</div>
					)}
					<div className="flex w-full gap-2">
						{syncStatus === "failed" && (
							<div className="flex flex-col gap-1 text-sm text-destructive">
								<div className="flex flex-wrap items-center gap-2">
									<span>{syncError ?? "Changes not backed up"}</span>
									<Button variant="outline" size="sm" onClick={retrySync}>
										Retry Sync
									</Button>
									{syncRecovery === "invalid-remote" && (
										<Button
											variant="secondary"
											size="sm"
											onClick={() => {
												ga.event(
													ANALYTICS_EVENTS.GOOGLE_DRIVE_KEEP_LOCAL_ATTEMPT,
												);
												void keepLocalBackup()
													.then(() =>
														ga.event(
															ANALYTICS_EVENTS.GOOGLE_DRIVE_KEEP_LOCAL_SUCCESS,
														),
													)
													.catch(() =>
														ga.event(
															ANALYTICS_EVENTS.GOOGLE_DRIVE_KEEP_LOCAL_FAILURE,
														),
													);
											}}
											disabled={syncInProgress}
										>
											Keep Local & Overwrite Drive
										</Button>
									)}
								</div>
								{syncRecovery === "invalid-remote" && (
									<p className="text-xs">
										The Drive backup is invalid. Keeping local data will replace
										it.
									</p>
								)}
								<p className="text-xs text-muted-foreground">
									Drive requests run in your browser; MSD_GOOGLE_DRIVE_SYNC
									covers token refresh only.
								</p>
							</div>
						)}
						{status === "loading" && (
							<Button disabled variant={"outline"}>
								Loading...
							</Button>
						)}
						{status === "out" && isHydrated && (
							<div className="flex gap-2 items-center">
								<Button
									onClick={() => {
										login();
									}}
									variant={"outline"}
									disabled={syncInProgress}
								>
									Login with Google
								</Button>
							</div>
						)}
						{status === "in" && (
							<Button
								onClick={() => logout()}
								variant={"destructive"}
								disabled={syncInProgress}
							>
								Logout
							</Button>
						)}

						{syncInProgress && (
							<div className="flex items-center gap-2">
								<Spinner data-icon="inline-start" />
								Syncing
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
