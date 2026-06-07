import { useEffect } from "react";
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
			<PageTitle title="Account" />

			<div className="flex flex-col gap-4">
				<GoogleSection />
			</div>
		</>
	);
};
