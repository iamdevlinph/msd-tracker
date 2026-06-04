import { useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MessageCircleOff, MessageSquare, Star } from "lucide-react";
import type { GetIssuesFnType } from "@/actions/get-issues.functions";
import { IssueLabel } from "@/components/issues/issue-label";
import { PinnedIssueMenu } from "@/components/issues/pinned-issue-menu";
import { Card, CardContent } from "@/components/ui/card";
import { getRepoFromURL } from "@/lib/get-repo-from-url";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

type IssueCardProps = {
	issue: GetIssuesFnType;
	options?: {
		showRepository?: boolean;
	};
};

export const IssueCard = ({ issue, options }: IssueCardProps) => {
	const location = useLocation();
	const { showRepository = false } = options || {};
	const pinIssue = useAuthStore((s) => s.pinIssue);
	const unpinIssue = useAuthStore((s) => s.unpinIssue);
	const pinnedIssues = useAuthStore((s) => s.pinnedIssues);

	const isPinned = pinnedIssues.all.includes(issue.id);

	const date = new Date(issue.created_at);
	const formattedCreatedAt = date.toLocaleDateString("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});
	const { fullRepoName } = getRepoFromURL(issue.repository_url);

	return (
		<Card className="p-2 py-3">
			<CardContent className="px-2">
				<div className="flex items-start justify-between gap-3">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1.5">
							{showRepository && (
								<span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
									{fullRepoName}
								</span>
							)}
							<span className="text-xs text-gray-400 dark:text-gray-500">
								#{issue.number}
							</span>
							<span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
								<Calendar className="w-3 h-3" />
								{formattedCreatedAt}
							</span>
							<span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
								<MessageSquare className="w-3 h-3" />
								{issue.comments}
							</span>
						</div>
						<div className="flex md:items-center gap-2 flex-col md:flex-row">
							<a
								href={issue.html_url}
								target="_blank"
								className="flex gap-2 items-center"
							>
								{issue.state === "closed" && (
									<MessageCircleOff
										data-icon="inline-start"
										size={14}
										className="text-red-500"
									/>
								)}
								<h3 className="font-medium text-sm leading-snug hover:underline">
									{issue.title}
								</h3>
							</a>
							<div className="flex gap-1.5 shrink-0">
								{issue.labels.map((label) => {
									const { id, color, name } = label as Exclude<
										GetIssuesFnType["labels"][number],
										string
									>;
									return (
										<IssueLabel
											key={id}
											label={name as string}
											color={color as string}
										/>
									);
								})}
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-3 items-center">
						<motion.button
							whileTap={{ scale: 0.9, rotate: 20 }}
							onClick={() =>
								isPinned ? unpinIssue(issue.id) : pinIssue(issue)
							}
							className={cn(
								"p-1 rounded  transition-colors shrink-0",
								"-m-2.5 p-2.5",
								"cursor-pointer",
							)}
							aria-label={isPinned ? "Unpin issue" : "Pin issue"}
							type="button"
						>
							<Star
								className={`w-4 h-4 ${
									isPinned
										? "fill-yellow-400 text-yellow-400"
										: "text-gray-400 dark:text-gray-500"
								}`}
							/>
						</motion.button>

						{isPinned && location.pathname === "/" && (
							<PinnedIssueMenu issue={issue} />
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
