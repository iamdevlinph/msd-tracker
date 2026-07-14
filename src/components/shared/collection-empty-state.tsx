type CollectionEmptyStateProps = {
	title: string;
	description?: string;
};

export const CollectionEmptyState = ({
	title,
	description,
}: CollectionEmptyStateProps) => (
	<div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
		<h2 className="font-semibold">{title}</h2>
		{description && (
			<p className="text-sm text-muted-foreground">{description}</p>
		)}
	</div>
);
