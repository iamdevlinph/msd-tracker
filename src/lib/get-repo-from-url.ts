import type { GetIssuesFnType } from "@/actions/get-issues.functions";

export const getRepoFromURL = (url: GetIssuesFnType["repository_url"]) => {
	const repoSplit = url.split("/");
	const owner = repoSplit.at(-2) as string;
	const repo = repoSplit.at(-1) as string;

	return {
		owner,
		repo,
		fullRepoName: `${owner}/${repo}`,
	};
};
