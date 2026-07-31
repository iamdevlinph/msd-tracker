type LoadoutPreviewPlaceholderProps = { label: string };

export const LoadoutPreviewPlaceholder = ({
	label,
}: LoadoutPreviewPlaceholderProps) => (
	<div className="grid h-[120px] w-full place-items-center rounded-lg border border-dashed bg-muted/20 text-center text-sm text-muted-foreground">
		{label}
	</div>
);
