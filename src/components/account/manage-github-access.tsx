import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/stores/auth-store";

export function ManageGithubAccess() {
	const installationId = useAuthStore((s) => s.installationId);

	if (!installationId) return null;

	const url = `https://github.com/settings/installations/${installationId}`;

	return (
		<a href={url} target="_blank" rel="noreferrer">
			<Button variant="outline">Manage repository access</Button>
		</a>
	);
}
