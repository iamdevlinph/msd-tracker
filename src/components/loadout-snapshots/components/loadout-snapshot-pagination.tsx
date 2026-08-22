import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

type LoadoutSnapshotPaginationProps = {
	page: number;
	pageCount: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
};

export const LoadoutSnapshotPagination = ({
	page,
	pageCount,
	pageSize,
	onPageChange,
	onPageSizeChange,
}: LoadoutSnapshotPaginationProps) => {
	const isFirstPage = page === 1;
	const isLastPage = page === pageCount;

	return (
		<div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
			<label
				className="flex items-center gap-2 text-sm text-muted-foreground"
				htmlFor="snapshot-page-size"
			>
				<span>Rows per page</span>
				<Select
					value={pageSize.toString()}
					onValueChange={(value) => onPageSizeChange(Number(value))}
				>
					<SelectTrigger
						id="snapshot-page-size"
						aria-label="Rows per page"
						size="sm"
					>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{PAGE_SIZE_OPTIONS.map((option) => (
							<SelectItem key={option} value={option.toString()}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</label>
			<div aria-live="polite" className="text-sm text-muted-foreground">
				Page {page} of {pageCount}
			</div>
			<ButtonGroup aria-label="Snapshot pagination" className="ml-auto">
				<Button
					type="button"
					variant="outline"
					size="icon"
					aria-label="First page"
					disabled={isFirstPage}
					onClick={() => onPageChange(1)}
				>
					<ChevronsLeftIcon />
				</Button>
				<Button
					type="button"
					variant="outline"
					size="icon"
					aria-label="Previous page"
					disabled={isFirstPage}
					onClick={() => onPageChange(page - 1)}
				>
					<ChevronLeftIcon />
				</Button>
				<Button
					type="button"
					variant="outline"
					size="icon"
					aria-label="Next page"
					disabled={isLastPage}
					onClick={() => onPageChange(page + 1)}
				>
					<ChevronRightIcon />
				</Button>
				<Button
					type="button"
					variant="outline"
					size="icon"
					aria-label="Last page"
					disabled={isLastPage}
					onClick={() => onPageChange(pageCount)}
				>
					<ChevronsRightIcon />
				</Button>
			</ButtonGroup>
		</div>
	);
};
