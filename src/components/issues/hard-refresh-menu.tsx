import { useQueryClient } from "@tanstack/react-query";
import { Cog, RefreshCwIcon } from "lucide-react";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ISSUES_QUERY_KEY, REPOSITORIES_QUERY_KEY } from "@/constants";
import { AppProviderContext } from "@/context/app-provider-context";

export const HardRefreshMenu = () => {
	const { selectedRepo } = useContext(AppProviderContext);
	const queryClient = useQueryClient();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="default">
					<Cog />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => {
							queryClient.invalidateQueries({
								queryKey: [REPOSITORIES_QUERY_KEY],
							});
						}}
					>
						<RefreshCwIcon />
						Refetch repositories
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => {
							queryClient.invalidateQueries({
								queryKey: [`${ISSUES_QUERY_KEY}-${selectedRepo}`],
							});
						}}
					>
						<RefreshCwIcon />
						Refetch issues in repository
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
