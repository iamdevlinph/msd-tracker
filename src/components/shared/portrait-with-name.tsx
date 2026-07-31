import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PortraitWithNameProps = {
	name: string;
	children: ReactNode;
	className?: string;
	nameClassName?: string;
};

export const PortraitWithName = ({
	name,
	children,
	className,
	nameClassName,
}: PortraitWithNameProps) => (
	<div className={cn("relative", className)}>
		{children}
		<span
			className={cn(
				"absolute inset-x-1 bottom-1 z-10 truncate rounded bg-black/65 px-1 py-0.5 text-center text-[10px] text-white",
				nameClassName,
			)}
		>
			{name}
		</span>
	</div>
);
