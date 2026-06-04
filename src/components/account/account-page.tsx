import { useEffect } from "react";
import { GithubSection } from "@/components/account/github/github-section";
import { GoogleSection } from "@/components/account/google/google-section";
import { PageTitle } from "@/components/page-title";
import { useAuthStore } from "@/stores/auth-store";

export const AccountPage = () => {
	const setAuth = useAuthStore((s) => s.setAuth);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		const login = params.get("login");

		const installationId = Number(params.get("installationId"));

		if (login && installationId) {
			setAuth(login, installationId);
		}
	}, [setAuth]);

	return (
		<>
			<PageTitle
				title="Account"
				description="Manage Github account or repository access"
			/>

			<div className="flex flex-col gap-4">
				<GithubSection />

				<GoogleSection />
			</div>
		</>
	);
};
