import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { getIssuesFn } from "@/actions/get-issues.functions";
import {
	type GetRepositoriesFnType,
	getRepositoriesFn,
} from "@/actions/get-repositories.functions";
import { NoRepository } from "@/components/empty/no-repository";
import { NotLoggedIn } from "@/components/empty/not-logged-in";
import { HardRefreshMenu } from "@/components/issues/hard-refresh-menu";
import { IssueCard } from "@/components/issues/issue-card";
import { IssueCardSkeleton } from "@/components/issues/issue-card-skeleton";
import { PageTitle } from "@/components/page-title";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { Skeleton } from "@/components/ui/skeleton";
import { ISSUES_QUERY_KEY, REPOSITORIES_QUERY_KEY } from "@/constants";
import { useApp } from "@/context/use-app";
import { useAuthStore } from "@/stores/auth-store";

export const AllIssuesPage = () => {
	const installationId = useAuthStore((s) => s.installationId);
	const authenticatedGithub = useAuthStore((s) => s.authenticatedGithub);
	const pinnedRepos = useAuthStore((s) => s.pinnedRepos);
	const getRepos = useServerFn(getRepositoriesFn);
	const getIssues = useServerFn(getIssuesFn);
	const [selectedRepo, setRepo] = useState("");
	const { selectedRepo: selectedRepoContext, setSelectedRepo } = useApp();

	const repositoriesData = useQuery({
		queryKey: [REPOSITORIES_QUERY_KEY],
		queryFn: async () => {
			if (!installationId) {
				return [];
			}

			return getRepos({
				data: { installationId },
			});
		},
		enabled: !!installationId,
		refetchOnWindowFocus: true,
	});

	const issuesData = useQuery({
		queryKey: [`${ISSUES_QUERY_KEY}-${selectedRepo}`],
		queryFn: async () => {
			if (!installationId) {
				return [];
			}

			const [owner, repo] = selectedRepo.split("/");

			const issues = await getIssues({
				data: { installationId, owner, repo },
			});
			return issues;
		},
		enabled: !!selectedRepo,
	});

	// set selected repo between pages
	// biome-ignore lint/correctness/useExhaustiveDependencies: <just need to run this on load without deps>
	useEffect(() => {
		if (selectedRepoContext) {
			setRepo(selectedRepoContext);
		}
	}, []);

	const pinnedCount = selectedRepo
		? (pinnedRepos.byName[selectedRepo] ?? { issueIds: [] }).issueIds.length
		: 0;
	const totalCount = (issuesData.data ?? []).length;

	return (
		<>
			<PageTitle
				title="All Issues"
				description="Browse and manage issues across all repositories"
				aside={<HardRefreshMenu />}
			/>

			{repositoriesData.isFetching && <div>Loading...</div>}

			{!repositoriesData.isFetching && (
				<div>
					{!authenticatedGithub && <NotLoggedIn />}

					{authenticatedGithub &&
						(repositoriesData.data ?? []).length === 0 && <NoRepository />}

					{authenticatedGithub && (repositoriesData.data ?? []).length > 0 && (
						<>
							<div className="flex gap-2 items-center">
								<Combobox
									items={repositoriesData.data}
									onValueChange={(e) => {
										setRepo(e as string);
										setSelectedRepo(e as string);
									}}
									value={selectedRepoContext}
								>
									<ComboboxInput
										placeholder="Select a repository"
										className="w-full md:w-md"
									/>
									<ComboboxContent>
										<ComboboxEmpty>No items found.</ComboboxEmpty>
										<ComboboxList>
											{(item: GetRepositoriesFnType) => (
												<ComboboxItem key={item.id} value={item.full_name}>
													{item.full_name}
												</ComboboxItem>
											)}
										</ComboboxList>
									</ComboboxContent>
								</Combobox>

								<div>
									{!!selectedRepo && (
										<>
											{issuesData.isFetching && (
												<Skeleton className="h-6 w-7.5" />
											)}

											{!issuesData.isFetching &&
												(issuesData.data ?? []).length > 0 && (
													<>
														{pinnedCount}/{totalCount}
													</>
												)}
										</>
									)}
								</div>
							</div>
							<div className="space-y-3 mt-5">
								{issuesData.isFetching && <IssueCardSkeleton />}

								{!issuesData.isFetching &&
									(issuesData.data ?? []).map((issue) => {
										return (
											<IssueCard
												key={issue.id}
												issue={issue}
												options={{ showRepository: false }}
											/>
										);
									})}
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};
