import type { ReactNode } from "react";

export const SeparatorText = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex items-center my-6 w-full">
			<div className="flex-1 border-t border-muted-foreground/30" />
			<span className="px-3 text-xs uppercase text-muted-foreground">
				{children}
			</span>
			<div className="flex-1 border-t border-muted-foreground/30" />
		</div>
	);
};
