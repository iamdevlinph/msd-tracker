import { useGoogleAnalytics } from "tanstack-router-ga4";
import { GoogleSection } from "@/components/account/google/google-section";
import { MONSTERLING_OPTIONS_CACHE } from "@/components/monsterlings/store/monsterlings-options-store";
import { STAT_OPTIONS_CACHE } from "@/components/monsterlings/store/stat-options-store";
import { PageTitle } from "@/components/shared/page-title";
import { SeparatorText } from "@/components/shared/separator-text";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";

export const AccountPage = () => {
	const ga = useGoogleAnalytics();

	const resetCodexStore = useAppStore((s) => s.resetCodexStore);
	const resetCharacterSlice = useAppStore((s) => s.resetCharacterSlice);
	const resetMonsterlingSlice = useAppStore((s) => s.resetMonsterlingSlice);
	const resetLoadoutsSlice = useAppStore((s) => s.resetLoadoutsSlice);

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
						<Button
							onClick={() => {
								resetCodexStore();
								ga.event("reset_codex_store");
							}}
							variant={"destructive"}
						>
							Clear Monster Codex
						</Button>
						<Button
							onClick={() => {
								resetCharacterSlice();
								ga.event("reset_characters_owned");
							}}
							variant={"destructive"}
						>
							Clear Characaters Owned
						</Button>
						<Button
							onClick={() => {
								resetMonsterlingSlice();
								ga.event("reset_monsterlings_owned");
							}}
							variant={"destructive"}
						>
							Clear Monsterlings Owned
						</Button>

						{!hideItem && (
							<>
								<Button
									onClick={() => {
										resetLoadoutsSlice();
										ga.event("reset_loadouts");
									}}
									variant={"destructive"}
								>
									Clear Loadouts
								</Button>
								<SeparatorText>Options</SeparatorText>
								<Button
									onClick={() =>
										localStorage.removeItem(MONSTERLING_OPTIONS_CACHE)
									}
									variant={"destructive"}
								>
									Clear Monsterlings Options
								</Button>
								<Button
									onClick={() => localStorage.removeItem(STAT_OPTIONS_CACHE)}
									variant={"destructive"}
								>
									Clear Stat Options
								</Button>
							</>
						)}
					</CardContent>
				</Card>

				<GoogleSection />
			</div>
		</>
	);
};
