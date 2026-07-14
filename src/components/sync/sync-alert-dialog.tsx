import { readableBytes } from "common-utils-pkg";
import { useState } from "react";
import {
	download,
	select,
	upload,
} from "@/components/account/google/utils/drive-sync";
import { SeparatorText } from "@/components/shared/separator-text";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/stores/app-store";

export function SyncConflictDialog() {
	const [buttonClicked, setButtonClicked] = useState<
		"local" | "remote" | undefined
	>(undefined);
	const conflict = useAppStore((s) => s.syncConflict);
	const setConflict = useAppStore((s) => s.setSyncConflict);
	const syncInProgress = useAppStore((s) => s.syncInProgress);

	if (!conflict) return null;

	const { local, remote } = conflict;

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
							<div>Last updated: {fmt(local.updatedAt)}</div>
							<div>
								Size:{" "}
								{readableBytes(local.size, {
									decimals: 2,
									minUnit: "kB",
								})}
							</div>

							<Table className="">
								<TableHeader>
									<TableRow>
										<TableHead scope="col">Characters</TableHead>
										<TableHead scope="col">Monsterlings</TableHead>
										<TableHead scope="col">Loadouts</TableHead>
										<TableHead scope="col">Codex</TableHead>
										<TableHead scope="col">Codex Favorites</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>{local.metadata.charactersOwned}</TableCell>
										<TableCell>{local.metadata.monsterlingsOwned}</TableCell>
										<TableCell>{local.metadata.loadouts}</TableCell>
										<TableCell>{local.metadata.codexCompleted}</TableCell>
										<TableCell>{local.metadata.codexFavorites}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>

						<AlertDialogAction
							onClick={async () => {
								setButtonClicked("local");
								// KEEP LOCAL
								await upload(select(useAppStore.getState()));
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
							<div>Last updated: {fmt(remote.updatedAt)}</div>
							<div>
								Size:{" "}
								{readableBytes(remote.size, {
									decimals: 2,
									minUnit: "kB",
								})}
							</div>

							<Table className="">
								<TableHeader>
									<TableRow>
										<TableHead scope="col">Characters</TableHead>
										<TableHead scope="col">Monsterlings</TableHead>
										<TableHead scope="col">Loadouts</TableHead>
										<TableHead scope="col">Codex</TableHead>
										<TableHead scope="col">Favorites</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>{remote.metadata.charactersOwned}</TableCell>
										<TableCell>{remote.metadata.monsterlingsOwned}</TableCell>
										<TableCell>{remote.metadata.loadouts}</TableCell>
										<TableCell>{remote.metadata.codexCompleted}</TableCell>
										<TableCell>{remote.metadata.codexFavorites}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>

						<AlertDialogAction
							onClick={() => {
								setButtonClicked("remote");

								(async () => {
									const remote = await download();

									if (!remote) return;

									useAppStore.setState({
										...remote,
									});

									// KEEP REMOTE
									setConflict(null);
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
