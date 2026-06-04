import { Octokit } from "octokit";

export function oauthOctokit(token: string) {
	return new Octokit({
		auth: token,
	});
}
