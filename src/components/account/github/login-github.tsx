import { Button } from "@/components/ui/button";

export const GithubLogin = () => {
	const GITHUB_URL = "https://github.com/login/oauth/authorize";
	const params = new URLSearchParams({
		client_id: import.meta.env.VITE_CLIENT_ID,
	});

	const AUTH_URL = `${GITHUB_URL}?${params}`;
	return (
		<a href={AUTH_URL}>
			<Button variant="outline">Login with Github</Button>
		</a>
	);
};
