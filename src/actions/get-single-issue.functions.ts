import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GetIssuesSchema } from "@/actions/get-issues.functions";
import { installationOctokit } from "@/actions/github-app.server";

const GetSingleIssueSchema = GetIssuesSchema.extend({
	issue_number: z.number(),
});

export const getSingleIssueFn = createServerFn()
	.inputValidator(GetSingleIssueSchema)
	.handler(async ({ data }) => {
		try {
			const { installationId, owner, repo, issue_number } = data;
			const octokit = await installationOctokit(installationId);

			const issues = await octokit.rest.issues.get({
				owner,
				repo,
				issue_number,
			});

			return issues.data;
		} catch (e) {
			console.error("Something went wrong when fetching issues", e);

			return Promise.reject(e);
		}
	});
