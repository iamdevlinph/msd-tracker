import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { installationOctokit } from "./github-app.server";

export const GetIssuesSchema = z.object({
	installationId: z.number(),
	owner: z.string(),
	repo: z.string(),
});

export const getIssuesFn = createServerFn()
	.inputValidator(GetIssuesSchema)
	.handler(async ({ data }) => {
		try {
			const { installationId, owner, repo } = data;
			const octokit = await installationOctokit(installationId);

			const issues = await octokit.rest.issues.listForRepo({
				owner,
				repo,
				state: "open",
				per_page: 100,
			});

			return issues.data;
		} catch (e) {
			console.error("Something went wrong when fetching issues", e);

			return Promise.reject(e);
		}
	});

export type GetIssuesFnType = Awaited<ReturnType<typeof getIssuesFn>>[number];
