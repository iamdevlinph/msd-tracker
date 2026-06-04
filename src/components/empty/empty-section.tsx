import { Folder } from "lucide-react";
import type React from "react";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

type EmptySectionProps = {
	title: string;
	description: string;
	children: React.ReactNode;
	icon?: React.ReactNode;
};

export function EmptySection({
	title,
	description,
	children,
	icon,
}: EmptySectionProps) {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">{icon ?? <Folder />}</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>{description}</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="flex-row justify-center gap-2">
				{children}
			</EmptyContent>
			{/* <Button
				variant="link"
				asChild
				className="text-muted-foreground"
				size="sm"
			>
				<a href="/">
					Learn More <ArrowUpRightIcon />
				</a>
			</Button> */}
		</Empty>
	);
}
