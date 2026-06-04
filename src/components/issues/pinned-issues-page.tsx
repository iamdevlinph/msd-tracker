import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NoPinnedIssues } from "@/components/empty/no-pinned-issues";
import { NotLoggedIn } from "@/components/empty/not-logged-in";
import { AddIssueURL } from "@/components/issues/add-issue-url";
import { IssueCard } from "@/components/issues/issue-card";
import { PinnedIssuesSearch } from "@/components/issues/pinned-issues-search";
import { PageTitle } from "@/components/page-title";
import { usePinnedSearch } from "@/hooks/use-pinned-search";
import { useAuthStore } from "@/stores/auth-store";

export const PinnedIssuesPage = () => {
	const pinnedIssues = useAuthStore((s) => s.pinnedIssues);
	const authenticatedGithub = useAuthStore((s) => s.authenticatedGithub);
	const hasPinnedIssues = (pinnedIssues.all ?? []).length > 0;
	const [search, setSearch] = useState("");

	const groupedIssues = usePinnedSearch(search);

	return (
		<>
			<PageTitle
				title="Pinned Issues"
				description="Your starred issues organized by repository"
				aside={<AddIssueURL />}
			/>

			{!authenticatedGithub && <NotLoggedIn />}

			{authenticatedGithub && !hasPinnedIssues && <NoPinnedIssues />}

			{authenticatedGithub && hasPinnedIssues && (
				<div className="space-y-8">
					<PinnedIssuesSearch search={search} setSearch={setSearch} />

					{Object.entries(groupedIssues).map(([repoName, issues]) => {
						const repoUrl = `https://github.com/${repoName}`;
						return (
							<motion.div key={repoName} layout>
								<a href={repoUrl} target="_blank" className="hover:underline">
									<h3 className="font-semibold mb-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
										{repoName}
									</h3>
								</a>

								<div className="space-y-3">
									<AnimatePresence>
										{issues.map((issue) => (
											<motion.div
												key={issue.id}
												layout
												initial={{
													opacity: 0,
													x: 20,
												}}
												animate={{
													opacity: 1,
													x: 0,
													transition: {
														duration: 0.1,
													},
												}}
												exit={{
													opacity: 0,
													x: -30,
												}}
												transition={{
													duration: 0.3,
												}}
											>
												<IssueCard issue={issue} />
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							</motion.div>
						);
					})}
				</div>
			)}
		</>
	);
};
