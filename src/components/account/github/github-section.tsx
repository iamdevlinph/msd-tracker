import { SiGithub } from "@icons-pack/react-simple-icons";
import { GithubLogout } from "@/components/account/github/github-logout-button";
import { GithubLogin } from "@/components/account/github/login-github";
import { ManageGithubAccess } from "@/components/account/manage-github-access";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";

export const GithubSection = () => {
	const authenticatedGithub = useAuthStore((s) => s.authenticatedGithub);
	const githubLogin = useAuthStore((s) => s.githubLogin);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<SiGithub color="#cecece" />
					Github
				</CardTitle>
				<CardDescription>
					Login with Github to access repositories and issues.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{!authenticatedGithub ? (
					<GithubLogin />
				) : (
					<div className="flex flex-col gap-5">
						<div className="">
							Logged in as <strong className="underline">{githubLogin}</strong>
						</div>

						<div className="flex gap-2">
							<ManageGithubAccess />

							<GithubLogout />
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
