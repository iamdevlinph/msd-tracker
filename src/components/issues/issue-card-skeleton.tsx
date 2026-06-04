import { Skeleton } from "@/components/ui/skeleton";

export const IssueCardSkeleton = () => {
	return (
		<>
			<Skeleton className="h-16.75 w-full rounded-lg" />
			<Skeleton className="h-16.75 w-full rounded-lg" />
			<Skeleton className="h-16.75 w-full rounded-lg" />
			<Skeleton className="h-16.75 w-full rounded-lg" />
			<Skeleton className="h-16.75 w-full rounded-lg" />
		</>
	);
};
