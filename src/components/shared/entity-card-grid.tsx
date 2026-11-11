import type { ReactNode } from "react";
import { ENTITY_CARD_SIZE } from "@/components/shared/entity-card-constants";
import { cn } from "@/lib/utils";

type EntityCardGridProps = {
	children: ReactNode;
	className?: string;
	itemWidth?: number;
};

export const EntityCardGrid = ({
	children,
	className,
	itemWidth = ENTITY_CARD_SIZE,
}: EntityCardGridProps) => (
	<div
		className={cn("grid justify-start gap-3", className)}
		style={{ gridTemplateColumns: `repeat(auto-fill, ${itemWidth}px)` }}
	>
		{children}
	</div>
);
