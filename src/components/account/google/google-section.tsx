import { SiGoogledrive } from "@icons-pack/react-simple-icons";
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
import { fmt } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export const GoogleSection = () => {
	const { status, login, logout, email } = useGoogleAuth();
	const syncInProgress = useAppStore((s) => s.syncInProgress);
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
							<div className="text-xs">Last sync: {fmt(backupUpdatedAt)}</div>
						</div>
					)}
					<div className="w-max flex gap-2">
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
