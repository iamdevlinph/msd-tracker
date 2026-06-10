import { GoogleSection } from "@/components/account/google/google-section";
import { PageTitle } from "@/components/page-title";
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
	const resetCodexStore = useAppStore((s) => s.resetCodexStore);
	const resetCharacterSlice = useAppStore((s) => s.resetCharacterSlice);

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
						<CardTitle>Local Data</CardTitle>
						<CardDescription>
							Reset local data to empty.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col w-min gap-5">
						<Button onClick={resetCodexStore} variant={"destructive"}>
							Reset Monster Codex Data
						</Button>
						<Button onClick={resetCharacterSlice} variant={"destructive"}>
							Reset Characaters Owned Data
						</Button>
					</CardContent>
				</Card>

				<GoogleSection />
			</div>
		</>
	);
};
