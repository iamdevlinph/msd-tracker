import { useServerFn } from "@tanstack/react-start";
import { ArrowDownToLine, Ellipsis, MessageCircleOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { GetIssuesFnType } from "@/actions/get-issues.functions";
import { getSingleIssueFn } from "@/actions/get-single-issue.functions";
import { updateIssueFn } from "@/actions/update-issue.functions";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { getRepoFromURL } from "@/lib/get-repo-from-url";
import { useAuthStore } from "@/stores/auth-store";

type PinnedIssueMenuProps = {
	issue: GetIssuesFnType;
};

export function PinnedIssueMenu({ issue }: PinnedIssueMenuProps) {
	const installationId = useAuthStore((s) => s.installationId);
	const unpinIssue = useAuthStore((s) => s.unpinIssue);
	const updatePinnedIssue = useAuthStore((s) => s.updatePinnedIssue);
	const [action, setAction] = useState<"close" | "refresh" | null>(null);
	const [menuActionInProgress, setMenuActionProgress] = useState(false);
	const [open, setOpen] = useState(false);
	const updateIssue = useServerFn(updateIssueFn);
	const getSingleIssue = useServerFn(getSingleIssueFn);

	const { owner, repo } = getRepoFromURL(issue.repository_url);

	const closeIssueDisabled = issue.state === "closed" || menuActionInProgress;

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<button className="cursor-pointer " type="button">
					<Ellipsis size={18} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem
						aria-disabled={closeIssueDisabled}
						onSelect={async (e) => {
							e.preventDefault();

							setAction("close");
							setMenuActionProgress(true);
							try {
								if (!installationId) {
									throw new Error("installationId is missing");
								}

								await updateIssue({
									data: {
										owner,
										repo,
										issue_number: issue.number,
										state: "closed",
										installationId,
									},
								});

								setOpen(false);

								unpinIssue(issue.id);
							} catch (e) {
								toast.error("Unable to close issue", {
									description: (e as Error).message,
								});
							} finally {
								setMenuActionProgress(false);
							}
						}}
						disabled={closeIssueDisabled}
					>
						{menuActionInProgress && action === "close" ? (
							<Spinner data-icon="inline-start" />
						) : (
							<MessageCircleOff data-icon="inline-start" />
						)}
						Close issue
					</DropdownMenuItem>

					<DropdownMenuItem
						onSelect={async (e) => {
							e.preventDefault();

							setAction("refresh");
							setMenuActionProgress(true);
							try {
								if (!installationId) {
									throw new Error("installationId is missing");
								}

								const updatedIssue = await getSingleIssue({
									data: {
										owner,
										repo,
										issue_number: issue.number,
										installationId,
									},
								});

								setOpen(false);

								updatePinnedIssue(updatedIssue);
							} catch (e) {
								toast.error("Unable to refresh issue", {
									description: (e as Error).message,
								});
							} finally {
								setMenuActionProgress(false);
							}
						}}
						disabled={menuActionInProgress}
					>
						{menuActionInProgress && action === "refresh" ? (
							<Spinner data-icon="inline-start" />
						) : (
							<ArrowDownToLine data-icon="inline-start" />
						)}
						Refresh issue
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
