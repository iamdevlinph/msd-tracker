import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { installationOctokit } from "./github-app.server";

const GetRepositoriesSchema = z.object({
	installationId: z.number(),
});

export const getRepositoriesFn = createServerFn()
	.inputValidator(GetRepositoriesSchema)
	.handler(async ({ data }) => {
		try {
			let repositories = [];

			const octokit = await installationOctokit(data.installationId);

			const repos = await octokit.rest.apps.listReposAccessibleToInstallation({
				per_page: 100,
			});

			repositories = [...repos.data.repositories];

			const totalCount = repos.data.total_count;

			let page = 1;
			let hasNextPage = true;

			// TODO: Add pagination in UI in the future or when I remember lol
			if (totalCount > 100) {
				while (hasNextPage) {
					const repos =
						await octokit.rest.apps.listReposAccessibleToInstallation({
							per_page: 100,
							page,
						});

					repositories.push(...repos.data.repositories);
					hasNextPage = repos.data.repositories.length === 100;
					page++;
				}
			}
			return repositories;
		} catch (e) {
			console.error("Something went wrong when fetching repositories", e);

			return Promise.reject(e);
		}
	});

export type GetRepositoriesFnType = Awaited<
	ReturnType<typeof getRepositoriesFn>
>[number];
