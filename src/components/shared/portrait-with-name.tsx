import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PortraitWithNameProps = {
	name: string;
	children: ReactNode;
	className?: string;
	nameClassName?: string;
	style?: CSSProperties;
};

export const PortraitWithName = ({
	name,
	children,
	className,
	nameClassName,
	style,
}: PortraitWithNameProps) => (
	<div className={cn("relative", className)} style={style}>
		{children}
		<span
			className={cn(
				"absolute inset-x-1 bottom-1 z-10 truncate rounded bg-black/80 px-1 py-0.5 text-center text-[10px] text-white",
				nameClassName,
			)}
		>
			{name}
		</span>
	</div>
);
