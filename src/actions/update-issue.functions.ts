import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GetIssuesSchema } from "@/actions/get-issues.functions";
import { installationOctokit } from "@/actions/github-app.server";

const UpdateIssueSchema = GetIssuesSchema.extend({
	issue_number: z.number(),
	state: z.enum(["closed"]).optional().default("closed"),
});

export const updateIssueFn = createServerFn()
	.inputValidator(UpdateIssueSchema)
	.handler(async ({ data }) => {
		try {
			const { installationId, owner, repo, issue_number, state } = data;
			const octokit = await installationOctokit(installationId);

			const issues = await octokit.rest.issues.update({
				owner,
				repo,
				issue_number,
				state,
			});

			return issues;
		} catch (e) {
			console.error("Something went wrong when updating issue", e);

			return Promise.reject(e);
		}
	});
