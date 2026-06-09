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
	const resetStore = useAppStore((s) => s.resetStore);
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
				<GoogleSection />

				<Card>
					<CardHeader>
						<CardTitle>Local Store</CardTitle>
						<CardDescription>
							Reset store to empty. This will delete recorded monsterlings in
							Monster Codex.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col w-min gap-5">
						<Button onClick={resetStore} variant={"destructive"}>
							Reset Store
						</Button>
						<Button onClick={resetCharacterSlice} variant={"destructive"}>
							Reset Characater Store
						</Button>
					</CardContent>
				</Card>
			</div>
		</>
	);
};
