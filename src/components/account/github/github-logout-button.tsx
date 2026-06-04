import { useState } from "react";
import { logoutServerFn } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/stores/auth-store";

export function GithubLogout() {
	const [loading, setLoading] = useState(false);
	const logout = useAuthStore((s) => s.logout);

	async function handleLogout() {
		setLoading(true);
		await logoutServerFn();
		logout();
		setLoading(false);
	}

	return (
		<Button
			variant="destructive"
			onClick={handleLogout}
			className="w-min"
			disabled={loading}
		>
			{loading && <Spinner data-icon="inline-start" />}
			Logout
		</Button>
	);
}
