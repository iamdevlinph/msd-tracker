import { oauthOctokit } from "./github-oauth.server";

export async function getInstallations(token: string) {
	const octokit = oauthOctokit(token);

	const installations = await octokit.request("GET /user/installations");

	return installations.data;
}
