import Fuse from "fuse.js";
import { useMemo } from "react";
import { getRepoFromURL } from "@/lib/get-repo-from-url";
import { useAuthStore } from "@/stores/auth-store";

export function usePinnedSearch(query: string) {
	const pinnedIssues = useAuthStore((s) => s.pinnedIssues);

	const searchableIssues = useMemo(() => {
		return pinnedIssues.all
			.map((id) => pinnedIssues.byId[id])
			.filter(Boolean)
			.map((issue) => {
				const { fullRepoName } = getRepoFromURL(issue.repository_url);
				return {
					issue,
					title: issue.title,
					repository: fullRepoName,
				};
			});
	}, [pinnedIssues]);

	const fuse = useMemo(() => {
		return new Fuse(searchableIssues, {
			keys: ["title", "repository"],
			threshold: 0.45,
			includeScore: true,
			ignoreLocation: true,
			minMatchCharLength: 3,
			// useTokenSearch: true,
		});
	}, [searchableIssues]);

	const filtered = useMemo(() => {
		if (!query.trim()) {
			return searchableIssues.map((item) => item.issue);
		}

		return fuse.search(query).map((result) => result.item.issue);
	}, [query, fuse, searchableIssues]);

	// regroup by repo
	const grouped = useMemo(() => {
		return filtered.reduce(
			(acc, issue) => {
				const { fullRepoName } = getRepoFromURL(issue.repository_url);

				if (!acc[fullRepoName]) {
					acc[fullRepoName] = [];
				}

				acc[fullRepoName].push(issue);

				return acc;
			},

			{} as Record<string, typeof filtered>,
		);
	}, [filtered]);

	return grouped;
}
