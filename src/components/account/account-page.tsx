import { SiGithub } from "@icons-pack/react-simple-icons";
import type React from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { GoogleSection } from "@/components/account/google/google-section";
import { MONSTERLING_OPTIONS_CACHE } from "@/components/monsterlings/store/monsterlings-options-store";
import { STAT_OPTIONS_CACHE } from "@/components/monsterlings/store/stat-options-store";
import { PageTitle } from "@/components/shared/page-title";
import { SeparatorText } from "@/components/shared/separator-text";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";

type ClearDataButtonProps = {
	children: React.ReactNode;
	description: string;
	onConfirm: () => void;
	target: string;
};

const ClearDataButton = ({
	children,
	description,
	onConfirm,
	target,
}: ClearDataButtonProps) => (
	<AlertDialog>
		<AlertDialogTrigger asChild>
			<Button variant="destructive">{children}</Button>
		</AlertDialogTrigger>
		<AlertDialogContent size="sm">
			<AlertDialogHeader>
				<AlertDialogTitle>Clear {target}?</AlertDialogTitle>
				<AlertDialogDescription>{description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction variant="destructive" onClick={onConfirm}>
					Clear
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

export const AccountPage = () => {
	const ga = useGoogleAnalytics();

	const resetCodexStore = useAppStore((s) => s.resetCodexStore);
	const resetCharacterSlice = useAppStore((s) => s.resetCharacterSlice);
	const resetMonsterlingSlice = useAppStore((s) => s.resetMonsterlingSlice);
	const resetLoadoutsSlice = useAppStore((s) => s.resetLoadoutsSlice);
	const resetLoadoutSnapshots = useAppStore((s) => s.resetLoadoutSnapshots);
	const resetChecklist = useAppStore((s) => s.resetChecklist);
	const resetArtifactsOwned = useAppStore((s) => s.resetArtifactsOwned);

	const hideItem = import.meta.env.VITE_NODE_ENV !== "development";

	// useEffect(() => {
	// 	const params = new URLSearchParams(window.location.search);

	// 	const login = params.get("login");

	// 	const installationId = Number(params.get("installationId"));

	// 	if (login && installationId) {
	// 		setAuth(login, installationId);
	// 	}
	// }, [setAuth]);

	return (
		<>
			<PageTitle title="Account" />

			<div className="flex flex-col gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Clear Data</CardTitle>
						<CardDescription>Reset data to empty.</CardDescription>
					</CardHeader>
					<CardContent className="w-full flex gap-5 flex-wrap">
						<ClearDataButton
							description="This permanently clears your Monster Codex progress and cannot be undone. If Google Drive sync is active, the cleared data will be included in the next backup."
							onConfirm={() => {
								resetCodexStore();
								ga.event(ANALYTICS_EVENTS.CODEX_RESET);
							}}
							target="Monster Codex"
						>
							Clear Monster Codex
						</ClearDataButton>
						<ClearDataButton
							description="This permanently clears your owned characters and cannot be undone. If Google Drive sync is active, the cleared data will be included in the next backup."
							onConfirm={() => {
								resetCharacterSlice();
								ga.event(ANALYTICS_EVENTS.CHARACTERS_RESET);
							}}
							target="Characters Owned"
						>
							Clear Characters Owned
						</ClearDataButton>
						<ClearDataButton
							description="This permanently clears your owned Monsterlings. Saved Link Chain Levels remain available when you re-add a species. If Google Drive sync is active, the cleared data will be included in the next backup."
							onConfirm={() => {
								resetMonsterlingSlice();
								ga.event(ANALYTICS_EVENTS.MONSTERLINGS_RESET);
							}}
							target="Monsterlings Owned"
						>
							Clear Monsterlings Owned
						</ClearDataButton>

						<ClearDataButton
							description="This permanently clears your loadouts and cannot be undone. If Google Drive sync is active, the cleared data will be included in the next backup."
							onConfirm={() => {
								resetLoadoutsSlice();
								ga.event(ANALYTICS_EVENTS.LOADOUTS_RESET);
							}}
							target="Loadouts"
						>
							Clear Loadouts
						</ClearDataButton>
						<ClearDataButton
							description="This permanently clears your loadout snapshots and cannot be undone."
							onConfirm={() => {
								resetLoadoutSnapshots();
								ga.event(ANALYTICS_EVENTS.LOADOUT_SNAPSHOTS_RESET);
							}}
							target="Loadout Snapshots"
						>
							Clear Loadout Snapshots
						</ClearDataButton>
						<ClearDataButton
							description="This permanently clears your owned artifacts and cannot be undone. If Google Drive sync is active, the cleared data will be included in the next backup."
							onConfirm={() => {
								resetArtifactsOwned();
								ga.event(ANALYTICS_EVENTS.ARTIFACTS_RESET);
							}}
							target="Artifacts Owned"
						>
							Clear Artifacts Owned
						</ClearDataButton>
						<ClearDataButton
							description="This permanently clears your custom Checklist tasks, completions, and preferences. If Google Drive sync is active, the cleared data will be included in the next backup."
							onConfirm={() => {
								resetChecklist();
								ga.event(ANALYTICS_EVENTS.CHECKLIST_RESET);
							}}
							target="Checklist"
						>
							Clear Checklist
						</ClearDataButton>

						{!hideItem && (
							<>
								<SeparatorText>Dropdown Options</SeparatorText>
								<ClearDataButton
									description="This only clears Monsterlings options cached in this browser. This cannot be undone."
									onConfirm={() =>
										localStorage.removeItem(MONSTERLING_OPTIONS_CACHE)
									}
									target="Monsterlings Options"
								>
									Clear Monsterlings Options
								</ClearDataButton>
								<ClearDataButton
									description="This only clears stat options cached in this browser. This cannot be undone."
									onConfirm={() => localStorage.removeItem(STAT_OPTIONS_CACHE)}
									target="Stat Options"
								>
									Clear Stat Options
								</ClearDataButton>
							</>
						)}
					</CardContent>
				</Card>

				<GoogleSection />

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<SiGithub />
							Project
						</CardTitle>
						<CardDescription>
							MSD Tracker is an open-source fan project. Explore the source
							code, report issues, or contribute on GitHub.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline" asChild>
							<a
								href="https://github.com/iamdevlinph/msd-tracker"
								target="_blank"
								rel="noreferrer"
								onClick={() =>
									ga.event(ANALYTICS_EVENTS.GITHUB_REPOSITORY_OPEN)
								}
							>
								View on GitHub
							</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		</>
	);
};
